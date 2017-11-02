var accountRequest = require("../../../utils/accountRequest.js");
var attrPlug = {
  data: {
    attrPlugData:{
      wisdomCount:0,
      loveLife:0,
      masonry:0,
      amountBalance:0
    }
  },
  initAccountInfo:function(){
    var outThis = this;
    accountRequest.accountInfo({
      success:function(account){
        outThis.setData({
          "attrPlugData.wisdomCount": account.wisdomCount,
          "attrPlugData.loveLife": account.loveLife,
          "attrPlugData.masonry": account.masonry,
          "attrPlugData.amountBalance": account.amountBalance
        });
      },
      fail:function(){

      }
    });
  }
}

module.exports = {
  attrPlug: attrPlug
}