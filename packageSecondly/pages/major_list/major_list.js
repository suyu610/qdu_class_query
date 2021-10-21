// packageSecondly/pages/major_list/major_list.js
var publicCourseService = require('../../../net/publicCourseService.js')
import userService from '../../../net/userService.js'
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

const router = require('../../../router/index.js');

var wayIndex = -1;
var school_area = '';
var grade = '';

// 当联想词数量较多，使列表高度超过340rpx，那设置style的height属性为340rpx，小于340rpx的不设置height，由联想词列表自身填充
// 结合上面wxml的<scroll-view>
var arrayHeight = 0;

Page({


  /**
   * 页面的初始数据
   */
  data: {
    gridCol: 4,
    skin: false,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    inputValue: '', //点击结果项之后替换到文本框的值
    adapterSource: [],
    bindSource: [], //绑定到页面的数据，根据用户输入动态变化
    hideScroll: true,
  },

  bindinput: function (e) {
    console.log(e)
    this.setData({
      value: e.detail
    })
    //用户实时输入值
    var prefix = e.detail
    //匹配的结果
    var newSource = []
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        // 用户输入的字符串如果在数组中某个元素中出现，将该元素存到newSource中
        if (e.majorName.indexOf(prefix) != -1) {
          console.log(e);
          newSource.push(e)
        }
      })
    };
    // 如果匹配结果存在，那么将其返回，相反则返回空数组
    if (newSource.length != 0) {
      this.setData({
        // 匹配结果存在，显示自动联想词下拉列表
        hideScroll: false,
        bindSource: newSource,
        arrayHeight: newSource.length * 71
      })
    } else {
      this.setData({
        // 匹配无结果，不现实下拉列表
        hideScroll: true,
        bindSource: []
      })
    }
  },


  jump2ClassList(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    router.push({
      name: 'major_detail',
      data: {
        id: id,
        name: name
      }
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.index - 1) * 50
    })
  },

  // 滚动
  VerticalMain(e) {
    let that = this;
    let majors = this.data.majors;
    let tabHeight = 0;


    if (this.data.load) {
      for (let i = 0; i < majors.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + alpha[i].splite("::")[1]);
        view.fields({
          size: true
        }, data => {
          majors[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          majors[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        majors: majors
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < majors.length; i++) {
      if (scrollTop > majors[i].top && scrollTop < majors[i].bottom) {
        that.setData({
          VerticalNavTop: (majors[i] - 1) * 50,
          TabCur: majors[i]
        })
        return false
      }
    }
  },
  handleGetAllMajorSuccess: function (e) {
    let adapterSource = []
    console.log(e)
    for (let item in e) {
      e[item].forEach(element => {
        adapterSource.push(element)
      });
    }

    this.setData({
      majors: e,
      adapterSource
    })


    // this.setData({
    //   majors: e,
    //   listCur: e[0],

    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleCheckImportFromJwSuccess: function (e) {
    if (!e) {
      wx.hideLoading()
      // 如果false，则跳转
      Dialog.confirm({
          title: '注意',
          message: '班级课表为青大内部数据\n为核验本校学生身份，请你先导入课表',
        })
        .then(() => {
          router.push({
            name: 'course_import'
          })
        })
        .catch(() => {
          // on cancel
          wx.navigateBack({
            delta: 1,
          })
        });
    } else {
      // 已经导入教务课表，则开始获取房间
      publicCourseService.GetAllMajor(this.handleGetAllMajorSuccess)

    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userService.CheckImportFromJw(this.handleCheckImportFromJwSuccess)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})