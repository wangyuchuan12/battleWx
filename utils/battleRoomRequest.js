var request = require("request.js");

var domain = request.getDomain();
var roomInfoUrl = domain + "/api/battle/roomInfo";
function info(id,callback){
  var params = new Object();
  params.id = id;
  request.requestWithLogin(roomInfoUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  info: info
}