var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleRoomRequest = require("../../utils/battleRoomRequest.js");

var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");

var redPackListRequest = require("../../utils/redPackListRequest.js");

var receiveRedPackRequest = require("../../utils/receiveRedpackRequest.js");

var battleRoomRecordsRequest = require("../../utils/battleRoomRecordsRequest.js");

var redPackCache = require("../../utils/cache/redPackCache.js");

var outThis = this;
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battleId:0,
    roomId:0,
    loveCount:0,
    loveResidule:0,
    nickname:"",
    periodId:"",
    process:0,
    stageCount:0,
    stageIndex:0,
		
    status:0,
		
    isCreater:0,
    isManager:0,
    openId:"",
    userId:"",
		
    roomId:"",
		
    speedCoolBean:0,
    speedCoolSecond:0,
		
    roomProcess:0,
    roomScore:0,
		
    num:0,
		
    maxinum:0,
		
    mininum:0,

    redPacks:[],
    roomRecords:[]
  },

  eventListener: {
    skipToRedpackInfo: function (id) {
      var battleId = outThis.data.battleId;
      var roomId = outThis.data.roomId;
      wx.navigateTo({
        url: '../redPackInfo/redPackInfo?id='+id+"&battleId="+battleId+"&roomId="+roomId
      });
    },
    redPackOpen:function(id){
      var redPacks = outThis.data.redPacks;
      for (var i = 0; i < redPacks.length;i++){
        var redPack = redPacks[i];
        if(redPack.id==id){
          outThis.showRedPack(redPack);
        }
      }
    },
    receiveRedpackInfo:function(id){
      receiveRedPackRequest.receiveRedpack(id,outThis.data.battleId,outThis.data.roomId,{
        success:function(){
          outThis.redPacketAlertCloseClick();
          outThis.eventListener.skipToRedpackInfo(id);
          redPackCache.addReceived(id);
        },
        fail:function(){
          outThis.showToast("网络繁忙，稍后再试",5000);
        },
        over:function(){
          outThis.showToast("红包已领完",5000);
        },
        roomProcessMeetError:function(){
          outThis.showToast("对不起，房间距离不足，不能领取",5000);
        },
        roomScoreMeetError:function(){
          outThis.showToast("对不起，房间总分数不足，不能领取",5000);
        },
        roomMeetError:function(){
          outThis.showToast("对不起，房间人数不够，不能领取",5000);
        },
        personalProcessMeetError:function(){
          outThis.showToast("对不起，您的进程不足，不能领取",5000);
        },
        personalScoreMeetError:function(){
          outThis.showToast("对不起，您的积分不足，不能领取",5000);
        },
        isReceivedError:function(){
          if (!redPackCache.isReceived()){
            redPackCache.addReceived(id);
          }
          outThis.eventListener.skipToRedpackInfo(id);
        }
      });
    }
  },

  initRoomRecords:function(){
    var outThis = this;
    var roomId = this.data.roomId;
    battleRoomRecordsRequest.roomRecords(roomId,{
      success:function(records){
        outThis.setData({
          roomRecords:records
        })
      },
      fail:function(){

      }
    });
  },

  initRoomInfoFromRequest:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    battleMemberInfoRequest.getBattleMemberInfo(battleId,roomId,{
      success:function(){
        outThis.initRoomInfo();
      },
      fail:function(){

      }
    });
  },

  initRoomInfo:function(){
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();

    var score = memberInfo.score;
    if (!score){
      score = 0;
    }

    this.setData({
      loveCount: memberInfo.loveCount,
      loveResidule: memberInfo.loveResidule,
      nickname: memberInfo.nickname,
      periodId: memberInfo.periodId,
      process: memberInfo.process,
      stageCount: memberInfo.stageCount,
      stageIndex: memberInfo.stageIndex,

      status: memberInfo.status,

      isCreater: memberInfo.isCreater,
      isManager: memberInfo.isManager,
      openId: memberInfo.openId,
      userId: memberInfo.userId,

      speedCoolBean: memberInfo.speedCoolBean,
      speedCoolSecond: memberInfo.speedCoolSecond,

      roomProcess: memberInfo.roomProcess,
      roomScore: memberInfo.roomScore,

      num: memberInfo.num,

      maxinum: memberInfo.maxinum,

      mininum: memberInfo.mininum,
      score:score
    });
  },

  initRedPacks:function(){
    var outThis = this;
    var roomId = this.data.roomId;
    redPackListRequest.redPacks(roomId,{
      success:function(redPacks){
        for(var i=0;i<redPacks.length;i++){
          var redPack = redPacks[i];
          if (redPackCache.isReceived(redPack.id)){
            redPack.isReceived = true;
          }else{
            redPack.isReceived = false;
          }
        }
        outThis.setData({
          redPacks:redPacks
        });
      },
      fail:function(){
        console.log("fail");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    outThis = this;
    var battleId = options.battleId;
    var roomId = options.roomId;
    this.setData({
      battleId:battleId,
      roomId:roomId
    });
  },

  startClick:function(){
    wx.navigateTo({
      url: '../progressScore/progressScore?battleId='+this.data.battleId+"&roomId="+this.data.roomId
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initRoomInfo();
    this.initRedPacks();
    this.initRoomRecords();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  redPackClick: function (e) {
    var id = e.currentTarget.id;
    var isReceived = redPackCache.isReceived(id);
    if(!isReceived){
      this.eventListener.redPackOpen(id);
    }else{
      this.eventListener.skipToRedpackInfo(id);
    }
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var path = "pages/battleTakepart/battleTakepart?battleId=" + battleId + "&roomId=" + roomId
    return {
      title: "问答闯关比赛",
      desc: "问答闯关比赛抢红包",
      path: path
    }
  },
});
layerout.addRedPackAlertPlug();
layerout.begin();