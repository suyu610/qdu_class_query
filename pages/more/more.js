// pages/more/more.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {initNavigationColor,themeData} from '../../config/theme'
const router = require('../../router/index.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {            
    if(app.globalData.rediretTo != ""){
      router.push({name:app.globalData.rediretTo})
      app.globalData.rediretTo = ""
    }
  },

  onReady:function(){
    if(app.globalData.rediretTo != ""){
      router.push({name:app.globalData.rediretTo})
      app.globalData.rediretTo = ""
    }
  },
  showNoEntry:function(){
    Toast.fail('开发中');
  },

  jump2Umbrella:function(){
    wx.navigateTo({
      url: '../umbrella/umbrella',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '更多功能',
    })
    initNavigationColor()
    this.setData({
      themeData:themeData
    })    
  },

})