var request = require("request.js");

var domain = request.getDomain();
var listUrl = domain + "/api/battle/dan/list";

function listRequest(callback){
  request.requestWithLogin(listUrl, {}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if (resp.errorCode == 0) {
          callback.reCreate(resp.data);
        } else {
          callback.fail();
        }
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}

module.exports = {
  listRequest: listRequest
}
