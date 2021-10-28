// pages/more/more.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  initNavigationColor,
  themeData
} from '../../config/theme'
const router = require('../../router/index.js');
const util = require('../../utils/util.js');
const app = getApp()
Page({

  data: {
    bottomAd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      safeAreaTop: app.globalData.capsuleBtnInfo.bottom
    })
  },

  onReady: function () {
    if (app.globalData.rediretTo != "" && app.globalData.rediretTo != null) {
      router.push({
        name: app.globalData.rediretTo
      })
      app.globalData.rediretTo = ""
    }
  },
  showNoEntry: function () {
    Toast.fail('开发中');
  },
  jump2Cheat: function () {
    router.push({
      name: "cheat"
    })
  },
  onShowAdBtnTapped: function () {
    let that = this
    if (!app.globalData.isWifi) {
      wx.showModal({
        title: '非wifi下',
        content: '不许看视频广告',
        confirmText: "偏要看",
        success(res) {
          if (res.confirm) {
            that.setData({
              showAd: true
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({
        showAd: true
      })
    }
  },

  onCloseAd: function () {
    this.setData({
      showAd: false
    })
  },
  jump2Umbrella: function () {
    wx.navigateTo({
      url: '/packageSecondly/pages/umbrella/umbrella',
    })
  },

  jump2Quiz: function () {
    wx.navigateToMiniProgram({
      appId: 'wx573a4ffa05381ed1',
    })
  },

  closeAdPeriodly: function () {
    // 如果现在是打开着的，那么他点击以后，记录现在的时间
    if (this.data.bottomAd) {
      wx.setStorageSync('closeAdTime', new Date())
    }
    this.setData({
      bottomAd: !this.data.bottomAd
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    try {
      var value = wx.getStorageSync('closeAdTime')
      if (value) {
        if (new Date().getTime() - value >= 259200000) {
          that.setData({
            bottomAd: true
          })
        } else {
          that.setData({
            bottomAd: false
          })
        }
      } else {
        this.setData({
          bottomAd: true
        })
      }
    } catch (e) {
      console.log('catch')
      console.log(e)
      // Do something when catch error
    }
    wx.setNavigationBarTitle({
      title: '更多功能',
    })
    initNavigationColor()
    this.setData({
      themeData: themeData
    })
  },

})