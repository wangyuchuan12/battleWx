var questionSelector = require("../questionSelector/questionSelector.js");
var progressScoreMember = require("../progressScoreMemberPlug/progressScoreMemberPlug.js");
var progressScorePlug = require("../progressScorePlug/progressScorePlug.js");
var questionInputPlug = require("../questionInputPlug/questionInputPlug.js");
var questionResultPlug = require("../questionResult/questionResult.js");
var selectInputPlug = require("../selectInput/selectInput.js");
var attrPlug = require("../attrPlug/attrPlug.js");
var redPackAlertPlug = require("../redPackAlertPlug/redPackAlertPlug.js");
function BaseLayerout(config){
    var baseConfig = config;
    var data = config.data;
    if(!data){
      data = {};
    }

    data.baseData = {
      hiddenLoading: true,
      hiddenToast: true,
      toastMsg:"ok",
      toastDuration:1000,
      "fullAlertTitle": "恭喜您",
      "fullAlertRewardNum": 20,
      "fullAlertButton": "确定",
      fullAlertAnimation:null,
      fullAlertDisplay:"none",
      againButtonDisplay:"none",
      againButton:"再来一局",
      preProcess:0,
      loadMsg:""
    }


    baseConfig.showLoading = function(loadMsg){
      this.setData({
        "baseData.hiddenLoading":false,
        "baseData.loadMsg": loadMsg
      });
    }

    baseConfig.setPreProgress = function(process){
      this.setData({
        "baseData.preProcess": process
      });
    }

    baseConfig.loadToPreProgress = function(process,callback){
      var outThis = this;
      var preProcess = this.data.baseData.preProcess;
      if (process > preProcess){
        var interval = setInterval(function(){
          preProcess++;
          outThis.setData({
            "baseData.preProcess": preProcess
          });
          if (process <= preProcess){
            clearInterval(interval);
            outThis.setData({
              "attrPlugData.attrDisplay":"block"
            });
            if(callback){
              callback.complite();
            }
          }
        },10);
      }
    }
    
    baseConfig.loadPreProgress = function(callback){
      this.loadToPreProgress(100,{
        complite:function(){
          if(callback){
            callback.complite();
          }
        }
      });
    }
    baseConfig.showFullAlert = function(title,title2,rewardNum,button){

      this.setData({
        "baseData.fullAlertTitle":title,
        "baseData.fullAlertTitle2": title2,
        "baseData.fullAlertRewardNum":rewardNum,
        "baseData.fullAlertButton":button,
        "baseData.fullAlertDisplay":"block"
      });
      var outThis = this;
      setTimeout(function(){
        var animation = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 100000000,
          timingFunction: "ease",
          delay: 0
        });
        animation.rotate(15000000).step();

        outThis.setData({
          "baseData.fullAlertAnimation": animation.export()
        });
      },500);
      
    }

    baseConfig.againButtonClick = function(){
      this.eventListener.againClick();
    },


    baseConfig.fullAlertButtonClick = function(){
      this.setData({
        "baseData.fullAlertDisplay": "none",
        "baseData.againButtonDisplay":"inline-block"
      });
    }


    baseConfig.showToast = function (msg,duration) {
      if(!duration){
        duration = 0;
      }
      this.setData({
        "baseData.hiddenToast": false,
        "baseData.toastMsg":msg,
        toastDuration: duration
      });
    }

    baseConfig.showConfirm = function(title,content,callback,confirmText,cancelText){
      if(!confirmText){
        confirmText = "确定";
      }

      if(!cancelText){
        cancelText = "取消"
      }
      wx.showModal({
        title:title,
        content:content,
        confirmText:confirmText,
        cancelText:cancelText,
        success:function(sm){
          if(sm.confirm){
            callback.confirm();
          }else if(sm.cancel){
            callback.cancel();
          }
        }
      });
    }

    baseConfig.hideToast = function(){
      this.setData({
        "baseData.hiddenToast": true,
        "baseData.toastMsg": "ok"
      });
    }

    baseConfig.hideLoading = function () {
     this.setData({
          "baseData.hiddenLoading":true
      });
    }
    
  this.addQuestionSelector = function(){
    var configData = config.data;
    var questionSelectorData = questionSelector.questionSelector.data;
    var data = Object.assign(configData, questionSelectorData);
    config = Object.assign(config, questionSelector.questionSelector);
    config.data = data;
  }
  this.begin = function(abc){
    Page(baseConfig);
  }

  this.addProgressScoreMember = function(){
    var configData = config.data;
    var progressScoreMemberData = progressScoreMember.progressScoreMembers.data;
    var data = Object.assign(configData, progressScoreMemberData);
    config = Object.assign(config, progressScoreMember.progressScoreMembers);
    config.data = data;
  }

  this.addProgressScorePlug = function(){
    var configData = config.data;
    var progressScorePlugData = progressScorePlug.progressScorePlug.data;
    var data = Object.assign(configData, progressScorePlugData);
    config = Object.assign(config, progressScorePlug.progressScorePlug);
    config.data = data;
  }

  this.addQuestionInputPlug = function(){
    var configData = config.data;
    var questionInputPlugData = questionInputPlug.questionInputPlug.data;
    var data = Object.assign(configData, questionInputPlugData);
    config = Object.assign(config, questionInputPlug.questionInputPlug);
    config.data = data;
  }

  this.addQuestionResult = function(){
    var configData = config.data;
    var questionResultPlugData = questionResultPlug.questionResultPlug.data;
    var data = Object.assign(configData, questionResultPlugData);
    config = Object.assign(config, questionResultPlug.questionResultPlug);
    config.data = data;
  }

  this.addSelectInput = function(){
    var configData = config.data;
    var selectInputData = selectInputPlug.selectInputPlug.data;
    var data = Object.assign(configData, selectInputData);
    config = Object.assign(config, selectInputPlug.selectInputPlug);
    config.data = data;
  }


  this.addAttrPlug = function(){
    var configData = config.data;
    var attrPlugData = attrPlug.attrPlug.data;
    var data = Object.assign(configData, attrPlugData);
    config = Object.assign(config, attrPlug.attrPlug);
    config.data = data;
  }

  this.addRedPackAlertPlug = function(){
    var configData = config.data;
    var redPackAlertPlugData = redPackAlertPlug.redPackAlertPlug.data;
    var data = Object.assign(configData, redPackAlertPlugData);
    config = Object.assign(config, redPackAlertPlug.redPackAlertPlug);
    console.log("config.redPacketAlertCloseClick:" + config.redPacketAlertCloseClick);
    config.data = data;
  }


}


module.exports = {
  BaseLayerout: BaseLayerout
}