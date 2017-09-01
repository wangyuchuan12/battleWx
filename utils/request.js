var domain = "http://192.168.1.101";
//根据code登陆用户bbin
var loginByJsCodeUrl = domain + "/api/common/login/loginByJsCode";
var wxPayConfigUrl = domain + "/api/battle/wxPayConfig";

//请求总函数，是所有请求的工具
var haha = 1;
function test(){
  console.log(haha);

  haha++;
}

function getDomain(){
  return domain;
}

function request(url, params, callback) {
  var sessionId = wx.getStorageSync("SESSIONID");
  var header;
  if (sessionId) {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': 'JSESSIONID=' + sessionId
    }
  } else {
    header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  wx.request({
    url: url,
    data: params,
    header: header,
    method: "get",
    complete: function (res) {
      console.log("complete");
    },
    success: function (res) {
      var header = res.header;
      var setCookie;
      if (header) {
        setCookie = header["Set-Cookie"];
      }
      var sessionStr;
      if (setCookie) {
        var array = setCookie.split(";");
        if (array) {
          for (var i = 0; i < array.length; i++) {
            if (array[i].startsWith("JSESSIONID=")) {
              sessionStr = array[i];
              break;
            }
          }
        }
      }

      var sessionId;
      if (sessionStr) {
        sessionId = sessionStr.substring("JSESSIONID=".length);
      }

      if (sessionId) {
        wx.setStorageSync("SESSIONID", sessionId);
      }

      if (res.errorMsg ="request:ok"){
        callback.success(res.data);
      }else{
        callback.fail(res.data);
      }
      
    },
    fail: function (err) {
      callback.fail(err);
    }

  });
}

//获取支付配置
function requestWxPayConfig(callback) {
  request(wxPayConfigUrl, {}, {
    success: function (resp) {
      callback.success(resp);
    },
    fail: function () {
      callback.fail();
    }
  });
}

//支付
function requestPayMent(params) {
  var timestamp = params.timestamp;
  console.log("timestamp:" + timestamp);

  requestLogin({
    success: function () {
      wx.requestPayment({
        timeStamp: timestamp,
        nonceStr: params.nonceStr,
        package: params.pack,
        signType: params.signType,
        paySign: params.paySign,
        total_fee: params.cost,
        success: function () {
          console.log("success");
        },
        fail: function () {
          console.log("fail");
        }
      });
    },
    fail: function () {
      console.log("login fail");
    }
  });
}

function openSetting(){
  wx.openSetting({
    success: function (res) {
     
    },
    fail: function () {
      openSetting();
    }
  });
}

//获取用户信息数据
function getUserInfo(callback) {
  var userInfo = wx.getStorageSync("userInfo");
  if (userInfo) {
    callback.success(userInfo);
    return;
  }
  wx.getUserInfo({
    withCredentials: false,
    success: function (res) {
      callback.success(res.userInfo);
    },
    fail: function (res) {
      openSetting();
    }
  })
}


//请求登陆
function requestLogin(callback) {
  wx.login({
    success: function (loginCode) {
      console.log("loginCode:" + loginCode.code);
      getUserInfo({
        success: function (userInfo) {

          console.log(JSON.stringify(userInfo));
          var url = loginByJsCodeUrl;
          request(url, {
            "code": loginCode.code,
            "nickName": userInfo.nickName, "gender": userInfo.gender,
            "language": userInfo.language, "city": userInfo.city,
            "province": userInfo.province, "country": userInfo.country,
            "avatarUrl": userInfo.avatarUrl
          }, {
              success: function (resp) {
                callback.success(userInfo);
              },
              fail: function () {

                callback.fail(userInfo);
              }
            });
        },
        fail: function () {
          callback.fail();
        }
      });

    },
    fail: function () {
      callback.fail();
    }
  })
}

module.exports = {
  request: request,
  requestPayMent: requestPayMent,
  requestLogin: requestLogin,
  requestWxPayConfig: requestWxPayConfig,
  test:test,
  getDomain:getDomain,
  requestLogin: requestLogin
}