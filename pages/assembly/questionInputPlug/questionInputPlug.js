var questionInputPlug = {
  data:{
    questionInputData:{

      //0表示选择题 1表示填空题 2表示填词题
      type:0,
      rightAnswer:"苹果排队",
      answer:"你好",
      rightOption:1,
      questionId: 0,
      worldChecks:[{
        index:0,
        id:"worldCheck0",
        content:"人",
        status:"1"
      },{
        index:1,
        id: "worldCheck1",
        content: "火",
        status: "1"
      },{
        index:2,
        id: "worldCheck2",
        content: "赢",
        status: "1"
      },{
        index:3,
        id: "worldCheck3",
        content: "山",
        status: "1"
      },{
        index:4,
        id: "worldCheck4"
      },{
        index:5,
        id: "worldCheck5"
      },{
        index:6,
        id: "worldCheck6"
      },{
        index:7,
        id: "worldCheck7"
      },{
        index:8,
        id: "worldCheck8"
      },{
        index:9,
        id: "worldCheck9"
      },{
        index:10,
        id: "worldCheck10"
      },{
        index:11,
        id: "worldCheck11"
      },{
        index:12,
        id: "worldCheck12"
      },{
        index:13,
        id: "worldCheck13"
      },{
        index:14,
        id: "worldCheck14"
      },{
        index:15,
        id: "worldCheck15"
      },{
        index:16,
        id: "worldCheck16"
      },{
        index:17,
        id: "worldCheck17"
      }],


      worlds:[{
        id:"world0",
        status:0,
        index:"0"
      },{
        id:"world1",
        index:1,
        status:0
      },{
        id: "world2",
        index:2,
        status:0
      },{
        id:"world3",
        index:3,
        status:0
      }],




      options:[/*{
        content:"我是你",
        id:"1",
        index:0
      },{
        content:"你是我",
        id:"2",
        index:1
      }*/]
    }
  },

  setQuestionId:function(questionId){
    this.setData({
      "questionInputData.questionId":questionId
    });
  },

  setOptions:function(options){
    var optionArray = new Array();
    for(var i=0;i<options.length;i++){
      var option = options[i];
      optionArray.push({
        content:option.content,
        index:i,
        id:option.id
      });
    }

    this.setData({
      "questionInputData.options":optionArray
    });
  },

  worldClick:function(e){
    var id = e.currentTarget.id;
    var world;
    var worlds = this.data.questionInputData.worlds;
    var worldChecks = this.data.questionInputData.worldChecks;
    for (var i = 0; i < worlds.length; i++) {
      var target = worlds[i];
      if (target.id == id) {
        world = target;
        break;
      }
    }

    var worldCheck;
    for (var i = 0; i < worldChecks.length;i++){
      var target = worldChecks[i];
      if(target.index==world.targetIndex){
        worldCheck = target;
        break;
      }
    }

    if(world.status==1){
      var worldKey = "questionInputData.worlds[" + world.index + "]";

      var worldCheckKey = "questionInputData.worldChecks[" + worldCheck.index + "]";

      this.setData({
        [worldKey]: {
          id: world.id,
          index: world.index,
          status: 0,
          content: ""
        }
      });

      this.setData({
        [worldCheckKey]: {
          id: worldCheck.id,
          index: worldCheck.index,
          status: 1,
          content: world.content
        }
      });
    }
    

  },

  fillWorldCheck:function(worlds){
    var worldChecks = this.data.questionInputData.worldChecks;

    console.log(JSON.stringify(worldChecks));

    for(var i=0;i<worldChecks.length;i++){
      worldChecks[i].content="";
    }
    
    var outThis = this;
    for(var i=0;i<worlds.length;i++){
      var worldCheck = worldChecks[i];
      if(worldCheck){
        worldCheck.content = worlds[i];
        worldCheck.status = 1;
      }
    }

    this.setData({
      "questionInputData.worldChecks": worldChecks
    });
  },

  fillWorld: function (worldContents){
    var worlds = this.data.questionInputData.worlds;

    for (var i = 0; i < worlds.length;i++){
      var worldContent;
      
      if (worldContents && worldContents.length>0){
        var worldContent = worldContents[i];
      }
      

      var world = worlds[i];

      if (worldContent){
        world.content = worldContent;
        world.status=1;
      }else{
        world.content = "";
        world.status=0;
      }
    }

    this.setData({
      "questionInputData.worlds": worlds
    });



  },

  worldCheckClick:function(e){
    var worldChecks = this.data.questionInputData.worldChecks;
    var worlds = this.data.questionInputData.worlds;
    var id = e.currentTarget.id;
    var worldCheck;
    var world;
    for (var i = 0; i < worldChecks.length;i++){
      var target = worldChecks[i];
      if(target.id==id){
        worldCheck = target;
      }
    }

    if(worldCheck.status==1){
      for (var i = 0; i < worlds.length; i++) {
        var target = worlds[i];
        if (target.status == 0) {
          world = target;
          break;
        }
      }

      if (!world) {
        world = worlds[worlds.length - 1];
      }

      var worldKey = "questionInputData.worlds[" + world.index + "]";
      this.setData({
        [worldKey]: {
          id: world.id,
          index: world.index,
          status: 1,
          content: worldCheck.content,
          targetIndex: worldCheck.index
        }
      });

      var worldCheckKey = "questionInputData.worldChecks[" + worldCheck.index + "]";

      this.setData({
        [worldCheckKey]: {
          id: worldCheck.id,
          index: worldCheck.index,
          status: 0,
          content: ""
        }
      });
    }
    var worlds = this.data.questionInputData.worlds;
    var flag = true;
    var worldStr="";
    for(var i=0;i<worlds.length;i++){
      var world = worlds[i];
      if(world.status==0){
        flag = false;
      }else{
        worldStr = worldStr+world.content;
      }
    }

    if(flag){
      this.eventListener.fillSubmit(this.data.questionInputData.questionId,worldStr);
    }

  },

  inputChange:function(e){
    this.setData({
      "questionInputData.answer":e.detail.value
    })
  },

  inputItemClick:function(){
    if (this.data.questionInputData.answer.length != this.data.questionInputData.rightAnswer.length){
      wx.showToast({
        title: "字数必须是" + this.data.questionInputData.rightAnswer.length,
        icon:"success",
        duration:2000
      });
    }else{
      this.eventListener.inputSubmit(this.data.questionInputData.questionId,this.data.questionInputData.answer);
    }
  },

  selectItemClick:function(e){
    var id = e.currentTarget.id;
    var options = this.data.questionInputData.options;

    var option;
    for(var i=0;i<options.length;i++){
      var target = options[i];
      if(target.id==id){
        option = target;
      }
    }
    var optionKey = "questionInputData.options["+option.index+"].background";

    this.setData({
      [optionKey]:"green"
    });

    this.eventListener.selectSubmit(this.data.questionInputData.questionId,id);
  },

  setType:function(type){
      this.setData({
        "questionInputData.type":type
      });
  }
}

module.exports = {
  questionInputPlug: questionInputPlug
}