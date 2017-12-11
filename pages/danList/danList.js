
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");


var battleDanRequest = require("../../utils/battleDanRequest.js");

var accountRequest = require("../../utils/accountRequest.js");

var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    headimgurl:"",
    nickname:"",
    level:1,
    exp:0,
    dans:[/*{
      id:0,
      status:0,
      danName:"原始人",
      danId:"",
      imgUrl:""
    }*/]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  initAccountResult: function () {
    var outThis = this;
    accountRequest.accountResultInfo({
      success: function (accountResult) {
          outThis.setData({
            headimgurl: accountResult.headimgurl,
            nickname: accountResult.nickname,
            level: accountResult.level,
            exp: accountResult.exp
          })
      },
      fail: function () {

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initBattleDans();
    this.initAccountResult();
  },

  initBattleDans:function(){
    var outThis = this;
    battleDanRequest.listRequest({
      success:function(dans){
        outThis.setData({
          dans:dans
        });
      },
      fail:function(){

      }
    });
  },

  danItemClick:function(e){
    var id = e.currentTarget.id;
    var dans = this.data.dans;
    for(var i=0;i<dans.length;i++){
      var dan = dans[i];
      if(dan.id==id){
        wx.navigateTo({
          url: '../danInfo/daninfo2?danId='+dan.danId
        });
        return;
      }
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initAccountInfo();
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

layerout.addAttrPlug();
layerout.begin();