// pages/search/search.js
Page({
  data:{
    placeholder:'输入电影名或导演名',
    searchResult:[],
    btn1:'动作',
    btn2:'喜剧',
    btn3:'爱情',
    btn4:'科幻',
    btn5:'悬疑',
    btn6:'恐怖',
    btn7:'剧情',
    btn8:'犯罪'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  },
  itemClick:function(e){
    wx.navigateTo({
      url:"../itemDetail/itemDetail?id="+e.currentTarget.id,
    });
    console.log(e.currentTarget.id);
  },
  btnClick:function(e){
    console.log(e.target.id);
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/search?tag='+e.target.id,
      data: {
      },
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
        var objArray = [];
        var tempObj = res.data.subjects;
        for(var i = 0;i < tempObj.length;i++){
          var obj = new Object();
          obj.imgSrc = tempObj[i].images.medium;
          obj.title = tempObj[i].title;
          obj.year = tempObj[i].year;
          obj.genres = tempObj[i].genres.join('、');
          obj.score = tempObj[i].rating.average;
          obj.id = tempObj[i].id;
          // console.log(obj.id);
          obj.actor = '';
          for(var j = 0;j < tempObj[i].casts.length;j++){
            obj.actor += tempObj[i].casts[j].name;
            if(j !== tempObj[i].casts.length-1){
              obj.actor += '、';
            }
          }
          objArray.push(obj);
        }
        that.setData({
          searchResult:objArray
        });
      },
    });
  },
  inputTextChange:function(e){
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/search?q='+e.detail.value,
      data: {
      },
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
        var objArray = [];
        var tempObj = res.data.subjects;
        for(var i = 0;i < tempObj.length;i++){
          var obj = new Object();
          obj.imgSrc = tempObj[i].images.medium;
          obj.title = tempObj[i].title;
          obj.year = tempObj[i].year;
          obj.genres = tempObj[i].genres.join('、');
          obj.score = tempObj[i].rating.average;
          obj.id = tempObj[i].id;
          obj.actor = '';
          for(var j = 0;j < tempObj[i].casts.length;j++){
            obj.actor += tempObj[i].casts[j].name;
            if(j !== tempObj[i].casts.length-1){
              obj.actor += '、';
            }
          }
          objArray.push(obj);
        }
        that.setData({
          searchResult:objArray
        });
      },
    });
    
  }
})