// pages/me/me.js
Page({
  data:{
    collect:'collect',
    userinfo:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    this.setData({
      userinfo:options
    });
    // var  that = this;
    // wx.login({
    //   success: function(res){
    //     wx.getUserInfo({
    //       success: function(res){
    //         console.log(res.userInfo);
    //         that.setData({
    //           userinfo:res.userInfo
    //         });
    //       },
    //       fail: function() {
    //         wx.showToast({
    //           title:"获取信息失败",
    //           duration:1000
    //         });
    //       },
    //     })
    //   },
    //   fail: function() {
    //     wx.showToast({
    //       title:"登录失败",
    //       duration:1000
    //     });
    //   }
    // })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})