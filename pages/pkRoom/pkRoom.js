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
    periodId:"",
    isEnd:0
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

    this.init();
    
  },

  init:function(){
    var role = this.data.role;
    if (role == 0) {
      this.homeInto();
    } else {
      this.beatInto();
    }

    var outThis = this;
    setTimeout(function () {
      outThis.immediate();
    }, 5000);
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
          battleCount: data.battleCount
        });
        if (data.roomStatus == 2) {
          outThis.skipToProgress();
        }
      },
      fail: function () {
        outThis.showToast("网络繁忙，请稍后再试");
        outThis.hideLoading();
      }
    });
  },

  itemClick: function (e) {
   

  },

  restart:function(){
    var outThis = this;
    var role = this.data.role;
    if(role==0){
      battlePkRequest.restartRequest({
        success: function () {
          outThis.homeInto();
        },
        fail: function () {
          outThis.showToast("网路繁忙");
        }
      });
    }else if(role==1){
      this.setData({
        role: 0
      });
      this.init();
    }
    
  },

  beatOut:function(){
    var id = this.data.id;
    battlePkRequest.beatOutRequest(id,{
      success:function(){
        wx.redirectTo({
          url: '../battleHome/battleHome4'
        });
      }
    });
  },

  signoutListener:function(){
    var role = this.data.role;
    if(role==0){
      this.restart();
    }else if(role==1){
      this.beatOut();
    }
    
  },

  homeInto:function(){
    var outThis = this;
    battlePkRequest.homeIntoRequest({
      success:function(data){
        outThis.loadPreProgress();
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
          outThis.skipToProgress();
        }
      },
      fail:function(){
        console.log("fail");
      }
    });
  },

  immediate:function(){
    var outThis = this;
    var id = this.data.id;
    battlePkRequest.immediateRequest(id,{
      success:function(data){
        outThis.setData({
          homeUserId: data.homeUserId,
          homeUsername: data.homeUsername,
          homeUserImgurl: data.homeUserImgurl,
          beatUserId: data.beatUserId,
          beatUsername: data.beatUsername,
          beatUserImgurl: data.beatUserImgurl,
          homeStatus: data.homeStatus,
          beatStatus: data.beatStatus,
          roomStatus: data.roomStatus,
        });

        if (data.roomStatus == 2) {
          outThis.skipToProgress();
        }
        setTimeout(function(){
          if(outThis.data.isEnd==0){
            outThis.immediate();
          }
        },5000);
        
      },
      fail:function(){
        setTimeout(function () {
          if (outThis.data.isEnd == 0) {
            var errorCount = outThis.data.errorCount;
            if(errorCount>=3){
              outThis.immediate();
              if (!errorCount) {
                errorCount++;
                outThis.setData({
                  errorCount: errorCount,
                  isEnd:1
                });
              }
            }
            
          }
        }, 5000);
      }
    });
  },

  skipToProgress:function(){
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    if(this.data.isEnd==0){
      wx.navigateTo({
        url: '../progressScore/progressScore?battleId=' + battleId + "&roomId=" + roomId
      });
      this.setData({
        isEnd: 1
      });
    }
  },

  beatInto:function(){
    var outThis = this;
    var id = this.data.id;
    battlePkRequest.beatIntoRequest(id,{
      success: function (data) {
        outThis.loadPreProgress();
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
          
          outThis.skipToProgress();
          
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
    this.setData({
      isEnd:1
    });
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
    var role = this.data.role;
    var userId = "";
    if(role==0){
      userId = this.data.homeUserId;
    }else if(role==1){
      userId = this.data.beatUserId;
    }
    var path = 'pages/battleHome/battleHome4?registUserId=' + userId+"&roomId="+this.data.id+"&skipType=2";
    //var path = "pages/pkRoom/pkRoom?role=1&id="+this.data.id;
    return {
      path: path,
      success: function () {
      
      }
    }
  }
});

layerout.begin();