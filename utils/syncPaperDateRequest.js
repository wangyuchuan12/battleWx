var request = require("request.js");

var domain = request.getDomain();
var syncPapersUrl = domain + "/api/battle/syncPapersData";

function syncPapersData(battleId, roomId, callback) {
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(syncPapersUrl, params, {
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

module.exports = {
  syncPapersData: syncPapersData
}