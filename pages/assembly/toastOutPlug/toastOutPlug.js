// pages/assembly/toastOutPlug/toastOutPlug.js
var toastOutPlug = {

  /**
   * 页面的初始数据
   */
  data: {
    toastOutPlugData:{
      fontSize: 10,
      content: "+5分",
      toastOutAnimation: null,
      isShow: 1
    }
  },

  startToastOutAnim:function(){
    this.setData({
      "toastOutPlugData.isShow":1
    });
    var outThis = this;
    var interval = setInterval(function(){
      var fontSize = outThis.data.toastOutPlugData.fontSize;
      
      if(fontSize<50){
        fontSize++;
        outThis.setData({
          "toastOutPlugData.fontSize":fontSize
        })
      }else{
        clearInterval(interval);
        var animation = wx.createAnimation({
          duration: 2000,
          timingFunction: 'ease'
        });

        animation.translateY(-100).step();
        outThis.setData({
          "toastOutPlugData.toastOutAnimation": animation.export()
        });

        setTimeout(function(){
          outThis.setData({
            "toastOutPlugData.isShow":0
          });
        },2500);
      }
    },10);
  }
}

module.exports = {
  toastOutPlug: toastOutPlug
}