// packageSecondly/pages/major_detail/major_detail.js
import publicCourseService from '../../../net/publicCourseService.js'
const router = require('../../../router/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    classSeq: '24733',
    classSeqs: [],
    curClassId: '',
    url: "https://cdns.qdu.life/course_table/2021_autumn/24733.html",
    htmlText: "",
    courseList: [
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}]
    ]
  },

  onCourseDetailPopupClose: function () {
    this.setData({
      showCourseDetailPopup: false
    })
  },
  addItem: function (e) {
    wx.showToast({
      icon: 'none',
      title: '添加功能正在开发中',
    })
  },
  searchItem: function (e) {
    wx.showToast({
      icon: 'none',
      title: '搜索功能正在开发中',
    })
  },

  tapCourse: function (e) {
    this.setData({
      showCourseDetailPopup: true
    })

    this.setData({
      tapCourse: {
        "courseName": e.currentTarget.dataset.coursename,
        "rawInfo": e.currentTarget.dataset.rawinfo.replace("<<" + e.currentTarget.dataset.coursename + ">>;", "")

      }
    })

    // console.log(e.currentTarget.dataset)
  },

  onClassSeqChange(e) {
    wx.showLoading({
      title: '正在加载中',
    })
    this.setData({
      classSeq: e.detail,
    })

    publicCourseService.GetMajorClassCourse(e.detail, this.handleGetClassCourseSuccess)

  },

  handleGetClassCourseSuccess: function (e) {
    // var courseList = this.data.courseList

    let courseList = [
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}]
    ]


    e.forEach(element => {
      if (element != null) {
        element.rawInfo = element.rawInfo.split("||").join("\n")
        courseList[element.seq - 1][element.week - 1] = element
      }
    });

    this.setData({
      courseList
    })

    wx.hideLoading()
  },

  handleGetClassSuccess: function (e) {
    if (e.length != 0) {
      // console.log(e[0])
      let classSeqs = [];
      e.forEach(element => {
        // console.log(element)
        classSeqs.push({
          'text': element.className,
          'value': element.id
        })
      });

      this.setData({
        classSeqs,
        classSeq: e[0].id
      })

      if (e != null) {
        publicCourseService.GetMajorClassCourse(e[0].id, this.handleGetClassCourseSuccess)
      }
    } else {
      wx.showToast({
        icon: 'error',
        title: '无该专业信息',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })

    const data = router.extract(options);
    if (data != null) {
      wx.setNavigationBarTitle({
        title: data.name,
      })
      // console.log(data.id)
      this.setData({
        majorId: data.id,
        majorName: data.name
      })
      publicCourseService.GetMajorClass(data.id, this.handleGetClassSuccess)
    } else {
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            icon: "error",
            title: '发生错误',
          })
        },
      })
    }
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})