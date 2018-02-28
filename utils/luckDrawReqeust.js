var request = require("request.js");
var domain = request.getDomain();
var luckDrawUrl = domain + "/api/battle/battleDraw/list";

var randomLevelUrl = domain + "/api/battle/battleDraw/randomLevel";

var roomInfoUrl = domain + "/api/battle/battleDraw/roomInfo";

function luckDrawsRequest(callback){
  request.requestWithLogin(luckDrawUrl, {}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);

      } else {
        console.log(resp.errorMsg);
      }

    },
    fail: function () {
      console.log("fail paper answer");
    }
  });
}

function roomInfoRequest(roomId,callback){
  request.requestWithLogin(roomInfoUrl, {roomId:roomId}, {
    success: function (resp) {
     
      if (resp.success) {
        callback.success(resp.data);

      } else {
        console.log(resp.errorMsg);
      }

    },
    fail: function () {
      console.log("fail paper answer");
    }
  });
}

function randomLevelRequest(callback){
  request.requestWithLogin(randomLevelUrl, {}, {
    success: function (resp) {
      console.log(".........resp:"+JSON.stringify(resp));
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
  luckDrawsRequest: luckDrawsRequest,
  randomLevelRequest: randomLevelRequest,
  roomInfoRequest: roomInfoRequest
}
