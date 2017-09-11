var request = require("../../../utils/battleSubjectsRequest.js");
var questionSelector = {
  data:{
    questionSelectorData: {
      display:"none",
      questionSelectorHeaderCount:3,
      questionSelectorHeaderList: [],
      questionSelectorContentList: []
    }
  },

  setHeaderCount:function(count){
    
    var questionSelectorHeaderList = new Array();
    for(var i=0;i<count;i++){
      questionSelectorHeaderList.push({
        imgUrl: "http://ovqk5bop3.bkt.clouddn.com/question2.png",
        status: 0,
        index: 0
      });
    }

    this.setData({
      "questionSelectorData.questionSelectorHeaderCount": count,
      "questionSelectorData.questionSelectorHeaderList": questionSelectorHeaderList
    });
  },

  isQuestionSelectorHeaderReady:function(){
    var array = this.data.questionSelectorData.questionSelectorHeaderList;
    for(var i=0;i<array.length;i++){
      var item = array[i];
      if(item.status==0){
        return false;
      }
    }
    return true;
  },
  

  setQuestionSelectorHeader:function(index,item,callback){
    var imgUrl = item.imgUrl;
    var targetId = item.id;
    var count = this.data.questionSelectorData.questionSelectorHeaderCount;
    var outThis = this;
    var array = this.data.questionSelectorData.questionSelectorHeaderList;
    var item = array[index];
    if(item==null){
      return;
    }
    if (item.status==1&&index<count-1){
      index++;
      this.setQuestionSelectorHeader(index,item, callback);
      return;
    }
    array.splice(index,1,{
      imgUrl:imgUrl,
      status:1,
      targetId:targetId,
      index:index
    });
    this.setData({
      "questionSelectorData.questionSelectorHeaderList": array
    });
   

    if (index < count - 1) {
      index++;
      this.setData({
        "questionSelectorData.questionSelectorHeaderIndex": index
      });

      if (this.isQuestionSelectorHeaderReady()){
        if (callback) {
          setTimeout(function(){
            callback.complete();
          },100);
          
        }
      }
    }else{
      var flag = true;
      for(var i =0;i<array.length;i++){
        var item = array[i];
        if(item.status==0){
          flag = false;
          outThis.setData({
            "questionSelectorData.questionSelectorHeaderIndex": item.index
          });
          break;
        }
       
      }
      if (callback&&flag) {
        setTimeout(function(){
          callback.complete();
        },300);
        
      }
      
    }
  },

  selectBattleHeader:function(e){
    var outThis = this;
    var index = e.currentTarget.id;
    this.setData({
      "questionSelectorData.questionSelectorHeaderIndex": index
    });
    var list = this.data.questionSelectorData.questionSelectorHeaderList;
    var questionSelectorContentList = this.data.questionSelectorData.questionSelectorContentList;
    for(var i =0;i<list.length;i++){
      var item = list[i];
      if(item.index==index){
        if(item.status==1){
          for (var i = 0; i < questionSelectorContentList.length;i++){
            var contentItem = questionSelectorContentList[i];
            console.log("item.targetId:"+item.targetId);
            if (contentItem.id==item.targetId){
              var num = contentItem.num;
              num++;
              contentItem.num = num;
              outThis.setData({
                "questionSelectorData.questionSelectorContentList": questionSelectorContentList
              });
            }
          }
          list.splice(index, 1, {
            imgUrl: "http://ovqk5bop3.bkt.clouddn.com/question2.png",
            status: 0,
            index: index
          });
          outThis.setData({
            "questionSelectorData.questionSelectorHeaderList": list
          });
          break;
        }
        
      }
    }
  },


  selectComplete:function(){
    var outThis = this;
    wx.showModal({
      title: "提示",
      content: "确定开始吗",
      success: function (sm) {
        if (sm.confirm) {
          outThis.eventListener.selectComplete();
        } else if (sm.cancel) {
          console.log("cancel");
        }
      }
    });
  },

  getFirstHeaderIndex:function(){
    var list = this.data.questionSelectorData.questionSelectorHeaderList;
    for(var index=0;index<list.length;index++){
      var item = list[index];
      if(item.status==0){
        return index;
      }
    }
    return -1;
  },

  selectBattleSubject:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var questionSelectorContentList = this.data.questionSelectorData.questionSelectorContentList;
    if(id!="random"){
     
      for (var i = 0; i < questionSelectorContentList.length; i++) {
        var item = questionSelectorContentList[i];
        if (item.id == id) {
          var num = item.num;

          if(num>0){
            var index = outThis.getFirstHeaderIndex();
            if(index!=-1){
              num--;
              item.num = num;
              outThis.setQuestionSelectorHeader(index, item, {
                complete: function () {
                  outThis.selectComplete();
                }
              });
            }
           
          }
          
        }
      }
      outThis.setData({
        "questionSelectorData.questionSelectorContentList": questionSelectorContentList
      });
    }else{
      var selectItems = new Array();
      for (var i = 1; i < questionSelectorContentList.length; i++) {
        var item = questionSelectorContentList[i];
        var num = item.num;
        if(num>0){
          selectItems.push(item);
        }
      }
      selectItems = this.shuffle(selectItems);
      console.log("selectItems:"+JSON.stringify(selectItems));
      var index = 0;
      var headerCount = this.data.questionSelectorData.questionSelectorHeaderList.length;
      for (var i = 0; i < headerCount;i++){
        var item = selectItems[index];
        var headerItem = this.data.questionSelectorData.questionSelectorHeaderList[i];
        if (item != null && headerItem.status==0){
          index++;
          outThis.setQuestionSelectorHeader(i, item, {
            complete: function () {
              outThis.selectComplete();
            }
          });
          var num = item.num;
          num--;
          item.num = num;
        }
      }
      outThis.setData({
        "questionSelectorData.questionSelectorContentList": questionSelectorContentList
      });

    }
    
  },

  shuffle:function(array) {
    var tmp, current, top = array.length;
    if (top) while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  },

  hideSelector:function(){
    this.setData({
      "questionSelectorData.display":"none"
    });
  },

  showSelector:function(){
    this.setData({
      "questionSelectorData.display": "block"
    });
  },

  initBattleSubjects:function(count,callback){
    this.setHeaderCount(count);
    var outThis = this;
    request.getBattleSubjects(1,1,{
      success:function(data){
        if(callback){
          callback.success();
        }
        var array = new Array();
        array.push({
          id:"random",
          name:"一键开始",
          imgUrl:"http://ovqk5bop3.bkt.clouddn.com/random.png",
          num:1
        });
        for(var i =0;i<data.length;i++){

          array.push({
              name:data[i].name,
              imgUrl:data[i].imgUrl,
              id:data[i].id,
              num:data[i].num
          });
        }

       outThis.setData({
         "questionSelectorData.questionSelectorContentList":array
       });

      },
      fail:function(){

      }
    });
  }
}

module.exports = {
  questionSelector: questionSelector
}