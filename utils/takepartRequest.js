var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/takepart";

function battleTakepart(battleId,callback) {
  requestBattleTakepart(battleId, {
    success: function (member) {
      callback.success(member);
    },
    fail: function (errorMsg) {
      callback.fail(errorMsg);
    }
  });
}

function requestBattleTakepart(battleId, callback) {
  var params = new Object();
  params.battleId = battleId;
  request.request(url, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        console.log(JSON.stringify(resp));
        callback.fail("检查你是否已经参赛");
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  battleTakepart: battleTakepart
}