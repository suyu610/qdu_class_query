// pages/empty/empty.js
const app = getApp()
import {
  themeData,
  setThemeKey,
  getThemeKey
} from '../../config/theme'
const flagService = require('../../net/flagService.js')
const NetUrl = require('../../net/constants.js')
const router = require('../../router/index.js');
var weatherService = require('../../net/weatherService.js')
var userService = require('../../net/userService.js')

var utils = require('../../utils/util.js')

Page({

  // 当不为guide,不为splash时，判断该跳转哪个页面
  jumpWhere: function () {
    // 这里是debug用的
    if (app.globalData.debug) {
      console.log("empty.js: debug模式")
      router.replace({
        name: app.globalData.debugRouter
      });
      return;
    }
    let options = this.data.options;
    if (null != options && null != options.url) {
      console.log(options.params)
      app.globalData.url = options.url
      app.globalData.params = options.params

      router.replace({
        name: options.url,
        data: options.params
      });

      return;
    }

    // 如果
    // 否则跳过        
    // 获取第一页是谁    
    wx.getStorage({
      key: 'first-page',
      success(res) {
        switch (res.data) {
          case '空教室页':
            router.push({
              name: 'index'
            })
            break;
          case '课表页':
            router.push({
              name: 'course'
            })
            break;
          case '信息流':
            router.push({
              name: 'moment'
            })
            break;
          default:
            router.replace({
              name: 'index'
            })
            break;
        }
      },
      fail() {
        // 当没有设置启动页的时候，跳转空教室页
        // router.push({name:'splash'})
        router.push({
          name: 'index'
        })
      }
    })
  },

  handleGetPublicRandomFlag: function (data) {
    app.globalData.flag = data
  },
  handleLoginByTokenFail: function (fail) {
    this.loginByWxCode()
  },
  handleLoginByTokenSuccess: function (res) {
    if (res.data.token.token != null) {
      console.log(res.data.token)
      wx.setStorageSync('', res.data.token.token)
    } else {
      wx.setStorageSync(app.globalData.tokenKey, res.data.token)
    }
    wx.setStorageSync('nickname', res.data['nickname'])
    wx.setStorageSync('avatar', res.data['avatar'])
    app.globalData.token = res.data['token']
    app.globalData.friendRealName = res.data['friendRealName']
    app.globalData.nickname = res.data['nickname']
    app.globalData.avatar = res.data['avatar']
    flagService.getPublicRandomFlag(this.handleGetPublicRandomFlag)
    // 天气
    weatherService.getWeatherRequest(this.handleGetWeatherSuccess);
  },

  loginByToken: function (token) {
    let data = {
      "tokenStr": token
    }
    userService.LoginByToken(this.handleLoginByTokenSuccess, this.handleLoginByTokenFail, data)
  },

  loginByWxCode: function () {
    let that = this
    wx.login({
      success(res) {
        //发起网络请求
        wx.request({
          url: NetUrl.Host + "user/login/" + res.code,
          method: "post",
          success(res) {
            if (res.data['status']['code'] == 200) {
              wx.setStorageSync(app.globalData.tokenKey, res.data['data']['token'])
              wx.setStorageSync('nickname', res.data['data']['nickname'])
              wx.setStorageSync('avatar', res.data['data']['avatar'])
              app.globalData.token = res.data['data']['token']
              app.globalData.friendRealName = res.data['data']['friendRealName']
              app.globalData.nickname = res.data['data']['nickname']
              app.globalData.avatar = res.data['data']['avatar']
              flagService.getPublicRandomFlag(that.handleGetPublicRandomFlag)
              // 天气
              weatherService.getWeatherRequest(that.handleGetWeatherSuccess);
            } else {
              // 出错了
              wx.showToast({
                title: res.data['status']['msg'],
              })
              router.replace({
                name: "splash"
              })
            }
          },
          fail() {
            wx.showToast({
              icon: 'none',
              title: "服务器出了点问题",
            })
            router.replace({
              name: "splash"
            })
          }
        })
      },
      fail(res) {
        wx.showToast({
          title: res,
        })
      }
    })
  },

  /**
   * 初始化数据函数
   * 1. 检查本地有没有教务课表
   * 2. 检查本地有没有自定义课表
   * 3. 检查本地有没有朋友课表
   */

  initData: function (e) {
    // 检查有没有本地教务课表        
    // wx.getStorage({key:'jw-course',     
    // 检查有没有本地自定义课表
    // wx.getStorage({key:'custom-course',      
    // 检查有没有本地好友课表
    // wx.getStorage({key:'friend-course',
    // 检查有没有本地资料
    // wx.getStorage({key:'profile',    
  },

  handleGetWeatherSuccess(data) {
    data.createtime = utils.formatTime2(new Date());
    app.globalData.weather = data
    this.jumpWhere();
  },

  /**
   * 生命周期函数--监听页面加载
   * 逻辑，该页面为所有页面的根结点
   * 他会执行login，当有返回值后，执行获取flag，然后再执行业务逻辑
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      version: app.globalData.version
    })
    // 存起来
    this.setData({
      options: options
    })
    let that = this;


    // 判断校区
    // 如果没获取到值，则为浮山校区
    wx.getStorage({
      key: 'currentCampus',
      success(res) {
        if (res.data == "浮山校区") {
          app.globalData.currentCampus = 1709
          app.globalData.longitude = 120.423621
          app.globalData.latitude = 36.070106
        } else {
          app.globalData.currentCampus = 13041
          app.globalData.longitude = 120.478779
          app.globalData.latitude = 36.115249
        }
      },
      fail() {
        app.globalData.currentCampus = 1709
        app.globalData.longitude = 120.423621
        app.globalData.latitude = 36.070106
      }
    })

    // 判断本地是否有token
    wx.getStorage({
      key: app.globalData.tokenKey,
      success(res) {
        console.log("存在token")
        if (res.data.token != null) {
          that.loginByToken(res.data.token);
        } else {
          that.loginByToken(res.data);
        }
      },
      fail() {
        console.log("不存在token")
        that.loginByWxCode()
      }
    })

    // 首先登陆
    this.initData()
  }
})