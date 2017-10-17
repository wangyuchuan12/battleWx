var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/takepart";


function battleTakepart(battleId,roomId,callback) {
  console.log("sssss");
  requestBattleTakepart(battleId,roomId, {
    success: function (member) {
      callback.success(member);
    },
    fail: function (errorMsg) {
      console.log("fail");
      callback.fail(errorMsg);
    },
    battleIn:function(){

      callback.battleIn();
    },
    battleEnd:function(){
      callback.battleEnd();
    }
  });
}

function requestBattleTakepart(battleId, roomId,callback) {
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(url, params, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        //正在进行中
        if(resp.errorCode==0){
          callback.battleIn();
        //比赛已经结束
        }else if(resp.errorCode==1){
          callback.battleEnd();
        }else{
          callback.fail("没有比赛的阶段");
        }
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