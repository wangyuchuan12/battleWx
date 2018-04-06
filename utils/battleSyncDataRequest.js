var request = require("request.js");

var domain = request.getDomain();
var syncPaperDataUrl = domain + "/api/battle/sync/syncPaperData";

function requestSyncPaperData(battleId, roomId,callback) {
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(syncPaperDataUrl, params, {
    success:function(resp){
      console.log("resp1111:"+JSON.stringify(resp));
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
  requestSyncPaperData: requestSyncPaperData
}