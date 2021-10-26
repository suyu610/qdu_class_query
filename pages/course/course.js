// pages/schedule/schedule.js
/// type
/// 0: 只有自己
/// 1: 只有别人
/// 2: 自己和别人
/// 如果是单人模式，则其颜色为随机，否则按上述来区分颜色
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import * as dateUtil from '../../utils/date'
import {
  initNavigationColor,
  themeData,
  getThemeKey,
  setThemeKey
} from '../../config/theme'
const tool = require('../../utils/tool.js')
const router = require('../../router/index.js');
var userCourseService = require('../../net/userCourseService.js')
var courseAlarmService = require('../../net/courseAlarmService.js')
var countdownService = require('../../net/countdownService.js')
var dateFormatUtil = require('../../utils/util.js')

// 今天的日期
var a = new Date();
var y = a.getFullYear();
var m = a.getMonth() + 1;
var d = a.getDate();
const today = new Date(y + "/" + m + "/" + d)

let app = getApp()
const db = wx.cloud.database()
const _ = db.command
const hours = []
const minutes = []

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

Page({
  noop() {},
  /**
   * 页面的初始数据
   */
  data: {
    colorPattern: [{
        color0: "#FF5252",
        color1: "#FFE57F",
        color2: "#1565C0"
      },
      {
        color0: "#FCE4EC",
        color1: "#E57373",
        color2: "#FFE0B2"
      }
    ],
    today: today,
    turnImg: "/images/room_dir_0.png",
    holiday: {
      "name": "劳动节",
      "countdown": "2021/5/1 00:00:00"
    },
    countdown: {
      "day": 0,
      "hour": 0,
      "min": 0,
      "sec": 0
    },
    holidays: {},
    exams: {},
    friendRealName: "",
    bindFriendToken: "",
    openAlarmValue: false,
    folderMenu: false,
    showFriendsCourse: false,
    clockDate: [22, '00'],
    defaultClockDate: '22:00',
    loading: false,
    showClock: false,
    showSunday: true,
    showSeqTime: true,
    showFriendCourse: true,
    hours,
    minutes,
    nickname: "",
    todayIndex: -1, // 当天索引0-6，-1表示不在当前周
    curWeek: '', // 当前周数
    weekLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    // weekLabelsWithoutSunday: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    weekDates: [], // 周日期列表
    weekDatesWithoutSunday: [],
    courselist: [], // 课程列表
    curFirstWeekDate: "",
    courseColors: ["#7dc0fc", "#ffb752", "#84e0c9"],
    selfJwCourse: [], // 自己的教务课表
    selfAddCourse: [], // 自己的自定义课表
    friendJwCourse: [], // 好友的教务课表
    sequence: ["1", 2, 3, 4, 'T1', 5, 6, 7, 8, 'T2', 9, 10, 11],
    sequenceWithTime: ["1\n8:00 8:50", "2\n9:00 9:50", "3\n10:10 11:00", "4\n11:10 12:00", "T1", "5\n13:30 14:20", "6\n14:30 15:20", "7\n15:30 16:20", "8\n16:30 17:20", "T2", "9\n 18:30 19:20", "10\n19:30 20:20", "11\n20:30 21:20"],
    showSharePopup: false,
    showSettingPopup: false,
    showImportPopup: false,
    tapCourse: "", // 当前点击的课程index
    // 自己单独的教务课程
    showCourseDetailPopup_type0: false,
    // 他单独的课程
    showCourseDetailPopup_type1: false,
    // 共有的课程
    showCourseDetailPopup_type2: false,
    // 自己的自定义课程
    showCourseDetailPopup_type3: false,

    showAddCourseByHandPop: false,
    // 选择课程颜色
    showPickCourseColor: false,
    rgb: 'rgb(0,0,0)',
    type0CourseColor: "",
    type0CourseTextColor: "",
    type3CourseColor: "lightgrey",
    type3CourseTextColor: "black",
    // 
    modalAlarmFailureShow: false,
    //  显示天气详情
    modalWeatherShow: false,
    weather: {
      iconcode: "100"
    },
    // 背景索引
    selectBgIndex: -1,
    // 倒计时
    activeNames: [],
    backgroundUrl: "",
    animationMain: null, //正面
    animationBack: null, //背面
    fileList: [],
    bgFileList: [
      "https://cdns.qdu.life/img/chat_bg_8.jpg",
      "https://cdns.qdu.life/img/chat_bg_2.jpg",
      "https://cdns.qdu.life/img/chat_bg_3.jpg",
      "https://cdns.qdu.life/img/chat_bg_10.jpg",
      "https://cdns.qdu.life/img/chat_bg_5.jpg",
      "https://cdns.qdu.life/img/chat_bg_6.jpg",
      "https://cdns.qdu.life/img/chat_bg_7.jpg",
    ],
    localBgImg: ""
  },

  onConfirmClockTime(e) {
    console.log(e.detail)
    this.setData({
      defaultClockDate: e.detail,
      showClock: false,
      showSettingPopup: true,
    })
  },

  getUserProfile() {
    wx.getUserProfile({
      // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      desc: '用于他人绑定课表时，确认身份',
      success: (res) => {
        app.globalData.nickname = res.userInfo.nickName
        app.globalData.avatar = res.userInfo.avatarUrl
        this.setData({
          nickname: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
        // 向后端发送更新用户数据请求
        let params = {
          nickname: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl
        }
        userCourseService.updateUserinfo(params)
      }
    })
  },
  toggleShowFriendCourse: function (e) {
    wx.setStorage({
      key: "showFriendCourse",
      data: e.detail
    })
    this.setData({
      showFriendCourse: e.detail
    })
  },
  changeShowSunday: function (e) {
    wx.setStorage({
      key: "showSunday",
      data: e.detail
    })
    this.setData({
      showSunday: e.detail
    })
  },
  changeShowSeqTime: function (e) {
    wx.setStorage({
      key: "showSeqTime",
      data: e.detail
    })
    this.setData({
      showSeqTime: e.detail
    })
  },

  modalAlarmFailureClose: function (e) {
    this.setData({
      modalAlarmFailureShow: false
    })
  },

  onTapFolderMenu: function (e) {
    wx.setStorage({
      key: "folderMenu",
      data: !this.data.folderMenu
    })
    this.setData({
      folderMenu: !this.data.folderMenu
    })
  },
  onSwtichShowFriendsCourse: function (e) {
    this.setData({
      showFriendsCourse: e.detail
    })
  },
  onTapWeather: function (e) {
    this.setData({
      modalWeatherShow: true
    })
  },

  modalWeatherClose: function (e) {
    this.setData({
      modalWeatherShow: false
    })
  },
  /////// 翻转卡片
  rotateFn(e) {
    var id = e.currentTarget.dataset.id
    this.animation_main = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    // 点击正面
    if (id == 1) {
      this.animation_main.rotateY(180).step()
      this.animation_back.rotateY(0).step()
      this.setData({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      })
    }
    // 点击背面
    else {
      this.animation_main.rotateY(0).step()
      this.animation_back.rotateY(-180).step()
      this.setData({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      })
    }
  },
  onRefresh: function () {
    this.setData({
      activeNames: ['1'],
      loading: false
    })

  },

  addImagePath(fileId) {
    var that = this
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        let bgFileList = [];
        bgFileList.push(res.fileList[0].tempFileURL)
        bgFileList = that.data.bgFileList.concat(bgFileList)
        that.setData({
          bgFileList
        });
      },
      fail: console.error
    })
  },

  handleCheckAlarmSuccess: function (e) {
    // 已经订阅
    if (e == 1) {
      // 保存一下这个值
      wx.setStorage({
        key: "openAlarm",
        data: true
      })
      wx.hideLoading({
        success: (res) => {
          this.setData({
            openAlarmValue: true
          })
          wx.showToast({
            title: "提醒时间" + this.data.clockDate[0] + ":" + this.data.clockDate[1],
          })
        },
      })
      // 如果没有订阅，则弹窗
    } else {
      wx.hideLoading({
        success: (res) => {
          this.setData({
            openAlarmValue: false
          })
          this.setData({
            showSettingPopup: false
          })
          this.setData({
            modalAlarmFailureShow: true
          })
        },
      })
    }
  },

  handleCloseAlarmSuccess: function (e) {
    if (e == 1) {
      wx.setStorage({
        key: "openAlarm",
        data: false
      })
      this.setData({
        openAlarmValue: false
      })
      wx.showToast({
        title: '已关闭',
      })
    } else {
      wx.showToast({
        title: '关闭失败，请重试',
      })
    }
  },

  openClockChange: function (e) {
    // 如果是打开，则首先需要检测一下，是否订阅了公众号        
    if (e.detail == true) {
      wx.showLoading({
        title: '正在检查权限',
      })
      let params = {
        "clockTime": this.data.defaultClockDate
      }
      courseAlarmService.checksubscribe(this.handleCheckAlarmSuccess, params)
    } else {
      // 如果是关闭
      // 给后台发送关闭闹钟
      courseAlarmService.closeAlarm(this.handleCloseAlarmSuccess);
    }
  },
  jump2AlarmExplain: function (e) {
    wx.navigateTo({
      url: '/pages/webview/webview?url=https://mp.weixin.qq.com/s/9Ld04Ll7D11ef2NeQI7ESA',
    })
  },

  onClickClock: function (e) {
    this.setData({
      showClock: true,
      showSettingPopup: false
    })
  },

  clockClose: function (e) {
    this.setData({
      showClock: false,
      showSettingPopup: true
    })

  },

  // 改变闹钟时间
  changeClock: function (e) {
    let clockDate = [e.detail.value[0], e.detail.value[1]]
    this.setData({
      clockDate
    });
  },

  // 点击了设置按钮
  settingBtnHandler: function () {
    this.setData({
      showSettingPopup: true
    })
  },

  // 关闭设置页面
  onSettingPopupClose() {
    this.setData({
      showSettingPopup: false
    });
  },

  // 点击添加课表
  importBtnHandler: function () {
    this.setData({
      showImportPopup: true
    });
  },
  // 关闭导入课表页面
  onImportPopupClose: function () {
    this.setData({
      showImportPopup: false
    });

  },
  selectBg: function (e) {
    let selectBgIndex = e.currentTarget.dataset.index;
    if (selectBgIndex == this.data.selectBgIndex) {
      selectBgIndex = -1
    }
    wx.setStorage({
      data: selectBgIndex,
      key: 'selectBgIndex',
    })
    // 如果点击和当前背景一致，那么就恢复默认
    if (this.data.selectBgIndex == e.currentTarget.dataset.index) {
      this.setData({
        selectBgIndex: -1,
        backgroundUrl: ""
      })
      return
    }
    // 如果选择的是自己的背景
    if (e.currentTarget.dataset.index == this.data.bgFileList.length) {
      this.setData({
        selectBgIndex,
        backgroundUrl: this.data.fileList[0].url
      })
      return
    }
    this.setData({
      selectBgIndex,
      backgroundUrl: this.data.bgFileList[selectBgIndex]
    })
  },

  shareBtnHandler: function () {
    this.setData({
      showSharePopup: true
    })
  },

  onCountDownChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  // 关闭倒计时
  closeCountDown() {
    this.setData({
      activeNames: [],
    });
  },

  // 上传图片
  uploadToCloud(event) {
    let that = this
    wx.cloud.init();
    let fileList = [event.detail];

    if (!fileList) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      });
    } else {
      var rn = Math.floor(Math.random() * 10000 + 1) //随机数
      var name = Date.parse(new Date()) / 1000; //时间戳
      const cloudPath = 'moment/bg/' + rn + name

      const uploadTasks = fileList.map((file, index) =>
        this.uploadFilePromise(cloudPath + index + ".png", file),
      );

      tool.saveImg2Local(fileList[0].file.url, "localBgImg")
      let localBgImg = fileList[0].file.url;
      that.setData({
        fileList: [{
          url: localBgImg,
          "isImage": true
        }]
      });
      Promise.all(uploadTasks)
        .then(data => {
          const db = wx.cloud.database()
          data.forEach(function (item) {
            // 由cloud Id 转化为http链接
            // that.addImagePath(item.fileID)    
            db.collection('background-image').add({
              data: {
                fileid: item.fileID
              },
            })
          })
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.file.url
    });
  },


  onSharePopupClose() {
    this.setData({
      showSharePopup: false
    });
  },

  onShow: function () {
    if (app.globalData.onImportJwCourseOk) {
      // 如果是刚刚导入过来，则需要设置
      this.setData({
        showImportPopup: false
      })
      wx.showToast({
        title: '导入成功',
      })
      this.initJwCourse()
    }
    let type0CourseColor = wx.getStorageSync('--type0CourseColor')
    let type0CourseTextColor = wx.getStorageSync('--type0CourseTextColor')
    let type1CourseColor = wx.getStorageSync('--type1CourseColor')
    let type1CourseTextColor = wx.getStorageSync('--type1CourseTextColor')
    let type2CourseColor = wx.getStorageSync('--type2CourseColor')
    let type2CourseTextColor = wx.getStorageSync('--type2CourseTextColor')
    // 设置导航颜色
    initNavigationColor()
    this.setData({
      themeData: themeData,
      type0CourseColor: type0CourseColor,
      type0CourseTextColor: type0CourseTextColor,
      type1CourseColor: type1CourseColor,
      type1CourseTextColor: type1CourseTextColor,
      type2CourseColor: type2CourseColor,
      type2CourseTextColor: type2CourseTextColor,
      rgb: this.hexToRgb(type0CourseColor)
    })

    this.initAddCourse()
  },

  /**
   * 课程详情
   */
  showCardView: function (event) {
    let ele = event.currentTarget
    let type = ele.dataset.type
    let index = ele.dataset.index
    let course = this.data.courselist[index]
    let turnImg;
    if (course.direction == 0) {
      turnImg = '/images/room_dir_0.png';
    } else {
      if (course.rFloor == 1) {
        turnImg = '/images/room_dir_1_' + course.direction + '.png';
      } else {
        turnImg = '/images/room_dir_2_' + course.direction + '.png';
      }
    }

    if (type == 0 || type == 3) this.setData({
      showCourseDetailPopup_type0: true,
      tapCourse: course,
      turnImg
    })
    if (type == 1) this.setData({
      showCourseDetailPopup_type1: true,
      tapCourse: course
    })
    if (type == 2) this.setData({
      showCourseDetailPopup_type2: true,
      tapCourse: course
    })
    // if(type == 3) this.setData({showCourseDetailPopup_type3:true,tapCourse:course})
  },
  deleteItem: function () {
    wx.showToast({
      icon: 'none',
      title: '删除功能正在开发中',
    })
  },
  modifyItem: function () {
    wx.showToast({
      icon: 'none',
      title: '修改功能正在开发中',
    })
  },
  onCourseDetailPopupClose: function () {
    this.animation_main = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    this.animation_main.rotateY(0).step()
    this.animation_back.rotateY(-180).step()
    this.setData({
      animationMain: this.animation_main.export(),
      animationBack: this.animation_back.export(),
    })
    this.setData({
      showCourseDetailPopup_type0: false,
      showCourseDetailPopup_type1: false,
      showCourseDetailPopup_type2: false,
      showCourseDetailPopup_type3: false
    })
  },
  /**
   * 新建课程
   */
  addCourseHandler: function (event) {
    wx.navigateTo({
      url: '../addCourse/addCourse',
    })
  },

  /**
   * 上一周
   */
  prevWeekHandler: function (event) {
    if (this.data.curWeek - 1 > 0) {
      this.updateWeeks(dateUtil.getDiffDate(this.data.curFirstWeekDate, -7))
    } else {
      wx.showToast({
        title: '已经是第一周了',
      })
    }
  },

  /**
   * 下一周
   */
  nextWeekHandler: function (event) {
    if (this.data.curWeek + 1 <= 17) {
      this.updateWeeks(dateUtil.getDiffDate(this.data.curFirstWeekDate, 7))
    } else {
      wx.showToast({
        icon: 'none',
        title: '已经是期末了',
      })
    }
  },
  // 判断type
  // 如果周和start在list中有相同的值，则为2,否则为1
  judgeType: function (friendCourse, courselist, index) {

    let friendStart = (friendCourse.seq).indexOf('1') + 1
    let friendSection = (friendCourse.seq).lastIndexOf('1') - (friendCourse.seq).indexOf('1') + 1
    let course = {
      id: index,
      type: 1,
      day: friendCourse.week - 1,
      start: friendStart,
      sections: friendSection,
      course: friendCourse.courseName,
      teachers: friendCourse.teachers,
      place: friendCourse.className,
      week: friendCourse.week,
      infoStr: friendCourse.infoStr,
      rFloor: friendCourse.rfloor,
      direction: friendCourse.direction
    }

    courselist.forEach((e) => {
      if (e.week == friendCourse.week && e.start == friendStart) {
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
          friendCourse: friendCourse.courseName,
          myTeachers: e.teachers,
          friendTeachers: friendCourse.teachers,
          myPlace: e.place,
          friendPlace: friendCourse.className,
          week: e.week,
          myinfoStr: e.infoStr,
          friendinfoStr: friendCourse.infoStr,
          rFloor: e.rfloor,
          direction: e.direction
        }
        return false
      }
    })
    return course
  },

  updateAddCourse: function () {
    let rawSelfAddCourse = this.data.selfAddCourse
    let courselist = this.data.courselist;
    let curWeek = this.data.curWeek
    // 1.遍历自己的
    rawSelfAddCourse.forEach((e, index) => {
      // 如果该周上此节课
      if (e['whichWeek'][curWeek] == 1) {
        let start = (e.seq).indexOf('1') + 1
        let section = (e.seq).lastIndexOf('1') - (e.seq).indexOf('1') + 1
        courselist.push({
          id: index,
          type: 3,
          day: e.week - 1,
          start: start,
          sections: section,
          course: e.courseName,
          teachers: e.teacher,
          place: e.className,
          week: e.week,
          infoStr: e.infoStr,
          rFloor: e.rfloor,
          direction: e.direction,
          teachers: e.teachers
        })
      }
    });

    this.setData({
      courselist,
    })
    wx.hideLoading()
  },

  // 逻辑是，如果本地没有值，再从服务器上拿
  updateWeeks: function (date) {
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
    let weekDatesWithoutSunday = weekDates.slice(0, 5)
    // 第几周
    // 根据日期，算得现在是第几周
    let curWeek = dateUtil.getWhichWeekByDate(date)
    console.log(curWeek)
    let courselist = [];

    // 最终三种列表，要放到courselist里面，用来展现给前端
    // 首先来弄弄自己的教务课表
    let rawSelfJwCourse = this.data.selfJwCourse
    // 1.遍历自己的
    rawSelfJwCourse.forEach((e, index) => {
      // 如果该周上此节课
      if (e['whichWeek'][curWeek - 1] == 1) {
        let start = (e.seq).indexOf('1') + 1
        let section = (e.seq).lastIndexOf('1') - (e.seq).indexOf('1') + 1
        courselist.push({
          id: index,
          type: 0,
          day: e.week - 1,
          start: start,
          sections: section,
          course: e.courseName,
          teachers: e.teacher,
          place: e.className,
          week: e.week,
          infoStr: e.infoStr,
          rFloor: e.rfloor,
          direction: e.direction,
          teachers: e.teachers
        })
      }
    });
    let tmpCourselist = []
    // 解析好友的时候，要判断原列表中，是否已经有课了，如果有，则type=2
    let rawFriendJwCourse = this.data.friendJwCourse
    rawFriendJwCourse.forEach((e, index) => {
      // 如果该周上此节课
      if (e['whichWeek'][curWeek - 1] == 1) {
        tmpCourselist.push(this.judgeType(e, courselist, index))
      }
    });
    courselist = courselist.concat(tmpCourselist)
    this.setData({
      todayIndex,
      courselist,
      curWeek,
      weekDates,
      weekDatesWithoutSunday
    })

    wx.hideLoading()
  },


  deleteBgImg: function (e) {
    // 首先清空运行时文件
    this.setData({
      fileList: []
    })
    // 然后清空本地存储的值
    wx.removeStorageSync('localBgImg')
  },

  getWholeBackgroundImage: function () {
    let localBgImg = ""
    localBgImg = wx.getStorageSync('localBgImg')
    if (localBgImg == "" || localBgImg == null) return
    this.setData({
      localBgImg: localBgImg.data,
      fileList: [{
        url: "data:image/png;base64," + localBgImg.data,
        "isImage": true
      }]
    })
    // 从云端获取
    // let that = this
    // db.collection("background-image").get({
    //   success(res) {
    //     res.data.forEach(element => {
    //       that.addImagePath(element.fileid);
    //     });
    //   }
    // })
  },

  startCountdown() {
    var setTime = new Date(this.data.holiday.countdown);
    var now = new Date();
    var restSec = setTime.getTime() - now.getTime()
    var day = parseInt(restSec / (60 * 60 * 24 * 1000));
    var hour = parseInt(restSec / (60 * 60 * 1000) % 24);
    var min = parseInt(restSec / (60 * 1000) % 60);
    var sec = parseInt(restSec / (1000) % 60);
    this.setData({
      countdown: {
        "day": day,
        "hour": hour,
        "min": min,
        "sec": sec
      },
    })

    setTimeout(this.startCountdown, 1000)
  },

  tapImportCourseBtn: function () {
    this.setData({
      showImportPopup: true
    })
  },

  importByHand: function () {
    router.push({
      'name': 'course_search'
    })
    // this.setData({
    //   showAddCourseByHandPop:true,
    //   showImportPopup:false
    // })
  },
  importByDean: function () {
    router.push({
      name: 'course_import'
    })
  },

  handleGetMyJwCourse: function (e) {
    console.log(e)
    // 将它存到本地
    wx.setStorage({
      key: app.globalData.myJwCourseKey,
      data: e
    })
    this.setData({
      selfJwCourse: e
    })
    this.updateWeeks(today)
  },

  handleGetMyAddCourse: function (e) {
    this.setData({
      selfAddCourse: e
    })
    this.updateAddCourse(today)
  },

  handleGetFriendJwCourse: function (e) {
    var friendRealName = app.globalData.friendRealName;
    // 将它存到本地    
    wx.setStorage({
      key: friendRealName + "-jw-course-v3",
      data: e
    })
    this.setData({
      friendJwCourse: e
    })
    this.updateWeeks(today)
  },

  // 这里首先判断本地有没有教务课表，
  // 如果有,则加载，并解析
  // 如果没有，则发送网络请求，如果服务器上也没有，那就算了
  // 如果服务器上有，则存储，解析
  initJwCourse: function () {
    let that = this
    //首先判断本地有没有教务课表，
    wx.getStorage({
      key: app.globalData.myJwCourseKey,
      success(res) {
        if (res.data.length == 0) {
          userCourseService.getMyJwCourse(that.handleGetMyJwCourse)
        } else {
          that.setData({
            selfJwCourse: res.data
          })
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

  initAddCourse: function () {
    userCourseService.getMyAddCourse(this.handleGetMyAddCourse)
  },

  // 没有绑定好友，则返回一个绑定的token
  handleCheckBindFriend: function (e) {
    this.setData({
      bindFriendToken: e
    })
  },

  initFriendCourse: function () {
    let that = this
    //首先判断本地有没有好友的姓名，
    let friendRealName = app.globalData.friendRealName
    if (friendRealName == "") {
      // 说明未绑定，则生成一个绑定好友的token
      userCourseService.checkBindFriend(this.handleCheckBindFriend)
    } else {
      this.setData({
        friendRealName
      })
      // 如果绑定了，先看他是不是为 未导入教务课表
      if (friendRealName == '未导入教务课表') return
      //否则检查本地是否有该用户的课程数据
      wx.getStorage({
        key: friendRealName + "-jw-course-v3",
        success(res) {
          if (res.data.length == 0) {
            // 等同于本地没有值
            // console.log("本地有好友的教务课表，但长度为0")
            userCourseService.getFriendJwCourse(that.handleGetFriendJwCourse)
          } else {
            // console.log("本地有好友的教务课表，且长度不为0")
            // 本地有值，且长度不为0
            that.setData({
              friendJwCourse: res.data
            })
          }
        },
        fail() {
          console.log("本地没有好友的教务课表")
          userCourseService.getFriendJwCourse(that.handleGetFriendJwCourse)
        },
        complete() {
          // 最终都解析这个列表
          that.updateWeeks(today)
        }
      })
    }
  },

  handleGetCountdownAfterTodaySuccess: function (e) {
    let today = new Date()
    // 将节日和考试分别放到holidays和exams，然后把离得最近的节日，放到holiday中。
    let holidays = [];
    let exams = [];
    let holiday = {
      "name": "Null",
      "countdown": new Date("2099-01-01")
    };

    e.forEach(function (item) {
      let tmpStartDate = new Date(item.startDate)
      let tmpItem = {
        "startDate": dateFormatUtil.formatTime2(tmpStartDate),
        "name": item.name,
        "gapDay": dateFormatUtil.gapDay(tmpStartDate, today),
        // 放几天假
        "duration": item.duration,
        "signDate": dateFormatUtil.formatTime2(new Date(item.signDate)),
      }

      // 是节日
      if (item.type == 0) {
        // 判断哪个节日最近
        if (holiday.countdown.getTime() > tmpStartDate.getTime()) {
          holiday.name = item.name
          holiday.countdown = tmpStartDate
        }
        holidays.push(tmpItem)
      }

      // 是考试
      if (item.type == 1) {
        exams.push(tmpItem)
      }
    })

    this.setData({
      holiday,
      holidays,
      exams
    })
  },

  onReady: function () {
    this.setData({
      weather: app.globalData.weather
    })
  },

  handleConfirmBindFriend: function (e) {
    wx.reLaunch({
      url: '/pages/empty/empty?url=course',
    })
  },

  // 获取绑定结果，这里假设绑定成功了
  handleCheckTokenSuccess: function (e) {
    let failFlag = false
    if (e == "-1") {
      wx.showToast({
        icon: 'error',
        title: '链接失效',
        duration: 2000,
      })
      failFlag = true
    }
    if (e == "-2") {
      wx.showToast({
        icon: 'error',
        title: '不能和自己绑定',
        duration: 2000,
      })
      failFlag = true

    }

    if (e == "-3") {
      wx.showToast({
        icon: 'error',
        title: '你已经有好友了',
        duration: 2000,
      })
      failFlag = true
    }

    if (e == "-4") {
      wx.showToast({
        icon: 'error',
        title: '他已经有好友了',
        duration: 2000,
      })
      failFlag = true
    }

    if (failFlag) {
      setTimeout(() => {
        wx.hideLoading()
        wx.reLaunch({
          url: '/pages/empty/empty?url=course',
        })
        return
      }, 2000);
    } else {
      // 如果成功了，就跳一次
      Dialog.confirm({
          title: '你要和' + e + '绑定吗?',
          message: '绑定后，双方都能看到对方的教务课表',
        })
        .then(() => {
          this.handleConfirmBindFriend()
        })
        .catch(() => {
          // on cancel
        });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '个人课表',
    })

    this.setData({
      safeTop: app.globalData.systemInfo.statusBarHeight
    })
    // console.log()
    // 首先检查params,如果不为空，则去服务器绑定    
    if (app.globalData.url == "course" && app.globalData.params != null) {
      userCourseService.checkTokenAndBind(
        app.globalData.params,
        this.handleCheckTokenSuccess)
    } else {
      this.setData({
        nickname: app.globalData.nickname,
        avatar: app.globalData.avatar,
      })

      let that = this;
      this.initJwCourse()
      this.initFriendCourse()

      countdownService.getCountdownAfterToday(this.handleGetCountdownAfterTodaySuccess)
      let folderMenu = wx.getStorageSync("folderMenu")
      if (folderMenu == "") {
        folderMenu = false
      }

      // 显示周末
      let showSunday = true;
      wx.getStorage({
        key: "showSunday",
        success(res) {
          showSunday = res.data;
        },
        complete() {
          that.setData({
            showSunday
          })
        }
      })

      //  显示上课时间
      let showSeqTime = true;
      wx.getStorage({
        key: "showSeqTime",
        success(res) {
          showSeqTime = res.data;
        },
        complete() {
          that.setData({
            showSeqTime
          })
        }
      })

      let showFriendCourse = true;
      wx.getStorage({
        key: "showFriendCourse",
        success(res) {
          showFriendCourse = res.data;
        },
        complete() {
          that.setData({
            showFriendCourse
          })
        }
      })

      // 开启假期倒计时
      this.startCountdown()

      // 拉取所有的壁纸
      this.getWholeBackgroundImage()

      // 获取本周的课表  
      let selectBgIndex = wx.getStorageSync(
        "selectBgIndex",
      )

      this.setData({
        selectBgIndex,
        folderMenu,
      })
      // 如果选择的是自己的背景
      if (selectBgIndex == this.data.bgFileList.length) {
        if (this.data.fileList[0] != null) {
          this.setData({
            backgroundUrl: this.data.fileList[0].url
          })
        }
        return
      }

      var openAlarmValue = false;

      wx.getStorage({
        key: 'openAlarm',
        success(res) {
          openAlarmValue = res.data;
          that.setData({
            openAlarmValue
          })
        },
        fail() {
          openAlarmValue = false;
          that.setData({
            openAlarmValue
          })
        }
      })

      this.setData({
        backgroundUrl: this.data.bgFileList[selectBgIndex]
      })
    }
  },


  //////////////// 更改课程颜色  ////////////////
  onShowSwitchCourseColor_type0: function () {
    this.setData({
      showPickCourseColor_type0: true,
      showSettingPopup: false,
    })
  },

  onShowSwitchCourseColor_type1: function () {
    this.setData({
      showPickCourseColor_type1: true,
      showSettingPopup: false,
    })
  },
  onShowSwitchCourseColor_type2: function () {
    this.setData({
      showPickCourseColor_type2: true,
      showSettingPopup: false,
    })
  },

  pickColorClose: function () {
    this.setData({
      showSettingPopup: true,
    })
  },

  setColor(type, color) {
    let textColor = this.brightness(color)
    switch (type) {
      case '0': {
        wx.setStorageSync("--type0CourseColor", color)
        wx.setStorageSync("--type0CourseTextColor", textColor)
        this.setData({
          type0CourseColor: color,
          type0CourseTextColor: textColor
        })
        break;
      }
      case '1': {
        wx.setStorageSync("--type1CourseColor", color)
        wx.setStorageSync("--type1CourseTextColor", this.brightness(color))
        this.setData({
          type1CourseColor: color,
          type1CourseTextColor: textColor
        })
        break;
      }
      case '2': {
        wx.setStorageSync("--type2CourseColor", color)
        wx.setStorageSync("--type2CourseTextColor", this.brightness(color))
        this.setData({
          type2CourseColor: color,
          type2CourseTextColor: textColor
        })
        break;
      }
    }
  },
  // 设置不同的颜色

  pickColor(e) {
    let type = e.currentTarget.dataset.type
    console.log(type)
    // 这里先只修改主题色和文字颜色    
    let rgb = e.detail.color;
    let courseColor = this.rgb2hex(rgb)
    this.setColor(type, courseColor)
    this.setData({
      rgb
    })
  },


  /**
   * @desc 判断标题用白色还是黑色
   * @param {String} color:'rgb(255,0,0)'
   * @return {String} '#000000'
   */
  brightness: function (color) {
    color = this.hexToRgb(color)
    let rgb = color.split(',');
    let R = parseInt(rgb[0].split('(')[1]);
    let G = parseInt(rgb[1]);
    let B = parseInt(rgb[2].split(')')[0]);
    let bright = 0.299 * R + 0.587 * G + 0.114 * B;
    return bright >= 151 ? "#000000" : "#ffffff";
  },

  /**
   * @param {String} color:'rgb(255,0,0)'
   * @return {String} hex:'#000' 
   */

  rgb2hex: function (color) {
    let rgb = color.split(',');
    let R = parseInt(rgb[0].split('(')[1]);
    let G = parseInt(rgb[1]);
    let B = parseInt(rgb[2].split(')')[0]);
    let hex = "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
    return hex;
  },

  /**
   * @param {String} hex:'#000' color:'rgb(255,0,0)'
   * @return {String} color:'rgb(255,0,0)'
   */

  hexToRgb: function (hex) { //十六进制转为RGB
    var rgb = []; // 定义rgb数组
    if (/^\#[0-9A-F]{3}$/i.test(hex)) { //判断传入是否为#三位十六进制数
      let sixHex = '#';
      hex.replace(/[0-9A-F]/ig, function (kw) {
        sixHex += kw + kw; //把三位16进制数转化为六位
      });
      hex = sixHex; //保存回hex
    }
    if (/^#[0-9A-F]{6}$/i.test(hex)) { //判断传入是否为#六位十六进制数
      hex.replace(/[0-9A-F]{2}/ig, function (kw) {
        rgb.push('0x' + kw); //十六进制转化为十进制并存如数组
      });
      return `rgb(${rgb.join(',')})`; //输出RGB格式颜色
    } else {
      console.log(`Input ${hex} is wrong!`);
      return 'rgb(0,0,0)';
    }
  },



  ///////  多人课表

  // 解除绑定
  handleDismissFriendSuccess: function () {
    this.setData({
      friendRealName: "",
      showSharePopup: false
    })
    wx.showToast({
      title: '解绑成功',
    })

  },

  handleConfirmDissmissFriend: function () {
    userCourseService.dismissFriend(this.handleDismissFriendSuccess)
  },

  // 分享课表
  onShareAppMessage(e) {
    // 如果是从button里来的，那就要执行添加流程
    // 如果是右上角来的，那就不需要
    let from = e.from
    if (from == 'button') {
      let bindFriendToken = this.data.bindFriendToken
      this.getUserProfile()
      // 先检查是否为-1
      if (bindFriendToken == -1) {
        return {
          title: '一键查询空教室',
          path: 'pages/empty/empty',
          imageUrl: 'https://cdns.qdu.life/img/share_1.png',
        }
      }

      return {
        title: '与我绑定课表吧~',
        path: 'pages/empty/empty?url=course&params=' + bindFriendToken, // 路径，传递参数到指定页面。
        imageUrl: 'https://cdns.qdu.life/img/share_1.png', // 分享的封面图
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    } else {
      return {
        title: '一键查询空教室',
        path: 'pages/empty/empty', // 路径，传递参数到指定页面。
        imageUrl: 'https://cdns.qdu.life/img/share_1.png', // 分享的封面图
      }
    }
    // 'menu' , 'button'


  },
  // 点击解除关系
  dismissFriend: function (e) {
    Dialog.confirm({
        title: '确认解绑吗?',
        message: '解绑后，双方都会同时删除对方的课表',
      })
      .then(() => {
        this.handleConfirmDissmissFriend()
      })
      .catch(() => {
        // on cancel
      });
  },

  // 一键换色
  clickColorPattern(e) {
    let that = this
    wx.showModal({
      title: "要更换课表颜色吗？",
      content: "将会重置你的课表颜色",
      success(res) {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          if (index != 0) {
            let color = that.data.colorPattern[index - 1]
            that.setColor('0', color['color0'])
            that.setColor('1', color['color1'])
            that.setColor('2', color['color2'])
            that.setData({
              shuicaiMode: false
            })
          } else {
            that.setData({
              shuicaiMode: true
            })
          }
        }
      }
    })
  },

  // 导航
  navigateTo: function (e) {
    let className = encodeURI(e.currentTarget.dataset.className)
    // 调用腾讯的接口
    let url = "https://apis.map.qq.com/ws/place/v1/search?boundary=region(%E9%9D%92%E5%B2%9B,0)&keyword=" + className + "&page_size=20&page_index=1&orderby=_distance&key=5WCBZ-U7RLU-RFHVG-2N6Q7-76LT6-DZBJO"
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        const latitude = res.data.data[0].location.lat;
        const longitude = res.data.data[0].location.lng;
        const address = res.data.data[0].address;
        const name = res.data.data[0].title;
        wx.openLocation({
          latitude,
          longitude,
          name: name,
          address: address,
          scale: 18
        })
      }
    })
  }
})