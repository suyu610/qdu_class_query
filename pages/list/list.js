const dayjs = require('dayjs')
const roomMetadata = require('./room-metadata')

let buildUtil = require('../../utils/building.js')
let locationUtil = require('../../utils/location.js')

let QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
let qqmapsdk = "";
import {
  initNavigationColor,
  themeData
} from '../../config/theme'

// 用来获取当前第几节课
const timeIntervals = {
  1: [{
    h: 0,
    m: 0
  }, {
    h: 8,
    m: 50
  }],
  2: [{
    h: 8,
    m: 50
  }, {
    h: 9,
    m: 50
  }],
  3: [{
    h: 9,
    m: 50
  }, {
    h: 11,
    m: 0
  }],
  4: [{
    h: 11,
    m: 0
  }, {
    h: 12,
    m: 0
  }],
  5: [{
    h: 12,
    m: 0
  }, {
    h: 13,
    m: 30
  }],
  6: [{
    h: 13,
    m: 30
  }, {
    h: 14,
    m: 20
  }],
  7: [{
    h: 14,
    m: 20
  }, {
    h: 15,
    m: 20
  }],
  8: [{
    h: 15,
    m: 20
  }, {
    h: 16,
    m: 20
  }],
  9: [{
    h: 16,
    m: 20
  }, {
    h: 17,
    m: 20
  }],
  10: [{
    h: 17,
    m: 20
  }, {
    h: 18,
    m: 0
  }],
  11: [{
    h: 18,
    m: 0
  }, {
    h: 19,
    m: 20
  }],
  12: [{
    h: 19,
    m: 20
  }, {
    h: 23,
    m: 59
  }],
};
const buildingImgSrcHead = "https://cdns.qdu.life/building_flat_img";
let buildingImgSrc = {
  "博远楼": [
    buildingImgSrcHead + "/博远楼/0.png",
    buildingImgSrcHead + "/博远楼/1.png",
    buildingImgSrcHead + "/博远楼/2.png",
    buildingImgSrcHead + "/博远楼/3.png",
    buildingImgSrcHead + "/博远楼/4.png",
  ],
  "博学楼": [
    buildingImgSrcHead + "/博学楼/0.png",
    buildingImgSrcHead + "/博学楼/1.png",
    buildingImgSrcHead + "/博学楼/2.png",
    buildingImgSrcHead + "/博学楼/3.png",
    buildingImgSrcHead + "/博学楼/4.png",
  ],
  "博文楼": [
    buildingImgSrcHead + "/博文楼/0.png",
    buildingImgSrcHead + "/博文楼/1.png",
    buildingImgSrcHead + "/博文楼/2.png",
    buildingImgSrcHead + "/博文楼/3.png",
    buildingImgSrcHead + "/博文楼/4.png",
  ],
  "博知楼": [
    buildingImgSrcHead + "/博知楼/0.png",
    buildingImgSrcHead + "/博知楼/1.png",
    buildingImgSrcHead + "/博知楼/2.png",
    buildingImgSrcHead + "/博知楼/3.png",
    buildingImgSrcHead + "/博知楼/4.png",
  ],
  "德雅楼": [
    buildingImgSrcHead + "/德雅楼/0.png",
    buildingImgSrcHead + "/德雅楼/1.png",
    buildingImgSrcHead + "/德雅楼/2.png",
    buildingImgSrcHead + "/德雅楼/3.png",
    buildingImgSrcHead + "/德雅楼/4.png",
  ],
}
var app = getApp();
Page({
  data: {
    buildingImgSrc: ["https://cdns.qdu.life/img/logo.png"],
    themeData,
    color: "#fee161",
    feedBackValue: "",
    loading: true,
    showFeedBack: false,
    index: 0,
    buildings: [],
    tipsShow: false,
    choosedBuilding: 1,
    roomMetadata,
    data: {},
    feedbackClassName: "",
    isShowAll: false,
    feedBackCheckbox: [],
    showBuildingPics: false,
    // 当前显示第几层楼的平面图
    buildingFloorIndex: 0,
  },

  onLoad: function (options) {
    let that = this
    if (options['share']) {
      this.setData({
        color: "white"
      })
    }
    wx.setNavigationBarTitle({
      title: '教室列表，点击教室名查看具体课表',
    })
    wx.getStorage({
      key: 'tips_list',
      // 不存在的时候，发送请求
      fail() {
        that.setData({
          tipsShow: true
        })
      },
    })
  },

  onTipsClose: function () {
    this.setData({
      tipsShow: false
    })
    wx.setStorage({
      key: "tips_list",
      data: "true"
    })
  },
  // 切换平面图
  changeBuildingImgSwiper: function (event) {
    let buildingFloorIndex = event.detail.current;
    // 楼层高度++
    this.setData({
      buildingFloorIndex
    })
  },

  // 切换tab
  changeTabs: function (event) {
    this.setData({
      index: event.detail.current,
      choosedBuilding: event.detail.current
    })
  },


  /////////////   反馈  ///////////////
  onFeedBackClose: function () {
    this.setData({
      showFeedBack: false
    })
  },

  onFeedBackDone: function () {
    this.setData({
      showFeedBack: false
    })
    wx.showToast({
      title: '感谢反馈!',
    })

    let feedBackCheckbox = this.data.feedBackCheckbox.join(",");
    let feedBackValue = this.data.feedBackValue;
    let feedbackClassName = this.data.feedbackClassName;
    wx.request({
      url: 'https://room.qdu.life/api/feedback/postnew/',
      method: 'POST',
      data: {
        "classname": feedbackClassName,
        "info": feedBackValue,
        "ftype": feedBackCheckbox,
      }
    })
  },
  feedBackCheckboxChange: function (e) {
    this.setData({
      feedBackCheckbox: e.detail,
    });
  },
  onfeedBackTextChange: function (e) {
    this.setData({
      feedBackValue: e.detail
    })
  },

  //////////////// 反馈结束 /////////////////


  onShow: function () {

    initNavigationColor()
    this.setData({
      themeData: themeData
    })

    var _this = this;

    if (app.globalData.currentStatus == "") {
      var _this = this;
      // 发送请求
      wx.request({
        url: 'https://room.qdu.life/api/class/sequence/today/__________0__',
        method: 'POST',
        success(res) {
          app.globalData.currentStatus = res.data.data;
          _this.onShowHasDate();
        }
      })
    } else {
      _this.onShowHasDate()
    }
  },

  onShowHasDate() {
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
    this.setData({
      nowInterval
    })

    let buildings = []
    let data = {}
    let wholeData = app.globalData.currentStatus

    wholeData.forEach(element => {
      buildings.push(element.bname)
    })

    this.setData({
      buildings
    })
    let firstChoosed = 0;
    if (app.globalData.tapBuildName != "") {
      firstChoosed = buildings.indexOf(app.globalData.tapBuildName)
      if (firstChoosed == -1) {
        firstChoosed = 0
      }
    }
    this.setData({
      data: app.globalData.currentStatus,
      choosedBuilding: firstChoosed
    })

  },

  tapBuilding: function (event) {
    const building = this.data.buildings.indexOf(event.currentTarget.dataset.building)

    this.setData({
      choosedBuilding: building
    })
  },

  tapCourse: function (event) {
    app.globalData.tapBuildName = event.currentTarget.dataset.build
    wx.navigateTo({
      url: '/pages/class/class?cname=' + event.currentTarget.dataset.cname,
    })
  },

  onCloseBuildingPics: function () {
    this.setData({
      showBuildingPics: false
    })
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
    let tmpbuildingImgSrc = buildingImgSrc[this.data.buildings[this.data.choosedBuilding]]
    this.setData({
      buildingImgSrc: tmpbuildingImgSrc,
      showBuildingPics: true,
      loading: false
    })
  },

  // 长按开启反馈
  handleShowFeedBack(e) {
    this.setData({
      feedbackClassName: e.currentTarget.id
    });

    this.setData({
      showFeedBack: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    return {
      title: '当前的空教室',
      path: 'pages/index/index?id=123&age=18', // 路径，传递参数到指定页面。
      imageUrl: 'https://cdns.qdu.life/img/share_1.png', // 分享的封面图
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