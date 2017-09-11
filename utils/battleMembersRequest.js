var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/members";
var battleMembers = wx.getStorageSync("battleMembers");

function getBattleMembers(battleId,index, callback) {


  if (battleMembers){
    if(callback.cache){
      callback.cache(battleMembers);
    }
   
  }
  
  requestBattleMembers(battleId,index,{
      success:function(members){
          wx.setStorageSync("battleMembers", members);
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
  getBattleMembers: getBattleMembers,
  battleMembers: battleMembers
}