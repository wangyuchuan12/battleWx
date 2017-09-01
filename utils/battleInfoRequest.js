var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/info";

var battleInfo = {
  "id": "1", 
  "name": "动漫知识比赛", 
  "instruction": "动漫卡通，我的最爱", 
  "headImg": "http://ovcnyik4l.bkt.clouddn.com/d89f42d36c18e16d9900a5cd43e8edf2.png", 
  "isDisplay": 1, 
  "isActivation": 1, 
  "currentPeriodIndex": 1
};
function getBattleInfo(id,callback){
  requestBattleInfo(id,{
    success:function(data){
      callback.success(data);
    },
    fail:function(){
      callback.fail(data);
    }
  });
}

function requestBattleInfo(id,callback){
  var params = new Object();
  params.id = id;
  request.request(url,params,{
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
  getBattleInfo: getBattleInfo
}