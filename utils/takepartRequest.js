var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/takepart";

function isTakepartCache(battleId,index) {
  var key = "isTakepart_" + battleId + "_" + index;
  var isTakepart = wx.getStorageSync(key);
  return isTakepart;
}

function setTakepartCache(battleId,index) {
  var key = "isTakepart_" + battleId + "_" + index;
  wx.setStorageSync(key, true);
}


function battleTakepart(battleId,index,callback) {
  requestBattleTakepart(battleId, {
    success: function (member) {
      setTakepartCache(battleId,index);
      callback.success(member);
    },
    fail: function (errorMsg) {
      callback.fail(errorMsg);
    },
    battleIn:function(){
      setTakepartCache(battleId, index);
      callback.battleIn();
    },
    battleEnd:function(){
      callback.battleEnd();
    }
  });
}

function requestBattleTakepart(battleId, callback) {
  var params = new Object();
  params.battleId = battleId;
  request.requestWithLogin(url, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        //正在进行中
        if(resp.errorCode==0){
          callback.battleIn();
        //比赛已经结束
        }else if(resp.errorCode==1){
          callback.battleEnd();
        }
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  battleTakepart: battleTakepart,
  isTakepartCache: isTakepartCache
}