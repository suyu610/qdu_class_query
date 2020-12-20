const dayjs = require('dayjs')
const roomMetadata = require('./room-metadata')
let buildUtil = require('../../utils/building.js')
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
    distance:[],
    index:0,
    buildings:[], 
    choosedBuilding:"",
    roomMetadata,
    data:{},
    isShowAll:false
  },

  onLoad: function(options) {

  },
  // 切换tab
  changeTabs:function(event){    
    const building = event.currentTarget.dataset.building        
    this.setData({ index:event.detail.index,choosedBuilding: event.detail.name })
  },
  onShow: function() { 
    let _this = this 

    let distance = [];
    // 计算距离
    qqmapsdk = new QQMapWX({
      key: app.globalData.key 
    });

    app.globalData.currentStatus.forEach(e=>{
      setTimeout(() => {              
        let longitude = buildUtil.buildingsInfo[e.bname]["longitude"]
        let latitude = buildUtil.buildingsInfo[e.bname]["latitude"]    
        // console.log(buildUtil.buildingsInfo[e.bname])
        
      qqmapsdk.calculateDistance({
        from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: latitude+','+longitude, //终点坐标
        success:function(res,data){
          
          let result = res.result;
          let distance = result.elements[0].distance
          _this.handleDistanceDone(distance)
        }
      })
    }, 400);      
    })

    

    wx.setNavigationBarTitle({
      title: '',
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
    this.setData({
      data:app.globalData.currentStatus,
      choosedBuilding:firstChoosed
    })
  },
  handleDistanceDone(newDistance){
    // console.log(newDistance)
    let distance = [];
    distance = this.data.distance;
    distance.push(newDistance);
    this.setData({
      distance
    })      
  },
  tapBuilding: function(event) {
    const building = event.currentTarget.dataset.building
    this.setData({ choosedBuilding: building })
  },

  tapCourse: function(event){
    wx.navigateTo({
      url: '/pages/class/class',
    })
  },

  onPullDownRefresh(e){  
    wx.showToast({
      icon:"none",
      title: this.data.isShowAll? '显示符合条件的教室' : '显示所有教室'  ,
    });
    wx.stopPullDownRefresh();  
    this.setData({
      isShowAll:!this.data.isShowAll
    })

    
  },
})
