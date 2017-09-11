var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var request = require("../../utils/request.js");
var questionRequest = require("../../utils/questionRequest.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var questionAnswerRequest = require("../../utils/questionAnswerRequest.js");

var questionSelector;
var layerout = new baseLayerout.BaseLayerout({
  data:{
    imgUrl:"",
    content:"",
    percent:10,
    questionId:0
  },

  eventListener:{
    inputSubmit: function (questionId,answer){
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        questionId: questionId,
        type: 0,
        targetId: memberInfo.id,
        answer: answer
      }, {
          success: function () {
            questionSelector.next();
          },
          fail: function () {

          }
        });
    },
    fillSubmit: function (questionId,answer){
      var outThis = this;
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        questionId: questionId,
        type: 0,
        targetId: memberInfo.id,
        answer: answer
      }, {
          success: function () {
            questionSelector.next();
          },
          fail: function () {

          }
        });
    },
    selectSubmit: function (questionId,optionId){
      var outThis = this;
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        questionId: questionId,
        type:0,
        targetId:memberInfo.id,
        optionId:optionId
      },{
        success:function(){
          questionSelector.next();
        },
        fail:function(){

        }
      });
      
    }
  },

  setSelectData:function(data){

    console.log(JSON.stringify(data));

    this.setData({
      imgUrl:data.imgUrl,
      content:data.question
    });

    this.setQuestionId(data.id);
    this.setType(0);
    var array = new Array();
    var options = data.options;
    if(options){
      for(var i=0;i<options.length;i++){
        var option = options[i];
        array.push({
          id:option.id,
          content:option.content
        });
      }
      this.setOptions(array);
    }
  },

  setFillData:function(data){
    this.setQuestionId(data.id);
    this.setData({
      imgUrl: data.imgUrl,
      content: data.question
    });
    this.fillWorld();
    this.fillWorldCheck(data.fillWords);
    this.setType(2);
  },

  setInputData:function(data){
    this.setQuestionId(data.id);
    this.setData({
      imgUrl: data.imgUrl,
      content: data.question
    });
    this.setType(1);
  },

  initView:function(ids){
    var outThis = this;
    questionSelector = new questionRequest.QuestionSelector(ids,{
      success:function(){
        questionSelector.next();
      },
      fail:function(){
        console.log("fail");
      }
    },{
      step:function(data){
        console.log(".................step");
        if(data.type==0){
          outThis.setSelectData(data);
        }
        else if(data.type==1){
          outThis.setInputData(data);
        }
        else if(data.type==2){
          outThis.setFillData(data);
        }
        
      },
      complete:function(){
        wx.redirectTo({
          url: '../progressScore/progressScore',
        });
      },
      fail:function(){
        console.log("...............fail");
      }
    });
  },
  onLoad: function (options) {
    this.initView([1,2,3]);
  }
});

layerout.addQuestionInputPlug();

layerout.begin();