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
var requestTarget;
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
    roomId:0,
    //是否处在运行状态
    isRun:0
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
      var roomId = outThis.data.roomId;
      battleStageTakepartRequest.stageTakepart(outThis.data.battleId,subjectIds,roomId,{
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
            url: '../questionInfo/questionInfo?questionIds=' + questionIds + "&stageIndex=" + stageIndex+"&roomId="+roomId,
          });

        },
        fail:function(){

        }
      });
      
    }
  },
  onShareAppMessage:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var path = "pages/battleTakepart/battleTakepart?battleId="+battleId+"&roomId="+roomId
    return {
      title: outThis.data.title,
      desc: outThis.data.desc,
      path: path
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
      url: '../battleTakepart/battleTakepart?battleId=' + this.data.battleId+"&roomId="+this.data.roomId
    });
  },

  processUpdate:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    requestTarget = battleMembersRequest.getBattleMembers(battleId, roomId, {
      cache: function (battleMembers) {
        
      },
      success: function (battleMembers) {
        var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
        var oldBattleMembers = outThis.getMembers();
        console.log("oldBattleMembers:"+oldBattleMembers);
        outThis.setMembers(battleMembers);
        for(var i=0;i<battleMembers.length;i++){
          for(var j=0;j<oldBattleMembers.length;j++){
            var battleMember = battleMembers[i];
            var oldBattleMember = oldBattleMembers[j];
            if (battleMember.id == oldBattleMember.id&&battleMember.id!=memberInfo.id){
             var isRun = outThis.data.isRun;
             if(isRun==0){
              outThis.trendBetween(battleMember.id, oldBattleMember.process, battleMember.process, {
                success: function () {
                  
                },
                fail: function () {

                }
              }, false);
             }else if(isRun==1){
               outThis.location(battleMember.id, battleMember.process);
             }
              break;
            }
          }
        }
      },
      fail: function () {
        
      }
    }, 15000);
  },

  startResult: function (rightCount, wrongCount, process, battleMemberPaperAnswerId){
    
    outThis.setData({
      isRun: 1
    });
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
          outThis.setData({
            isRun: 0
          });
          if (outThis.data.isLast == 1) {
            outThis.showQuestionResult();
            outThis.skipToRank();
          }else{
            outThis.showQuestionResult();
          }
        },
        fail: function () {

        }
      },true);
    },100);
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
      this.showToast("爱心不足");
      return;
    }
    var roomId = this.data.roomId;
   
    var battleId = this.data.battleId;
    var subjectCount = this.data.subjectCount;
    var outThis = this;
    this.initBattleSubjects(subjectCount, battleId,roomId,{
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
        var isMy = 0;
        if(member.id==memberInfo.id){
          isMy = 1;
        }
        positions.push({
          id: member.id,
          imgUrl: member.headImg,
          animationData: {},
          begin: member.process,
          end: 0,
          isMy:isMy
        });
      }
      progressScoreCache.process = process;
      progressScoreCache.positions = positions;
      outThis.setPositions(positions);
      outThis.containerScrollToDom(process);
      outThis.location(memberInfo.id, process);
    },1000);
    
  },

  onShow: function () {
    var outThis = this;
    setTimeout(function(){
      outThis.processUpdate();
    },2000);
  },

  onUnload: function () {
    requestTarget.stop();
  },

  onLoad: function (options) {
    outThis = this;
    var battleInfo = battleInfoRequest.battleInfo;
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    var roomId = options.roomId;

    battleMembersRequest.getBattleMembers(battleId, roomId, {
      cache: function (battleMembers) {

      },
      success: function (battleMembers) {

        membersRankUtil.rankByProcess(battleMembers);
        outThis.setMembers(battleMembers);

      },
      fail: function () {

      }
    });
    
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

    battleMemberInfoRequest.getBattleMemberInfo(battleId,roomId,{
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