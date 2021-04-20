const today = new Date()
import * as dateUtil from '../../../utils/date'
const userCourseService = require('../../../net/userCourseService.js')

Page({
  data: {
    today: today,
    currentRoomIndex: 0,
    roomList: [
      {
        roomname: "素语核心团队",
        roomid: "1234",
        person_list: [
          { name: "黄鹏宇", count: 5 },
          { name: "皇甫素素", count: 8 },
          { name: "刘江舟", count: 10 },
          { name: "王鹏宇", count: 12 },
          { name: "齐彤", count: 9 },
        ],
        isMaster: true,
      },
      {
        roomname: "2019级学生会",
        roomid: "8888",
        person_list: [
          { name: "黄鹏宇", count: 5 },
          { name: "皇甫素素", count: 8 },
        ],
        isMaster: false,
      },
    ],
    showSettingPage: false,
    showCourseDetail: false,
    curFirstWeekDate: "",
    emptyCourse: [], // 自己的教务课表
    weekLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    sequenceWithTime: ["1\n8:00 8:50", "2\n9:00 9:50", "3\n10:10 11:00", "4\n11:10 12:00", "T1\n12:50 13:30", "5\n13:30 14:20", "6\n14:30 15:20", "7\n15:30 16:20", "8\n16:30 17:20", "T2\n17:21 18:00", "9\n 18:30 19:20", "10\n19:30 20:20", "\n"],
  },

  // 点击上下
  prevRoomHandler: function () {
    let currentRoomIndex = this.data.currentRoomIndex
    if (currentRoomIndex == 0) {
      currentRoomIndex = this.data.roomList.length - 1
    } else {
      currentRoomIndex--
    }
    this.setData({ currentRoomIndex })
  },
  nextRoomHandler: function () {
    let currentRoomIndex = this.data.currentRoomIndex
    if (currentRoomIndex == this.data.roomList.length - 1) {
      currentRoomIndex = 0
    } else {
      currentRoomIndex++
    }
    this.setData({ currentRoomIndex })

  },
  // 修改房间名
  onChangeRoomName: function (event) {
    this.setData({ roomname: event.detail })
  },

  ontapCourseDetail: function () {
    this.setData({ showCourseDetail: true })
  },
  onCloseCourseDetail: function () {
    this.setData({ showCourseDetail: false })
  },
  ontapSettingBtn: function () {
    this.setData({ showSettingPage: true })
  },

  onCloseSettingPage: function () {
    console.log("a")
    this.setData({ showSettingPage: false })
  },

  onShareAppMessage: function (options) {
    let room = this.data.roomList[this.data.currentRoomIndex]
    var that = this;
    var shareObj = {
      title: "点击加入「"+room.roomname+"」的多人课表",
      path: '/pages/empty/empty?url=multi_course',
      imageUrl:'../../images/share.png',
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
    }

    // 来自页面内的按钮的转发
    // if (options.from == 'button')       
    return shareObj;
  },



  // 逻辑是，如果本地没有值，再从服务器上拿
  updateWeeks: function (date) {
    wx.showLoading({
      title: '加载中',
    })
    // 获取周一的日期    
    this.setData({ curFirstWeekDate: dateUtil.getFirstDayDate(date) })
    let weekDates = []

    for (var i = 0; i < 7; i++) {
      if (i == 0) {
        weekDates.push(dateUtil.formatWeekDate(this.data.curFirstWeekDate))
      } else {
        weekDates.push(dateUtil.formatWeekDate(dateUtil.getDiffDate(this.data.curFirstWeekDate, i)))
      }
    }
    let todayIndex = weekDates.indexOf(dateUtil.formatWeekDate(today))
    let weekDatesWithoutSunday = weekDates.slice(0, 5)
    // 第几周
    // 根据日期，算得现在是第几周
    let curWeek = dateUtil.getWhichWeekByDate(date)
    console.log(curWeek)
    let courselist = [];

    // 最终三种列表，要放到courselist里面，用来展现给前端
    // 首先来弄弄自己的教务课表
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 13; j++) {
        // start = 1 3 7 9 11  
        if (j == 1 || j == 3 || j == 6 || j == 8 || j == 11) {
          courselist.push({
            id: i + j,
            type: 0,
            day: i,
            start: j,
            sections: 2,
            count: i + j
          })
        }

        if (j == 5 || j == 10) {
          courselist.push({
            id: i + j,
            type: 0,
            day: i,
            start: j,
            sections: 1,
            count: i + j
          })
        }
      }
    }

    this.setData({
      todayIndex,
      courselist,
      curWeek,
      weekDates,
      weekDatesWithoutSunday
    })

    wx.hideLoading()
  },
  initJwCourse: function () {
    let that = this
    //首先判断本地有没有教务课表，
    wx.getStorage({
      key: 'my-jw-course-v1',
      success(res) {
        if (res.data.length == 0) {
          userCourseService.getMyJwCourse(that.handleGetMyJwCourse)
        } else {
          that.setData({ selfJwCourse: res.data })
        }
      },
      // 不存在的时候，发送请求
      fail() {
        console.log("本地没有自己的教务课表")
        userCourseService.getMyJwCourse(that.handleGetMyJwCourse)
      },
      complete() {
        // 最终都解析这个列表
        that.updateWeeks(today)
      }
    })
  },

  onLoad() {
    // this.updateWeeks(today);
    this.initJwCourse();
  }


})