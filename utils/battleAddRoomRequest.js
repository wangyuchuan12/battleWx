var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/addRoom";

function requestAddRoom(params, callback) {
  request.requestWithLogin(url, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if(resp.errorCode==0){
          callback.reCreate(resp.data);
        }else{
          callback.fail();
        }
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}
module.exports = {
  requestAddRoom: requestAddRoom
}