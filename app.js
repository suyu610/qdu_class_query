//app.js
const storage = require('./utils/storage');
import {
  globalData
} from "./utils/global";
const EventEmitter2 = require("./miniprogram_npm/eventemitter2/index").EventEmitter2;
const emitter = new EventEmitter2();
App({
  storage: storage,
  getOpenid: function () {
    let that = this; //获取openid不需要授权
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        this.globalData.openid = res.result.openid;
      }
    });
  },

  onShow: function () {
    this.globalData.capsuleBtnInfo = wx.getMenuButtonBoundingClientRect()
    this.globalData.systemInfo = wx.getSystemInfoSync()
    let that = this
    wx.getNetworkType({
      success: function (res) {
        // networkType字段的有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == 'wifi') {
          that.globalData.isWifi = true
        } else {
          that.globalData.isWifi = false
        }
      }
    })

    wx.cloud.init({
      env: 'qdu-class-query-0gjy63ub39e21b96',
      traceUser: true
    })
    this.getOpenid()
  },

  //获取配置，支持使用“.”
  //key为空，返回全部
  getConfig: function (key) {
    let configs = wx.getStorageSync('configs')
    if (key) {
      let keyArr = key.split('.')
      let result = ""
      if (configs.hasOwnProperty(keyArr[0])) {
        result = configs[keyArr[0]]
      }
      if (keyArr.length == 1) {
        return result
      }
      for (let i = 1; i < keyArr.length; i++) {
        if (result.hasOwnProperty(keyArr[i])) {
          result = result[keyArr[i]]
        } else {
          return false
        }
      }
      return result
    }
    return configs
  },
  globalData: Object.assign({
      emitter: emitter, //全局订阅函数
    },
    globalData
  )
})