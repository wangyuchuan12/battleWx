var accountRequest = require("../../../utils/accountRequest.js");
var attrPlug = {
  data: {
    attrPlugData:{
      wisdomCount:0,
      loveLife:0,
      masonry:0,
      amountBalance:0,
      loveDisplay: "none",
      loveTop: 20,
      beanDisplay: "none",
      beanTop: 20,
      masonryDisplay: "none",
      masonryTop: 20,
      moneyDisplay:"none",
      moneyTop: 20,

      plusNum:20,
      loveLight:{
        width:0,
        height:100,
      },
      beanLight: {
        width: 0,
        height: 100,
      },
      masonryLight: {
        width: 0,
        height: 100,
      },
      moneyLight: {
        width: 0,
        height: 100,
      }

    }
  },
  addLove:function(num){
    var outThis = this;
    var top = 40;
    this.setData({
      "attrPlugData.loveTop":top,
      "attrPlugData.loveDisplay":"block",
      "attrPlugData.plusNum": num
    });
    var loveLife = this.data.attrPlugData.loveLife;
    loveLife = loveLife+num;
    var interval = setInterval(function(){
      top--;
      if(top<=15){
        clearInterval(interval);
        outThis.setData({
          "attrPlugData.loveLife": loveLife
        });
        setTimeout(function(){
          outThis.setData({
            "attrPlugData.loveDisplay": "none"
          });
        },1000); 
      }else{
        outThis.setData({
          "attrPlugData.loveTop": top
        });
      }
    },50);
  },
  addBean: function (num) {
    var outThis = this;
    var top = 40;
    this.setData({
      "attrPlugData.beanTop": top,
      "attrPlugData.beanDisplay": "block",
      "attrPlugData.plusNum": num
    });
    var wisdomCount = this.data.attrPlugData.wisdomCount;
    wisdomCount = wisdomCount + num;
    var interval = setInterval(function () {
      top--;
      if (top <= 15) {
        clearInterval(interval);
        outThis.setData({
          "attrPlugData.wisdomCount": wisdomCount
        });
        setTimeout(function () {
          outThis.setData({
            "attrPlugData.beanDisplay": "none"
          });
        }, 1000);
      } else {
        outThis.setData({
          "attrPlugData.beanTop": top
        });
      }
    }, 50);
  },

  addMasonry: function (num) {
    var outThis = this;
    var top = 40;
    this.setData({
      "attrPlugData.masonryTop": top,
      "attrPlugData.masonryDisplay": "block",
      "attrPlugData.plusNum": num
    });
    var masonry = this.data.attrPlugData.masonry;
    masonry = masonry + num;
    var interval = setInterval(function () {
      top--;
      if (top <= 15) {
        clearInterval(interval);
        outThis.setData({
          "attrPlugData.masonry": masonry
        });
        setTimeout(function () {
          outThis.setData({
            "attrPlugData.masonryDisplay": "none"
          });
        }, 1000);
      } else {
        outThis.setData({
          "attrPlugData.masonryTop": top
        });
      }
    }, 50);
  },

  addMoney: function (num) {
    var outThis = this;
    var top = 40;
    this.setData({
      "attrPlugData.moneyTop": top,
      "attrPlugData.moneyDisplay": "block",
      "attrPlugData.plusNum": num
    });
    var amountBalance = this.data.attrPlugData.amountBalance;
    amountBalance = amountBalance + num;
    var interval = setInterval(function () {
      top--;
      if (top <= 15) {
        clearInterval(interval);
        outThis.setData({
          "attrPlugData.amountBalance": amountBalance
        });
        setTimeout(function () {
          outThis.setData({
            "attrPlugData.moneyDisplay": "none"
          });
        }, 1000);
      } else {
        outThis.setData({
          "attrPlugData.moneyTop": top
        });
      }
    }, 50);
  },

  subLove:function(num){
    var outThis = this;
    var loveLife = this.data.attrPlugData.loveLife;
    loveLife = loveLife-num;
    if(loveLife<0){
      loveLife = 0;
    }
    outThis.setData({
      "attrPlugData.loveLife": loveLife
    });
    var width = 0;
    var interval = setInterval(function(){
      width=width+10;
      if(width<100){
        outThis.setData({
          "attrPlugData.loveLight.width": width
        });
      }else{
        setTimeout(function(){
          outThis.setData({
            "attrPlugData.loveLight.width": 0
          });
        },3000);
        clearInterval(interval);
      }
     
    },50);
  },

  subBean: function (num) {
    var outThis = this;
    var wisdomCount = this.data.attrPlugData.wisdomCount;
    wisdomCount = wisdomCount - num;
    if (wisdomCount < 0) {
      wisdomCount = 0;
    }
    outThis.setData({
      "attrPlugData.wisdomCount": wisdomCount
    });
    var width = 0;
    var interval = setInterval(function () {
      width = width + 10;
      if (width < 100) {
        outThis.setData({
          "attrPlugData.beanLight.width": width
        });
      } else {
        setTimeout(function () {
          outThis.setData({
            "attrPlugData.beanLight.width": 0
          });
        }, 3000);
        clearInterval(interval);
      }

    }, 50);
  },

  subMasonry: function (num) {
    var outThis = this;
    var masonry = this.data.attrPlugData.masonry;
    masonry = masonry - num;
    if (masonry < 0) {
      masonry = 0;
    }
    outThis.setData({
      "attrPlugData.masonry": masonry
    });
    var width = 0;
    var interval = setInterval(function () {
      width = width + 10;
      if (width < 100) {
        outThis.setData({
          "attrPlugData.masonryLight.width": width
        });
      } else {
        setTimeout(function () {
          outThis.setData({
            "attrPlugData.masonryLight.width": 0
          });
        }, 3000);
        clearInterval(interval);
      }

    }, 50);
  },

  subMoney: function (num) {
    var outThis = this;
    var money = this.data.attrPlugData.amountBalance;
    money = money - num;
    if (money < 0) {
      money = 0;
    }
    outThis.setData({
      "attrPlugData.amountBalance": money
    });
    var width = 0;
    var interval = setInterval(function () {
      width = width + 10;
      if (width < 100) {
        outThis.setData({
          "attrPlugData.moneyLight.width": width
        });
      } else {
        setTimeout(function () {
          outThis.setData({
            "attrPlugData.moneyLight.width": 0
          });
        }, 3000);
        clearInterval(interval);
      }

    }, 50);
  },

  getLoveCount:function(){
    return this.data.attrPlugData.loveLife;
  },

  getBeanCount:function(){
    return this.data.attrPlugData.wisdomCount;
  },

  getMasonry:function(){
    return this.data.attrPlugData.masonry;
  },

  getMoney:function(){
    return this.data.attrPlugData.amountBalance;
  },



  initAccountInfo:function(callback){
    var animationData = wx.createAnimation({
     
    });

    var outThis = this;
    accountRequest.accountInfo({
      success:function(account){
        outThis.setData({
          "attrPlugData.wisdomCount": account.wisdomCount,
          "attrPlugData.loveLife": account.loveLife,
          "attrPlugData.masonry": account.masonry,
          "attrPlugData.amountBalance": account.amountBalance
        });
        if(callback&&callback.success){
          callback.success();
        }
      },
      fail:function(){

      }
    });
  }
}

module.exports = {
  attrPlug: attrPlug
}