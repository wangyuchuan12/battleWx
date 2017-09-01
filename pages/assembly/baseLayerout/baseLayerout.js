function BaseLayerout(config){

    var baseConfig = config;
    var data = config.data;
    if(!data){
      data = {};
    }

    data.baseData = {
      hiddenLoading: true,
      hiddenToast: true,
      toastMsg:"ok"
    }


    baseConfig.showLoading = function(){
      this.setData({
        "baseData.hiddenLoading":false
      });
    }



    baseConfig.showToast = function (msg) {
      this.setData({
        "baseData.hiddenToast": false,
        "baseData.toastMsg":msg
      });
    }

    baseConfig.hideToast = function(){
      this.setData({
        "baseData.hiddenToast": true,
        "baseData.toastMsg": "ok"
      });
    }

    baseConfig.hideLoading = function () {
     this.setData({
          "baseData.hiddenLoading":true
      });
    }
    

    Page(baseConfig);
}


module.exports = {
  BaseLayerout: BaseLayerout
}