// battleTakepart.js
var request = require("../../utils/request.js");
var battleRequest = require("../../utils/battleInfoRequest.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var battleMembersRequest = require("../../utils/battleMembersRequest.js");
var takepartRequest = require("../../utils/takepartRequest.js");
var test = require("../../utils/test.js");
var util = require("../../utils/util.js");
var battleTakepartCache = require("../../utils/cache/battleTakepartCache.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var app = getApp();
var headImg = "http://ovcnyik4l.bkt.clouddn.com/d89f42d36c18e16d9900a5cd43e8edf2.png";
var battleId = null;
var roomId = null;
var requestTarget;
var layerout = new baseLayerout.BaseLayerout({
  /**
   * 页面的初始数据
   */
  data: {
   
    imgUrl:"",

    battleInfoContent:"",

    battleInfoName:"",

    isFull:0,
    
    chat:"wangyuchuan12",

    members:[{
      imgUrl:"http://otsnwem87.bkt.clouddn.com/user.png"
    },{
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png" 
      }, {
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
      }, {
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
      }, {
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }],

    isManager:0,

    isOwner:0,

    status:0,

    maxinum:8,

    mininum:1,

    num:0

  },

  createClick:function(){
    wx.navigateTo({
      url: '../battleRoomEdit/battleRoomEdit?battleId='+battleId
    });
  },
  

  skipToRank:function(){
    wx.navigateTo({
      url: '../battleRank/battleRank?battleId='+battleId+"&roomId="+roomId
    });
  },

  signOutClick:function(){
    var outThis = this;
    this.showLoading();
    takepartRequest.battleSignout(battleId,roomId,{
      success:function(){
        outThis.hideLoading();        
        wx.redirectTo({
          url: 'battleTakepart?battleId=' + battleId + "&roomId=" + roomId
        });
      },
      fail:function(errorMsg){
        console.log("errorMsg:"+errorMsg);
      }
    });
  },
  

  //初始化数据
  init:function(){

    var outThis = this;
    this.setData({
      imgUrl: battleRequest.battleInfo.headImg,
      battleInfoContent: battleRequest.battleInfo.instruction,
      battleInfoName: battleRequest.battleInfo.name
    });

    this.showLoading();
  
    this.initBattleInfo({
      success:function(){
        outThis.initMemberInfo({
          success:function(){
            outThis.initBattleMembers({
              success:function(){
                outThis.hideLoading();
              },
              fail:function(){
                outThis.showToast("网络异常");
                outThis.hideLoading();
              }
            });
          },
          fail:function(){
            outThis.showToast("网络异常");
            outThis.hideLoading();
          }
        })
      },
      fail:function(){

      }
    });
  },

  //吃石化比赛信息数据
  initBattleInfo:function(callback){
    var outThis = this;
    battleRequest.getBattleInfo(battleId,roomId,{
      success: function (battleInfo) {
        callback.success();
       
        wx.setNavigationBarTitle({
          title: battleInfo.name
        })
        outThis.setData({
          imgUrl: battleInfo.headImg,
          battleInfoName: battleInfo.name,
          battleInfoContent: battleInfo.instruction,
          maxinum:battleInfo.maxinum,
          mininum:battleInfo.mininum,
          isOwner:battleInfo.isOwner
        });
      },
      fail: function () {
        callback.fail();
      }
    });
  },

  login:function(callback){
    request.requestLogin({
      success:function(){
        callback.success();
      },
      fail:function(){
        callback.fail();
      }
    });
  },

  copyChat:function(){
    var outThis = this;
    wx.setClipboardData({
      data: outThis.data.chat,
      success:function(){
        outThis.showToast("复制成功");
      }
    })
  },

  initMemberInfo:function(callback){
    var outThis = this;
    battleMemberInfoRequest.getBattleMemberInfo(battleId,roomId,{
      success:function(memberInfo){
        outThis.setData({
          status:memberInfo.status,
          isManager:memberInfo.isManager,
          roomId:roomId
        });
        battleMemberInfoRequest.setBattleMemberInfoFromCache(memberInfo);
        callback.success();
      },
      fail:function(){
        callback.fail();
      }
    });
  },

 //初始化参赛人员列表数据
  initBattleMembers:function(callback){
    var members = new Array();
    for(var i=0;i<40;i++){
      members.push({
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
      });
    }
    this.setData({
      members: members
    });
    var outThis = this;
    var roomId = this.data.roomId;
    var maxinum = this.data.maxinum;
    var num = 0;
    requestTarget = battleMembersRequest.getBattleMembers(battleId,roomId,{
      cache: function (battleMembers){
        var members = new Array();
        var length = 0;
        if (battleMembers != null && battleMembers.length>0){
          length = battleMembers.length;
          num = length;
          for (var i = 0; i < battleMembers.length; i++) {
            members.push({
              imgUrl: battleMembers[i].headImg
            });
            
          }
        }
        for (var i = 0; i < maxinum - length; i++) {
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members,
          num:num
        });
      },
      success: function (battleMembers) {
       battleTakepartCache.members = battleMembers;
       callback.success(battleMembers);
       
        var length = battleMembers.length;
        var num =  length;
        var members = new Array();
        for (var i = 0; i < battleMembers.length;i++){
          members.push({
            imgUrl: battleMembers[i].headImg
          });
        }
        for (var i = 0; i < maxinum-length;i++){
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members,
          num:num
        });

        var mininum = outThis.data.mininum;

        if (mininum <= num) {
          requestTarget.stop();
        }

      },
      fail: function () {
        callback.fail();
      }
    },15000);
  },

  managerClick:function(){
    wx.navigateTo({
      url: '../manager/battleInfoManager/battleInfoManager?battleId='+battleId
    });
  },

  skipToProgress:function(){
    wx.navigateTo({
      url: '../progressScore/progressScore?model=0&battleId='+battleId+"&roomId="+roomId
    });
  },

  //点击参赛请求
  takepartClick:function(){
    var outThis = this;
    var members = outThis.data.members;
    var num = this.data.num;
    var mininum = this.data.mininum;
    var maxinum = this.data.maxinum;
    var status = this.data.status;
    if(num>=maxinum&&status==0){
      this.showToast("人数已满，不能参加");
      return;
    }
    this.showLoading();
    takepartRequest.battleTakepart(battleId,roomId,{
      success:function(member){
        num++;
        outThis.hideLoading();
        outThis.showToast("报名成功");
        members.splice(num-1,1,{
          imgUrl: member.headImg
        });
        outThis.setData({
          members: members,
          num:num,
          status:1
        });
        if (mininum<=num){
          requestTarget.stop();
        }
        var battleMembers = battleTakepartCache.members;

        battleMembers.push(member);

        battleTakepartCache.members = battleMembers;

        //outThis.skipToProgress();
      },
      fail:function(errorMsg){
        outThis.hideLoading();
        if (!errorMsg){
          outThis.showToast("网络繁忙");
        }else{
          outThis.showToast(errorMsg);
        }
      },
      battleIn:function(){
        outThis.hideLoading();
        outThis.skipToProgress();
      },
      battleEnd:function(){
        outThis.hideLoading();
        outThis.skipToProgress();
      },
      roomEnd:function(){
        outThis.hideLoading();
        outThis.showToast("比赛已经结束");
      },
      roomFull:function(){
        outThis.hideLoading();
        outThis.showToast("房间已满");
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    roomId = options.roomId;
    battleId = options.battleId
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    requestTarget.stop();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.battleInfoName,
      desc: this.data.battleInfoContent,
      path: this.data.path
    }
  }
});
layerout.begin();