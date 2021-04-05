const dayjs = require('dayjs')
const roomMetadata = require('./room-metadata')

let buildUtil = require('../../utils/building.js')
let locationUtil = require('../../utils/location.js')

let QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
let qqmapsdk = "";
import {initNavigationColor,themeData} from '../../config/theme'

// 用来获取当前第几节课
const timeIntervals = {
  1: [{h: 0, m: 0}, {h: 8, m: 50}],  
  2: [{h: 8, m: 50}, {h: 9, m: 50}],  
  3: [{h: 9, m: 50}, {h: 11, m: 0}],
  4: [{h: 11, m: 0}, {h: 12, m: 0}],    
  5: [{h: 12, m: 0}, {h: 13, m: 30}],
  6: [{h: 13, m: 30}, {h: 14, m: 20}],  
  7: [{h: 14, m: 20}, {h: 15, m: 20}],  
  8: [{h: 15, m: 20}, {h: 16, m: 20}], 
  9: [{h: 16, m: 20}, {h: 17, m: 20}], 
  10: [{h: 17, m: 20}, {h: 18, m: 0}],
  11: [{h: 18, m: 0}, {h: 19, m: 20}],
  12: [{h: 19, m: 20}, {h: 23, m: 59}],
};

var app = getApp();
Page({
  data: {
    buildingImgSrc:"https://cdns.qdu.life/building_flat_img/boyuanlou.png",
    themeData,
    color:"#fee161",
    feedBackValue:"",
    loading:true,
    showFeedBack:false,
    distance:[],
    index:0,
    buildings:[], 
    choosedBuilding:1,
    roomMetadata,
    data:{},
    feedbackClassName:"",
    isShowAll:false,
    feedBackCheckbox:[],
    showBuildingPics:false,
    // 当前显示第几层楼的平面图
    buildingFloorIndex:0,
  },

  onLoad: function(options) {
    if(options['share']){
      this.setData({
        color:"white"
      })
    }
  },
  // 切换平面图
  changeBuildingImgSwiper:function(event){
    console.log(event)
    let buildingImgSrc = "https://cdns.qdu.life/building_flat_img/" + this.data.buildings[this.data.choosedBuilding] + "/" + event.detail.current + ".png"
    this.setData({buildingImgSrc,buildingFloorIndex:event.detail.current})
  },

  // 切换tab
  changeTabs:function(event){    
    const building = event.detail.current; 
    this.setData({ 
      index:event.detail.current,
      choosedBuilding: event.detail.current 
    })
  },
  /////////////   反馈  ///////////////
  onFeedBackClose:function(){
    this.setData({
      showFeedBack:false
    })
  },

  onFeedBackDone:function(){
    this.setData({
      showFeedBack:false
    })
    wx.showToast({
      title: '感谢反馈!',
    })
    
    let feedBackCheckbox = this.data.feedBackCheckbox.join(",");
    let feedBackValue = this.data.feedBackValue;
    let feedbackClassName = this.data.feedbackClassName;
    wx.request({
      url: 'https://room.qdu.life/api/feedback/postnew/',
      method:'POST',
      data:{
        "classname":feedbackClassName,
        "info":feedBackValue,
        "ftype":feedBackCheckbox,
      }
    })
  },
  feedBackCheckboxChange:function(e){
    this.setData({
      feedBackCheckbox: e.detail,
    });
  },
  onfeedBackTextChange:function(e){
    this.setData({
      feedBackValue:e.detail
    })    
  },

  //////////////// 反馈结束 /////////////////


  onShow: function() { 

    initNavigationColor()
    this.setData({
      themeData:themeData
    })    

    var _this = this;
    // 计算距离
    qqmapsdk = new QQMapWX({
      key: app.globalData.key 
    });
    console.log(app.globalData.currentStatus)

    if(app.globalData.currentStatus == ""){
      var _this = this;
      // 发送请求
      wx.request({      
        url: 'https://room.qdu.life/api/class/sequence/today/__________0__',
        method:'POST',
        success (res) {        
          app.globalData.currentStatus = res.data.data;
          _this.onShowHasDate();
        }
      })
    }else{
      console.log("有数据")
      _this.onShowHasDate()
  }
  },
  onShowHasDate(){
    let distance = [];    
    var _this = this;
    console.log(app.globalData.currentStatus)
    app.globalData.currentStatus.forEach(e=>{   
      let toLongitude = buildUtil.buildingsInfo[e.bname]["longitude"]
      let toLatitude = buildUtil.buildingsInfo[e.bname]["latitude"]          
      // lat1,lng1,lat2,lng2
      _this.handleDistanceDone(locationUtil.GetDistance(
        app.globalData.latitude,
        app.globalData.longitude,
        toLatitude,
        toLongitude,
      ));
    })
    let now = dayjs()
    let today = now.startOf('day')
    let nowInterval = 0
    for (let i in timeIntervals) {
      let startTime = today.add(timeIntervals[i][0].h, 'hour').add(timeIntervals[i][0].m, 'minute')
      let endTime = today.add(timeIntervals[i][1].h, 'hour').add(timeIntervals[i][1].m, 'minute')
      if (now.isAfter(startTime) && now.isBefore(endTime)) {
        nowInterval = i
        break
      }
    }
    this.setData({nowInterval})

    let buildings = []
    let data={}
    let wholeData = app.globalData.currentStatus

    wholeData.forEach(element=>{      
      buildings.push(element.bname)
    })

    this.setData({buildings})
    let firstChoosed = 0;
    console.log(app.globalData.tapBuildName)
    if(app.globalData.tapBuildName != ""){    
      console.log(app.globalData.tapBuildName)
      console.log(buildings)
      firstChoosed = buildings.indexOf(app.globalData.tapBuildName)
      if(firstChoosed==-1){
        firstChoosed=0
      }
    }
    this.setData({
      data:app.globalData.currentStatus,
      choosedBuilding:firstChoosed
    })

  },
  handleDistanceDone(newDistance){
    let distance = [];
    distance = this.data.distance;
    distance.push(newDistance);
    this.setData({
      distance
    })
  },
  tapBuilding: function(event) {
    // console.log(event)
    const building = this.data.buildings.indexOf(event.currentTarget.dataset.building)    
    this.setData({ choosedBuilding: building })
  },

  tapCourse: function(event){
    console.log(event.currentTarget.dataset.cname)
    wx.navigateTo({
      url: '/pages/class/class?cname='+event.currentTarget.dataset.cname,
    })
  },
  onCloseBuildingPics:function(){
    this.setData({showBuildingPics:false})
  },

 //预览图片，放大预览
  // preview(event) {
  //   console.log(event.currentTarget.dataset.src)
  //   let currentUrl = event.currentTarget.dataset.src
  //   wx.previewImage({
  //     current: "https://cdns.qdu.life/building_flat_img/boyuanlou.png", // 当前显示图片的http链接
  //     urls: ["https://cdns.qdu.life/building_flat_img/boyuanlou.png"] // 需要预览的图片http链接列表
  //   })
  // },
  /**
   * 下拉刷新
   */
  onRefresh: function () {
    const self = this;    
    let buildingImgSrc = "https://cdns.qdu.life/building_flat_img/" + this.data.buildings[this.data.choosedBuilding] + "/0.png"

    this.setData({buildingImgSrc,showBuildingPics:true,loading:false})
    
    // setTimeout(() => {
    //   wx.showToast({
    //     icon:"none",
    //     title: this.data.isShowAll ? '显示符合条件的教室':'显示全部教室',
    //   })
    //   self.setData({
    //     loading:false,
    //     isShowAll:!this.data.isShowAll
    //   })
    // }, 500)
  },

  // 长按开启反馈
  handleShowFeedBack(e){
    this.setData({
      feedbackClassName: e.currentTarget.id
    });
    
    this.setData({
      showFeedBack:true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {    
    return {
      title: '当前的空教室',
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
    // 分享朋友圈
    onShareTimeline: function () {
      return {
          title: '青大空教室',
          query: {
            share: "timeline",
          },
          imageUrl: ''
        }
    },
})
