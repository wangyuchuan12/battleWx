var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var accountRequest = require("../../utils/accountRequest.js");
var randomRoomRequest = require("../../utils/randomRoomRequest.js");
var battlesRequest = require("../../utils/battlesRequest.js");

var battleTakepartCache = require("../../utils/cache/battleTakepartCache.js");

var request = require("../../utils/request.js");

var battleDanRequest = require("../../utils/battleDanRequest.js");

var takepartRequest = require("../../utils/takepartRequest.js");

var requestTarget;

var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    danId: 0,
    danName: "",
    name:"",
    imgUrl: "",
    roomId: "",
    battleId:"",
    maxinum:"",
    mininum:"",
    projects: [{
      isOpen: 1
    }],
    members:[{
      imgUrl:"http://otsnwem87.bkt.clouddn.com/user.png"
    },{
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    },{
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }],

   rewards:[]
  },

  initDanRoomInfo:function(){
    var outThis = this;
    var danId = this.data.danId;
    battleDanRequest.danRoomInfo(danId,{
      success:function(room){
        console.log("room:"+JSON.stringify(room));
        outThis.setData({
          name:room.name,
          places:room.places,
          roomId:room.roomId,
          battleId:room.battleId,
          maxinum:room.maxinum,
          mininum:room.mininum,
          rewards:room.rewards
        });

        outThis.showMembers(room.members);
      },
      fail:function(){
        console.log("fail");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var danId = options.danId;
    danId = 1;
    this.setData({
      danId: danId
    });
    console.log("danId:" + danId);
    //  this.initBattles();
    //this.initAccountResult();

    this.initDanRoomInfo();
  },

  showMembers:function(ms){
      var members = new Array();
      var maxinum = this.data.maxinum;

      if (ms && ms.length > 0) {
        for (var i = 0; i < ms.length; i++) {
          members.push({
            imgUrl:ms[i].headImg
          });
        }
      }

      if(maxinum){
        for (var i = 0; i < maxinum-ms.length; i++) {
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }
      }
      

      

      this.setData({
        members:members
      });
  },

  takepartClick:function(){
    var outThis = this;
    var members = outThis.data.members;
    var num = this.data.num;
    var mininum = this.data.mininum;
    var maxinum = this.data.maxinum;
    var status = this.data.status;
    this.showLoading();
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    takepartRequest.battleTakepart(battleId,roomId,{
      success: function (member) {
        outThis.hideLoading();
        outThis.initBattleMembers();
      },
      beanNotEnough: function () {
        outThis.hideLoading();
        outThis.showConfirm("智慧豆不足", "智慧豆不足，是否充值智慧豆", {
          confirm: function () {
            wx.navigateTo({
              url: '../mall/mall'
            });
          },
          cancel: function () {

          }

        }, "充值", "取消");
      },
      masonryNotEnough: function () {
        outThis.hideLoading();
        outThis.showToast("砖石不足");
      },
      fail: function (errorMsg) {
        outThis.hideLoading();
        if (!errorMsg) {
          outThis.showToast("网络繁忙");
        } else {
          outThis.showToast(errorMsg);
        }
      },
      battleIn: function () {
        outThis.hideLoading();
        outThis.skipToProgress();
      },
      battleEnd: function () {
        outThis.hideLoading();
        outThis.skipToProgress();
      },
      roomEnd: function () {
        outThis.hideLoading();
        outThis.showToast("比赛已经结束");
      },
      roomFull: function () {
        outThis.hideLoading();
        outThis.showConfirm("房间人数已满", "是否创建新房间", {
          confirm: function () {
            outThis.createClick();
          },
          cancel: function () {

          }

        }, "创建", "取消");
      }
    });
  },

  initBattleMembers: function (callback) {
    var members = new Array();
    for (var i = 0; i < 40; i++) {
      members.push({
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
      });
    }
    this.setData({
      members: members
    });
    var outThis = this;
    var roomId = this.data.roomId;
    var maxinum = this.data.maxinum;
    var num = 0;
    requestTarget = battleMembersRequest.getBattleMembers(battleId, roomId, {
      cache: function (battleMembers) {
        var members = new Array();
        var length = 0;
        if (battleMembers != null && battleMembers.length > 0) {
          length = battleMembers.length;
          num = length;
          for (var i = 0; i < battleMembers.length; i++) {
            members.push({
              imgUrl: battleMembers[i].headImg
            });

          }
        }
        for (var i = 0; i < maxinum - length; i++) {
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members,
          num: num
        });
      },
      success: function (battleMembers) {
        battleTakepartCache.members = battleMembers;
        callback.success(battleMembers);

        var length = battleMembers.length;
        var num = length;
        var members = new Array();
        for (var i = 0; i < battleMembers.length; i++) {
          members.push({
            imgUrl: battleMembers[i].headImg
          });
        }
        for (var i = 0; i < maxinum - length; i++) {
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members,
          num: num
        });

        var mininum = outThis.data.mininum;

        if (mininum <= num) {
          requestTarget.stop();
        }

      },
      fail: function () {
        callback.fail();
      }
    }, 15000);
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