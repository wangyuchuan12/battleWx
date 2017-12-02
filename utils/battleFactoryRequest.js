var request = require("request.js");
var domain = request.getDomain();

var applyUrl = domain + "/api/battleFactory/apply";

var myQuestionsUrl = domain + "/api/battleFactory/myQuestions";

function applyRequest(params,callback){
  request.requestWithLogin(applyUrl, params, {
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

function myQuestionsRequest(status,callback){
  request.requestWithLogin(myQuestionsUrl, {status:status}, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
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

module.exports = {
  applyRequest: applyRequest,
  myQuestionsRequest: myQuestionsRequest
}