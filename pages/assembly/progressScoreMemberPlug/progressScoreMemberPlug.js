var progressScoreMembers={
  data:{
    progressScoreMemberData: {
      roomPercent:0,
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

  setRoomPercent: function (roomScore, scrollGogal){
    var outThis = this;
    var percent = parseInt(roomScore/scrollGogal*100);

    var percent2 = this.data.progressScoreMemberData.roomPercent;

    if(!percent2){
      this.setData({
        "progressScoreMemberData.roomPercent": percent
      });
    }else if (percent > percent2){
      
      var interval = setInterval(function(){
        percent2++;
        if (percent >= percent2){
          outThis.setData({
            "progressScoreMemberData.roomPercent": percent2
          });
          if(percent==percent2){
            clearInterval(interval);
          }
        }else{
          clearInterval(interval);
        }
        
      },100);
    }
    
  },

  setMembers:function(ms){
    var members = new Array();
    for(var i=0;i<ms.length;i++){
      var member = ms[i];
      var process = member.process;
      var score = member.score;
      var scoreGogal = member.scrollGogal;
      var percent =0;
      if(process){
        percent = score / scoreGogal*100;
      }
      members.push({
        imgUrl:ms[i].headImg,
        percent: percent,
        id:ms[i].id,
        process:process,
        score:score
      });
    }
    members.sort(function(member1,member2){
      return member2.score-member1.score;
    });
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