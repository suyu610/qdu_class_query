// pages/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
       {"code":"1","text":"×","type":"×️"},
       {"code":"2","text":"⚆","type":"×️"},
       {"code":"3","text":"×","type":"⚆"},
       {"code":"4","text":"⚆","type":"×️"},
       {"code":"t1","text":"×","type":"⚆"},
       {"code":"5","text":"×","type":"⚆"},
       {"code":"6","text":"×️","type":"⚆"},
       {"code":"7","text":"×️","type":"⚆"},
       {"code":"8","text":"×️","type":"×️"},
       {"code":"t2","text":"×️","type":"⚆"},
       {"code":"9","text":"×️","type":"×️"},
       {"code":"10","text":"×️","type":"⚆"},
       ]
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container'),
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '博文楼101',
    })
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