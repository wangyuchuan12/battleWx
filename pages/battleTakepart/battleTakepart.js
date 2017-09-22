// battleTakepart.js
var request = require("../../utils/request.js");
var battleRequest = require("../../utils/battleInfoRequest.js");
var battleMembersRequest = require("../../utils/battleMembersRequest.js");
var takepartRequest = require("../../utils/takepartRequest.js");
var test = require("../../utils/test.js");
var util = require("../../utils/util.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var app = getApp();
var headImg = "http://ovcnyik4l.bkt.clouddn.com/d89f42d36c18e16d9900a5cd43e8edf2.png";
var battleId = 1;
var index = 1;
var layerout = new baseLayerout.BaseLayerout({
  /**
   * 页面的初始数据
   */
  data: {
   
    imgUrl:"",

    battleInfoContent:"",

    battleInfoName:"",

    members:[]

  },

  haha:function(){
    console.log("haha");
  },
  
  

  //初始化数据
  init:function(){

    this.setData({
      imgUrl: battleRequest.battleInfo.headImg,
      battleInfoContent: battleRequest.battleInfo.instruction,
      battleInfoName: battleRequest.battleInfo.name
    });
  
    var outThis = this;
    
    var outThis = this;
    var flagInfo = false;
    var flagMembers = false;
    var flagLogin = false;
    this.showLoading();
    outThis.initBattleInfo({
      success: function (members) {
        if (flagMembers) {
          outThis.hideLoading();
        }
        flagInfo = true;
      },
      fail:function(){
        flagInfo = true;
      }
    });

    setTimeout(function(){

    },5000);

    outThis.initBattleMembers({
      success: function () {
        if (flagInfo) {
          outThis.hideLoading();
        }
        flagMembers = true;
      },
      fail:function(){
        flagMembers = true;
      }
    });

    /*var isTakepart = takepartRequest.isTakepartCache(battleId,index);
    console.log("isTakepart:" + isTakepart);
    if (isTakepart) {
      outThis.skipToProgress();
      return;
    }*/


    //5秒钟如果没有加载好就提示出错
    setTimeout(function () {
      if (!flagMembers) {
        outThis.hideLoading();
        outThis.showToast("加载参赛名单出错");
      }

      if (!flagInfo) {
        outThis.hideLoading();
        outThis.showToast("加载比赛信息出错");
      }
    }, 10000);
  },

  //吃石化比赛信息数据
  initBattleInfo:function(callback){
    var outThis = this;
    battleRequest.getBattleInfo(battleId,{
      success: function (battleInfo) {
        callback.success();
       
        wx.setNavigationBarTitle({
          title: battleInfo.name
        })
        outThis.setData({
          imgUrl: battleInfo.headImg,
          battleInfoName: battleInfo.name,
          battleInfoContent: battleInfo.instruction
        });
      },
      fail: function () {
        callback.fail();
      }
    });
  },

  login:function(callback){
    request.requestLogin({
      success:function(){
        callback.success();
      },
      fail:function(){
        callback.fail();
      }
    });
  },

 //初始化参赛人员列表数据
  initBattleMembers:function(callback){
    var members = new Array();
    for(var i=0;i<40;i++){
      members.push({
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
      });
    }
    this.setData({
      members: members
    });
    var outThis = this;
    battleMembersRequest.getBattleMembers(battleId,index,{
      cache: function (battleMembers){
        var members = new Array();
        var length = 0;
        if (battleMembers != null && battleMembers.length>0){
          length = battleMembers.length;
          for (var i = 0; i < battleMembers.length; i++) {
            members.push({
              imgUrl: battleMembers[i].headImg
            });
          }
        }
        for (var i = 0; i < 50 - length; i++) {
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members
        });
      },
      success: function (battleMembers) {
       callback.success(battleMembers)
        var length = battleMembers.length;
        var members = new Array();
        for (var i = 0; i < battleMembers.length;i++){
          members.push({
            imgUrl: battleMembers[i].headImg
          });
        }
        for(var i = 0;i<50-length;i++){
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members
        });

      },
      fail: function () {
        callback.fail();
      }
    });
  },

  backClick:function(){
    wx.navigateTo({
      url: '../manager/battleInfoManager/battleInfoManager'
    });
  },

  skipToProgress:function(){
    wx.redirectTo({
      url: '../progressScore/progressScore?model=0&battleId='+battleId+"&periodIndex="+index
    });
  },

  //点击参赛请求
  takepartClick:function(){
    var outThis = this;
    var members = outThis.data.members;
    this.showLoading();
    takepartRequest.battleTakepart(battleId,index,{
      success:function(member){
        outThis.hideLoading();
        outThis.showToast("报名成功");
        members.splice(0,0,{
          imgUrl: member.headImg
        });
        outThis.setData({
          members: members
        });
        outThis.skipToProgress();
      },
      fail:function(errorMsg){
        outThis.hideLoading();
        if (!errorMsg){
          outThis.showToast("网络繁忙");
        }else{
          outThis.showToast(errorMsg);
        }
      },
      battleIn:function(){
        outThis.hideLoading();
        outThis.skipToProgress();
      },
      battleEnd:function(){
        outThis.hideLoading();
        outThis.skipToProgress();
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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
    
  }
});
layerout.begin();