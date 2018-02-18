var domain = "https://www.chengxihome.com";
//根据code登陆用户bbin
var loginByJsCodeUrl = domain + "/api/common/login/loginByJsCode";
var registerUserByJsCode = domain +"/api/common/login/registerUserByJsCode";
var wxPayConfigUrl = domain + "/api/battle/wxPayConfig";
var loadFileUrl = domain + "/api/common/resource/upload";

var masonryPayUrl = domain + "/api/battle/masonryPay";

var beanPayUrl = domain + "/api/battle/beanPay";
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

function request(url, params, callback,data) {
  var sessionId = wx.getStorageSync("SESSIONID");
  var header;
  if (sessionId) {
    console.log("sessionId:" + sessionId + ",url:" + url);
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': 'JSESSIONID=' + sessionId
    }
  } else {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
  //token = '56270a70-863f-4fff-95bf-1ec1278dadd7';
  //token = '6464d106-88ab-4227-a8f6-9f934efc0ede';
  //token = 'e29d555b-a94c-433a-b3c7-346911baeb19';
  //token = 'de8230bb-f2fa-42d1-b78d-e366722ef846';
  //token = 'ef43f422-cb7c-416d-9c41-2fe69baa5b2a';
  //token = 'afb30048-02c3-460f-a3be-ceeb61fdc59f';
  //token = '1ed504c1-2e59-441c-99fc-d64d17deaaa2';
  //token = 'b9ca6b0d-06bb-4a25-8e0f-aa6fefc40908';
  //token = 'e29d555b-a94c-433a-b3c7-346911baeb19';
  //token = '1f82defb-0138-456d-82ff-8e0b7719f08b';
  //token = '23c58444-9f8e-48e9-8d3e-47a7e8810e5c';
  //token = 'befdc60f-5eb7-4159-a0c0-7c476ccb80b2';
  //token = 'a6a11e25-2e44-4886-a28a-55231a0ee0a8';
  //token = 'e2770aa1-9b9c-4afa-ab90-4697e20888e3';
  //token = '0bde0782-4ec0-41e3-bbbf-abbe3f51b110';
  //token = '26d8d32c-eb71-4ba7-a8ff-cfbde983502c';
  //token = '5672f4a5-f655-489a-80de-f91bdb1d9ba9';
  //token = '06bc3bc6-dd4d-43d7-a274-17602373236e';
  //token = '692d656f-0aa8-4f39-b54a-a00cf2ddcc1d';
  //token = '3b52d26e-2e3f-4a84-8ea1-072039f5cf05';
  //token = '8df223df-d232-4908-9dd5-c9cc24b3b2d8';
  //token = 'b5a2c28c-ee6a-4efb-b3a3-46768e919be4';
  //token = 'ec15c7d2-9a7b-4476-b2c5-bcf246df3375';
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
function requestWxPayConfig(id,callback) {
  request(wxPayConfigUrl, {goodId:id}, {
    success: function (resp) {
      if(resp.success){
        callback.success(resp.data);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}


function requestPayMentWithMasonry(goodId,callback){
  var params = new Object();
  params.goodId = goodId;
  requestWithLogin(masonryPayUrl, params, {
      success:function(resp){
        callback.success();
      },
      fail:function(){
        callback.fail();
      }
  });
}

function requestPayMentWithBean(goodId,callback){
  var params = new Object();
  params.goodId = goodId;
  requestWithLogin(beanPayUrl, params, {
    success: function (resp) {
      callback.success();
    },
    fail: function () {
      callback.fail();
    }
  });
}

//支付
function requestPayMent(params,callback) {
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
        success: function (resp) {
          console.log("resp:"+JSON.stringify(resp));
          console.log("errMsg:"+resp.errMsg);
          console.log(resp.errMsg == "requestPayment:ok");
          if (resp.errMsg =="requestPayment:ok"){
            callback.success();
          }
        },
        fail: function () {
          callback.fail();
        }
      });
    },
    fail: function () {
      callback.fail();
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
function requestLogin(callback,time) {
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
                  }else if(resp.errorCode==0||resp.errorCode==1){
                    setTimeout(function(){
                      //尝试5次，如果5次都失败就放弃尝试
                      if(!time){
                        time = 0;
                      }
                      time++;
                      if(time<5){
                        requestLogin(callback,time);
                      }
                    },100);
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
  requestUpload: requestUpload,
  requestPayMentWithMasonry: requestPayMentWithMasonry,
  requestPayMentWithBean: requestPayMentWithBean
}