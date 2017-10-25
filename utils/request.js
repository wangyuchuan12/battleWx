var domain = "https://www.chengxihome.com/";
//根据code登陆用户bbin
var loginByJsCodeUrl = domain + "/api/common/login/loginByJsCode";
var registerUserByJsCode = domain +"/api/common/login/registerUserByJsCode";
var wxPayConfigUrl = domain + "/api/battle/wxPayConfig";
var loadFileUrl = domain + "/api/common/resource/upload";
var token;
var isLogin;

var openSettingFlag = false;

var openUserSettingCallbacks = new Array();
//请求总函数，是所有请求的工具

function getDomain(){
  return domain;
}

function requestWithLogin(url,params,callback){
  if (!isLogin){
    requestLogin({
      success: function () {
        request(url, params, callback)
      },
      fail: function () {
        callback.fail();
      }
    })
  }else{
    request(url, params, callback)
  }
  
}

function requestUpload(filePath,callback){
  var sessionId = wx.getStorageSync("SESSIONID");
  var header;
  if (sessionId) {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': 'JSESSIONID=' + sessionId
    }
  } else {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
  wx.uploadFile({
    url: loadFileUrl,
    filePath: filePath,
    name: 'file',
    header: header,
    success: function (resp) {
      if(resp.statusCode==200){
        callback.success(JSON.parse(resp.data));
      }else{
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function request(url, params, callback) {
  console.log("url:"+url);
  var sessionId = wx.getStorageSync("SESSIONID");
  var header;
  if (sessionId) {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': 'JSESSIONID=' + sessionId
    }
  } else {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
  params.token = token;
  wx.request({
    url: url,
    data: params,
    header: header,
    method: "post",
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

function openSetting(callback){
  wx.openSetting({
    success: function (res) {
      callback.success(res);
    },
    fail: function () {
      callback.fail();
    }
  });
}

function openUserInfoSetting(callback){
  
  if(callback){
    openUserSettingCallbacks.push(callback);
  }
  
  if (openSettingFlag){
    return;
  }
  openSettingFlag = true;
  openSetting({
      success:function(res){
        if (res.authSetting["scope.userInfo"]){
          for (var i = 0; i < openUserSettingCallbacks.length;i++){
            var callback = openUserSettingCallbacks[i];
            callback.success();
          }
          openSettingFlag = false;
        }else{
          openSettingFlag = false;
          openUserInfoSetting();
        }
      },
      fail:function(){
       // console.log("fail2");
       // openUserInfoSetting();
      }
  });
}


function testSetUserInfo(){
/*  wx.setStorageSync("userInfo",{
    "code": "1",
    "nickName": "test", "gender": 1,
    "avatarUrl": "ss",
    "openId":123
  });

  var userInfo = wx.getStorageSync("userInfo");

  console.log("userInfo:"+JSON.stringify(userInfo));*/
}

//获取用户信息数据
function getUserInfo(callback) {
 /* var userInfo = wx.getStorageSync("userInfo");
  console.log(JSON.stringify(userInfo));
  if (userInfo) {
    callback.success(userInfo);
    return;
  }*/

  wx.getUserInfo({
    withCredentials: false,
    success: function (res) {
      wx.setStorageSync("userInfo",res.userInfo);
      callback.success(res.userInfo);
    },
    fail: function (res) {
      openUserInfoSetting({
        success:function(){
          getUserInfo(callback);
        }
      });
    }
  })
}


function requestRegist(callback,code,userInfo){
  request(registerUserByJsCode,{
      "code": code,
      "openId": userInfo.openId,
      "nickName": userInfo.nickName, "gender": userInfo.gender,
      "language": userInfo.language, "city": userInfo.city,
      "province": userInfo.province, "country": userInfo.country,
      "avatarUrl": userInfo.avatarUrl
    },{
      success:function(resp){
          if(resp.success){
            //注册成功
            callback.success();
          }else{
            //用户已存在
            if(resp.errorCode==403){
              callback.exists();
            }else{
              callback.fail();
            }
            
          }
      },
      fail:function(resp){
          //注册失败
          callback.fail();
      }
    });
}

//请求登陆
function requestLogin(callback) {
  wx.login({
    success: function (loginCode) {
      getUserInfo({
        success: function (userInfo) {
          var url = loginByJsCodeUrl;
          request(url, {
            "code": loginCode.code      
          }, {
              success: function (resp) {
                if(resp.success){
                  token = resp.data.token;
                  isLogin = true;
                  callback.success(resp.data.userInfo);
                }else{
                  if(resp.errorCode==401){
                    wx.login({
                      success:function(loginCode){
                        requestRegist({
                          success: function () {
                            requestLogin(callback);
                          },
                          fail: function () {
                            callback.fail();
                          },
                          exists: function () {
                            callback.fail();
                          }
                        }, loginCode.code, userInfo);
                      }
                    })
                    
                  }
                }
               
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
  getUserInfo: getUserInfo,
  requestPayMent: requestPayMent,
  requestLogin: requestLogin,
  requestWxPayConfig: requestWxPayConfig,
  getDomain:getDomain,
  requestLogin: requestLogin,
  testSetUserInfo: testSetUserInfo,
  requestWithLogin:requestWithLogin,
  requestUpload: requestUpload
}