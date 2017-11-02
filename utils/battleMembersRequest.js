var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/members";
var battleMembers = wx.getStorageSync("battleMembers");
var flag = false;

function setBattleMembersCache(members){
  battleMembers = members;
}

function getBattleMembers(battleId,roomId, callback,time) {
  flag = true;
  if (battleMembers){
    if(callback.cache){
      callback.cache(battleMembers);
    }
   
  }
  requestBattleMembers(battleId,roomId,{
      success:function(members){
          wx.setStorageSync("battleMembers", members);
          callback.success(members);
      },
      fail:function(){
        callback.fail();
      }
  });

  var interval;
  if(time&&time>0){
    interval  = setInterval(function () {
     if(flag){
       requestBattleMembers(battleId, roomId, {
         success: function (members) {
           wx.setStorageSync("battleMembers", members);
           callback.success(members);
         },
         fail: function () {
           callback.fail();
         }
       });
     }
    }, time);
  }

  var target = new Object();
  target.stop = function(){
    flag = false;
    clearInterval(interval);
  }
  
  return target;

}

function requestBattleMembers(battleId,roomId,callback){
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
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
  battleMembers: battleMembers,
  setBattleMembersCache: setBattleMembersCache
}