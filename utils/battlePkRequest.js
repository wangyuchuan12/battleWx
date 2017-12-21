var request = require("request.js");

var domain = request.getDomain();
var homeIntoUrl = domain + "/api/battlePk/homeInto";
var beatIntoUrl = domain + "/api/battlePk/beatInto";
var immediateDataUrl = domain + "/api/battlePk/immediateData";
var readyUrl = domain + "/api/battlePk/ready";

function homeIntoRequest(callback){
  console.log("homeIntoRequest");
  var params = new Object();
  request.requestWithLogin(homeIntoUrl, params, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

function beatIntoRequest(id,callback) {
  var params = new Object();
  params.id = id;
  request.requestWithLogin(beatIntoUrl, params, {
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

function immediateDataRequest(id,callback) {
  var params = new Object();
  params.id = id;
  request.requestWithLogin(immediateDataUrl, params, {
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

function readyRequest(id,roomId,battleId,role,callback) {
  var params = new Object();
  params.id = id;
  params.role = role;
  params.roomId = roomId;
  params.battleId = battleId;
  request.requestWithLogin(readyUrl, params, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
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
  homeIntoRequest: homeIntoRequest,
  beatIntoRequest: beatIntoRequest,
  immediateDataRequest: immediateDataRequest,
  readyRequest: readyRequest
}