var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var resourceRequest = require("../../../utils/resourceRequest.js");
var battleManagerRequest = require("../../../utils/battleManagerRequest.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    isImg:0,
    imgUrl:"",
    name:""
  },
  nameInputChange: function (e) {
    this.setData({
      "name": e.detail.value
    })
  },
  submitClick:function(){
    battleManagerRequest.requestAddSubject(1, this.data.name, this.data.imgUrl, {
      success:function(resp){
        wx.navigateBack({
          
        });
      },
      fail:function(){

      }
    });
  },
  imgClick:function(){
    var outThis = this;
    resourceRequest.openLoadFile({
      success:function(path){
        outThis.setData({
          isImg:1,
          imgUrl:path
        });
      },
      fail:function(){
        console.log("fail");
      }
    });
  }
});

layerout.begin();