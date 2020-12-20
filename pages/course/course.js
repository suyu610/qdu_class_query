// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasClass:true,
    colorArrays: ["#fde06b"],
    wlist: [
     //上课长度全部默认为两节课
      { "week": 1, "start": 1, "long":2,"className":"电路原理", "build": "博学楼104","weekInfo": "1~18" },      
      { "week": 1, "start": 3, "long": 2,"className":"学术英语写作", "build": "博文楼402","weekInfo": "双周2~18"},      
      { "week": 2, "start": 1, "long": 2,"className":"数字电子技术基础", "build": "博学楼212","weekInfo": "1~18"},
      { "week": 2, "start": 3, "long": 2,"className":"大学物理学", "build": "博知楼105","weekInfo": "1~18"},     
      { "week": 2, "start": 6, "long": 2,"className":"复变函数与数理方程", "build": "静思楼105","weekInfo": "1~18"},
      { "week": 2, "start": 11, "long": 2,"className":"Python进阶之网络爬虫", "build": "博远楼104","weekInfo": "1~16"  },
      { "week": 3, "start": 3, "long": 2,"className":"篮球", "build": "北院篮球场","weekInfo": "1~16周"},      
      { "week": 4, "start": 1, "long": 2,"className":"数字电子技术基础", "build": "博学楼212","weekInfo": "1~18"},
      { "week": 4, "start": 5, "long": 3,"className":"毛泽东思想和中国特色社会主义理论体系概论", "build": "博学楼205","weekInfo": "1-18" },
      { "week": 4, "start": 8, "long": 2, "className":"复变函数与数理方程", "build": "博学楼306","weekInfo": "1~18" },            
      { "week": 4, "start": 11, "long": 2, "className":"日常生活常见疾病", "build": "博远楼211","weekInfo": "1~16" },
      { "week": 5, "start": 1, "long": 2, "className":"电路原理实验", "build": "博远楼603","weekInfo": "双周4~18" },
      { "week": 5, "start": 3, "long": 2, "className":"电路原理", "build": "博知楼103","weekInfo": "1-18" },
      { "week": 5, "start": 6, "long": 4, "className":"数字电子技术实验", "build": "博远楼503","weekInfo": "双周8-18" },
      { "week": 6, "start": 3, "long": 4, "className":"数字电子技术实验", "build": "博远楼503","weekInfo": "双周8-18" }
    ]
  },
  showCardView: function (e) {
    wx.navigateTo({
      url: '../set/set?id=' + e.currentTarget.id
    });
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '课表',
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