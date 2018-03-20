var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    questionResultDisplay:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadPreProgress({
      complite: function () {
        
      }
    });

    this.setData({
      roomId:"0611ae18-371c-48d3-9cf3-2825fa07ccf8",
      battleId:"9"
    })

    this.initMemberInfo();
  },

  initMemberInfo:function(){
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    battleMemberInfoRequest.getBattleMemberInfo(battleId, roomId, {
      success:function(memberInfo){
        console.log(JSON.stringify(memberInfo));
      },
      fail:function(){

      }
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
layerout.addProgressScorePlug();
layerout.addQuestionSelector();
layerout.addProgressScoreMember();
layerout.addQuestionResult();
layerout.addBeanNotEnoughAlertPlug();
layerout.addAlertPlug();
layerout.addAircraftPlug();
layerout.addToastOutPlug();
layerout.begin();