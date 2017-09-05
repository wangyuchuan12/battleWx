var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/battleSubjects";


function getBattleSubjects(battleId,periodStageId,callback){
  requestBattleSubjects(battleId, periodStageId,{
      success:function(data){
        callback.success(data);
      },
      fail:function(){
        callback.fail();
      }
  })
}

function requestBattleSubjects(battleId,periodStageId,callback){
  var params = new Object();
  params.battleId = battleId;
  params.periodStageId = periodStageId;
  request.requestWithLogin(url, params, {
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
  getBattleSubjects: getBattleSubjects
}

