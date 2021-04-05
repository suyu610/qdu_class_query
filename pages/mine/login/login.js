// pages/mine/login/login.js
const util = require('../../../utils/color_util.js')
import {initNavigationColor,themeData} from '../../../config/theme'
const secret = require('../../../utils/secret.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    acceptLicense:false,
    username:"",
    password:"",
    captcha:"",
    captchaUrl:"",
    cookie:"",
    showQduLogin:false,
  },


  onTapQduLogin:function(e){
    this.setData({showQduLogin:true})
  },
  onQduLoginClose:function(e){
    this.setData({showQduLogin:false})
  },
  seqChange:function(e){ 
    console.log(e)   
    this.setData({
      seqResult: e.detail,
    });
  },

  refreshCaptchaImg:function(){
    this.getCaptchaImage()
  },

  onCheckButtonChange:function(){
    let acceptLicense=!this.data.acceptLicense;
    this.setData({acceptLicense})
  },

  onTapLicense:function(){
    wx.navigateTo({
      url: '../privacy_license/privacy_license',
    })
  },

  onUserNameChange:function(e){
    this.setData({username:e.detail})    
  },
  onPasswordChange:function(e){
    this.setData({password:e.detail})    
  },
  onCaptchaChange:function(e){
    this.setData({captcha:e.detail})    
  },

  onLoad:function(option){

    this.getCaptchaImage()
  }, 

  // 获取验证码  
  getCaptchaImage:function(){    
    console.log(secret.getSecret("12345678"));
    // console.log(secret.encrypted(openid+时间戳+sault,"12345678"))
    let that = this  
    wx.request({
      url: 'http://jw.qdu.edu.cn/academic/getCaptcha.do', //获取图片的URL
      method:"get",       
      responseType: 'arraybuffer',          
      success (res) {
        console.log("获取验证码")
        let url ='data:image/png;base64,'+wx.arrayBufferToBase64(res.data)        
        that.setData({
          cookie:res.header['Set-Cookie'],
          captchaUrl : url,     //设置data里面的图片url
        })
      },
    })
  },

  onTapLogin:function(){
    if(false){
        // if(this.data.username == "" ||this.data.password == ""||this.data.captcha == ""){
        wx.showToast({title:'请填写所有字段',icon:'error'})   
    }else{
      let that = this       

    }
  },
    
  testLoginStatu:function(){
    wx.request({
      url: 'http://jw.qdu.edu.cn/academic/showPersonalInfo.do',
    })
  },
  loginByWx:function(e){
    // 用这个获取用户基本信息
    wx.getUserProfile({
      desc:"吧啦吧啦吧啦啦吧啦",
      success:function(e){
        console.log(e)
        // 用这个换openid
        wx.login({
          success (res) {
            if (res.code) {
              //发起网络请求
              console.log(res)
              wx.showToast({
                title: e.userInfo.nickName,
                icon:'none'
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      },
      fail:(res)=>{
        console.error("====fail====")
        console.error(res)
      }
    })

    // wx.getUserInfo({
    //   complete:(res)=>{
    //     console.log("====complete====")
    //     console.log(res)
    //   },
    //   success:(res)=>{     
    //     console.info("====success====")
    //     console.info(res)
    //   },
    //   fail:(res)=>{
    //     console.error("====fail====")
    //     console.error(res)
    //   }
    // })

  },

  userInfoHandler:function(e){
    
    var that = this;
    // 拒绝的情况
    // 授权失败，取消授权
    if (e.detail.userInfo == null){ 
      wx.showModal({
        title: '未授权',
        content: '不登陆也可以查询空教室，但会有一些功能受限。',
        showCancel: true,
        success: res => {
          if (res.confirm) {
            //点击取消，重新获取授权
            wx.openSetting({
              success: data => {
                console.log(data)
                if (data.authSetting["scope.userInfo"] == true){//判断是否授权
                   //重新获取用户数据
                  wx.getUserInfo({
                    success: function (res) {
                      console.log(res.userInfo);
                     //授权后将app.js中的userinfo重新赋值。                   
                      getApp().globalData.userInfo = res.userInfo;
                       //页面跳转
                      wx.reLaunch({
                        url: "/pages/activitys/activitys"
                      })
                    }
                  })                  
                }
              },
              fail: function () {
                console.info("设置页面失败");
              }
            }); 
          }
        } 
      });
 
     //第一种。用户点击授权的情况
    }else{
      console.log(e.detail.userInfo);
        //授权后将app.js中的userinfo重新赋值。  
      getApp().globalData.userInfo = e.detail.userInfo; 
      wx.showToast({
        title: '登陆成功',
      })
      //页面跳转
      wx.navigateBack({
        delta: 1
      })
    }
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
  onShow:function(){
    initNavigationColor()
    this.setData({
      themeData:themeData
    })    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})