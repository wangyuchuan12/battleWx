var domain = "wss://www.chengxihome.com";
var request = require("request.js");
var token;
var callbacks = new Array();

var isOpen = 0;

function closeSocket(){
  wx.closeSocket();
}

function registerCallback(code,callback){
  var obj = new Object();
  obj.code = code;
  obj.callback = callback;
  callbacks.push(obj);
}

function removeCallback(code){
  for(var i=0;i<callbacks.length;i++){
    var callback = callbacks[i];
    if(callback.code==code){
      callbacks.splice(i,1);
    }
  }
}

function openSocket(){
  request.requestLogin({
    success:function(userInfo){
      token = userInfo.token;

      doOpenSocket();

      console.log("this");

    }
  })
  
  function doOpenSocket(){
    callbacks = new Array();
    var url = "/socket";
    if(isOpen==1){
      return;
    }
    console.log("..............doOpenSocket");
    wx.connectSocket({
      url: domain + url+"?token=" + token,
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (data) {
        
      },
      complete: function (res) {
        console.log('complete: ', res);
      },
      fail: function (err) {
        console.log("openSocketFail")
        setTimeout(function(){
          //doOpenSocket();
        },5000);
        
      }
    });
  }

  wx.onSocketMessage(function (resp) {
    console.log("onSocketMessage:"+JSON.stringify(resp));
    data = resp.data;
    data = data.replace(" ", "");
    if (typeof data != 'object') {
      data = data.replace(/\ufeff/g, "");//重点
    }
    var data = JSON.parse(data);
    console.log("onSocketMessage:"+JSON.stringify(data));
    for (var i = 0; i < callbacks.length; i++) {
      var callback = callbacks[i];
      if (callback.code == data.code) {
        callback.callback.call(data.data);
      }
    }
  });

  wx.onSocketOpen(function (res) {
    console.log("连接打开了");
    isOpen = 1
    /*wx.sendSocketMessage({
      data: "你好，我叫王煜川",
      success:function(res){
        console.log("success:"+JSON.stringify(res));
      },
      fail:function(res){
        console.log("fail:" + res);
      }
    });*/
  });

  wx.onSocketClose(function (res) {
    console.log("onSocketClose");
    setTimeout(function () {
      doOpenSocket();
    }, 5000);
    isOpen = 0;
  });

  wx.onSocketError(function (res) {
    console.log("onSocketError");
    setTimeout(function () {
      if (isOpen==0){
        doOpenSocket();
      }
    }, 5000);
  });
}

module.exports = {
  openSocket: openSocket,
  registerCallback: registerCallback,
  removeCallback: removeCallback,
  closeSocket: closeSocket
}
