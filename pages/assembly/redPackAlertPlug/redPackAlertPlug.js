var redPackAlertPlug = {
  data:{
    redPackAlertPlugData:{
      imgUrl:"http://on3s1z2us.bkt.clouddn.com/32bca8cb1186bc674558babf86bbd226.png",
      display:"none"
    }
  },
  redPacketAlertCloseClick:function(){
    this.setData({
      "redPackAlertPlugData.display":"none"
    });
  },

  redPackClick:function(){
    this.setData({
      "redPackAlertPlugData.display": "block"
    });
  },
  openRedPackClick:function(){
    this.eventListener.skipToRedpackInfo();
  }
}

module.exports = {
  redPackAlertPlug: redPackAlertPlug
}