// pages/mine/login/login.js
const util = require('../../../utils/color_util.js')
import {
  initNavigationColor,
  themeData
} from '../../../config/theme'
const secret = require('../../utils/secret.js')
const NetUrl = require('../../../net/constants.js')
const router = require('../../../router/index.js');

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    acceptLicense: false,
    username: "",
    password: "",
    captcha: "",
    captchaUrl: "",
    cookie: "",
    showQduLogin: false,
  },
  navToFakeJw: function () {
    wx.navigateTo({
      url: '/pages/webview/webview?url=https://www.qdu.life/jw',
    })
  },

  onTapQduLogin: function (e) {
    this.getCaptchaImage()
    if (this.data.acceptLicense == false) {
      wx.showToast({
        icon: "none",
        title: '授权后才能导入',
      })

    } else {
      this.setData({
        showQduLogin: true
      })
    }
  },
  onQduLoginClose: function (e) {
    this.setData({
      showQduLogin: false
    })
  },
  tapReturnBtn: function (e) {
    wx.navigateBack()
  },
  seqChange: function (e) {
    // console.log(e)
    this.setData({
      seqResult: e.detail,
    });
  },

  refreshCaptchaImg: function () {
    this.getCaptchaImage()
  },

  onCheckButtonChange: function () {
    let acceptLicense = !this.data.acceptLicense;
    this.setData({
      acceptLicense
    })
  },

  onTapLicense: function () {
    wx.navigateTo({
      url: '../privacy_license/privacy_license',
    })
  },

  // 生成指定位数的随机数
  randomNum: function (digit) {

    var sourceStr = "0,1,2,3,4,5,6,7,8,9";
    var arrStr = sourceStr.split(",");
    var result = ""; //定义变量并初始化
    var index = 0;
    for (let i = 0; i < digit; i++) {
      index = parseInt(Math.random() * arrStr.length);
      result += arrStr[index];
    }
    return result
  },

  onUserNameChange: function (e) {
    this.setData({
      username: e.detail
    })
  },
  onPasswordChange: function (e) {
    this.setData({
      password: e.detail
    })
  },
  onCaptchaChange: function (e) {
    this.setData({
      captcha: e.detail
    })
  },


  // 获取验证码  
  getCaptchaImage: function () {
    let that = this
    wx.request({
      url: 'https://jw.qdu.life/academic/getCaptcha.do?0.8', //获取图片的URL
      method: "get",
      responseType: 'arraybuffer',
      success(res) {
        // console.log(res)
        let url = 'data:image/png;base64,' + wx.arrayBufferToBase64(res.data)
        that.setData({
          cookie: res.header['Set-Cookie'],
          captchaUrl: url, //设置data里面的图片url
        })
      },
    })
  },

  onTapLogin: function () {

    if (this.data.username == "" || this.data.password == "" || this.data.captcha == "") {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'error'
      })
    } else {
      let that = this
      // 用openid加密密码
      console.log(app.globalData.openid)
      let encryPwd = secret.encrypted(this.data.password, app.globalData.openid.slice(4, 12))
      console.log(encryPwd)
      let tmp_cookie = this.data.cookie.split(";")[0];
      tmp_cookie.split("=")[0]
      let url = NetUrl.Host + "user/logindean/"
      wx.showLoading({
        title: '解析课表中..',
      })
      wx.request({
        url: url,
        method: 'POST',
        header: {
          'Authorization': 'Bearer ' + app.globalData.token
        },
        data: {
          "num": this.data.username,
          "pwd": encryPwd,
          "code": this.data.captcha,
          "cookie": this.data.cookie,
        },
        success(res) {
          wx.hideLoading({
            success: (res) => {},
          })
          if (res.data.data == '0') {
            wx.showToast({
              icon: 'success',
              title: '成功',
            })
            // 清空本地的值
            wx.removeStorage({
              key: app.globalData.myJwCourseKey,
              success(res) {
                app.globalData.onImportJwCourseOk = true
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          } else if (res.data.data == '-1') {
            wx.showToast({
              icon: 'none',
              title: '账号或密码错误',
            })
            that.getCaptchaImage()
          } else if (res.data.data == '-2') {
            wx.showToast({
              icon: 'none',
              title: '验证码错误',
            })
            that.getCaptchaImage()
          } else {
            wx.showToast({
              icon: 'none',
              title: '系统错误，请联系客服。',
            })
            that.getCaptchaImage()
          }
        },
        fail(res) {
          wx.showToast({
            icon: 'none',
            title: '请联系管理员',
          })
          that.getCaptchaImage()
        }
      });
    }
  },
})