// pages/login/login.js
Page({
  data:{},
  weixinLogin:function(){
    wx.showToast({
      title:'正在登录',
      icon:'loading',
      duration:10000
    });
    wx.login({
      success: function(res){
        wx.getUserInfo({
          success: function(res){
            wx.redirectTo({
              url: '../me/me?avatarUrl='+res.userInfo.avatarUrl+'&nickName='+res.userInfo.nickName
            })
          },
          fail: function() {
            wx.showToast({
              title:"获取信息失败",
              duration:1000
            });
          },
          complete:function(){
             wx.hideToast();
          }
        })
      },
      fail: function() {
        wx.showToast({
          title:"登录失败",
          duration:1000
        });
      }
    })
  },
  submit:function(e){
    console.log(e.detail.value);
    if(e.detail.value.username ==='admin' && e.detail.value.password === 'admin'){
      wx.redirectTo({
              url: '../me/me?avatarUrl="../img/nav2.png"&nickName='+e.detail.value.username
      });
    }
  }
})