const today = new Date()
import * as dateUtil from '../../../utils/date'
const userCourseService = require('../../../net/userCourseService.js')
const multiCourseService = require('../../../net/multiCourseService.js')
const app = getApp()
const router = require('../../../router/index.js');

Page({
  data: {
    password: '',
    roomName: '',
    curWeek: 1,
    today: today,
    currentRoomIndex: 0,
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    },
    showSettingPage: false,
    showCourseDetail: false,
    curFirstWeekDate: "",
    weekLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    sequence: ["1", "2", "3", "4", "T1", "5", "6", "7", "8", "T2", "9", "10", "\n"],

    sequenceWithTime: ["1\n8:00 8:50", "2\n9:00 9:50", "3\n10:10 11:00", "4\n11:10 12:00", "T1\n12:50 13:30", "5\n13:30 14:20", "6\n14:30 15:20", "7\n15:30 16:20", "8\n16:30 17:20", "T2\n17:21 18:00", "9\n 18:30 19:20", "10\n19:30 20:20", "\n"],
  },


  handleRemovePeopleSuccess: function (e) {
    console.log(e)
    wx.hideLoading()
    wx.showToast({
      title: '删除成功',
      duration: 700
    })
  },

  handleRemovePeopleFail: function (e) {
    wx.hideLoading()

    console.log(e)
  },

  // 删人
  removePeople: function (e) {
    let that = this
    let number = e.currentTarget.dataset.number
    let name = e.currentTarget.dataset.name
    wx.showModal({
      title: "确认要把" + name + "移除房间吗？",
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在移除',
          })
          multiCourseService.removePeople(that.handleRemovePeopleSuccess, that.handleRemovePeopleFail, that.data.rawData.roomId, number)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 点击上下
  prevRoomHandler: function () {
    let currentRoomIndex = this.data.currentRoomIndex
    if (currentRoomIndex == 0) {
      currentRoomIndex = this.data.roomList.length - 1
    } else {
      currentRoomIndex--
    }
    this.setData({
      currentRoomIndex
    })
  },
  nextRoomHandler: function () {
    let currentRoomIndex = this.data.currentRoomIndex
    if (currentRoomIndex == this.data.roomList.length - 1) {
      currentRoomIndex = 0
    } else {
      currentRoomIndex++
    }
    this.setData({
      currentRoomIndex
    })

  },

  handleUpdateSuccess: function (e) {
    wx.hideLoading({
      success: (res) => {
        wx.showToast({
          title: '修改成功',
          duration: 700
        })
      },
    })
  },

  handleUpdateFail: function (e) {
    wx.hideLoading({
      success: (res) => {
        wx.showToast({
          title: '修改失败',
        })
      },
    })
  },
  // 修改房间名
  onChangeRoomName: function (event) {
    wx.showLoading({
      title: '修改中',
    })
    this.setData({
      roomname: this.data.roomName
    })
    multiCourseService.updateRoomName(this.handleUpdateSuccess, this.handleUpdateFail, this.data.rawData.roomId, this.data.roomName)
  },

  // 修改密码
  onChangeRoomPwd: function (event) {
    wx.showLoading({
      title: '修改中',
    })
    this.setData({
      roomname: this.data.password
    })
    multiCourseService.updateRoomPwd(this.handleUpdateSuccess, this.handleUpdateFail, this.data.rawData.roomId, this.data.password)

  },
  ontapCourseDetail: function (e) {
    console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.id;
    let day = e.currentTarget.dataset.day;
    let start = e.currentTarget.dataset.start;

    let curTapCourseList = [];
    let courselist = this.data.courselist;
    // id
    courselist.forEach(element => {
      if (element.id == id) {
        console.log(element)
        curTapCourseList = curTapCourseList.concat(element.courses)
        return
      }
    });

    this.setData({
      curTapDay: day,
      curTapStart: start,
      curTapCourseList,
      showCourseDetail: true
    })
  },
  onCloseCourseDetail: function () {
    this.setData({
      showCourseDetail: false
    })
  },
  ontapSettingBtn: function () {
    this.setData({
      showSettingPage: true
    })
  },

  onCloseSettingPage: function () {
    this.setData({
      showSettingPage: false
    })
  },

  onShareAppMessage: function (options) {

    var shareObj = {
      title: "点击加入「" + this.data.roomName + "」多人课表，房间号为" + this.data.rawData.roomId,
      path: '/pages/empty/empty?url=multi_course',
      imageUrl: 'https://cdns.qdu.life/img/share_1.png',
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {}
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


  // 判断type
  // 如果周和start在list中有相同的值，则为2,否则为1
  judgeType: function (nextCourse, courselist, index) {

    let friendStart = (nextCourse.seq).indexOf('1') + 1
    let friendSection = (nextCourse.seq).lastIndexOf('1') - (nextCourse.seq).indexOf('1') + 1
    let course = {
      id: index,
      type: 1,
      day: nextCourse.week - 1,
      start: friendStart,
      sections: friendSection,
      course: nextCourse.courseName,
      teachers: nextCourse.teachers,
      place: nextCourse.className,
      week: nextCourse.week,
      infoStr: nextCourse.infoStr,
      rFloor: nextCourse.rfloor,
      direction: nextCourse.direction
    }

    courselist.forEach((e) => {
      if (e.week == nextCourse.week && e.start == friendStart) {
        let section = e.section >= friendSection ? e.section : friendSection
        course = {
          id: index,
          type: 2,
          day: e.week - 1,
          start: e.start,
          sections: section,
          mySection: e.section,
          friendSection: friendSection,
          myCourse: e.course,
          nextCourse: nextCourse.courseName,
          myTeachers: e.teachers,
          friendTeachers: nextCourse.teachers,
          myPlace: e.place,
          friendPlace: nextCourse.className,
          week: e.week,
          myinfoStr: e.infoStr,
          friendinfoStr: nextCourse.infoStr,
          rFloor: e.rfloor,
          direction: e.direction
        }
        return false
      }
    })
    return course
  },

  onPlusWeek: function () {
    this.generateEmptyCourse()
    console.log(dateUtil.getDiffDate(this.data.curFirstWeekDate, 7))
    this.updateWeeks(dateUtil.getDiffDate(this.data.curFirstWeekDate, 7))
  },

  onMinusWeek: function () {
    this.generateEmptyCourse()
    console.log(dateUtil.getDiffDate(this.data.curFirstWeekDate, -7))
    this.updateWeeks(dateUtil.getDiffDate(this.data.curFirstWeekDate, -7))
  },

  peopleIsOpenEye: function (ssNumber) {
    let flag = false
    this.data.peopleList.forEach(element => {
      if (element.ssNumber == ssNumber) {
        flag = element.openEye
        return
      }
    });
    return flag
  },

  updateWeeks: function (date) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    // 获取周一的日期    
    this.setData({
      curFirstWeekDate: dateUtil.getFirstDayDate(date)
    })

    let weekDates = []

    for (var i = 0; i < 7; i++) {
      if (i == 0) {
        weekDates.push(dateUtil.formatWeekDate(this.data.curFirstWeekDate))
      } else {
        weekDates.push(dateUtil.formatWeekDate(dateUtil.getDiffDate(this.data.curFirstWeekDate, i)))
      }
    }

    let todayIndex = weekDates.indexOf(dateUtil.formatWeekDate(today))
    // 第几周
    // 根据日期，算得现在是第几周
    console.log("====传入的日期======")
    console.log(date)
    console.log("==========")

    let curWeek = dateUtil.getWhichWeekByDate(date)
    console.log("==========")
    console.log(curWeek)
    console.log("==========")

    let courselist = this.data.courselist;
    let userCourseList = this.data.rawData.userCourseList
    userCourseList.forEach((e) => {
      e.parse = false
    })
    // // 1.遍历自己的
    userCourseList.forEach((e) => {
      // 如果该周上此节课
      if (e['whichWeek'][curWeek - 1] == 1 && that.peopleIsOpenEye(e.stuNum)) {
        let start = (e.seq).indexOf('1') + 1
        courselist.forEach((tmpItem) => {
          if (tmpItem.start == start && tmpItem.day == e.week - 1 && e.parse == false) {
            tmpItem.count = tmpItem.count + 1
            tmpItem.courses.push(e)
            e.parse = true
            return
          }
        })
      }
    });


    this.setData({
      todayIndex,
      courselist,
      curWeek,
      weekDates
    })

    wx.hideLoading()
  },

  toggleEye: function (e) {
    let number = e.currentTarget.dataset.number
    let peopleList = this.data.peopleList;
    let that = this
    peopleList.forEach(people => {
      if (people.ssNumber == number) {
        people.openEye = !people.openEye
        that.setData({
          peopleList
        })

        this.generateEmptyCourse();
        that.updateWeeks(today);
        return
      }
    });
  },

  handleGetRoomDetailSuccess: function (e) {
    let rawData = e.data.data;
    // let person_list = [{"name",ssNumber:,count},{}]

    let map = {}

    rawData.userCourseList.forEach(element => {
      if (map[element.stuName] != null) {
        map[element.stuName].count = map[element.stuName].count + 1
      } else {
        map[element.stuName] = {
          ssNumber: element.stuNum,
          count: 1,
          openEye: true
        }
      }
      element.parse = false
      // 把他们转化为一个list
    });


    let peopleList = []
    for (let key in map) {
      let obj = map[key]
      obj.id = key
      peopleList.push(obj)
    }
    this.setData({
      rawData,
      peopleList
    })
    this.updateWeeks(today);
  },

  handleGetRoomDetailFail: function (e) {
    wx.showToast({
      title: e,
    })
  },

  generateEmptyCourse: function () {
    let courselist = [];
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 13; j++) {
        // start = 1 3 7 9 11  
        if (j == 1 || j == 3 || j == 6 || j == 8 || j == 11) {
          courselist.push({
            id: 100 * i + j,
            type: 0,
            day: i,
            start: j,
            sections: 2,
            count: 0,
            courses: []
          })
        }

        if (j == 5 || j == 10) {
          courselist.push({
            id: i + j,
            type: 0,
            day: i,
            start: j,
            sections: 1,
            count: 0,
            courses: []
          })
        }
      }
    }

    this.setData({
      courselist
    })
    // multicourse / getRoomDetail
  },

  onLoad(options) {
    const data = router.extract(options);

    this.setData({
      roomName: data.name
    })

    wx.setNavigationBarTitle({
      title: data.name,
    })

    this.generateEmptyCourse();
    multiCourseService.getRoomDetail(this.handleGetRoomDetailSuccess, this.handleGetRoomDetailFail, data.id)

    wx.setNavigationBarColor({
      backgroundColor: '#ffffff',
      frontColor: '#000000',
    })
  }


})