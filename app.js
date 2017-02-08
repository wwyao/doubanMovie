//app.js
App({
  data:{
    netData:[],
  },
  onLaunch: function () {
    
  },
  //get hot line data and coming movies
  getHotmove:function(key,callback){
    wx.request({
      url: 'https://api.douban.com/v2/movie/'+key,
      data: {
        city:'%22108288%22',
        count:30
      },
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
        var tempObj = res.data.subjects;
        var objArray = [];
        for(var i = 0;i < parseInt(tempObj.length/3);i++){
          var j = i * 3;
          var tempArray = new Array();
          while(j < tempObj.length && tempArray.length < 3){
            var obj = new Object();
            obj.imgSrc = tempObj[j].images.large;
            obj.title = tempObj[j].title;
            obj.id = tempObj[j].id;
            tempArray.push(obj);
            j++;
          }
          objArray.push(tempArray);
        }
        callback(objArray);
      },
    });
  },
  //top250
  getData:function(requestTitle,startIndex,callback){
    // console.log(startIndex);
    var objArray = [];
    wx.request({
      url: 'https://api.douban.com/v2/movie/'+requestTitle,
      data: {
        count:5,
        start:startIndex,
      },
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
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
        callback(objArray);
      },
    });
  },
  //获取电影的详细信息
  getDetailData:function(id,callback){
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/'+id,
      data: {
      },
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        // console.log(res.data);
        var obj = new Object();
        obj.movieImg = res.data.images.large;
        obj.id = res.data.id;
        obj.title = res.data.title;
        obj.year = res.data.year;
        obj.country = res.data.countries.join('、');
        obj.originName = res.data.original_title;
        obj.genres = res.data.genres.join('、');
        obj.summary = res.data.summary;
        obj.rate = res.data.rating.average;
        obj.ratePeople = res.data.ratings_count + '人';  
        obj.directors = [];
        for(var i = 0;i < res.data.directors.length;i++){
          var newObj = new Object();
          newObj.img = res.data.directors[i].avatars.small;
          newObj.name = res.data.directors[i].name;
          obj.directors.push(newObj);
        }  
        obj.casts = [];
        for(var i = 0;i < res.data.casts.length;i++){
          var newObj = new Object();
          newObj.img = res.data.casts[i].avatars.small;
          newObj.name = res.data.casts[i].name;
          obj.casts.push(newObj);
        }   
        callback(obj); 
      },
    });
  },
  //获取正在热映及即将上映的电影
  getMovieData:function(requestData,callback){
    wx.request({
      url: 'https://api.douban.com/v2/movie/'+requestData,
      data: {
      },
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
        var subjects = res.data.subjects;
        var resArray = [];
        var tempArray = []; 
        var j = 0;       
        for(var i = 0;i < subjects.length;i++){
          j++;
          if(j === 3){
            j = 0;
            resArray.push();
          }
          var obj = new Object();
          obj.title = subjects[i].title;
          obj.id = subjects[i].id;
          obj.imgsrc = subjects[i].images.large;
          tempArray.push(obj);
        }
        // callback(obj); 
      },
    });
  }
})