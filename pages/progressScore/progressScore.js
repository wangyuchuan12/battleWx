var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var battleMembersRequest = require("../../utils/battleMembersRequest.js");
var battleInfoRequest = require("../../utils/battleInfoRequest.js");
var cacheUtil = require("../../utils/cacheUtil.js");
var battleStageTakepartRequest = require("../../utils/battleStageTakepartRequest.js");

var currentLoveCoolingRequest = require("../../utils/currentLoveCoolingRequest.js");

var questionAnswerRequest = require("../../utils/questionAnswerRequest.js");
var membersRankUtil = require("../../utils/membersRankUtil.js");
var progressScoreCache = require("../../utils/cache/progressScoreCache.js"); 
var battleTakepartCache = require("../../utils/cache/battleTakepartCache.js");

var syncPaperDateRequest = require("../../utils/syncPaperDateRequest.js");

var shareRequest = require("../../utils/shareRequest.js");
var outThis;
var requestTarget;

var redpackInterval;
var layerout = new baseLayerout.BaseLayerout({
  data:{
    title:"火影忍者",
    desc:"这是什么呢？",
    path:"pages/battleTakepart/battleTakepart",
    questionSelectorDisplay:"none",
    questionResultDisplay:"none",
    displayPanel:0,
    battleId:0,
    subjectCount:3,
    stageIndex:0,
    rightCount:5,
    wrongCount:3,
    process:0,
    totalDistance:120,
    battleMemberPaperAnswerId:null,
    isLast:0,
    roomId:0,
    //是否处在运行状态
    isRun:0,
    rewardBeanTop:200,
    rewardBeanDisplay:"none",
    rewardBean:0,
    redPackWidth:50,
    redPackHieght:50,
    isShare:0,
    shareAlert:0,
    "rewardBean": 0,
    "addExp": 0,
    memberInfo:null,
    isStart:0
  },
  eventListener:{

    againClick:function(){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.restart();
      wx.navigateBack({
        
      });
    },

    questinResultClose:function(){
      outThis.setData({
        "questionResultDisplay": "none",
        "displayPanel": 1
      });
    },
    

    questinSelectorClose:function(){
      outThis.setData({
        questionSelectorDisplay:"none"
      });
    },
    selectComplete:function(subjects,stageIndex){

      var subjectIds = new Array();

      for(var i=0;i<subjects.length;i++){
        subjectIds.push(subjects[i].targetId);
      }
      outThis.setData({
        stageIndex:stageIndex
      });
      var roomId = outThis.data.roomId;
      outThis.syncPaperData({
        success:function(data){
          if(!data){
            return;
          }

          var status = data.status;
          if(status==1||status==2){
            battleStageTakepartRequest.stageTakepart(outThis.data.battleId, subjectIds, roomId, {
              success: function (data) {
                var ids = data.questionIds;
                var questionIds = "";
                var isLast = data.isLast;
                outThis.setData({
                  isLast: isLast
                });
                for (var i = 0; i < ids.length; i++) {
                  var questionId = ids[i];
                  if (!questionIds) {
                    questionIds = questionId;
                  } else {
                    questionIds = questionIds + "," + questionId;
                  }
                }
                wx.navigateTo({
                  url: '../questionInfo/questionInfo?questionIds=' + questionIds + "&stageIndex=" + stageIndex + "&roomId=" + roomId,
                });

              },
              fail: function () {
                console.log("fail");
              }
            });
          }
        },
        fail:function(){

        }
      });
    }
  },

  scrollEvent:function(){
    var outThis = this;
    var isRun = this.data.isRun;
    if(isRun==1){
      setTimeout(function(){
        outThis.setData({
          isRun:0
        });
      },200);
    }else{
      this.setData({
        isRun:1
      });
    }
  },

  skipToRank: function () {
    var roomId = this.data.roomId;
    var groupId = this.data.groupId;
    wx.navigateTo({
      url: '../battleRank/battleRank?battleId=' + this.data.battleId+"&roomId="+roomId+"&groupId="+groupId
    });
  },

  skipToTakepart:function(){
    /*wx.redirectTo({
      url: '../battleTakepart/battleTakepart?battleId=' + this.data.battleId+"&roomId="+this.data.roomId
    });*/
    wx.navigateBack({
      
    });
  },

  roomAlert:function(roomScore){
    var outThis = this;
    var memberInfo = this.data.memberInfo;

    if(!roomScore){
        roomScore = memberInfo.roomScore;
    }

    this.setRoomPercent(roomScore, memberInfo.scrollGogal);
    if (memberInfo.status == 2 || memberInfo.roomStatus == 3) {
      var members = outThis.getMembers();
      this.setData({
        isLast: 1
      });

      var battleId = this.data.battleId;
      var roomId = this.data.roomId;
      var groupId = this.data.groupId;

      battleMembersRequest.getBattleMembers(battleId, roomId, {
        cache: function (battleMembers) {

        },
        success: function (battleMembers) {

          membersRankUtil.rankByProcess(battleMembers);

          for(var i=0;i<battleMembers.length;i++){
            var battleMember = battleMembers[i];
            if(battleMember.id==memberInfo.id){
              var rewardBean = battleMember.rewardBean;
              if (!rewardBean){
                rewardBean = 0;
              }
              outThis.setData({
                questionSelectorDisplay: "none",
                questionResultDisplay: "none"
              });
              if(memberInfo.places>=i+1){
                setTimeout(function(){
                  outThis.showFullAlert("比赛已经结束", "胜利，第" + (i + 1) + "名", rewardBean, "确定");
                },2000);
                return;
              }else{
                setTimeout(function () {
                  outThis.showFullAlert("比赛已经结束", "失败，第"+(i+1)+"名", rewardBean, "确定");
                },2000);
                return;
              }
              /*if (battleMembers && battleMembers.length>2){
                outThis.showFullAlert("比赛已经结束", "您获取第" + (i + 1) + "名", rewardBean, "确定");
              }else{
                if(i==0){
                  
                }else{
                  
                }
              }*/
              
            }
          }
        },
        fail: function () {

        }
      },null,groupId);

      
    }
    
  },

  processUpdate:function(callback){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var groupId = this.data.groupId;
    requestTarget = battleMembersRequest.getBattleMembers(battleId, roomId, {
      cache: function (battleMembers) {
        
      },
      success: function (battleMembers) {
        var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
        var oldBattleMembers = outThis.getMembers();
        membersRankUtil.rankByProcess(battleMembers);
        outThis.setMembers(battleMembers);
        for(var i=0;i<battleMembers.length;i++){
          for(var j=0;j<oldBattleMembers.length;j++){
            var battleMember = battleMembers[i];
            var oldBattleMember = oldBattleMembers[j];
            if (battleMember.id == oldBattleMember.id&&battleMember.id!=memberInfo.id){
             var isRun = outThis.data.isRun;
             if(isRun==0){
              outThis.trendBetween(battleMember.id, oldBattleMember.process, battleMember.process, {
                success: function () {
                  if(callback){
                    callback.success();
                  }
                },
                fail: function () {

                }
              }, false);
             }else if(isRun==1){
               outThis.location(battleMember.id, battleMember.process);
             }
              break;
            }
          }
        }
      },
      fail: function () {
        
      }
    }, 150000, groupId);
  },

  closeDisplayPanel:function(){
    this.setData({
      displayPanel:0
    });
  },

  showRewardBean:function(rewardBean){
    var outThis = this;
    var top = 200;
    this.setData({
      rewardBean:rewardBean,
      rewardBeanDisplay: "block",
      rewardBeanTop:top
    });
    var interval = setInterval(function(){
      top=top-10;
      if(top>0){
        outThis.setData({
          rewardBeanTop: top
        });
      }else{
        setTimeout(function(){
          outThis.setData({
            rewardBeanDisplay: "none"
          });
        },4000);
        clearInterval(interval);
      }
      
    },50);
  },

  redPackButtonClick:function(){
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    wx.navigateTo({
      url: '../welfare/welfare?model=0&battleId=' + battleId + "&roomId=" + roomId
    });
  },

  startResult: function (rightCount, wrongCount, process, battleMemberPaperAnswerId, rewardBean, isPass){
    this.initLoveCooling();

    outThis.setData({
      isRun: 1
    });

    if(isPass==1){
      this.showRewardBean(rewardBean);
    }
    var begin = this.getProcess();
    var end = begin + process;
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    
    outThis.setProgress(end);

    this.setData({
      questionSelectorDisplay: "none",
      questionResultDisplay: "none",
      displayPanel: 1,
      rightCount: rightCount,
      wrongCount: wrongCount,
      process:process,
      battleMemberPaperAnswerId: battleMemberPaperAnswerId,
      stageIndex: memberInfo.stageIndex
    });

    var loveLimit = outThis.getLoveLimit();
    var loveCount = outThis.getLoveCount();
    if(!loveLimit||loveLimit<0){
      loveLimit = 0;
    }

    loveCount = loveCount - wrongCount;
    if(loveCount<0){
      loveCount = 0;
    }

   // outThis.setLove(loveLimit,loveCount);
    setTimeout(function(){
      outThis.syncPaperData();
    },1000);
    setTimeout(function(){
      
      outThis.trendBetween(memberInfo.id, begin, end, {
        success: function () {
          outThis.setData({
            isRun: 0
          });
          if (outThis.data.isLast == 1) {
        //    outThis.showQuestionResult();
          // outThis.skipToRank();
           // outThis.showAlert();  
          }else{
          //  outThis.showQuestionResult();
            
          }
        },
        fail: function () {

        }
      },true);
    },100);
  },

  showQuestionResult:function(){
    var battleMemberPaperAnswerId = this.data.battleMemberPaperAnswerId;
    var outThis = this;
    this.initQuestionResultData(battleMemberPaperAnswerId,{
      success:function(){
        outThis.hideLoading();
        outThis.syncPaperData({
          success:function(data){
           
          }
        });
      },
      fail:function(){
        outThis.hideLoading();
      }
    });
  },

  initQuestionResultData: function (battleMemberPaperAnswerId, callback) {
    var outThis = this;
    questionAnswerRequest.requestQuestionResults(battleMemberPaperAnswerId, {
      success: function (data) {
        outThis.setData({
          "questionResultDisplay": "block",
          "displayPanel":0,
          "rewardBean":data.rewardBean,
          "addExp":data.addExp
        });

       var results = data.questionAnswers;

        var items = new Array();
        for (var i = 0; i < results.length; i++) {
          var options;
          if (results[i].options) {
            options = results[i].options.split(",");
          }
          items.push({
            question: results[i].question,
            type: results[i].type,
            answer: results[i].answer,
            rightAnswer: results[i].rightAnswer,
            options: options,
            imgUrl: results[i].imgUrl
          });
        }
        callback.success();
        outThis.setItems(items);
      },
      fail: function () {
        callback.fail();
      }
    });
  },

  startSelector:function(){
    var loveCount = this.getLoveCount();
    if(!loveCount){
      var hour = this.getLoveCoolHour();
      var min = this.getLoveCoolMin();
      this.showToast("爱心恢复中,还剩"+hour+"时"+min+"分");
      var isShare = this.data.isShare;
      if (!isShare){
        this.setData({
          shareAlert: 1,
          isShare:1
        });
      }
      return;
    }
    var roomId = this.data.roomId;
   
    var battleId = this.data.battleId;
    var subjectCount = this.data.subjectCount;
    var outThis = this;
    this.initBattleSubjects(subjectCount, battleId,roomId,{
      success: function () {
        outThis.hideLoading();
        outThis.setData({
          questionSelectorDisplay: "block",
          displayPanel:0
        });
        outThis.showSelector();
      },
      isLast:function(){

      }
    });
  },

  redPackAnn:function(){
    var outThis = this;
    var redPackHeight = 50;
    var redPackWidth = 50;
    redpackInterval = setInterval(function(){
      if (redPackWidth>40){
        redPackHeight = redPackHeight-1;
        redPackWidth = redPackWidth-1;
      }else{
        redPackHeight = redPackHeight+5;
        redPackWidth = redPackWidth+5;
      }
      outThis.setData({
        redPackWidth: redPackWidth,
        redPackHeight: redPackHeight
      });
    },1000);
  },

  onReady:function(){
  },

  closeShareAlertPlug: function () {
    this.setData({
      shareAlert: 0
    });
  },

  initPositions:function(){
    var outThis = this;
    var battleInfo = battleInfoRequest.battleInfo;
    var members = this.data.members;
    var memberInfo = this.data.memberInfo;
    var process = memberInfo.process;
    if (!process) {
      process = 0;
    }

    var positions = new Array();
    for (var i = 0; i < members.length; i++) {
      var member = members[i];
      var isMy = 0;
      if (member.id == memberInfo.id) {
        isMy = 1;
      }
      positions.push({
        id: member.id,
        imgUrl: member.headImg,
        animationData: {},
        begin: member.process,
        end: 0,
        isMy: isMy
      });
    }
    progressScoreCache.process = process;
    progressScoreCache.positions = positions;
    setTimeout(function(){
      outThis.setPositions(positions);
    },2000);
    
    outThis.containerScrollToDom(process);
    outThis.location(memberInfo.id, process);
  },

  initLoveCooling:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    currentLoveCoolingRequest.currentLoveCooling(battleId,roomId,{
      success:function(data){
        outThis.showLoveCooling(data);
        outThis.setLove(data.loveCount, data.loveResidule);
      },
      fail:function(){
        console.log("initLoveCooling fail");
      }
    });
  },

  mallClick:function(){
    wx.navigateTo({
      url: '../mall/mall'
    });
  },

  onShow: function () {
    this.initAccountInfo();
    var outThis = this;
  },

  onUnload: function () {
  //  requestTarget.stop();
  //  clearInterval(redpackInterval);
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.initRoomInfoFromRequest){
      prevPage.initRoomInfoFromRequest();
    }

    if (prevPage.backListener){
      prevPage.backListener();
    }
    
  },

  onHide: function () {
    if (requestTarget && requestTarget.stop){
      requestTarget.stop();
    }
  },

  syncPaperData:function(callback){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var groupId = this.data.groupId;
    syncPaperDateRequest.syncPapersData(battleId,roomId,{
      success:function(data){
        if(callback){
          callback.success(data);
        }
        var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
        memberInfo.endType = data.endType;
        memberInfo.roomStatus = data.status;
        memberInfo.roomScore = data.roomScore;
        outThis.setData({
          memberInfo:memberInfo
        });
        outThis.roomAlert(memberInfo.roomScore);
        outThis.setScore(data.score);
        var battleMembers = data.members;
        var oldBattleMembers = outThis.getMembers();
        membersRankUtil.rankByProcess(battleMembers);
        outThis.setMembers(battleMembers);
        for (var i = 0; i < battleMembers.length; i++) {
          for (var j = 0; j < oldBattleMembers.length; j++) {
            var battleMember = battleMembers[i];
            var oldBattleMember = oldBattleMembers[j];
            if (battleMember.id == oldBattleMember.id && battleMember.id != memberInfo.id) {
              var isRun = outThis.data.isRun;
              if (isRun == 0) {
                outThis.trendBetween(battleMember.id, oldBattleMember.process, battleMember.process, {
                  success: function () {
                    if (callback) {
                      callback.success();
                    }
                  },
                  fail: function () {

                  }
                }, false);
              } else if (isRun == 1) {
                outThis.location(battleMember.id, battleMember.process);
              }
              break;
            }
          }
        }
      },
      fail:function(){
        
      }
    }, groupId)
  },

  onShareAppMessage: function () {
    /*var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var path = "pages/battleTakepart/battleTakepart?battleId=" + battleId + "&roomId=" + roomId
    this.setData({
      displayPanel:0
    })
    return {
      title: "答题比赛",
      desc: "来跟我一起比赛吧",
      url: path,
      success:function(){
        shareRequest.shareInProgress(battleId,roomId,{
          success:function(data){
            outThis.setData({
              shareAlert: 0,
              displayPanel: 1
            });
            var loveLimit = outThis.getLoveLimit();
            outThis.setLove(loveLimit, data.loveResidule);
            
          },
          fail:function(){

          }
        });
      }
    }*/
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var memberInfo = this.data.memberInfo;
    var userId = memberInfo.userId;
    var path = "pages/battleTakepart/battleTakepart?battleId=" + battleId + "&roomId=" + roomId;
    if(memberInfo.isDanRoom==1){
      path = "pages/battleHome/battleHome3?skipType=1&registUserId="+userId;
    } else if (memberInfo.isFrendGroup==1){
      path = "pages/battleHome/battleHome3?skipType=0&registUserId=" + userId;
    }else{

    }
    
    return {
      title: outThis.data.title,
      desc: outThis.data.desc,
      path: path,
      success:function(){
        shareRequest.shareInProgress(battleId, roomId, {
          success: function (data) {
            outThis.setData({
              shareAlert: 0,
              displayPanel: 1,
              isShare:1
            });
            var loveLimit = outThis.getLoveLimit();
            outThis.setLove(loveLimit, data.loveResidule);

          },
          fail: function () {

          }
        });
      }
    }
  },

  onLoad: function (options) {

 //   this.redPackAnn();

    var againButton = options.againButton;
    if (againButton){
      this.setData({
        "baseData.againButton": againButton
      });
    }

    setTimeout(function () {
      /*outThis.processUpdate({
        success: function () {

        }
      });*/

    }, 2000);
    outThis = this;

    var roomId = options.roomId;

    var battleId = options.battleId;

    
    
    var model = options.model;
    var battleId = options.battleId;

    var groupId = options.groupId;

    if(!groupId){
      groupId = "";
    }

    if(battleId){
      wx.setStorageSync("battleId", battleId);
    }else{
      battleId = wx.getStorageSync("battleId");
    }
    this.setDistance(120);
    this.setData({
      title: options.title,
      desc:options.desc,
      battleId:battleId,
      roomId: roomId,
      groupId: groupId
    });

    battleMemberInfoRequest.getBattleMemberInfo(battleId,roomId,{
      success:function(memberInfo){
        battleMembersRequest.getBattleMembers(battleId, roomId, {
          cache: function (battleMembers) {

          },
          success: function (battleMembers) {
            outThis.loadPreProgress({
              complite:function(){
                outThis.setData({
                  isStart:1
                });
              }
            });
            membersRankUtil.rankByProcess(battleMembers);
            outThis.setMembers(battleMembers);
            outThis.setData({
              members: battleMembers,
              memberInfo: memberInfo
            });

           

            outThis.initPositions();
          },
          fail: function () {

          }
        }, null, groupId);




        outThis.setLove(memberInfo.loveCount, memberInfo.loveResidule);
        outThis.setProgress(memberInfo.process);

        outThis.initLoveCooling();
        outThis.setData({
          memberInfo:memberInfo
        });

        outThis.setScore(memberInfo.score);

        outThis.setScrollGogal(memberInfo.scrollGogal);

        outThis.roomAlert();

        outThis.setData({
          memberInfo: memberInfo
        });


        if (memberInfo.shareTime > 0) {
          outThis.setData({
            isShare: 1
          });
        }
      },
      fail:function(){
        console.log("fail");
      }
    });

    
  }
  
});

layerout.addAttrPlug();
layerout.addProgressScorePlug();
layerout.addQuestionSelector();
layerout.addProgressScoreMember();
layerout.addQuestionResult();
layerout.begin();