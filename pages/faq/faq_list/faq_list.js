// pages/faq/faq_list/faq_list.js
import {
  extract
} from '../../../router/index.js';
const faqService = require('../../../net/faqService.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listId: 0,
    faqItemList: []
  },
  handleGetFaqList: function (e) {
    this.setData({
      faqItemList: e
    })
    console.log(e)
  },

  jump2FaqItemUrl: function (e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + url,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = extract(options);
    this.setData({
      listId: data.id,
      listName: data.listname
    })
    wx.setNavigationBarTitle({
      title: data.listname + "相关",
    })

    faqService.Faq_GetFaqList(data.id, this.handleGetFaqList)
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