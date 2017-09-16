var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/members";
var battleMembers = wx.getStorageSync("battleMembers");

function getBattleMembers(battleId, periodIndex, callback) {


  if (battleMembers){
    if(callback.cache){
      callback.cache(battleMembers);
    }
   
  }
  
  requestBattleMembers(battleId, periodIndex,{
      success:function(members){
          wx.setStorageSync("battleMembers", members);
          callback.success(members);
      },
      fail:function(){
        callback.fail();
      }
  });
}

function requestBattleMembers(battleId,periodIndex,callback){
  var params = new Object();
  params.battleId = battleId;
  params.periodIndex = periodIndex;
  request.requestWithLogin(url, params, {
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
  getBattleMembers: getBattleMembers,
  battleMembers: battleMembers
}