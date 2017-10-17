var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var request = require("../../utils/battleMembersRequest.js");
var membersRankUtil = require("../../utils/membersRankUtil.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    rankMembers:[/*{
      nickname:"王煜川",
      process:100,
      consumeHour:32,
      consumeMinute:20,
      isFirst:1,
      imgUrl:"http://ooe8ianrr.bkt.clouddn.com/znm123.png"
    }, {
      nickname: "王煜川",
      process: 100,
      consumeHour: 32,
      consumeMinute: 20,
      isFirst: 1,
      imgUrl: "http://ooe8ianrr.bkt.clouddn.com/znm123.png"
      }, {
        nickname: "王煜川",
        process: 100,
        consumeHour: 32,
        consumeMinute: 20,
        isFirst: 1,
        imgUrl: "http://ooe8ianrr.bkt.clouddn.com/znm123.png"
    }, {
      nickname: "王煜川",
      process: 100,
      consumeHour: 32,
      consumeMinute: 20,
      isFirst: 1,
      imgUrl: "http://ooe8ianrr.bkt.clouddn.com/znm123.png"
    }*/]
  },
  initRankData: function (battleId,roomId) {
    var outThis = this;
    request.getBattleMembers(battleId, roomId,{
      success: function (data) {
        if (data) {
          var members = new Array();
          for (var i = 0; i < data.length; i++) {
            members.push({
              nickname: data[i].nickname,
              process: data[i].process,
              imgUrl: data[i].headImg
            });
          }
          membersRankUtil.rankByProcess(members);
          outThis.setData({
            rankMembers:members
          });
        }
      },
      fail: function () {

      }
    });
  },
  onLoad: function (options) {
    var battleId = options.battleId;
    var roomId = options.roomId;
    this.initRankData(battleId,roomId);
  }
});


layerout.begin();