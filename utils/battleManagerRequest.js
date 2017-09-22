var request = require("request.js");
var subjectUrl = request.getDomain()+"/api/manager/subjects";
var periodUrl = request.getDomain()+"/api/manager/periods";
var addSubjectUrl = request.getDomain()+"/api/manager/addSubject";
var delSubjectUrl = request.getDomain() + "/api/manager/delSubject";
var stagesUrl = request.getDomain()+"/api/manager/stages";
var questionsUrl = request.getDomain()+"/api/manager/questions";
var addStageUrl = request.getDomain() + "/api/manager/addStage";
var addQuestionsUrl = request.getDomain() + "/api/manager/addQuestion";

function requestionAddStage(periodId,num,callback){
  request.request(addStageUrl,{periodId: periodId, num: num}, {
    success: function (resp) {
      if (resp.success) {
        callback.success();
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestQuestions(stageId,subjectId,callback){
  request.request(questionsUrl, {stageId:stageId, subjectId:subjectId}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestBattleSubjects(battleId,callback){
  request.request(subjectUrl,{battleId:battleId},{
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

function requestBattlePeriods(battleId,callback){
  request.request(periodUrl, { battleId: battleId }, {
    success: function (resp) {
      if (resp.success) {

        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}


function requestAddSubject(battleId,name,imgUrl,callback){
  request.request(addSubjectUrl, { battleId: battleId,name:name,imgUrl:imgUrl}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestStages(periodId,callback){
  request.request(stagesUrl, { periodId: periodId }, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestDelSubject(subjectId,callback){
  request.request(delSubjectUrl,{subjectId:subjectId},{
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
  });
}

function requestAddQuestion(params,callback){
  request.request(addQuestionsUrl,params, {
    success: function (resp) {
      if (resp.success) {
        callback.success();
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

module.exports = {
  requestBattleSubjects: requestBattleSubjects,
  requestBattlePeriods: requestBattlePeriods,
  requestAddSubject: requestAddSubject,
  requestDelSubject: requestDelSubject,
  requestStages: requestStages,
  requestQuestions: requestQuestions,
  requestAddQuestion: requestAddQuestion,
  requestionAddStage: requestionAddStage
}