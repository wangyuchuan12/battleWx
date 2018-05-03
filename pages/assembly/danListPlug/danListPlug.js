
var battleDanRequest = require("../../../utils/battleDanRequest.js");

var accountRequest = require("../../../utils/accountRequest.js");

var takepartRequest = require("../../../utils/takepartRequest.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    headimgurl: "",
    nickname: "",
    level: 1,
    exp: 0,
    currentDanId: "",
    scrollTop: 0,
    dans: [/*{
      id:0,
      status:0,
      danName:"原始人",
      danId:"",
      imgUrl:""
    }*/],
    thisDan: null,
    alertDan: null,
    isDanAlert: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initAccountResult: function () {
      var outThis = this;
      accountRequest.accountResultInfo({
        success: function (accountResult) {
          outThis.setData({
            headimgurl: accountResult.headimgurl,
            nickname: accountResult.nickname,
            level: accountResult.level,
            exp: accountResult.exp,
            danName: accountResult.danName
          });
          outThis.initBattleDans();
        },
        fail: function () {

        }
      });
    },

    initBattleDans: function () {
      var outThis = this;
      battleDanRequest.listRequest({
        success: function (dans) {
          outThis.setData({
            dans: dans
          });

          var thisDan;
          for (var i = 0; i < dans.length; i++) {
            if (dans[i].status == 1) {
              thisDan = dans[i];
            }
          }

          outThis.setData({
            thisDan: thisDan
          });

          setTimeout(function () {
            outThis.setData({
              currentDanId: "dan_" + thisDan.id
            });
          }, 500);
        },
        fail: function () {

        }
      });
    },

    danListAlertMaskClick: function () {
      this.setData({
        isDanAlert: 0
      });
    },

    danItemClick: function (e) {
      var outThis = this;
      var id = e.currentTarget.id;
      var dans = this.data.dans;
      for (var i = 0; i < dans.length; i++) {
        var dan = dans[i];
        if (dan.id == id) {
          if (dan.status == 0) {
            this.showConfirm("该段位未开启", "请先完成上一个段位", {
              confirm: function () {

              },
              cancel: function () {

              }
            });
            return;
          }
          /*
          var isSign = dan.isSign;
          if (isSign == 1) {
            outThis.setData({
              roomId: data.roomId,
              battleId: data.battleId
            });
            outThis.startTo();
          } else {
            this.setData({
              isDanAlert: 1,
              alertDan: dan
            });
          }*/
          outThis.setData({
            isDanAlert: 1,
            alertDan: dan
          });
          return;
        }
      }

    },

    restart: function (danId) {
      var dans = this.data.dans;
      for (var i = 0; i < dans.length; i++) {
        var dan = dans[i];
        if (dan.id = danId) {

          this.setData({
            isDanAlert: 1,
            alertDan: dan
          });
          return;
        }
      }
    },

    startTo: function (waitId,danUserId) {

      /*
      wx.navigateTo({
        url: '../progressScore/progressScore2?roomId=' + roomId + "&battleId=" + battleId + "&againButton=返回"
      });*/

      var myEventDetail = { waitId: waitId, danUserId: danUserId} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('danTakepart', myEventDetail, myEventOption);
    },

    signClick: function () {
      var outThis = this;
      var alertDan = this.data.alertDan;

      wx.showModal({
        title: '报名该关卡',
        content: '是否确定报名',
        success:function(){
          outThis.setData({
            isDanAlert: 0
          });
          battleDanRequest.danSign(alertDan.id, {
            success: function (data) {
              var waitId = data.waitId;
              var danUserId = data.danUserId;
              outThis.startTo(waitId, danUserId);

            },
            beanNotEnough: function () {
              outThis.hideLoading();
              outThis.showConfirm("智慧豆不足", "是否去充值", {
                confirm: function () {
                  wx.navigateTo({
                    url: '../mall/mall'
                  });
                },
                cancel: function () {

                }
              });
            },
            fail: function () {
              outThis.hideLoading();
              outThis.showToast("网络繁忙，请稍后再试");
            }
          });
        }
      });

    }
  }
})
