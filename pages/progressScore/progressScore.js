var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var battleInfoRequest = require("../../utils/battleInfoRequest.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    title:"火影忍者",
    desc:"这是什么呢？",
    path:"pages/battleTakepart/battleTakepart"
  },
  eventListener:{
    selectComplete:function(){
      wx.redirectTo({
        url: '../questionInfo/questionInfo',
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
  onLoad: function (options) {
    
    var outThis = this;
    this.setDistance(battleInfoRequest.battleInfo.distance);
    this.setData({
      title: options.title,
      desc:options.desc
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
    
    this.initBattleSubjects(3,{success:function(){
      outThis.showSelector();
    }});
    var bgUrl = "targets[1].bgUrl";
    this.setData({
      [bgUrl]: "http://onluguho9.bkt.clouddn.com/paper.png"
    });
    var outThis = this;

    setTimeout(function () {
      outThis.toPosition(0);
      outThis.containerScrollToDom(1);
    }, 2000);

    setTimeout(function () {
      outThis.trendBetween(1, 10);
    }, 5000);
    
  } 
});

layerout.addProgressScorePlug();
layerout.addQuestionSelector();
layerout.addProgressScoreMember();
layerout.begin();