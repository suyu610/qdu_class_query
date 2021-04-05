const dayjs = require('dayjs')
const roomMetadata = require('./room-metadata')

let buildUtil = require('../../utils/building.js')
let locationUtil = require('../../utils/location.js')

let QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
let qqmapsdk = "";

// 用来获取当前第几节课
const timeIntervals = {
  1: [{h: 0, m: 0}, {h: 9, m: 40}],  
  3: [{h: 9, m: 40}, {h: 11, m: 35}],  
  5: [{h: 11, m: 35}, {h: 12, m: 30}],

  6: [{h: 12, m: 30}, {h: 15, m: 10}],  
  8: [{h: 15, m: 10}, {h: 17, m: 5}],  
  10: [{h: 17, m: 5}, {h: 18, m: 0}],
  11: [{h: 18, m: 0}, {h: 22, m: 30}],
}

var app = getApp();
Page({
  data: {
    loading:true,
    showFeedBack:false,
    distance:[],
    index:0,
    buildings:[], 
    choosedBuilding:"",
    roomMetadata,
    data:{},
    feedbackClassName:"",
    isShowAll:false,
    feedBackCheckbox:[],
  },

  onLoad: function(options) {

  },
  // 切换tab
  changeTabs:function(event){    
    const building = event.detail.current        
    this.setData({ index:event.detail.current,choosedBuilding: event.detail.current })
  },
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
  },
  feedBackCheckboxChange:function(e){
    this.setData({
      feedBackCheckbox: e.detail,
    });
  },

  onShow: function() { 
    let _this = this 
    let distance = [];    
    // 计算距离
    qqmapsdk = new QQMapWX({
      key: app.globalData.key 
    });

    app.globalData.currentStatus.forEach(e=>{
      
      let toLongitude = buildUtil.buildingsInfo[e.bname]["longitude"]
      let toLatitude = buildUtil.buildingsInfo[e.bname]["latitude"]    
      console.log(e.bname+"的经纬度为"+buildUtil.buildingsInfo[e.bname]["longitude"]+"\n"+buildUtil.buildingsInfo[e.bname]["latitude"] )
      
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
    
    let firstChoosed = app.globalData.tapBuildName
    firstChoosed = buildings.indexOf(firstChoosed)
    console.log(firstChoosed)
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
    console.log(event)
    const building = this.data.buildings.indexOf(event.currentTarget.dataset.building)
    
    this.setData({ choosedBuilding: building })
  },

  tapCourse: function(event){
    wx.navigateTo({
      url: '/pages/class/class',
    })
  },

  /**
   * 下拉刷新
   */
  onRefresh: function () {
    const self = this;    
    setTimeout(() => {

      wx.showToast({
        icon:"none",
        title: this.data.isShowAll ? '显示符合条件的教室':'显示全部教室',
      })
      self.setData({
        loading:false,
        isShowAll:!this.data.isShowAll
      })
    }, 500)
  },

  // 长按开启反馈
  handleShowFeedBack(e){
    // console.log(e)
    this.setData({
      feedbackClassName: e.currentTarget.id
    });
    
    this.setData({
      showFeedBack:true
    })
  },

})
