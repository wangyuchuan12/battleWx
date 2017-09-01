Page({
  data: {
    logs: [],
    currentDom:0,
    animationData:{},
    targets:[{
      left:12.5,
      top:1900,
      bgUrl:"../resource/question.png",
      index:0
    },{
        left: 21,
        top: 1870,
        bgUrl: "../resource/question.png",
        index: 1
    },{
      left:30,
      top:1865,
      bgUrl: "../resource/question.png",
      index:2
    }, {
      left: 38,
      top: 1865,
      bgUrl: "../resource/question.png",
      index: 3
    }, {
      left: 46,
      top: 1867,
      bgUrl: "../resource/question.png",
      index: 4
    }, {
      left: 53,
      top: 1874,
      bgUrl: "../resource/question.png",
      index: 5
    }, {
      left: 60,
      top: 1879,
      bgUrl: "../resource/question.png",
      index: 6
    }, {
      left: 68,
      top: 1880,
      bgUrl: "../resource/question.png",
      index: 7
    }, {
      left: 75,
      top: 1875,
      bgUrl: "../resource/question.png",
      index: 8
    }, {
      left: 83,
      top: 1860,
      bgUrl: "../resource/question.png",
      index: 9
    }, {
      left: 88,
      top: 1834,
      bgUrl: "../resource/question.png",
      index: 10
    }, {
      left: 89,
      top: 1805,
      bgUrl: "../resource/question.png",
      index: 11
    }, {
      left: 84,
      top: 1787,
      bgUrl: "../resource/question.png",
      index: 12
    }, {
      left: 77,
      top: 1780,
      bgUrl: "../resource/question.png",
      index: 13
    }, {
      left: 69,
      top: 1780,
      bgUrl: "../resource/question.png",
      index: 14
    }, {
      left: 60,
      top: 1775,
      bgUrl: "../resource/question.png",
      index: 15
    }, {
      left: 50,
      top: 1775,
      bgUrl: "../resource/question.png",
      index: 16
    },{
      left: 40,
      top: 1770,
      bgUrl: "../resource/question.png",
      index: 17
    }, {
      left: 33,
      top: 1760,
      bgUrl: "../resource/question.png",
      index: 18
    }, {
      left: 25,
      top: 1730,
      bgUrl: "../resource/question.png",
      index: 19
    }, {
      left: 26,
      top: 1695,
      bgUrl: "../resource/question.png",
      index: 20
    }, {
      left: 35,
      top: 1663,
      bgUrl: "../resource/question.png",
      index: 21
    }, {
      left: 43.5,
      top: 1655,
      bgUrl: "../resource/question.png",
      index: 22
    }, {
      left: 54,
      top: 1670,
      bgUrl: "../resource/question.png",
      index: 23
    }, {
      left: 67.5,
      top: 1670,
      bgUrl: "../resource/question.png",
      index: 24
    }, {
      left: 79.5,
      top: 1670,
      bgUrl: "../resource/question.png",
      index: 25
    }, {
      left: 82,
      top: 1620,
      bgUrl: "../resource/question.png",
      index: 26
    }, {
      left: 80,
      top: 1590,
      bgUrl: "../resource/question.png",
      index: 27
    }, {
      left: 70,
      top: 1578,
      bgUrl: "../resource/question.png",
      index: 28
    }, {
      left: 60,
      top: 1573,
      bgUrl: "../resource/question.png",
      index: 29
    }, {
      left: 53,
      top: 1567,
      bgUrl: "../resource/question.png",
      index: 30
    }, {
      left: 45,
      top: 1570,
      bgUrl: "../resource/question.png",
      index: 31
    }, {
      left: 35,
      top: 1560,
      bgUrl: "../resource/question.png",
      index: 32
    }, {
      left: 28,
      top: 1555,
      bgUrl: "../resource/question.png",
      index: 33
    }, {
      left: 22,
      top: 1530,
      bgUrl: "../resource/question.png",
      index: 34
    }, {
      left: 27,
      top: 1500,
      bgUrl: "../resource/question.png",
      index: 35
    }, {
      left: 36,
      top: 1500,
      bgUrl: "../resource/question.png",
      index: 36
    }, {
      left: 45,
      top: 1500,
      bgUrl: "../resource/question.png",
      index: 37
    }, {
      left: 53,
      top: 1510,
      bgUrl: "../resource/question.png",
      index: 38
    }, {
      left: 61,
      top: 1510,
      bgUrl: "../resource/question.png",
      index: 39
    }, {
      left: 70,
      top: 1490,
      bgUrl: "../resource/question.png",
      index: 40
    }, {
      left: 70,
      top: 1460,
      bgUrl: "../resource/question.png",
      index: 41
    }, {
      left: 70,
      top: 1430,
      bgUrl: "../resource/question.png",
      index: 42
    }, {
      left: 70,
      top: 1400,
      bgUrl: "../resource/question.png",
      index: 43
    }, {
      left: 70,
      top: 1370,
      bgUrl: "../resource/question.png",
      index: 44
    }, {
      left: 70,
      top: 1340,
      bgUrl: "../resource/question.png",
      index: 45
    }, {
      left: 70,
      top: 1310,
      bgUrl: "../resource/question.png",
      index: 46
    }, {
      left: 70,
      top: 1280,
      bgUrl: "../resource/question.png",
      index: 47
    }, {
      left: 70,
      top: 1250,
      bgUrl: "../resource/question.png",
      index: 48
    }, {
      left: 70,
      top: 1220,
      bgUrl: "../resource/question.png",
      index: 49
    }, {
      left: 73,
      top: 1160,
      bgUrl: "../resource/question.png",
      index: 50
    }, {
      left: 77,
      top: 1080,
      bgUrl: "../resource/question.png",
      index: 51
    }, {
      left: 69,
      top: 1070,
      bgUrl: "../resource/question.png",
      index: 52
    }, {
      left: 62,
      top: 1060,
      bgUrl: "../resource/question.png",
      index: 53
    }, {
      left: 55,
      top: 1050,
      bgUrl: "../resource/question.png",
      index: 54
    }, {
      left: 50,
      top: 1030,
      bgUrl: "../resource/question.png",
      index: 55
    }, {
      left: 60,
      top: 1010,
      bgUrl: "../resource/question.png",
      index: 56
    }, {
      left: 68,
      top: 993,
      bgUrl: "../resource/question.png",
      index: 57
    }, {
      left: 77,
      top: 980,
      bgUrl: "../resource/question.png",
      index: 58
    }, {
      left: 85,
      top: 950,
      bgUrl: "../resource/question.png",
      index: 59
    }, {
      left: 87,
      top: 900,
      bgUrl: "../resource/question.png",
      index: 60
    }, {
      left: 80,
      top: 870,
      bgUrl: "../resource/question.png",
      index: 61
    }, {
      left: 70,
      top: 880,
      bgUrl: "../resource/question.png",
      index: 62
    }, {
      left: 63,
      top: 885,
      bgUrl: "../resource/question.png",
      index: 63
    }, {
      left: 54,
      top: 895,
      bgUrl: "../resource/question.png",
      index: 64
    }, {
      left: 45,
      top: 911,
      bgUrl: "../resource/question.png",
      index: 65
    }, {
      left: 35,
      top: 912,
      bgUrl: "../resource/question.png",
      index: 66
    }, {
      left: 25,
      top: 905,
      bgUrl: "../resource/question.png",
      index: 67
    }, {
      left: 17,
      top: 890,
      bgUrl: "../resource/question.png",
      index: 68
    }, {
      left: 12,
      top: 865,
      bgUrl: "../resource/question.png",
      index: 69
    }, {
      left: 12,
      top: 830,
      bgUrl: "../resource/question.png",
      index: 70
    }, {
      left: 14,
      top: 800,
      bgUrl: "../resource/question.png",
      index: 71
    }, {
      left: 18,
      top: 770,
      bgUrl: "../resource/question.png",
      index: 72
    }, {
      left: 25,
      top: 760,
      bgUrl: "../resource/question.png",
      index: 73
    }, {
      left: 33,
      top: 747,
      bgUrl: "../resource/question.png",
      index: 74
    }, {
      left: 41,
      top: 743,
      bgUrl: "../resource/question.png",
      index: 75
    }, {
      left: 50,
      top: 743,
      bgUrl: "../resource/question.png",
      index: 76
    }, {
      left: 58,
      top: 744,
      bgUrl: "../resource/question.png",
      index: 77
    }, {
      left: 66,
      top: 744,
      bgUrl: "../resource/question.png",
      index: 78
    }, {
      left: 75,
      top: 747,
      bgUrl: "../resource/question.png",
      index: 79
    }, {
      left: 75,
      top: 720,
      bgUrl: "../resource/question.png",
      index: 80
    }, {
      left: 65,
      top: 710,
      bgUrl: "../resource/question.png",
      index: 81
    }, {
      left: 55,
      top: 703,
      bgUrl: "../resource/question.png",
      index: 82
    }, {
      left: 45,
      top: 694,
      bgUrl: "../resource/question.png",
      index: 83
    }, {
      left: 38,
      top: 670,
      bgUrl: "../resource/question.png",
      index: 84
    }, {
      left: 45,
      top: 647,
      bgUrl: "../resource/question.png",
      index: 85
    }, {
      left: 55,
      top: 642,
      bgUrl: "../resource/question.png",
      index: 86
    }, {
      left: 65,
      top: 638,
      bgUrl: "../resource/question.png",
      index: 87
    }, {
      left: 75,
      top: 632,
      bgUrl: "../resource/question.png",
      index: 88
    }, {
      left: 85,
      top: 615,
      bgUrl: "../resource/question.png",
      index: 89
    }, {
      left: 92,
      top: 580,
      bgUrl: "../resource/question.png",
      index: 90
    }, {
      left: 85,
      top: 540,
      bgUrl: "../resource/question.png",
      index: 91
    }, {
      left: 77,
      top: 520,
      bgUrl: "../resource/question.png",
      index: 92
    }, {
      left: 67,
      top: 513,
      bgUrl: "../resource/question.png",
      index: 93
    }, {
      left: 57,
      top: 513,
      bgUrl: "../resource/question.png",
      index: 94
    }, {
      left: 47,
      top: 519,
      bgUrl: "../resource/question.png",
      index: 95
    }, {
      left: 37,
      top: 530,
      bgUrl: "../resource/question.png",
      index: 96
    }, {
      left: 27,
      top: 539,
      bgUrl: "../resource/question.png",
      index: 97
    }, {
      left: 18,
      top: 519,
      bgUrl: "../resource/question.png",
      index: 98
    }, {
      left: 14,
      top: 495,
      bgUrl: "../resource/question.png",
      index: 99
    }, {
      left: 20,
      top: 465,
      bgUrl: "../resource/question.png",
      index: 100
    }, {
      left: 30,
      top: 452,
      bgUrl: "../resource/question.png",
      index: 101
    }, {
      left: 40,
      top: 450,
      bgUrl: "../resource/question.png",
      index: 102
    }, {
      left: 50,
      top: 450,
      bgUrl: "../resource/question.png",
      index: 103
    }, {
      left: 60,
      top: 450,
      bgUrl: "../resource/question.png",
      index: 104
    }, {
      left: 68,
      top: 450,
      bgUrl: "../resource/question.png",
      index: 105
    }, {
      left: 77,
      top: 450,
      bgUrl: "../resource/question.png",
      index: 106
    }, {
      left: 87,
      top: 438,
      bgUrl: "../resource/question.png",
      index: 107
    }, {
      left: 91,
      top: 410,
      bgUrl: "../resource/question.png",
      index: 108
    }, {
      left: 88,
      top: 380,
      bgUrl: "../resource/question.png",
      index: 109
    }, {
      left: 80,
      top: 374,
      bgUrl: "../resource/question.png",
      index: 110
    }, {
      left: 73,
      top: 364,
      bgUrl: "../resource/question.png",
      index: 111
    }, {
      left: 67,
      top: 360,
      bgUrl: "../resource/question.png",
      index: 112
    }, {
      left: 60,
      top: 360,
      bgUrl: "../resource/question.png",
      index: 113
    }, {
      left: 53,
      top: 360,
      bgUrl: "../resource/question.png",
      index: 114
    }, {
      left: 47,
      top: 358,
      bgUrl: "../resource/question.png",
      index: 115
    }, {
      left: 40,
      top: 358,
      bgUrl: "../resource/question.png",
      index: 116
    }, {
      left: 33,
      top: 352,
      bgUrl: "../resource/question.png",
      index: 117
    }, {
      left: 25,
      top: 340,
      bgUrl: "../resource/question.png",
      index: 118
    }, {
      left: 25,
      top: 310,
      bgUrl: "../resource/question.png",
      index: 119
    }, {
      left: 32,
      top: 280,
      bgUrl: "../resource/question.png",
      index: 120
    }
   ]
  },

  containerScrollToDom:function(index){
      var outThis = this;
      this.domRes(index,{
          success:function(res){
            var top = res.top;
            outThis.containerRes({
                success:function(res){
                  var scrollTop = res.scrollTop;
                  wx.getSystemInfo({
                    success: function(res) {
                      var winHeight = res.windowHeight;
                      outThis.setData({
                        containerScrollTop: top + scrollTop-winHeight/2
                      });
                    },
                  });
                  
                }
            });
            
          }
      });
  },

  //容器的位置状态
  containerRes:function(callback){
    var outThis = this;
    wx.createSelectorQuery().select('#progressScoreContainer').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      rect: true,
      id: true,
      properties: ['scrollX', 'scrollY']
    }, function (res) {
        callback.success(res);
    }).exec();
  },

