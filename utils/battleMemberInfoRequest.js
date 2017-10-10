var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/memberInfo";

var memberInfo = {
  battleId:null,
  battleUserId:null,
  headImg:null,
  id:null,
  loveCount:null,
  loveResidule:null,
  nickname:null,
  periodId:null,
  process:null,
  stageCount:null,
  stageIndex:null,
  status:null,
  isCreater:0,
  isManager:0,
  isStart:0,
  isTakepart:0,
  openId:null,
  userId:null
}


function getBattleMemberInfoFromCache(){
  var memberInfo = wx.getStorageSync("memberInfo");
  return memberInfo;
}

function setBattleMemberInfoFromCache(memberInfo){
  wx.setStorageSync("memberInfo", memberInfo);
}

function getBattleMemberInfo(id, callback) {
  requestBattleMemberInfo(id,{
    success:function(m){
      memberInfo = m;
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
  getBattleMemberInfoFromCache: getBattleMemberInfoFromCache,
  setBattleMemberInfoFromCache: setBattleMemberInfoFromCache,
  memberInfo: memberInfo
}