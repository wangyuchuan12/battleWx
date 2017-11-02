var request = require("request.js");

var domain = request.getDomain();

var accountInfoUrl = domain + "/api/common/login/accountInfo";


function accountInfo(callback){
  request.requestWithLogin(accountInfoUrl, {}, {
    success: function (resp) {
      if(resp.success){
        callback.success(resp.data);
      }else{
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}


module.exports = {
  accountInfo: accountInfo
}