//index.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var buildUtil = require('../../utils/building.js')
var locationUtil = require('../../utils/location.js')

const app = getApp()
var qqmapsdk = "";

Page({
  noop(){
  },
  data: {
    weather:{
      text:"今日降雨概率为0，但风很大",
      shorttext:"多云",
      rain:0,
      dayt:3,
      nightt:0,
      iconcode:408,
    },
    
    markers:[
      {
        latitude: app.globalData.latitude, 
        longitude: app.globalData.longitude,
        id:0,
        height:0,
        width:0
      }
    ],
    modalSearchShow:false,  //是否隐藏搜索对话框
    modalSeqShow:false,     //是否隐藏课序选择对话框
    modalWeatherShow:false, //是否隐藏天气详情
    distance: "无限",
    theme:1,
    scale:17,    
    longitude:app.globalData.longitude,
    latitude:app.globalData.latitude,
    key: app.globalData.key,
    address: '',
    city: '',
    seqResult: [],
    timeResult:[],
    customCalloutMarkerIds: [2503, 2260, 1847, 1783, 2237, 2204, 1954, 1904, 1756, 2050, 2349, 2419, 2278, 5893, 6182, 2139, 2099, 2186, 1769, 1748, 2308, 2036, 4842, 2306, 1738, 2310, 1710],
    activeIcon:"images/icon/flag_1.png",    
    buildListJson:[],
    seqContent:"当前空教室",
    classSeq:['第1 2','第3 4','第5 6','第7 8','第9 10'],
    floorOption: [
      { text: '楼层', value: -1 },
      { text: '1楼', value: 1 },
      { text: '2楼', value: 2 },
      { text: '3楼', value: 3 },
      { text: '4楼', value: 4 },
      { text: '5楼', value: 5 },
      { text: '6楼', value: 6 },
    ],
    durationOption: [
      { text: '无课时长', value: '0' },
      { text: '1节', value: '1' },
      { text: '2节', value: '2' },
      { text: '3节', value: '3' },
      { text: '4节', value: '4' },
      { text: '5节', value: '5' },
      { text: '6节', value: '6' },
      { text: '7节', value: '7' },
      { text: '8节', value: '8' },
      { text: '9节', value: '9' },
      { text: '10节', value: '10' },
    ],
    floorValue: -1,
    durationValue: '0',
  },
  floorValueChange({detail}){
    this.setData({
      floorValue:detail
    })
  },

  durationValueChange({detail}){
    this.setData({
      durationValue:detail
    })
  },
  // 距离选择
  onDrag(event) {
    if(event.detail.value>=2000){
      this.setData({
        distance: "无限" ,
      });
    }else{
      this.setData({
        distance: event.detail.value + "m",
      });
    }
  },
  onDragEnd(event){
  },

  // 课程选择
  seqChange:function(e){    

    this.setData({
      seqResult: e.detail,
    });
  },

  searchByDetail:function(e){
    // console.log(e)
    var _this = this;
    this.modalSearchClose();
    wx.showLoading({
      title: '拼命搜索中..',
    });

    let url = 'https://room.qdu.life/api/class/today/1710-1738-1748-1756-1769-1783-1847-1904-1954-2036-2050-2099-2139-2186-2204-2237-2260-2278-2306-2308-2310-2349-2419-2503-4842-5893-6182/'+ _this.data.floorValue+'/'+_this.data.durationValue
    // 发送请求
    // console.log(url)

    wx.request({      
    url: url,
    method:'POST',
    success (res) {        
      // console.log(res)
      app.globalData.currentStatus = res.data.data;
      _this.handleResSuccess(res);
      wx.hideLoading();
    }    
  })
  },

  // 按课次搜索
  searchBySeq:function(e){   
    var _this = this;
    
    if(this.data.seqResult.length == 0){
      wx.showToast({
        icon:"none",
        title: '没选择任何课次',
      })
      return;
    }

    this.modalSeqClose();
    wx.showLoading({
      title: '拼命搜索中..',
    });

    //将["2", "1", "4"]转化为int值
    let temp = [];
    this.data.seqResult.forEach(element => {      
      temp.push(Number(element)*2+1)
      temp.push(Number(element)*2+2)
    });

    // 改进sort,让10排在9后面
    temp = temp.sort(function (a,b) {
      if (a < b ) {
          return -1;
      }
      if (a > b ) {
          return 1;
      }
      // a must be equal to b
      return 0;
    });
    // 将______转为___00__
    let seq = ['_','_','_','_','_', '_','_','_','_','_',  '_','_','_',];
    // 因为没有t1,t2，所以要进行下面的变换
    temp.forEach(element =>{
      if(element<5){
        element -=1
      }
      // 1234 可以直接替换
      if(element>=5 && element<=8){
      }
      if(element >=9){
        element +=1
      }
      seq[element] = '0';                  
    });

    seq = seq.join("");
    temp = temp.join(" ");
    this.setData({
      seqContent:temp,
    });

    // 发送请求
    wx.request({      
      url: 'https://room.qdu.life/api/class/sequence/today/' + seq,
      method:'POST',
      success (res) {        
        app.globalData.currentStatus = res.data.data;
        _this.handleResSuccess(res);
        wx.hideLoading();
      }    
    })
  },

  handleResSuccess(res){
    // console.log(res)
    let markers=[];
    let tempData =  res.data.data;
    tempData.forEach(element => {
      let marker = buildUtil.getMarkersByBuildId(element["bname"],element["matchedCount"]);
      markers.push(marker)
    });        

    //取第一个和最后一个
    this.setData({
      markers
    })
  },

  //清空选择
  clearSeqResult:function(e){
    this.setData({
      seqResult:[],timeResult:[],
    })
  },

  // 时间选择
  timeChange:function(e){
    // 当选择'当前'，则，课程全选中
    let seqResult = [];

    // 如果选中上午
    if(e.detail.indexOf("0") != -1){
      seqResult = seqResult.concat(["0","1"]);
    }
    // 如果选中下午
    if(e.detail.indexOf("1") != -1){
      seqResult = seqResult.concat(["2","3"]);
    }
    // 如果选中晚上
    if(e.detail.indexOf("2") != -1){
      seqResult = seqResult.concat(["4"]);
    }
    this.setData({
      seqResult,
      timeResult: e.detail,
    });
  },
  // 课次多选框
  toggle(event){
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  // 点击建筑物时
  bindmarkertap:function(e){
    // console.log(e.markerId)
    app.globalData.tapBuildName = e.markerId;    
    // 带着id跳转到列表页
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },

  showSeq:function(){
    this.setData({ modalSeqShow: true });
  },
  
  modalSeqClose() {
    this.setData({ modalSeqShow: false});
  },

  showWeather(){
    this.setData({ modalWeatherShow: true});
  },

  modalWeatherClose(){
    this.setData({ modalWeatherShow: false});

  },

  showSearch:function(){
    this.setData({ modalSearchShow: true });
  },
  
  modalSearchClose() {
    this.setData({ modalSearchShow: false});
  },
  
  onLoad: function () {   
    let _this=this; 
    this.mapCtx = wx.createMapContext('map')

    qqmapsdk = new QQMapWX({
      key: app.globalData.key 
    });
    this.getUserLocation()
    // 获取天气
    wx.request({          
      url: 'http://localhost:4396/api/weather/today',
      success (res) {
        if(res.statusCode == 200){
         _this.handleGetWeatherSuccess(res.data.data)
        }else{

        }
      },
      fail(e){
        console.log(e)
      }
    })

    wx.setNavigationBarTitle({
      title: '当前的空教室',
    })
    // todo
    // 自动识别当前位置，等一系列推荐
    // 请求现在的空教室    
  },
  handleGetWeatherSuccess(data){
    console.log(data)
    this.setData({
      weather:data
      
    })
  },
  // 获得坐标
 getUserLocation() {
    let _this = this;
    wx.getSetting({
      success: (res) => {              
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '需要使用你的位置',
            content: '可以不授权，仅影响距离筛选功能',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {          
          //调用wx.getLocation的API
          _this.getLocation();
        } else {
          //调用wx.getLocation的API
          _this.getLocation();
        }
      }
    })
  },

  // 微信获得经纬度
  getLocation() {
    console.log("???")
    let _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
      },
      fail: function(res) {
        wx.hideLoading();
      }
    })
  },
  
  onReady:function(){      
  },
  
  changeTheme:function(){
    let tmp = this.data.theme;
    if(tmp < 3){
      tmp += 1;
    }else{
      tmp = 1;
    }
    this.setData({
      theme:tmp
    })
    app.globalData.currentTheme = tmp;
  },

  onShow:function(){      
    this.setData({theme:app.globalData.currentTheme})    
  },
  handleMoveToBtn:function(){
    this.getUserLocation()
    this.mapCtx.moveToLocation({
      longitude:app.globalData.longitude,
      latitude:app.globalData.latitude,
    })
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {    
    return {
      title: '青大空教室查询',
      path: 'pages/index/index?id=123&age=18',  // 路径，传递参数到指定页面。
      imageUrl:'../../images/share.png', // 分享的封面图
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})
