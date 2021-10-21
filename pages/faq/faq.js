// pages/faq/faq.js
const app = getApp()
import {
  themeData,
  setThemeKey,
  getThemeKey
} from '../../config/theme'
const router = require('../../router/index.js');

const faqService = require('../../net/faqService.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faqColumnList: [],
    hotFaqList: []
  },
  handleGetInitDataSuccess: function (e) {
    this.setData({
      faqColumnList: e.faqColumnList,
      hotFaqList: e.hotFaqList
    })
  },

  jump2FaqItemUrl: function (e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + url,
    })
  },
  jump2Report: function () {
    wx.showToast({
      title: '正在开发中',
    })
    // router.push({
    //   'name': 'report'
    // })
  },

  jump2FaqList: function (e) {
    let id = e.currentTarget.dataset.id
    let listname = e.currentTarget.dataset.listname
    router.push({
      name: 'faq_list',
      data: {
        id,
        listname
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '常见问题',
    })
    faqService.Faq_GetFaqInitData(this.handleGetInitDataSuccess);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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