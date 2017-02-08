//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navId1:'txt1',
    navId2:'txt2',
    navId3:'txt3',
    navId4:'txt4',
    navStyle1:'active',
    navStyle2:'notactive',
    navStyle3:'notactive',
    navStyle4:'notactive',
    autoplay:true,
    interval:6500,
    duration:6000,
    interval2:7500,
    duration2:7000,
    hotMovies:[],
    comingMovies:[],
    list:[],
    currentIndex:0,
  },
  //事件处理函数
  search:function(){
    wx.navigateTo({
      url:"../search/search"
    });
  },
  itemClick:function(e){
    wx.navigateTo({
      url:"../itemDetail/itemDetail?id="+e.currentTarget.id,
    });
    console.log(e.currentTarget.id);
  },
  navClick: function(e) {
    this.setData({
      navStyle1:'notactive',
      navStyle2:'notactive',
      navStyle3:'notactive',
      navStyle4:'notactive',
    });
    app.getData('top250');
    switch(e.target.id){
      case 'txt1':
        this.setData({
          navStyle1:'active',
        });
        break;
      case 'txt2':
        this.setData({
          navStyle2:'active',
        });
        break;
      case 'txt3':
        this.setData({
          navStyle3:'active',
        });
        break;
      case 'txt4':
        this.setData({
          navStyle4:'active',
        });
        break;      
    }
    console.log(e.target.id);
  },
  onLoad: function () {
    var that = this;
    app.getHotmove('in_theaters',function(data){
      console.log(data);
      that.setData({
        hotMovies:data
      });
    });
    app.getHotmove('coming_soon',function(data){
      console.log(data);
      that.setData({
        comingMovies:data
      });
    });
    
  },
  onReachBottom:function(){
    console.log('bottom');
    wx.showToast({
      title: '拼命加载中',
      icon: 'loading',
      duration: 10000,
    });
    var that = this;
    app.getData('top250',this.data.currentIndex,function(data){
      console.log(data);
      that.setData({
        list:that.data.list.concat(data),
        currentIndex:(that.data.currentIndex + 5),
      });
      wx.hideToast();
    });
  },

})
