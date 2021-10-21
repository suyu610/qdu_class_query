// packageSecondly/pages/major_detail/major_detail.js
const router = require('../../../router/index.js');
var publicCourseService = require('../../../net/publicCourseService.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdf_url: "",
    seqs: [{
        text: '大一上',
        value: 1
      },
      {
        text: '大一下',
        value: 2
      },
      {
        text: '大二上',
        value: 4
      }, {
        text: '大二下',
        value: 5
      }, {
        text: '大三上',
        value: 7
      }, {
        text: '大三下',
        value: 8
      }, {
        text: '大四上',
        value: 10
      }, {
        text: '大四下',
        value: 11
      }
    ],
    courseTypes: [{
      text: '课程分类',
      value: '-1'
    }, ],
    testTypes: [{
        text: '考试类型',
        value: '-1'
      },
      {
        text: '考查',
        value: '考查'
      },
      {
        text: '考试',
        value: '考试'
      }
    ],
    seq: 1,
    courseType: -1,
    testType: '-1',
    showMajorView: false,
    searchResult: {}
  },

  onTapSearchCourse: function (e) {
    // if (e.currentTarget.dataset.count == 0) {
    //   wx.showToast({
    //     icon: 'error',
    //     title: '本学期没开此课',
    //   })
    //   return;
    // }


    router.push({
      name: 'course_search',
      data: {
        'course_name': e.currentTarget.dataset.course
      }
    })
  },
  onTapSearchItem: function (event) {
    this.setData({
      activeNames: event.detail,
    });
  },


  handleGetDetailSuccess: function (e) {
    if (e == null) {
      wx.showToast({
        icon: 'error',
        title: '无此类型课程',
      })
    }
    let tmpCourseTypes = [];

    this.data.courseTypes.forEach(element => {
      tmpCourseTypes.push(
        element.text,
      )
    })

    let courseTypes = []
    e.course.forEach(element => {
      if (tmpCourseTypes.indexOf(element.courseType) == -1) {
        tmpCourseTypes.push(element.courseType);
      }
    });

    tmpCourseTypes.forEach(element => {
      if (element == "课程分类") {
        courseTypes.push({
          text: element,
          value: -1
        })
      } else {
        courseTypes.push({
          text: element,
          value: element
        })
      }
    })
    wx.hideLoading()

    this.setData({
      courseTypes,
      searchResult: e,
      pdf_url: e.pdf
    })

  },

  onSeqChange: function (e) {
    this.setData({
      seq: e.detail
    })


    this.onChange();

  },

  onCourseTypeChange: function (e) {
    this.setData({
      courseType: e.detail
    })
    this.onChange();

  },

  onTestTypeChange: function (e) {
    this.setData({
      testType: e.detail
    })
    this.onChange();
  },
  onChange: function () {
    let params = {
      id: this.data.majorId,
      seq: this.data.seq,
      testType: this.data.testType,
      courseType: this.data.courseType
    }

    publicCourseService.GetMajorDetail(this.handleGetDetailSuccess, params);
  },

  downloadPdf: function () {
    wx.showLoading({
      title: '加载中',
    })

    wx.downloadFile({
      url: this.data.pdf_url,
      success(res) {
        wx.hideLoading()
        console.log(res.tempFilePath)
        wx.openDocument({
          filePath: res.tempFilePath,
          success(e) {
            wx.hideLoading()
            wx.showToast({
              title: '文件打开成功',
            })
          },
          fail(e) {
            wx.hideLoading()
            console.log(e)
            wx.showToast({
              title: '打开失败' + e.errMsg,
            })

          }
        })
      },
      // 下载失败
      fail(e) {
        wx.hideLoading()
        console.log(e)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })

    const data = router.extract(options);
    wx.setNavigationBarTitle({
      title: data.name,
    })

    this.setData({
      majorId: data.id,
      majorName: data.name
    })

    let params = {
      id: data.id,
      seq: this.data.seq,
      testType: this.data.testType,
      courseType: this.data.courseType
    }

    publicCourseService.GetMajorDetail(this.handleGetDetailSuccess, params);

  },

})