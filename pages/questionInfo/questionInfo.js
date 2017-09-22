var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var request = require("../../utils/request.js");
var questionRequest = require("../../utils/questionRequest.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var questionAnswerRequest = require("../../utils/questionAnswerRequest.js");

var questionSelector;
var battleMemberQuestionAnswerId;
var battleMemberPaperAnswerId;
var outThis;
var layerout = new baseLayerout.BaseLayerout({
  data:{
    imgUrl:"",
    content:"",
    percent:10,
    questionId:0
  },

  eventListener:{
    inputSubmit: function (questionId,answer){
      outThis.showLoading();
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type: 0,
        memberId: memberInfo.id,
        battleId:memberInfo.battleId,
        stageIndex:memberInfo.stageIndex,
        answer: answer
      }, {
          success: function (id) {
            outThis.hideLoading();
            questionSelector.next();
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    },
    fillSubmit: function (questionId,answer){
      outThis.showLoading();
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type: 0,
        memberId: memberInfo.id,
        battleId: memberInfo.battleId,
        stageIndex: memberInfo.stageIndex,
        answer: answer
      }, {
          success: function (id) {
            outThis.hideLoading();
            questionSelector.next();
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    },
    selectSubmit: function (questionId,optionId){
      outThis.showLoading();
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type:0,
        memberId: memberInfo.id,
        battleId: memberInfo.battleId,
        stageIndex: memberInfo.stageIndex,
        optionId:optionId
      },{
        success:function(id){
          outThis.hideLoading();
          questionSelector.next();
        },
        fail:function(){
          outThis.hideLoading();
        }
      });
      
    }
  },

  setSelectData:function(data){

    this.setData({
      imgUrl:data.imgUrl,
      content:data.question
    });
    this.hideLoading();

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

    this.hideLoading();
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

    this.hideLoading();
    this.setQuestionId(data.id);
    this.setRightAnswer(data.answer);
    this.setData({
      imgUrl: data.imgUrl,
      content: data.question
    });
    this.setType(1);
  },

  initView:function(ids){
    var outThis = this;

    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
   
    var battleId = memberInfo.battleId;

    questionSelector = new questionRequest.QuestionSelector(battleId,ids,{
      success: function (id){
        battleMemberPaperAnswerId = id
        questionSelector.next();
      },
      fail:function(){

      }
    },{
      step:function(data){
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
      complete: function (){
        wx.redirectTo({
          url: '../progressScore/progressScore?battleMemberPaperAnswerId=' + battleMemberPaperAnswerId,
        });
      },
      fail:function(){
        console.log("...............fail");
      }
    });

   
  },
  onLoad: function (options) {

    var questionIds = options.questionIds;
    
    console.log("questionIds:"+questionIds);

    var questionsArray = questionIds.split(",");

    outThis = this;
    this.showLoading();
    this.initView(questionsArray);
  }
});

layerout.addQuestionInputPlug();

layerout.begin();