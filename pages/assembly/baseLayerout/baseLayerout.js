var questionSelector = require("../questionSelector/questionSelector.js");
var progressScoreMember = require("../progressScoreMemberPlug/progressScoreMemberPlug.js");
var progressScorePlug = require("../progressScorePlug/progressScorePlug.js");
var questionInputPlug = require("../questionInputPlug/questionInputPlug.js");
var questionResultPlug = require("../questionResult/questionResult.js");
function BaseLayerout(config){

    var baseConfig = config;
    var data = config.data;
    if(!data){
      data = {};
    }

    data.baseData = {
      hiddenLoading: true,
      hiddenToast: true,
      toastMsg:"ok"
    }


    baseConfig.showLoading = function(){
      this.setData({
        "baseData.hiddenLoading":false
      });
    }



    baseConfig.showToast = function (msg) {
      this.setData({
        "baseData.hiddenToast": false,
        "baseData.toastMsg":msg
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
  this.begin = function(){
    Page(baseConfig);
  }

  this.addProgressScoreMember = function(){
    var configData = config.data;
    var progressScoreMemberData = progressScoreMember.progressScoreMembers.data;
    var data = Object.assign(configData, progressScoreMemberData);
    config = Object.assign(config, progressScoreMemberData.progressScoreMembers);
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
    console.log("questionResultPlugData:"+JSON.stringify(questionResultPlugData));
    var data = Object.assign(configData, questionResultPlugData);
    config = Object.assign(config, questionResultPlug.questionResultPlug);
    config.data = data;
  }
   
}


module.exports = {
  BaseLayerout: BaseLayerout
}