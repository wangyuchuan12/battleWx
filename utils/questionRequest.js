var request = require("request.js");

var domain = request.getDomain();
var battleQuestionUrl = domain + "/api/battle/battleQuestions";

var questionInfoUrl = domain + "/api/question/info";



function QuestionSelector(subjectIds,callback,stepCallback){

  var questionIds;
  var selector = new Object();

  requestBattleQuestions(subjectIds,{
    success:function(data){
      questionIds = data;
      console.log("questionIds:"+questionIds);
      callback.success()
    },
    fail:function(){
      callback.fail();
    }
  });

  var index = 0;
  this.next = function(){
    console.log("questionIds:"+questionIds+",index:"+index);
    if (index <= questionIds.length-1){
      var id = questionIds[index];
      console.log("id:"+id);
      index++;
      requestQuestionInfo(id,{
        success:function(data){
          stepCallback.step(data)
        },
        fail:function(){
          stepCallback.fail();
        }
      });
    }else{
      stepCallback.complete();
    }
    
  }
}

function requestQuestionInfo(id,callback){
  request.request(questionInfoUrl,{id:id},{
      success:function(resp){
         if(resp.success){
           callback.success(resp.data);
         }else{
           callback.fail();
         }
      },
      fail:function(){
        callback.fail();
      }
  });
}

function requestBattleQuestions(subjectIds,callback){
  var subjectIdStr = "";
  for (var i = 0; i < subjectIds.length;i++){
    subjectIdStr = subjectIdStr + subjectIds[i];
    if (i < subjectIds.length-1){
      subjectIdStr = subjectIdStr + ",";
    }
   
  }

  request.request(battleQuestionUrl, { subjectIds: subjectIdStr},{
      success:function(resp){
          if(resp.success){
            callback.success(resp.data);
          }else{
            callback.fail();
          }
      },
      fail:function(){
        callback.fail();
      }
  });
}

module.exports = {
  QuestionSelector: QuestionSelector
}