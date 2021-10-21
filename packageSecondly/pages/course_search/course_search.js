const tool = require('../../../utils/tool.js')
var publicCourseService = require('../../../net/publicCourseService.js')
const router = require('../../../router/index.js');

Page({
  data: {
    loading: false,
    activeNames: -1,
    searchCourseValue: "",
    searchResult: {},
    currentIndex: 1,
    majors: {},
    majorIndex: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    // 筛选
    seqs: [{
        text: '全天',
        value: 0
      },
      {
        text: '上午',
        value: 1
      },
      {
        text: '下午',
        value: 2
      },
      {
        text: '晚上',
        value: 3
      },
    ],
    weeks: [{
        text: '整周',
        value: 0
      },
      {
        text: '周一',
        value: 1
      },
      {
        text: '周二',
        value: 2
      },
      {
        text: '周三',
        value: 3
      },
      {
        text: '周四',
        value: 4
      },
      {
        text: '周五',
        value: 5
      },
      {
        text: '周六',
        value: 6
      },
      {
        text: '周日',
        value: 7
      },
    ],
    campuses: [{
        text: '所有校区',
        value: 0
      },
      {
        text: '中心校区',
        value: 1709
      },
      {
        text: '金家岭校区',
        value: 13041
      }
    ],
    major: 0,
    seq: 0,
    week: 0,
    campus: 0,
    showMajorView: false
  },


  seqChange: function (e) {
    this.setData({
      seq: e.detail
    })
  },
  weekChange: function (e) {
    this.setData({
      week: e.detail
    })
  },
  campusChange: function (e) {
    this.setData({
      campus: e.detail
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '青空 - 蹭课查询',
    })
  },

  onLoad: function (options) {
    const data = router.extract(options);
    console.log(data.course_name)
    if (data.course_name != null && data.course_name != "") {
      this.setData({
        searchCourseValue: data.course_name
      })
      this.onTapSearch()
    }
    // this.setData({
    //   majorId: data.id,
    //   majorName: data.name
    // })
    // course_name

  },

  handleSearchSuccessNewPage: function (e) {
    console.log(e)
    this.setData({
      loading: false,
      searchResult: e
    })
  },
  handleSearchSuccess: function (e) {
    let searchResult = this.data.searchResult
    console.log(searchResult)
    if (searchResult.course != null) {
      searchResult.course = searchResult.course.concat(e.course)
      console.log(searchResult)
    } else {
      searchResult = e
    }
    this.setData({
      loading: false,
      searchResult
    })
  },
  handleSearchError: function () {
    this.setData({
      loading: false
    })
    wx.showToast({
      icon: 'none',
      title: "服务器错误",
    })
  },

  // 向服务端发送请求
  // 如果点击上下页，则清空之前的数据 isNewPage = true
  // 如果是下翻，则不需要清空 isNewPage = false
  request: function (index, isNewPage) {
    publicCourseService.getPublicCourseByName(
      this.data.searchCourseValue,
      this.data.seq,
      this.data.week,
      this.data.campus,
      index,
      isNewPage ? this.handleSearchSuccessNewPage : this.handleSearchSuccess,
      this.handleSearchError)
  },



  onStepperChange: tool.throttle((that, e) => {
    that.setData({
      loading: true,
      activeNames: -1
    })
    that.request(e.detail)
  }, 500),

  handleAddPublicCourseSuccess: function () {
    wx.showToast({
      title: '添加成功',
    })
  },
  // 点击添加课程按钮
  onTapAddToMyCourse: function (e) {
    // 发送给后端，找到这节课，然后加到数据库里
    let params = {
      'keyCourse': e.currentTarget.dataset.course,
      'keySeq': e.currentTarget.dataset.seq,
      'infoStr': e.currentTarget.dataset.info
    }
    publicCourseService.addPublicCourse(params, this.handleAddPublicCourseSuccess)

  },

  // 当触底后，应该向后台请求新的页面，并拼接
  onReachBottom: function () {
    let currentIndex = this.data.currentIndex;
    currentIndex++;
    this.setData({
      loading: true,
      // activeNames: -1,
      currentIndex
    })
    this.request(currentIndex)
  },

  onTapSearch: tool.throttle((that, e) => {
    if (that.data.searchCourseValue == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入课程名',
      })
      return;
    }
    // 先清空
    that.setData({
      searchResult: {},
      loading: true,
      activeNames: -1,
      currentIndex: 1
    })
    that.request(0)
  }, 500),

  onSearchChange: function (e) {
    this.setData({
      searchCourseValue: e.detail
    })
  },



  onTapSearchItem: function (event) {
    this.setData({
      activeNames: event.detail,
    });
  }
})