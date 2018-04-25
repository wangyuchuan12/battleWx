var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var battleMembersRequest = require("../../utils/battleMembersRequest.js");

var battleStageTakepartRequest = require("../../utils/battleStageTakepartRequest.js");
var questionRequest = require
("../../utils/questionRequest.js");
var membersRankUtil = require("../../utils/membersRankUtil.js");

var questionAnswerRequest = require("../../utils/questionAnswerRequest.js");

var battleSyncDataRequest = require("../../utils/battleSyncDataRequest.js");

var battleNoticeRequest = require("../../utils/battleNoticeRequest.js");

var battleGiftRequest = require("../../utils/battleGiftRequest.js");

var socketUtil = require("../../utils/socketUtil.js");

var takepartRequest = require("../../utils/takepartRequest.js");

var outThis;

var waitInterval;

var questionSelector;

var receiveMemberNoticeCallback;
var receiveRoomNoticeCallback;
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    //答题结果显示
    questionResultDisplay:"none",
    //用户信息
    memberInfo:null,
    //用户数量
    members:null,
    //用户当前的进程
    process:0,
    //在地图上的的位置坐标
    positions:null,
    //是否已经结束
    isLast:0,
    //0普通 1自动
    selectorType: 1,

    //总共需要选择的主题数量
    subjectCount:3,
    roomId:null,
    battleId: null,

    isRankShow:0,

    //0为正常状态 1位答题状态 2等待模式
    mode:0,

    isEnd:0,

    isRest:0,

    questionData:{
      imgUrl: "",
      content: "答题开始",
      percent: 0,
      questionId: 0,
      rightCount: 0,
      wrongCount: 0,
      process: 0,
      rewardBean: 0,
      stageIndex:0,
      rewardBean:0,
      addExp:0
    }
  },


  eventListener: {

    questinSelectorClose:function(){
      outThis.setData({
        questionSelectorDisplay:"none"
      });
    },
    inputSubmit: function (questionId, answer) {
      outThis.showLoading();
      var memberInfo = outThis.data.memberInfo;
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type: 0,
        memberId: memberInfo.id,
        battleId: memberInfo.battleId,
        stageIndex: memberInfo.stageIndex,
        answer: answer,
        roomId: memberInfo.roomId
      }, {
          success: function (data) {

            outThis.answerResultHandle(data);
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    },

    againClick: function () {
      /*var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      if (prevPage.restart) {
        prevPage.restart();
      }*/
      wx.navigateBack({

      });
    },
    
    fillSubmit: function (questionId, answer) {
      outThis.showLoading();
      var memberInfo = outThis.data.memberInfo;
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type: 0,
        memberId: memberInfo.id,
        battleId: memberInfo.battleId,
        stageIndex: memberInfo.stageIndex,
        answer: answer,
        roomId: memberInfo.roomId
      }, {
          success: function (data) {
          
            outThis.answerResultHandle(data);
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    },
    selectSubmit: function (questionId, optionId) {
      outThis.showLoading();
      var memberInfo = outThis.data.memberInfo;
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type: 0,
        memberId: memberInfo.id,
        battleId: memberInfo.battleId,
        stageIndex: memberInfo.stageIndex,
        optionId: optionId,
        roomId: memberInfo.roomId
      }, {
          success: function (data) {
            outThis.answerResultHandle(data);
          },
          fail: function () {
            outThis.hideLoading();
          }
        });

    },

    selectComplete: function (subjects) {
      outThis.questinSelectorClose();
      var subjectIds = new Array();

      for (var i = 0; i < subjects.length; i++) {
        subjectIds.push(subjects[i].targetId);
      }
      var roomId = outThis.data.roomId;
      outThis.showLoading();
      

      battleStageTakepartRequest.stageTakepart(outThis.data.battleId, subjectIds, roomId, {
        beanNotEnough: function () {
          outThis.hideLoading();
          outThis.showBeanNotEnoughAlertPlug();
          outThis.questinSelectorClose();
        },
        success: function (data) {
          outThis.questinSelectorClose();
          var costBean = data.costBean;
          if (costBean) {
            outThis.showToast("消耗" + costBean + "豆豆");
            outThis.subBean(costBean);
          }
          outThis.hideLoading();
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
          setTimeout(function () {
            outThis.initQuestionsView(questionIds.split(","));
          }, 2000);

        },
        fail: function () {
          outThis.questinSelectorClose();
          outThis.hideLoading();
          console.log("fail");
        }
      });


    }
  },

  showEnd:function(){
    var outThis = this;
    var memberInfo = this.data.memberInfo;
    var roomStatus = memberInfo.roomStatus;
    var status = memberInfo.status;
    var rewardBean = memberInfo.rewardBean;
    var rewardLove = memberInfo.rewardLove;
    var rank = memberInfo.rank;
    if(roomStatus==3){
      this.hideLoading();
      outThis.setData({
        mode: 0
      });
      if (rank <= memberInfo.places){
        outThis.showFullAlert("比赛已经结束", "胜利，第" + rank + "名", rewardBean, rewardLove, "确定");
        outThis.initAccountInfo({
          success:function(){

          }
        });
      }else{
        outThis.showFullAlert("比赛已经结束", "失败，第" + rank + "名", rewardBean, rewardLove, "确定");
        outThis.initAccountInfo({
          success: function () {

          }
        });
      }
      
      outThis.setData({
        isLast: 1
      });
    }else{
      outThis.startSelector();
    }
  },

  lovePaySuccess:function(){
    var outThis = this;
    this.initAccountInfo({
      success:function(){
        outThis.supplyLoveClick({
          success:function(){
            outThis.battleSyncData();
          },
          fail:function(){
            outThis.battleSyncData();
          }
        });
      }
    });
  },

  answerResultHandle:function(data){
    var members = this.getMembers();
    var memberInfo = this.data.memberInfo;
    for(var i=0;i<members.length;i++){
      var member = members[i];
      if (member.id == memberInfo.id){
        member.score = data.memberScore;
        member.loveResidule = data.loveResidule;
      }
    }
    var outThis = this;
    outThis.setData({
      "questionData.process": data.process,
      "members":members
    });

    outThis.showMembers();

    outThis.setScore(data.memberScore);

    if (!data.right) {
      var loveLimit = outThis.getLoveLimit();
      var loveCount = outThis.getLoveCount();
      if (!loveLimit || loveLimit < 0) {
        loveLimit = 0;
      }
      if (!loveCount || loveCount < 0) {
        loveCount = 0;
      }
      loveCount--;
      outThis.setLove(loveLimit, loveCount);

      if(loveCount<=0){
        outThis.setData({
          questionSelectorDisplay: "none",
          mode:0
        });
        outThis.battleSyncData();
      }else{
        questionSelector.next();
        outThis.empty();
      }
    }else{
      questionSelector.next();
      outThis.empty();
    }
    
  },

  battleSyncData:function(){
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    battleSyncDataRequest.requestSyncPaperData(battleId,roomId,{
      success:function(data){
        var memberInfo = outThis.data.memberInfo;
        memberInfo.roomStatus = data.roomStatus;
        memberInfo.rewardBean = data.rewardBean;
        memberInfo.rewardLove = data.rewardLove;
        memberInfo.rank = data.rank;
        outThis.setData({
          memberInfo:memberInfo
        });
        outThis.showEnd();
      },
      fail:function(){
        console.log(".............fail");
      }
    });
  },

  startProcessTo:function(memberId,toProcess,callback){
    var positions = this.getPostions();
    var members = this.getMembers();
    var begin = 0;
    var thisMember;
    for (var i = 0; i < members.length; i++) {
      var member = members[i];
      if (member.id == memberId) {
        begin = member.process;
        thisMember = member;
      }
    }
    var end = toProcess;
    if (end > begin){
      thisMember.process = end;
      this.setData({
        members: members
      });
      this.showMembers();
      outThis.trendBetween(memberId, begin, end, {
        success: function () {
          if (callback && callback.success) {
            callback.success(end);
          }
        },
        step: function (index) {
          console.log("index:" + index)
        }
      });
    }
    
  },

  startProcess:function(memberId,process,callback){
    var positions = this.getPostions();
    var members = this.data.members;
    var begin = 0;
    var thisMember;
    for(var i=0;i<members.length;i++){
      var member = members[i];
      if (member.id==memberId){
        begin = member.process;
        thisMember = member;
      }
    }
    var end = begin+process;
    thisMember.process = end;
    this.setData({
      members:members
    });
    this.showMembers();
    outThis.trendBetween(memberId, begin, end, {
      success:function(){
        if(callback&&callback.success){
          callback.success(end);
        }
      },
      step:function(index){
        console.log("index:"+index)
      }
    });
  },

  startSelector: function (e) {
    var isLast = this.data.isLast;
    if (isLast) {
      return;
    }

    this.receiveGift();

    var memberInfo = this.data.memberInfo;
    var outThis = this;
    this.showLoading();
    var loveCount = this.getLoveCount();
    if (!loveCount) {
      var hour = this.getLoveCoolHour();
      var min = this.getLoveCoolMin();
      var second = this.getLoveCoolSecond();
      outThis.hideLoading();
      /*this.showToast("爱心恢复中,还剩" + hour + "时" + min + "分" + second + "秒");
      var isShare = this.data.isShare;
      if (!isShare) {
        this.setData({
          shareAlert: 1,
          isShare: 1
        });
      }*/
      return;
    }

    
    if (memberInfo.status == 2 || memberInfo.roomStatus == 3) {
      outThis.hideLoading();
      return;
    }
    var roomId = this.data.roomId;

    var battleId = this.data.battleId;
    var subjectCount = this.data.subjectCount;
    var selectorType = this.data.selectorType;
    var outThis = this;
    this.initBattleSubjects(subjectCount, battleId, roomId, {
      success: function () {
        outThis.hideLoading();
        outThis.setData({
          questionSelectorDisplay: "block",
          displayPanel: 0
        });
        outThis.showSelector();
      },
      isLast: function () {

      }
    }, selectorType);
  },

  setFillData: function (data) {

    this.setData({
      "questionData.imgUrl": data.imgUrl,
      "questionData.content": data.question
    });

    var answer = data.answer;
    this.hideLoading();
    this.setQuestionId(data.id);
    this.fillWorld(null, answer.length);
    this.fillWorldCheck(data.fillWords);
    this.setType(2);
  },


  setSelectData: function (data) {

    this.setData({
      "questionData.imgUrl": data.imgUrl,
      "questionData.content": data.question
    });
    this.hideLoading();

    this.setQuestionId(data.id);
    this.setType(0);
    var array = new Array();
    var options = data.options;
    if (options) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        array.push({
          id: option.id,
          content: option.content,
          isRight: option.isRight
        });
      }
      this.setOptions(array);
    }
  },

  setInputData: function (data) {

    this.setData({
      "questionData.imgUrl": data.imgUrl,
      "questionData.content": data.question,
      "questionInputData.answer": ""
    });
    this.hideLoading();
    this.setQuestionId(data.id);
    this.setRightAnswer(data.answer);
    this.setType(1);
  },

  setSelectData: function (data) {

    this.setData({
      "questionData.imgUrl": data.imgUrl,
      "questionData.content": data.question
    });
    this.hideLoading();

    this.setQuestionId(data.id);
    this.setType(0);
    var array = new Array();
    var options = data.options;
    if (options) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        array.push({
          id: option.id,
          content: option.content,
          isRight: option.isRight
        });
      }
      this.setOptions(array);
    }
  },

  initQuestionsView: function (ids) {
    var outThis = this;

    var battleId = this.data.battleId;

    var roomId = this.data.roomId;

    questionSelector = new questionRequest.QuestionSelector(battleId, ids, roomId, {
      success: function (id, stageIndex) {
        questionSelector.next();
        outThis.setData({
          "questionData.process": 0
        });
      },
      fail: function () {
        questionSelector.next();
      }
    }, {
        step: function (data) {
          outThis.setData({
            mode:1,
            questionSelectorDisplay: "none"
          });
          if (data.type == 0) {
            outThis.setSelectData(data);
          }
          else if (data.type == 1) {
            outThis.setInputData(data);
          }
          else if (data.type == 2) {
            outThis.setFillData(data);
          }
        },
        complete: function () {

          outThis.setData({
            mode: 0
          });

          var process = outThis.data.questionData.process;
          var memberInfo = outThis.data.memberInfo;
      
          outThis.startProcess(memberInfo.id,process,{
            success:function(end){
              setTimeout(function () {
                outThis.containerScrollToDom(end);
              }, 1000); 
            }
          });

          var love = outThis.getLoveCount();
          var scrollGogal = outThis.getScrollGogal();
          var score = outThis.getScore();
          if (score >= scrollGogal){
            outThis.battleSyncData();
          }else if(love>0){
            outThis.battleSyncData();
          }else{
            /*
            outThis.loveCheck({
              confirm:function(){
                outThis.battleSyncData();
              },
              cancel:function(){
                outThis.battleSyncData();
              }
            });*/
            outThis.battleSyncData();
          }
         
        },
        fail: function () {
          questionSelector.next();
        }
      });
  },



  reckonTime: function () {
    var outThis = this;
    var flag = false;
    var memberInfo = this.data.memberInfo;
    var mininum = memberInfo.mininum;
    var timeDiffer = memberInfo.timeDiffer;
    var num = memberInfo.num;
    var isStart = memberInfo.isStart;
    if(isStart==1)
    {
      this.battleSyncData();
      this.setData({
        mode:0
      });
      outThis.stopLuying();
      setTimeout(function(){
        outThis.initPositions();
      },2000);
      return;
    }
    /*
    var interval = setInterval(function () {
      
      var hour = parseInt(timeDiffer / 3600);
      var min = parseInt((timeDiffer - hour * 3600) / 60);
      var second = timeDiffer - (hour * 3600 + min * 60);

      if (hour < 10) {
        hour = "0" + hour;
      }

      if (min < 10) {
        min = "0" + min;
      }

      if (second < 10) {
        second = "0" + second;
      }

      timeDiffer--;
      outThis.setData({
        timeDiffer: timeDiffer,
        remainderHour: hour,
        remainderMin: min,
        remainderSecond: second
      });
      if (timeDiffer <= 0 && num >= mininum) {
        clearInterval(interval);
        if (!flag) {
          flag = true;
          outThis.battleSyncData();
          outThis.initPositions();
          outThis.setData({
            mode: 0
          });
          return;

        }
      }

      flag = false;
    }, 1000);*/
  },

  registerBattleEndCodeCallback:function(){
    socketUtil.registerCallback("battleEndCode", {
      call: function (ranks) {
        var memberInfo = outThis.data.memberInfo;
        for (var i = 0; i < ranks.length; i++) {
          var rank = ranks[i];
          if (memberInfo.id == rank.memberId) {
            memberInfo.rank = rank.rank;
            memberInfo.roomStatus = 3;
            outThis.setData({
              memberInfo: memberInfo
            });
            outThis.showEnd();
            return;
          }
        }
      }
    });
  },

  registerRoomStartCodeCallback:function(){
    var outThis = this;
    socketUtil.registerCallback("roomStartCode", {
      call: function (room) {
        outThis.setData({
          mode:0
        });
        outThis.stopLuying();
        outThis.battleSyncData();
      }
    });
  },


  registerTakepartCodeCallback:function(){
    var outThis = this;
    socketUtil.registerCallback("takepartCode", {
      call: function (memberInfo) {
        var members = outThis.data.members;
        members.push(memberInfo);
        outThis.showMembers();
        outThis.initPositions();
      }
    });
  },

  registerProgressCodeCallback:function(){
    var outThis = this;
    socketUtil.registerCallback("progressCode", {
      call: function (callbackMembers) {
        var memberInfo = outThis.data.memberInfo;
        for (var i = 0; i < callbackMembers.length; i++) {
          var callbackMember = callbackMembers[i];
          var member = null;
          var members = outThis.getMembers();
          for (var i = 0; i < members.length; i++) {
            if (members[i].id == callbackMember.memberId) {
              member = members[i];
            }
          }

          if (member.process == callbackMember.process) {
            member.score = callbackMember.score;
            member.loveResidule = callbackMember.loveCount;
            if (callbackMember.roomStatus == 3) {
              memberInfo.roomStatus = callbackMember.roomStatus;
              outThis.setData({
                memberInfo: memberInfo
              });
              //outThis.showEnd();
            }

            outThis.setMembers(members);

          } else {
            outThis.startProcessTo(callbackMember.memberId, callbackMember.process, {
              success: function () {
                member.score = callbackMember.score;
                member.loveResidule = callbackMember.loveCount;
                if (callbackMember.roomStatus == 3) {
                  memberInfo.roomStatus = callbackMember.roomStatus;
                  outThis.setData({
                    memberInfo: memberInfo
                  });
                  //outThis.showEnd();
                }
                outThis.setMembers(members);

              }
            });
          }
        }
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var noWait = options.noWait;
    outThis = this;

    //等待模式
    if(!noWait){
      this.setData({
        mode: 2
      });
      waitInterval = setInterval(function () {
        outThis.luying();
      }, 1500);
    }else{
      this.setData({
        mode: 0
      });
    }
    

    this.registerProgressCodeCallback();

    this.registerBattleEndCodeCallback();

    this.registerTakepartCodeCallback();

    this.registerRoomStartCodeCallback();

    

    this.setData({
      isDekorn:1
    });

    this.initAccountInfo();

    this.loadPreProgress({
      complite: function () {
        
      }
    });

    var roomId = options.roomId;

    var battleId = options.battleId;
    this.setData({
      roomId:roomId,
      battleId: battleId
    });

    this.initMemberInfo({
      success:function(){
        outThis.initMembers({
          success: function () {
            outThis.showMembers();
            if(noWait){
              outThis.battleSyncData();
            }else{
              outThis.reckonTime();
            }
            /*setTimeout(function () {
             
              
             // outThis.battleSyncData();
            }, 5000);*/
            
          }
        });
      }
    });
    

    /*
    receiveMemberNoticeCallback = battleNoticeRequest.receiveMemberNoticeLoop(roomId,{
      success:function(notices){

        console.log("...notices1:" + JSON.stringify(notices));
        var isEnd = outThis.data.isEnd;
        setTimeout(function(){
          if(!isEnd){
            receiveMemberNoticeCallback.next();
          }
        },1000);
        for(var i=0;i<notices.length;i++){
          var notice = notices[i];
          outThis.startProcessTo(notice.memberId, notice.process, {
            success:function(){
              
            }
          });

          var members = outThis.getMembers();
          for(var i=0;i<members.length;i++){
            var member = members[i];
            if(member.id == notice.memberId){
              member.score = notice.score;
              //if (member.loveResidule > notice.loveResidule){
                member.loveResidule = notice.loveResidule;
              //}
            }
          }
          outThis.setMembers(members);
        }
      },
      fail:function(){
        var isEnd = outThis.data.isEnd;
        setTimeout(function () {
          if (!isEnd) {
            receiveMemberNoticeCallback.next();
          }
        }, 1000);
      }
    });

    receiveRoomNoticeCallback = battleNoticeRequest.receiveRoomNoticeLoop(roomId, {
      success: function (notices) {

        console.log("...notices2:"+JSON.stringify(notices));
        var isEnd = outThis.data.isEnd;
        setTimeout(function(){
          if(!isEnd){
            receiveRoomNoticeCallback.next();
          }
          
        },1000);
        if (notices && notices.length>0){
          var notice = notices[0];
          var memberInfo = outThis.data.memberInfo;
          memberInfo.roomStatus = notice.roomStatus;
          memberInfo.rewardBean = notice.rewardBean;
          memberInfo.rank = notice.rank;
          outThis.setData({
            memberInfo: memberInfo
          });
          outThis.showEnd();
        }
      },
      fail:function(){
        var isEnd = outThis.data.isEnd;
        setTimeout(function () {
          if (!isEnd) {
            receiveRoomNoticeCallback.next();
          }

        }, 1000);
      }
    });

    */
  },


  //关闭爱心不足，请求分享窗口
  closeShareAlertPlug: function () {
    this.setData({
      shareAlert: 0
    });
  },

  receiveGift: function () {
    var outThis = this;
    battleGiftRequest.receiveGift({
      success: function (data) {
        var bean = data.bean;
        var love = data.love;
        var count = data.count;
        outThis.showAlertPlug("今天第" + count + "次送您" + bean + "豆");
        outThis.initAccountInfo();
      },
      isReceive: function () {
        console.log("今天礼物已经领取完了");
      },
      unCondition: function () {
        console.log("领取不和条件");
      },
      fail: function () {

      }
    });
  },
  
  showMembers:function(){
    var members = this.data.members;
    membersRankUtil.rankByProcess(members);
    this.setMembers(members);
    var waitMembers = this.getWaitMembers();
    if(!waitMembers){
      waitMembers = new Array();
    }
    for (var i = 0; i < members.length; i++) {
      var member = members[i];
      var flag = false;
      for (var j = 0; j < waitMembers.length;j++){
        if(member.id==waitMembers.id){
          flag = true;
        }
      }
      if(!flag){
        var waitMember = new Object();
        waitMember.index = i + 1;
        waitMember.imgUrl = member.headImg;
        waitMember.id = member.id;
        waitMembers.push(waitMember);
      }
    }
    this.setWaitMembers(waitMembers);
  },

  initPositions: function () {
    var outThis = this;
    var members = this.data.members;
    if (!members){
      return;
    }
    var memberInfo = this.data.memberInfo;
    if(!memberInfo){
      return;
    }
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

    setTimeout(function () {
      outThis.setPositions(positions);
    }, 2000);
    outThis.containerScrollToDom(process);
    
  },

  initMemberInfo:function(callback){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    battleMemberInfoRequest.getBattleMemberInfo(battleId, roomId, {
      success:function(memberInfo){
        outThis.setData({
          memberInfo:memberInfo
        });

        console.log("memberInfo:"+JSON.stringify(memberInfo));

        outThis.setScore(memberInfo.score);

        outThis.setScrollGogal(memberInfo.scrollGogal);

        outThis.setLove(memberInfo.loveCount, memberInfo.loveResidule);

        callback.success();
      },
      fail:function(){

      }
    });
  },

  initMembers:function(callback){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var groupId = "";
    battleMembersRequest.getBattleMembers(battleId, roomId, {
      cache: function (battleMembers) {

      },
      success: function (battleMembers) {
        outThis.setData({
          members: battleMembers
        });
        callback.success();
      },
      fail: function () {

      }
    }, null, groupId);
  },

  loveCheck:function(callback){
    var love = this.getLoveCount();
    if(!love){
      this.showConfirm("你已经阵亡，是否补一颗爱心复活", "", {
        confirm: function () {
          if (callback) {
            
            outThis.supplyLoveClick({
              success:function(){
                callback.confirm();
              },
              fail:function(){
                callback.cancel();
              }
            });
          }
        },
        cancel: function () {
          if(callback){
            callback.cancel();
          }
        }
      }, "补充", "取消");
    }
  },

  skipToPk: function () {
    wx.navigateTo({
      url: '../pkRoom/pkRoom'
    });
  },

  skipToLuck: function () {
    wx.navigateTo({
      url: '../luckDraw/luckDraw'
    });
  },

  skipDanList: function () {
    wx.navigateTo({
      url: '../danList/danList'
    });
  },

  skipToRank: function () {
    var roomId = this.data.roomId;
    var groupId = this.data.groupId;
    wx.navigateTo({
      url: '../battleRank/battleRank?battleId=' + this.data.battleId + "&roomId=" + roomId + "&groupId=" + groupId
    });
  },

  signout: function () {
    /*wx.redirectTo({
      url: '../battleTakepart/battleTakepart?battleId=' + this.data.battleId+"&roomId="+this.data.roomId
    });*/
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];

        if (prevPage.signoutListener) {
          prevPage.signoutListener();
        }else{
          var battleId = this.data.battleId;
          var roomId = this.data.roomId;
          takepartRequest.battleSignout(battleId,roomId,{
            success:function(){

            },
            fail:function(){

            }
          });
        }

  },

  mallClick: function () {
    this.setData({
      isRest:1
    });
    wx.navigateTo({
      url: '../mall/mall'
    });
  },

  homeClick: function () {
    wx.navigateTo({
      url: '../battleHome/battleHome3'
    });
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
    this.setData({
      isRest:0
    });
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
    this.setData({
      isEnd: 1
    });
    var isRest = this.data.isRest;
    if (!isRest) {
      this.signout();
    }
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

  }
});

layerout.addAttrPlug();
layerout.addProgressScorePlug();
layerout.addQuestionSelector();
layerout.addProgressScoreMember();
layerout.addQuestionResult();
layerout.addBeanNotEnoughAlertPlug();
layerout.addAlertPlug();
layerout.addAircraftPlug();
layerout.addToastOutPlug();

layerout.addQuestionInputPlug();
layerout.addMemberWaitPlug();
layerout.begin();