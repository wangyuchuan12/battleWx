var request = require("request.js");
var domain = request.getDomain();
var roomsUrl = domain + "/api/battle/rooms";

var myRoomsUrl = domain + "/api/battle/myRooms";

function roomsRequest(callback){
  var params = new Object();
  request.requestWithLogin(roomsUrl, params, {
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

function myRoomsRequest(callback){
  var params = new Object();
  request.requestWithLogin(myRoomsUrl, params, {
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
  roomsRequest: roomsRequest,
  myRoomsRequest: myRoomsRequest
}