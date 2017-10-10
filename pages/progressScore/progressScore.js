var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var battleMembersRequest = require("../../utils/battleMembersRequest.js");
var battleInfoRequest = require("../../utils/battleInfoRequest.js");
var cacheUtil = require("../../utils/cacheUtil.js");
var battleStageTakepartRequest = require("../../utils/battleStageTakepartRequest.js");
var questionAnswerRequest = require("../../utils/questionAnswerRequest.js");
var membersRankUtil = require("../../utils/membersRankUtil.js");
var progressScoreCache = require("../../utils/cache/progressScoreCache.js");
var battleTakepartCache = require("../../utils/cache/battleTakepartCache.js");
var outThis;
var layerout = new baseLayerout.BaseLayerout({
  data:{
    title:"火影忍者",
    desc:"这是什么呢？",
    path:"pages/battleTakepart/battleTakepart",
    questionSelectorDisplay:"none",
    questionResultDisplay:"none",
    displayPanel:0,
    battleId:0,
    subjectCount:3,
    stageIndex:0,
    rightCount:5,
    wrongCount:3,
    process:0,
    totalDistance:120,
    battleMemberPaperAnswerId:null,
    isLast:0,
    roomId:0
  },
  eventListener:{
    questinResultClose:function(){
      outThis.setData({
        "questionResultDisplay": "none",
        "displayPanel": 1
      });
    },

    questinSelectorClose:function(){
      outThis.setData({
        questionSelectorDisplay:"none"
      });
    },
    selectComplete:function(subjects,stageIndex){

      var subjectIds = new Array();

      for(var i=0;i<subjects.length;i++){
        subjectIds.push(subjects[i].id);
      }
      outThis.setData({
        stageIndex:stageIndex
      });
      battleStageTakepartRequest.stageTakepart(outThis.data.battleId,subjectIds,{
        success:function(data){
          console.log("data:"+JSON.stringify(data));
          var ids = data.questionIds;
          var questionIds = "";
          var isLast = data.isLast;
          outThis.setData({
            isLast:isLast
          });
          for(var i = 0;i<ids.length;i++){
            var questionId = ids[i];
            if (!questionIds) {
              questionIds = questionId;
            } else {
              questionIds = questionIds + "," + questionId;
            }
          }
          wx.navigateTo({
            url: '../questionInfo/questionInfo?questionIds=' + questionIds + "&stageIndex=" + stageIndex,
          });

        },
        fail:function(){

        }
      });
      
    }
  },
  onShareAppMessage:function(){
    var outThis = this;
    return {
      title: outThis.data.title,
      desc: outThis.data.desc,
      path: outThis.data.path
    }
  },

  skipToRank: function () {
    var roomId = this.data.roomId;
    wx.navigateTo({
      url: '../battleRank/battleRank?battleId=' + this.data.battleId+"&roomId="+roomId
    });
  },

  skipToTakepart:function(){
    wx.redirectTo({
      url: '../battleTakepart/battleTakepart?battleId=' + this.data.battleId
    });
  },

  startResult: function (rightCount, wrongCount, process, battleMemberPaperAnswerId){
    
    var begin = this.getProcess();
    var end = begin + process;
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    
    outThis.setProgress(end);

    this.setData({
      questionSelectorDisplay: "none",
      questionResultDisplay: "none",
      displayPanel: 1,
      rightCount: rightCount,
      wrongCount: wrongCount,
      process:process,
      battleMemberPaperAnswerId: battleMemberPaperAnswerId,
      stageIndex: memberInfo.stageIndex
    });

    var loveLimit = outThis.getLoveLimit();
    var loveCount = outThis.getLoveCount();

    loveCount = loveCount - wrongCount;
    if(loveCount<0){
      loveCount = 0;
    }

    outThis.setLove(loveLimit,loveCount);

    setTimeout(function(){
      outThis.trendBetween(memberInfo.id, begin, end, {
        success: function () {
          console.log("isLast:" + outThis.data.isLast);
          if (outThis.data.isLast == 1) {
            outThis.skipToRank();
          }
        },
        fail: function () {

        }
      });
    },1500);
  },

  showQuestionResult:function(){
    var battleMemberPaperAnswerId = this.data.battleMemberPaperAnswerId;
    var outThis = this;
    this.initQuestionResultData(battleMemberPaperAnswerId,{
      success:function(){
        outThis.hideLoading();
      },
      fail:function(){
        outThis.hideLoading();
      }
    });
  },

  initQuestionResultData: function (battleMemberPaperAnswerId, callback) {
    var outThis = this;
    questionAnswerRequest.requestQuestionResults(battleMemberPaperAnswerId, {
      success: function (data) {
        outThis.setData({
          "questionResultDisplay": "block",
          "displayPanel":0
        });

       var results = data.questionAnswers;

       console.log("data:"+JSON.stringify(data));

       console.log("id:" + battleMemberPaperAnswerId);

        var items = new Array();
        for (var i = 0; i < results.length; i++) {
          var options;
          if (results[i].options) {
            options = results[i].options.split(",");
          }
          items.push({
            question: results[i].question,
            type: results[i].type,
            answer: results[i].answer,
            rightAnswer: results[i].rightAnswer,
            options: options,
            imgUrl: results[i].imgUrl
          });
        }
        callback.success();
        outThis.setItems(items);
      },
      fail: function () {
        callback.fail();
      }
    });
  },

  startSelector:function(){
    var loveCount = this.getLoveCount();
    if(!loveCount){
      this.showToast("爱心不足，请充值");
      return;
    }
   
    var battleId = this.data.battleId;
    var subjectCount = this.data.subjectCount;
    var outThis = this;
    this.initBattleSubjects(subjectCount, battleId,{
      success: function () {
        outThis.hideLoading();
        outThis.setData({
          questionSelectorDisplay: "block",
          displayPanel:0
        });
        outThis.showSelector();
      },
      isLast:function(){

      }
    });
  },

  onReady:function(){
    outThis = this;

    setTimeout(function(){
      var battleInfo = battleInfoRequest.battleInfo;
      var members = battleTakepartCache.members;
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      var process = memberInfo.process;
      if (!process) {
        process = 0;
      }

      var positions = new Array();
      for (var i = 0; i < members.length; i++) {
        var member = members[i];
        positions.push({
          id: member.id,
          imgUrl: member.headImg,
          animationData: {},
          begin: member.process,
          end: 0
        });
      }
      progressScoreCache.process = process;
      progressScoreCache.positions = positions;
      outThis.setPositions(positions);
      outThis.containerScrollToDom(process);
      outThis.location(memberInfo.id, process);
    },1000);
    
  },

  onLoad: function (options) {
    outThis = this;
    var battleInfo = battleInfoRequest.battleInfo;
    var members = battleTakepartCache.members;
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    var roomId = options.roomId;

    membersRankUtil.rankByProcess(members);

    this.setMembers(members);
    
    var model = options.model;
    var battleId = options.battleId;
    var stageIndex = memberInfo.stageIndex;

    this.setData({
      stageIndex:stageIndex
    });

    if(battleId){
      wx.setStorageSync("battleId", battleId);
    }else{
      battleId = wx.getStorageSync("battleId");
    }
    this.setDistance(120);
    this.setData({
      title: options.title,
      desc:options.desc,
      battleId:battleId,
      roomId: roomId
    });

    battleMemberInfoRequest.getBattleMemberInfo(1,{
      success:function(memberInfo){
        outThis.setLove(memberInfo.loveCount, memberInfo.loveResidule);
        outThis.setProgress(memberInfo.process);
      },
      fail:function(){
        console.log("fail");
      }
    });
  } 
});

layerout.addProgressScorePlug();
layerout.addQuestionSelector();
layerout.addProgressScoreMember();
layerout.addQuestionResult();
layerout.begin();