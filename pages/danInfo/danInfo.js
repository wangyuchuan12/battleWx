var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var randomRoomRequest = require("../../utils/randomRoomRequest.js");
var battlesRequest = require("../../utils/battlesRequest.js");

var request = require("../../utils/request.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battles:[{
      isOpen:1
    }]
  },



  battleItemClick: function (e) {
    var id = e.currentTarget.id;
    var battles = this.data.battles;
    for (var i = 0; i < battles.length; i++) {
      var battle = battles[i];

      if (battle.isOpen == 0) {
        if (battle.id == id) {
          battle.isOpen = 1;
        } else {
          battle.isOpen = 0;
        }
      } else {
        if (battle.id == id) {
          battle.isOpen = 0;
        } else {
          battle.isOpen = 0;
        }
      }

    }

    this.setData({
      battles: battles
    });
  },

  initBattles: function (battleId, flag) {
    this.showLoading();
    var outThis = this;
    battlesRequest.requestBattles({
      success: function (battles) {
        outThis.hideLoading();
        var items = new Array();
        for (var i = 0; i < battles.length; i++) {
          var battle = battles[i];
          items.push({
            content: battle.name,
            id: battle.id,
            status: 0,
            headImg: battle.headImg,
            isOpen: 0
          });
        }
        if (!battleId && items.length > 0 && flag) {
          outThis.setData({
            "battleId": items[0].id,
            "battles": items,
            selectStatus: 0
          });
        } else if (battleId && items.length > 0) {
          outThis.setData({
            "battleId": battleId,
            "battles": items,
            selectStatus: 0
          });
        } else {
          outThis.setData({
            "battles": items,
            selectStatus: 1
          });
        }
      },
      fail: function () {
        outThis.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBattles();
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