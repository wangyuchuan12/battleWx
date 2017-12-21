var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battlePkRequest = require("../../utils/battlePkRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: { 
    id:0,
    homeUserId:"",
    homeUsername:"",
    homeUserImgurl:"",
    beatUserId:"",
    beatUsername:"",
    beatUserImgurl:"",
    roomId:"",
    homeStatus:0,
    beatStatus:0,
    roomStatus:0,
    battleCount:0,
    //0是主场，1是客场
    role:0,
    isObtain:0,
    battleId:"",
    periodId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var role = options.role;
    var id = options.id;
    if(!role){
      role = 0;
    }
    this.setData({
      role: role,
      id:id
    });

    console.log("role:"+role);
    if(role == 0){
      this.homeInto();
    }else{
      this.beatInto();
    }
    
  },

  doReady:function(){
    var outThis = this;
    this.showLoading();
    var id = this.data.id;
    var role = this.data.role;
    var battleId = this.data.battleId;
    var periodId = this.data.periodId;
    var roomId = this.data.roomId;
    battlePkRequest.readyRequest(id,roomId,battleId,role,{
      success: function (data) {
        outThis.hideLoading();
        outThis.setData({
          id: data.id,
          homeUserId: data.homeUserId,
          homeUsername: data.homeUsername,
          homeUserImgurl: data.homeUserImgurl,
          beatUserId: data.beatUserId,
          beatUsername: data.beatUsername,
          beatUserImgurl: data.beatUserImgurl,
          roomId: data.roomId,
          homeStatus: data.homeStatus,
          beatStatus: data.beatStatus,
          roomStatus: data.roomStatus,
          battleCount: data.battleCount,
          battleId: "",
          periodId: ""
        });
      },
      fail: function () {
        outThis.showToast("网络繁忙，请稍后再试");
        outThis.hideLoading();
      }
    });
  },

  itemClick: function (e) {
   

  },

  homeInto:function(){
    console.log("homeInto");
    var outThis = this;
    battlePkRequest.homeIntoRequest({
      success:function(data){
        console.log("data:"+JSON.stringify(data));
        outThis.setData({
          id: data.id,
          homeUserId: data.homeUserId,
          homeUsername: data.homeUsername,
          homeUserImgurl: data.homeUserImgurl,
          beatUserId: data.beatUserId,
          beatUsername: data.beatUsername,
          beatUserImgurl: data.beatUserImgurl,
          homeStatus: data.homeStatus,
          beatStatus: data.beatStatus,
          roomStatus: data.roomStatus,
          battleCount: data.battleCount,
          isObtain: data.isObtain,
          battleId:data.battleId,
          periodId:data.periodId,
          roomId: data.roomId,
          role:data.role
        });
        if(data.roomStatus==2){
          wx.navigateTo({
            url: '../progressScore/progressScore?battleId='+data.battleId+"&roomId="+data.roomId
          });
        }
      },
      fail:function(){
        console.log("fail");
      }
    });
  },

  beatInto:function(){
    var outThis = this;
    var id = this.data.id;
    battlePkRequest.beatIntoRequest(id,{
      success: function (data) {
        outThis.setData({
          id: data.id,
          homeUserId: data.homeUserId,
          homeUsername: data.homeUsername,
          homeUserImgurl: data.homeUserImgurl,
          beatUserId: data.beatUserId,
          beatUsername: data.beatUsername,
          beatUserImgurl: data.beatUserImgurl,
          homeStatus: data.homeStatus,
          beatStatus: data.beatStatus,
          roomStatus: data.roomStatus,
          battleCount: data.battleCount,
          isObtain: data.isObtain,
          battleId: data.battleId,
          periodId: data.periodId,
          roomId: data.roomId,
          role:data.role
        });
        if (data.roomStatus == 2) {
          console.log("data:"+JSON.stringify(data));
          wx.navigateTo({
            url: '../progressScore/progressScore?battleId=' + data.battleId + "&roomId=" + data.roomId
          });
        }
      },
      fail: function () {
        console.log("fail");
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
    var path = "pages/pkRoom/pkRoom?role=1&id="+this.data.id;
    return {
      path: path,
      success: function () {
      
      }
    }
  }
});

layerout.begin();