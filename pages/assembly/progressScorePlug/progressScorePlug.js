var progressScorePlug = {
data: {
  logs: [],
  progressScoreData:{
    //总距离
    distance:0,
    //进度
    progress:0,
    currentDom: 0,
    animationData: {},
    loveList: [],
    targets: [{
      left: 12.5,
      top: 1900,
      bgUrl: "",
      index: 0
    }, {
      left: 21,
      top: 1870,
      bgUrl: "",
      index: 1
    }, {
      left: 30,
      top: 1865,
      bgUrl: "",
      index: 2
    }, {
      left: 38,
      top: 1865,
      bgUrl: "",
      index: 3
    }, {
      left: 46,
      top: 1867,
      bgUrl: "",
      index: 4
    }, {
      left: 53,
      top: 1874,
      bgUrl: " ",
      index: 5
    }, {
      left: 60,
      top: 1879,
      bgUrl: " ",
      index: 6
    }, {
      left: 68,
      top: 1880,
      bgUrl: " ",
      index: 7
    }, {
      left: 75,
      top: 1875,
      bgUrl: " ",
      index: 8
    }, {
      left: 83,
      top: 1860,
      bgUrl: " ",
      index: 9
    }, {
      left: 88,
      top: 1834,
      bgUrl: " ",
      index: 10
    }, {
      left: 89,
      top: 1805,
      bgUrl: " ",
      index: 11
    }, {
      left: 84,
      top: 1787,
      bgUrl: " ",
      index: 12
    }, {
      left: 77,
      top: 1780,
      bgUrl: " ",
      index: 13
    }, {
      left: 69,
      top: 1780,
      bgUrl: " ",
      index: 14
    }, {
      left: 60,
      top: 1775,
      bgUrl: " ",
      index: 15
    }, {
      left: 50,
      top: 1775,
      bgUrl: " ",
      index: 16
    }, {
      left: 40,
      top: 1770,
      bgUrl: " ",
      index: 17
    }, {
      left: 33,
      top: 1760,
      bgUrl: " ",
      index: 18
    }, {
      left: 25,
      top: 1730,
      bgUrl: " ",
      index: 19
    }, {
      left: 26,
      top: 1695,
      bgUrl: " ",
      index: 20
    }, {
      left: 35,
      top: 1663,
      bgUrl: " ",
      index: 21
    }, {
      left: 43.5,
      top: 1655,
      bgUrl: " ",
      index: 22
    }, {
      left: 54,
      top: 1670,
      bgUrl: " ",
      index: 23
    }, {
      left: 67.5,
      top: 1670,
      bgUrl: " ",
      index: 24
    }, {
      left: 79.5,
      top: 1670,
      bgUrl: " ",
      index: 25
    }, {
      left: 82,
      top: 1620,
      bgUrl: " ",
      index: 26
    }, {
      left: 80,
      top: 1590,
      bgUrl: " ",
      index: 27
    }, {
      left: 70,
      top: 1578,
      bgUrl: " ",
      index: 28
    }, {
      left: 60,
      top: 1573,
      bgUrl: " ",
      index: 29
    }, {
      left: 53,
      top: 1567,
      bgUrl: " ",
      index: 30
    }, {
      left: 45,
      top: 1570,
      bgUrl: " ",
      index: 31
    }, {
      left: 35,
      top: 1560,
      bgUrl: " ",
      index: 32
    }, {
      left: 28,
      top: 1555,
      bgUrl: " ",
      index: 33
    }, {
      left: 22,
      top: 1530,
      bgUrl: " ",
      index: 34
    }, {
      left: 27,
      top: 1500,
      bgUrl: " ",
      index: 35
    }, {
      left: 36,
      top: 1500,
      bgUrl: " ",
      index: 36
    }, {
      left: 45,
      top: 1500,
      bgUrl: " ",
      index: 37
    }, {
      left: 53,
      top: 1510,
      bgUrl: " ",
      index: 38
    }, {
      left: 61,
      top: 1510,
      bgUrl: " ",
      index: 39
    }, {
      left: 70,
      top: 1490,
      bgUrl: " ",
      index: 40
    }, {
      left: 70,
      top: 1460,
      bgUrl: " ",
      index: 41
    }, {
      left: 70,
      top: 1430,
      bgUrl: " ",
      index: 42
    }, {
      left: 70,
      top: 1400,
      bgUrl: " ",
      index: 43
    }, {
      left: 70,
      top: 1370,
      bgUrl: " ",
      index: 44
    }, {
      left: 70,
      top: 1340,
      bgUrl: " ",
      index: 45
    }, {
      left: 70,
      top: 1310,
      bgUrl: " ",
      index: 46
    }, {
      left: 70,
      top: 1280,
      bgUrl: " ",
      index: 47
    }, {
      left: 70,
      top: 1250,
      bgUrl: " ",
      index: 48
    }, {
      left: 70,
      top: 1220,
      bgUrl: " ",
      index: 49
    }, {
      left: 73,
      top: 1160,
      bgUrl: " ",
      index: 50
    }, {
      left: 77,
      top: 1080,
      bgUrl: " ",
      index: 51
    }, {
      left: 69,
      top: 1070,
      bgUrl: " ",
      index: 52
    }, {
      left: 62,
      top: 1060,
      bgUrl: " ",
      index: 53
    }, {
      left: 55,
      top: 1050,
      bgUrl: " ",
      index: 54
    }, {
      left: 50,
      top: 1030,
      bgUrl: " ",
      index: 55
    }, {
      left: 60,
      top: 1010,
      bgUrl: " ",
      index: 56
    }, {
      left: 68,
      top: 993,
      bgUrl: " ",
      index: 57
    }, {
      left: 77,
      top: 980,
      bgUrl: " ",
      index: 58
    }, {
      left: 85,
      top: 950,
      bgUrl: " ",
      index: 59
    }, {
      left: 87,
      top: 900,
      bgUrl: " ",
      index: 60
    }, {
      left: 80,
      top: 870,
      bgUrl: " ",
      index: 61
    }, {
      left: 70,
      top: 880,
      bgUrl: " ",
      index: 62
    }, {
      left: 63,
      top: 885,
      bgUrl: " ",
      index: 63
    }, {
      left: 54,
      top: 895,
      bgUrl: " ",
      index: 64
    }, {
      left: 45,
      top: 911,
      bgUrl: " ",
      index: 65
    }, {
      left: 35,
      top: 912,
      bgUrl: " ",
      index: 66
    }, {
      left: 25,
      top: 905,
      bgUrl: " ",
      index: 67
    }, {
      left: 17,
      top: 890,
      bgUrl: " ",
      index: 68
    }, {
      left: 12,
      top: 865,
      bgUrl: " ",
      index: 69
    }, {
      left: 12,
      top: 830,
      bgUrl: " ",
      index: 70
    }, {
      left: 14,
      top: 800,
      bgUrl: " ",
      index: 71
    }, {
      left: 18,
      top: 770,
      bgUrl: " ",
      index: 72
    }, {
      left: 25,
      top: 760,
      bgUrl: " ",
      index: 73
    }, {
      left: 33,
      top: 747,
      bgUrl: " ",
      index: 74
    }, {
      left: 41,
      top: 743,
      bgUrl: " ",
      index: 75
    }, {
      left: 50,
      top: 743,
      bgUrl: " ",
      index: 76
    }, {
      left: 58,
      top: 744,
      bgUrl: " ",
      index: 77
    }, {
      left: 66,
      top: 744,
      bgUrl: " ",
      index: 78
    }, {
      left: 75,
      top: 747,
      bgUrl: " ",
      index: 79
    }, {
      left: 75,
      top: 720,
      bgUrl: " ",
      index: 80
    }, {
      left: 65,
      top: 710,
      bgUrl: " ",
      index: 81
    }, {
      left: 55,
      top: 703,
      bgUrl: " ",
      index: 82
    }, {
      left: 45,
      top: 694,
      bgUrl: " ",
      index: 83
    }, {
      left: 38,
      top: 670,
      bgUrl: " ",
      index: 84
    }, {
      left: 45,
      top: 647,
      bgUrl: " ",
      index: 85
    }, {
      left: 55,
      top: 642,
      bgUrl: " ",
      index: 86
    }, {
      left: 65,
      top: 638,
      bgUrl: " ",
      index: 87
    }, {
      left: 75,
      top: 632,
      bgUrl: " ",
      index: 88
    }, {
      left: 85,
      top: 615,
      bgUrl: " ",
      index: 89
    }, {
      left: 92,
      top: 580,
      bgUrl: " ",
      index: 90
    }, {
      left: 85,
      top: 540,
      bgUrl: " ",
      index: 91
    }, {
      left: 77,
      top: 520,
      bgUrl: " ",
      index: 92
    }, {
      left: 67,
      top: 513,
      bgUrl: " ",
      index: 93
    }, {
      left: 57,
      top: 513,
      bgUrl: " ",
      index: 94
    }, {
      left: 47,
      top: 519,
      bgUrl: " ",
      index: 95
    }, {
      left: 37,
      top: 530,
      bgUrl: " ",
      index: 96
    }, {
      left: 27,
      top: 539,
      bgUrl: " ",
      index: 97
    }, {
      left: 18,
      top: 519,
      bgUrl: " ",
      index: 98
    }, {
      left: 14,
      top: 495,
      bgUrl: " ",
      index: 99
    }, {
      left: 20,
      top: 465,
      bgUrl: " ",
      index: 100
    }, {
      left: 30,
      top: 452,
      bgUrl: " ",
      index: 101
    }, {
      left: 40,
      top: 450,
      bgUrl: " ",
      index: 102
    }, {
      left: 50,
      top: 450,
      bgUrl: " ",
      index: 103
    }, {
      left: 60,
      top: 450,
      bgUrl: " ",
      index: 104
    }, {
      left: 68,
      top: 450,
      bgUrl: " ",
      index: 105
    }, {
      left: 77,
      top: 450,
      bgUrl: " ",
      index: 106
    }, {
      left: 87,
      top: 438,
      bgUrl: " ",
      index: 107
    }, {
      left: 91,
      top: 410,
      bgUrl: " ",
      index: 108
    }, {
      left: 88,
      top: 380,
      bgUrl: " ",
      index: 109
    }, {
      left: 80,
      top: 374,
      bgUrl: " ",
      index: 110
    }, {
      left: 73,
      top: 364,
      bgUrl: " ",
      index: 111
    }, {
      left: 67,
      top: 360,
      bgUrl: " ",
      index: 112
    }, {
      left: 60,
      top: 360,
      bgUrl: " ",
      index: 113
    }, {
      left: 53,
      top: 360,
      bgUrl: " ",
      index: 114
    }, {
      left: 47,
      top: 358,
      bgUrl: " ",
      index: 115
    }, {
      left: 40,
      top: 358,
      bgUrl: " ",
      index: 116
    }, {
      left: 33,
      top: 352,
      bgUrl: " ",
      index: 117
    }, {
      left: 25,
      top: 340,
      bgUrl: " ",
      index: 118
    }, {
      left: 25,
      top: 310,
      bgUrl: " ",
      index: 119
    }, {
      left: 32,
      top: 280,
      bgUrl: " ",
      index: 120
    }
    ]
  },
},

setDistance:function(distance){
  this.setData({
    "progressScoreData.distance": distance
  });
},

setProgress:function(progress){
  this.setData({
    "progressScoreData.progress": progress
  });
},

setLove: function(limit, residule) {

  var loveList = new Array();
  for (var i = 0; i < residule; i++) {
    loveList.push({
      type: 1
    });
  }

  for (var i = 0; i < limit - residule; i++) {
    loveList.push({
      type: 0
    });
  }

  this.setData({
    "progressScoreData.loveList": loveList
  })

},

containerScrollToDom: function(index) {
  var outThis = this;
  this.domRes(index, {
    success: function (res) {
      var top = res.top;
      outThis.containerRes({
        success: function (res) {
          var scrollTop = res.scrollTop;
          wx.getSystemInfo({
            success: function (res) {
              var winHeight = res.windowHeight;
              outThis.setData({
                "progressScoreData.containerScrollTop": top + scrollTop - winHeight / 2
              });
            },
          });

        }
      });

    }
  });
},

//容器的位置状态
containerRes: function(callback) {
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
domRes: function(index, callback) {
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
toPosition: function(index, callback) {
  var duration = 500;
  var outThis = this;
  outThis.containerRes({
    success: function (res) {
      var scrollTop = res.scrollTop;
      var scrollLeft = res.scrollLeft;
      outThis.domRes(index, {
        success: function (res) {
          var animation = wx.createAnimation({
            duration: duration,
            timingFunction: 'linear'
          });
          animation.top(res.top + scrollTop - 10).left(res.left + scrollLeft).step();
          outThis.setData({
            "progressScoreData.animationData": animation.export()
          });

          if (callback && callback.success) {
            setTimeout(function () {
              callback.success(index);
            }, duration);
          }
        }
      })
    }
  })
},

trendBetween: function(begin, end) {
  var outThis = this;
  if (begin < end) {
    this.toPosition(begin, {
      success: function (index) {
        var index = index + 1;
        outThis.trendBetween(index, end);
        outThis.containerScrollToDom(index);
      }
    });
  }
}


}

module.exports = {
  progressScorePlug: progressScorePlug
}