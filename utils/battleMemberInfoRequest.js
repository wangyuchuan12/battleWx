var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/memberInfo";


function getBattleMemberInfoFromCache(){
  var memberInfo = wx.getStorageSync("memberInfo");
  return memberInfo;
}

function getBattleMemberInfo(id, callback) {
  requestBattleMemberInfo(id,{
    success:function(memberInfo){
      wx.setStorageSync("memberInfo", memberInfo);
      callback.success(memberInfo);
    },
    fail:function(){
      callback.fail();
    }
  });
}

function requestBattleMemberInfo(battleId, callback) {
  request.requestWithLogin(url,{battleId:battleId},{
    success:function(resp){
      if(resp.success){
        callback.success(resp.data);
      }else{
        callback.fail();
      }
    },
    fail:function(){
      callback.fail();
    }
  });
}

module.exports = {
  getBattleMemberInfo: getBattleMemberInfo,
  getBattleMemberInfoFromCache: getBattleMemberInfoFromCache
}