let app = getApp()
const foodService = require('../../../../net/foodService.js')
const tool = require('../../../../utils/tool.js')

import Notify from '../../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    food: {},
    commentList: [],
    newInputCommentValue: ""
  },

  handleGetFoodComment: function (data) {
    let commentList = []
    data.forEach(element => {
      if (element.nickname == null) {
        element.nickname = tool.getName()
      }
      commentList.push(element)
    });
    console.log(commentList)
    this.setData({
      commentList
    })
  },
  handleInsertSuccess: function (data) {
    this.setData({
      newInputCommentValue: "",
      commentList: []
    })
    foodService.getCommentByFoodid(app.globalData.selectFood.id, this.handleGetFoodComment);
    Notify({
      type: 'primary',
      color: "#000",
      background: '#ffe36e',
      message: '评论成功，等待审核'
    });

  },
  insertComment: function () {
    var params = {
      "foodId": this.data.food.id,
      "content": this.data.newInputCommentValue
    };

    // 2. 向后端发送新增消息请求
    foodService.insertCommentByFoodid(params, this.handleInsertSuccess)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      food: app.globalData.selectFood
    })
    console.log(app.globalData.selectFood)
    foodService.getCommentByFoodid(app.globalData.selectFood.id, this.handleGetFoodComment);
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