var request = require("request.js");

var domain = request.getDomain();
var questionAnswerUrl = domain + "/api/question/battleQuestionAnswer";



function requestBattleQuestionAnswer(params,callback){
  request.request(questionAnswerUrl,params,{
    success:function(resp){
      if(resp.success){
        callback.success();
      }else{
        callback.fail();
      }
    },
    fail:function(){
      callback.fail();
    }
  })
}

module.exports = {
  requestBattleQuestionAnswer: requestBattleQuestionAnswer
}