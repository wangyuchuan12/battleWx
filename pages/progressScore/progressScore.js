var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var battleInfoRequest = require("../../utils/battleInfoRequest.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    title:"火影忍者",
    desc:"这是什么呢？",
    path:"pages/battleTakepart/battleTakepart",
    questionSelectorDisplay:"none",
    questionResultDisplay:"none",
    battleId:0,
    subjectCount:3,
    stageIndex:0
  },
  eventListener:{
    selectComplete:function(questions,stageIndex){
      wx.redirectTo({
        url: '../questionInfo/questionInfo?questions='+questions+"&stageIndex="+stageIndex,
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

  startResult: function (battleMemberPaperAnswerId){
    
    var outThis = this;

    setTimeout(function () {
      outThis.toPosition(0);
      outThis.containerScrollToDom(1);
    }, 2000);

    setTimeout(function () {
      outThis.trendBetween(1, 10);
    }, 5000);

    this.setData({
      "questionResultDisplay": "block"
    });
    this.initQuestionResultData(battleMemberPaperAnswerId,{
      success:function(){
        outThis.hideLoading();
      },
      fail:function(){
        outThis.hideLoading();
      }
    });

  },

  startSelector:function(){
 
    var battleId = this.data.battleId;
    var subjectCount = this.data.subjectCount;

    var stageIndex = this.data.stageIndex;
    var outThis = this;
    this.initBattleSubjects(subjectCount, battleId,{
      success: function () {
        outThis.hideLoading();
        outThis.setData({
          questionSelectorDisplay: "block"
        });
        outThis.showSelector(stageIndex);
      },
      isLast:function(){

      }
    });
  },

  onLoad: function (options) {

    this.showLoading();
    var model = options.model;
    var battleId = options.battleId;


    if(battleId){
      wx.setStorageSync("battleId", battleId);
    }else{
      battleId = wx.getStorageSync("battleId");
    }


   
    var outThis = this;
    this.setDistance(battleInfoRequest.battleInfo.distance);
    this.setData({
      title: options.title,
      desc:options.desc,
      battleId:battleId
    });

    if (model == 0) {
      this.startSelector();
    } else {
      var battleMemberPaperAnswerId = options.battleMemberPaperAnswerId;
      this.startResult(battleMemberPaperAnswerId);
    }

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