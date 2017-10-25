var progressScoreMembers={
  data:{
    progressScoreMemberData: {
      members: [/*{
        imgUrl: "http://ovrd3aj83.bkt.clouddn.com/33fe4abb5e3ea5a87683b6b82e9a346c.png",
        percent: 10
      },
      {
          imgUrl: "http://oqcfht5ij.bkt.clouddn.com/baby.jpg",
          percent:70
      }*/]
    }
  },
  setMembers:function(ms){
    var members = new Array();
    for(var i=0;i<ms.length;i++){
      var member = ms[i];
      var process = member.process;
      var percent =0;
      if(process){
        percent = process/12*10;
      }
      members.push({
        imgUrl:ms[i].headImg,
        percent: percent,
        id:ms[i].id,
        process:process
      });
    }
    this.setData({
      "progressScoreMemberData.members":members
    });
  },
  getMembers:function(){
    var members = this.data.progressScoreMemberData.members;
    return members;
  }
}

module.exports = {
  progressScoreMembers: progressScoreMembers
}