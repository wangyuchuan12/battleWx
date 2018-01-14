var goodRequest = require("../../utils/goodRequest.js");
var accountRequest = require("../../utils/accountRequest.js");
var request = require("../../utils/request.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[/*
      {
        id:0,
        type:1,
        costType:0,
        num:2,
        cost:1
      },
      {
        id: 1,
        type: 2,
        costType: 2,
        num: 2,
        cost: 2
      }*/
    ]
  },

  goodPay:function(good){
    var outThis = this;
    accountRequest.payGood(good, {
      success: function () {
        if (good.type == 1) {
          outThis.addBean(good.num);
        } else if (good.type == 2) {
          outThis.addMasonry(good.num);
        }else if(good.type==3){
          outThis.addLove(good.num);
        }

        if (good.costType == 1) {
          outThis.subBean(good.cost);
        } else if (good.costType == 2) {
          outThis.subMasonry(good.cost);
        }
        outThis.showToast("购买成功");
        outThis.hideLoading();
      },
      fail: function () {
        outThis.showToast("购买失败");
        outThis.hideLoading();
      }
    });
  },

  goodItemClick:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var goods = this.data.goods;
    this.showLoading();
    var outThis = this;
    for(var i=0;i<goods.length;i++){
      var good = goods[i];
      if(good.id==id){
        if(good.costType==2){
          var masonry = outThis.getMasonry();
          if (good.cost > masonry){
            outThis.showToast("砖石不足");

            outThis.hideLoading();
            return;
          }
          outThis.showConfirm("确认支付","该商品支付"+good.cost+"砖石，是否购买", {
            confirm:function(){
              outThis.goodPay(good);
            },
            cancel:function(){
              outThis.hideLoading();
            }
          }, "确定", "取消");
        }else if(good.costType==0){
          outThis.goodPay(good);
        }else if(good.costType==1){
          var bean = outThis.getBeanCount();
          if (good.cost > bean) {
            outThis.showToast("智慧豆不足");
            outThis.hideLoading();
            return;
          }
          outThis.showConfirm("确认支付", "该商品支付" + good.cost + "智慧豆，是否购买", {
            confirm: function () {
              outThis.goodPay(good);
            },
            cancel: function () {
              outThis.hideLoading();
            }
          }, "确定", "取消");
        }
        break;
      }
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initAccountInfo();
    var outThis = this;
    outThis.showLoading();
    goodRequest.listRequest(null,{

        success:function(goods){
          outThis.loadPreProgress();
          outThis.hideLoading();
          var array = new Array();
          for(var i=0;i<goods.length;i++){
            var good = goods[i];  
            array.push({
              id:good.id,
              type:good.type,
              num:good.num,
              cost:good.cost,
              costType:good.costType
            }); 
          }
          outThis.setData({
            goods:array
          });
        },
        fail:function(){
          outThis.hideLoading();
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

layerout.begin();