//节点位置
  domRes:function(index,callback){
    wx.createSelectorQuery().select('#toDom' + index).fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      rect: true,
      id: true,
      properties: ['scrollX', 'scrollY']
    }, function (res) {
      callback.success(res);
    }).exec();
  },

  //运行到某个节点
  toPosition:function(index,callback){
    var duration = 500;
    var outThis = this;
    outThis.containerRes({
      success:function(res){
          var scrollTop = res.scrollTop;
          var scrollLeft = res.scrollLeft;
          outThis.domRes(index,{
            success:function(res){
              var animation = wx.createAnimation({
                duration: duration,
                timingFunction: 'linear'
              });
              animation.top(res.top + scrollTop-10).left(res.left + scrollLeft).step();
              outThis.setData({
                animationData: animation.export()
              });

              if(callback&&callback.success){
                setTimeout(function(){
                  callback.success(index);
                }, duration);
              }
            }
          })
      }
    })
  },

  trendBetween:function(begin,end){
    var outThis = this;
    if(begin<end){
      this.toPosition(begin, {
        success: function (index) {
          var index = index+1;
          outThis.trendBetween(index,end);
          outThis.containerScrollToDom(index);
        }
      });
    }
  },

  onLoad: function () {
    this.setData({
      "targets[1].bgUrl":"http://onluguho9.bkt.clouddn.com/paper.png"
    });
    var outThis = this;

    setTimeout(function(){
      outThis.containerScrollToDom(1);
    },3000);
    

   
    setTimeout(function(){
      outThis.trendBetween(1,10);
    },5000);
  } 
})