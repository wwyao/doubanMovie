// pages/itemDetail/itemDetail.js
//获取应用实例
var app = getApp();
Page({
  data:{
    id:'',
    collectImg:'../../img/collect2.png',
    movieImg:'',
    title:'',
    year:'',
    movietype:'',
    country:'',
    originName:'',
    rate:'',
    ratePeople:'',
    summary:'',
    directors:[],
    actors:[],
    dataObj:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options.id);
    var that = this;
    // app.getDetailData('1764796',function(data){    
    app.getDetailData(options.id,function(data){
      // console.log(data);
      that.setData({
        id:options.id,
        movieImg:data.movieImg,
        title:data.title,
        year:data.year,
        movietype:data.genres,
        country:data.country,
        originName:data.originName,
        rate:data.rate,
        ratePeople:data.ratePeople,
        summary:data.summary,
        directors:data.directors,
        actors:data.casts,
        dataObj:data
      });
    });
  },
  clickFunction:function(){
   
    var collectInfo = wx.getStorageSync('collectInfo');
    if(collectInfo){
      collectInfo.push(this.data.dataObj);
      wx.setStorageSync('collectInfo',collectInfo);
    }else{
      var arr = [];
      arr.push(this.data.dataObj);
      wx.setStorageSync('collectInfo',arr);
    }
    this.setData({
      collectImg:'../../img/collect1.png'
    });
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: "豆瓣电影",
      desc: that.data.title,
      path: '/page/itemDetail/itemDetail?id='+that.data.id
    }
  }
})