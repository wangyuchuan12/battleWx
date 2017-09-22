var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battleManagerRequest = require("../../../utils/battleManagerRequest.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    subjects:[/*{
      imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/09660159-7c00-4b10-9add-42d00d2e7c46",
      name:"火影忍者"
    },{
      imgUrl: "http://7xlw44.com1.z0.glb.clouddn.com/09660159-7c00-4b10-9add-42d00d2e7c46",
      name: "火影忍者"
    }*/],
    periods:[/*{
      num:"10",
      total:"50",
      status:0
    }, {
      num: "10",
      total: "50",
      status: 0
    }*/]
  },

  subjectDelPre:function(e){
    this.otherClick();
    var id = e.currentTarget.id;
    var index = id.substring("pre_".length);
    var key = "subjects["+index+"].status";
    this.setData({
      [key]:1
    });
  },

  otherClick:function(){
    var subjects = this.data.subjects;
    for(var i=0;i<subjects.length;i++){
      var subject = subjects[i];
      subject.status=0;
    }
    this.setData({
      subjects:subjects
    });
  },

  subjectDelDo:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var index = id.substring("do_".length);
    var subjectId = this.data.subjects[index].id;
    battleManagerRequest.requestDelSubject(subjectId,{
      success:function(){
        outThis.initSubjects();
      },
      fail:function(){

      }
    });
  },

  initPeriods:function(){
    var outThis = this;
    battleManagerRequest.requestBattlePeriods(1,{
      success:function(periods){
        var periodDataArray = new Array();
        for(var i=0;i<periods.length;i++){
          var period = periods[i];
          periodDataArray.push({
            num:19,
            total:period.maxMembers
          });
        }

        outThis.setData({
          periods: periodDataArray
        })
      },
      fail:function(){
        console.log("fail");
      }
    });
  },

  initSubjects:function(){
    var outThis = this;
    battleManagerRequest.requestBattleSubjects(1,{
      success:function(subjects){
        var subjectDataArray = new Array();
        for(var i=0;i<subjects.length;i++){
          var subject = subjects[i];
          subjectDataArray.push({
            imgUrl:subject.imgUrl,
            name:subject.name,
            status:0,
            id:subject.id
          });
        }

        outThis.setData({
          subjects: subjectDataArray
        })
      },
      fail:function(){

      }
    });
  },

  addSubjectClick:function(){
    wx.navigateTo({
      url: '../addSubject/addSubject',
    });
  },

  addPeriodClick:function(){
    wx.navigateTo({
      url: '../battlePeriodManager/battlePeriodManager',
    });
  },

  onLoad: function (options) {
    
  },
  onShow:function(){
    this.initSubjects();
    this.initPeriods();
  }
});

layerout.begin();