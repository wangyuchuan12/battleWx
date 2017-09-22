var request = require("request.js");

function loadFile(filePath,callback){
  request.requestUpload(filePath,{
    success:function(resp){
      console.log(JSON.stringify(resp));
      if (resp.success){
        var data = resp.data;
        if(data){
          callback.success(data.url);
        }else{
          callback.fail();
        }
      }else{
        callback.fail();
      }
    },
    fail:function(){
      callback.fail();
    }
  });
}

function openLoadFile(callback){
  wx.chooseImage({
    success: function (res) {
      var path = res.tempFilePaths[0];

      loadFile(path,{
        success:function(url){
          callback.success(url)
        },
        fail:function(){
          callback.fail();
        }
      });
    },
    fail:function(){
      callback.fail();
    }
  });
}

module.exports = {
  loadFile: loadFile,
  openLoadFile: openLoadFile
}