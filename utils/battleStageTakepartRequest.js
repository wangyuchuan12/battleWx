var request = require("request.js");

var domain = request.getDomain();

var stageTakepartUrl = domain+"/api/battle/stageTakepart"
function stageTakepart(battleId,subjectIds,roomId,callback){
  var subjectStr = "";
  for(var i=0;i<subjectIds.length;i++){
    subjectStr += subjectStr + subjectIds[i]+",";
  }
  if(subjectIds.length>0){
    subjectStr = subjectStr.substring(0,subjectStr.lastIndexOf(","));
  }
  request.requestWithLogin(stageTakepartUrl,{
    battleId:battleId,
    subjectIds: subjectStr,
    roomId:roomId
  },{
    success:function(resp){
      console.log("resp:"+JSON.stringify(resp));
      callback.success(resp.data);
    },
    fail:function(){
      console.log("...faile");
      callback.fail();
    }
  });
}

module.exports = {
  stageTakepart: stageTakepart
}