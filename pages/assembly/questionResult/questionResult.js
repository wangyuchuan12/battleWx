var request = require("../../../utils/questionAnswerRequest.js");
var questionResultPlug = {
  data: {
    questionResultPlugData:{
      items: [/*{
        question: "你的名字",
        type: 0,
        answer: "答案",
        rightAnswer: "呼呼",
        options: ["回答", "呼呼", "花花"],
        imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/0042aeda-d8a5-4222-b79d-1416ab222898"
      },{
        question: "你的名字",
        type: 1,
        answer: "答案",
        rightAnswer: "答案",
        imgUrl:""
      },{
        question:"你的名字",
        type:2,
        answer:"答案",
        rightAnswer:"呼呼",
        imgUrl:""
      }*/]
    }
  },
  initQuestionResultData: function (battleMemberPaperAnswerId,callback){
    var outThis = this;
    request.requestQuestionResults(battleMemberPaperAnswerId,{
      success:function(results){

        var items = new Array();
        for(var i=0;i<results.length;i++){

          var options;
          
          if (results[i].options){
            options = results[i].options.split(",");
          }
          
          
          items.push({
            question: results[i].question,
            type: results[i].type,
            answer: results[i].answer,
            rightAnswer: results[i].rightAnswer,
            options: options,
            imgUrl: results[i].imgUrl
          });
        }
        callback.success();
        outThis.setData({
          questionResultPlugData:{
            items:items
          }
        });
      },
      fail:function(){
        callback.fail();
      }
    });
  }
}

module.exports = {
  questionResultPlug: questionResultPlug
}