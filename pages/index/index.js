//index.js

var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var buildUtil = require('../../utils/building.js')
const app = getApp()
var qqmapsdk = "";

Page({
  noop(){
  },
  data: {
    weatherInfo:"今日降雨概率为0，但风很大",
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
    distance: 2000,
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
      { text: '1小节课', value: '1' },
      { text: '2小节课', value: '2' },
      { text: '3小节课', value: '3' },
      { text: '4小节课', value: '4' },
      { text: '5小节课', value: '5' },
      { text: '6小节课', value: '6' },
      { text: '7小节课', value: '7' },
      { text: '8小节课', value: '8' },
      { text: '9小节课', value: '9' },
      { text: '10小节课', value: '10' },
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
    this.setData({
      distance: event.detail.value ,
    });
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
    console.log(e)
    var _this = this;
    this.modalSearchClose();
    wx.showLoading({
      title: '拼命搜索中..',
    });

    let url = 'http://localhost:4396/api/class/today/1710-1738-1748-1756-1769-1783-1847-1904-1954-2036-2050-2099-2139-2186-2204-2237-2260-2278-2306-2308-2310-2349-2419-2503-4842-5893-6182/'+ _this.data.floorValue+'/'+_this.data.durationValue
    // 发送请求
    console.log(url)

    wx.request({      
    url: url,
    method:'POST',
    success (res) {        
      console.log(res)
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
      url: 'http://localhost:4396/api/class/sequence/today/' + seq,
      method:'POST',
      success (res) {        
        app.globalData.currentStatus = res.data.data;
        _this.handleResSuccess(res);
        wx.hideLoading();
      }    
    })
  },

  handleResSuccess(res){
    console.log(res)
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
  toggle(event){
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  bindmarkertap:function(e){
    console.log(e.markerId)
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

  addMarkers:function(){
    // 1. 显示加载中Toast
    wx.showLoading({
      title: '努力搜索中..',
    })
  
    setTimeout(() => {
    
      // 3. 发送网络请求, 得到response
      var response = "[{},{},{},{},{},{},{}]"
      // 4. 解析网络请求
      var resJson = JSON.parse(response)
      let markers=[];
      for(var i of resJson) {            
        markers.push(buildUtil.getMarkersRandom())
      };

      // 5. 设置新的值
      this.setData({
        markers
      })
      // 6. 隐藏loading，并提示找到的结果
      wx.hideLoading({
        success: (res) => {                
          // 6. Toast.show 提示符合要求的有多少个
          wx.showToast({
            title: '找到34个教室',
          })
        },
      })
    }, 1000);
  },
  
  onLoad: function () {   
    let _this=this; 
    this.mapCtx = wx.createMapContext('map')
    qqmapsdk = new QQMapWX({
      key: "5WCBZ-U7RLU-RFHVG-2N6Q7-76LT6-DZBJO" 
    });
    wx.setNavigationBarTitle({
      title: '当前的空教室',
    })

    // 请求现在的空教室    
  },

  onReady:function(){
      // this.moveToLocation();
  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
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

  
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        this.setData({scale:17})
        this.mapCtx.scale = 17

        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
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
                      vm.getLocation();
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
          vm.getLocation();
          wx.showToast({          
            title: '定位成功',
            icon: 'success',
            duration: 500,
          });
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
          wx.showToast({          
            title: '定位成功',
            icon: 'success',
            duration: 500,
          });
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        vm.setData({
          "latitude":res.latitude, "longitude":res.longitude
        })
      },
      fail: function(res) {
        wx.hideLoading();
      }
    })
  },


  onShow:function(){      
    this.setData({theme:app.globalData.currentTheme})    
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
