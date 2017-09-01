var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/members";

function getBattleMembers(battleId,index, callback) {
  requestBattleMembers(battleId,index,{
      success:function(members){
          callback.success(members);
      },
      fail:function(){
        callback.fail();
      }
  });
}

function requestBattleMembers(battleId,index,callback){
  var params = new Object();
  params.battleId = battleId;
  params.index = index;
  request.request(url, params, {
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
  getBattleMembers: getBattleMembers
}