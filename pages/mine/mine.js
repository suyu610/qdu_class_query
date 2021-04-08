// pages/mine/mine.js
const app = getApp();
import {initNavigationColor,themeData,getThemeKey,setThemeKey} from '../../config/theme'
const router = require('../../router/index.js');
var userCourseService = require('../../net/userCourseService.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {    
    showCampusSheet:false,
    showFirstLauchSheet:false,
    showAboutPop:false,
    showPickTheme:false,
    currentTheme:'默认', 
    currentCampusName:'浮山校区',
    firstLauchPage:'空教室页',
    rgb: 'rgb(0,0,0)',
    message:"",
    openSplashSwitch:true,
    openAutoSearchSwitch:false,
    firstLauchPageOptions:[{name: '空教室页',},{name: '课表页',},{name: '信息流',},],
    campusOptions:[{name: '浮山校区',},{name: '金家岭校区',subname: '已支持',}],
    userInfo: {},
    hasUserInfo: false,
    canIUse: true, //wx.canIUse('button.open-type.getUserInfo'),
    activeNames: '',
    nickname:'素语'
  },

  copyText:function(e){
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({title: '复制成功'})}})}})
      this.onAboutPopClose()
  },

  onAutoSearchSwitchChange(detail){    
    // 这是bug？
    wx.setStorage({key:"autoSearch",data:detail.detail})
    this.setData({ openAutoSearchSwitch: detail.detail });
  },

  onSplashSwitchChange({detail}){
    console.log(detail)
    wx.setStorage({key:"openSplash",data:detail})
    this.setData({ openSplashSwitch: detail });
  },
  
  onSwitchCampusSelect(e) {
    // 把全局数据也同步修改
    wx.setStorageSync('currentCampus', e.detail.name)
    if(e.detail.name == "浮山校区"){
      app.globalData.currentCampus = 1709
      app.globalData.longitude = 120.423621
      app.globalData.latitude = 36.070106
    }else{
      app.globalData.currentCampus = 13041
      app.globalData.longitude = 120.479515
      app.globalData.latitude = 36.115372
    }    
    
    this.setData({
      currentCampusName:e.detail.name
    });
    
    wx.showToast({
      title: "切换 : " +e.detail.name,
    })
  },

  onSwitchFirstLauchPageSelect(e){    
    wx.setStorageSync('first-page', e.detail.name)
    this.setData({
      firstLauchPage:e.detail.name
    });
    
    wx.showToast({
      title: "切换 : " +e.detail.name,
    })
  },
  onTapAvatar(e){
    wx.getUserProfile({
      // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      desc: '用于他人绑定课表时，确认身份', 
      success: (res) => {        
        app.globalData.nickname = res.userInfo.nickName
        app.globalData.avatar = res.userInfo.avatarUrl
        this.setData({
          nickname: res.userInfo.nickName,
          avatar:res.userInfo.avatarUrl,
          hasUserInfo: true
        })
        // 向后端发送更新用户数据请求
        let params = {nickname:res.userInfo.nickName,avatar:res.userInfo.avatarUrl}        
        userCourseService.updateUserinfo(params)
      }
    })
  },
  sendAdvice(){
    wx.showToast({
      icon:"none",
      mask:true,
      title: '已收到,十分感谢!',
    })
    this.setData({
      message : "",
    })    
  },
  changeNickname(event) {
    // event.detail 为当前输入的值
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.hexToRgb(getThemeKey('--themeColor')))

    // 拉取全局风格
    this.setData({
      avatar:app.globalData.avatar,
      nickname:app.globalData.nickname,      
      currentTheme:getThemeKey('--themeColor'),
      rgb:this.hexToRgb(getThemeKey('--themeColor'))
    })
  },

  // 显示校区选择
  onShowSwitchCampus(){
    this.setData({
      showCampusSheet:true
    })    
  },
  onShowFirstLauchPage(){
    this.setData({
      showFirstLauchSheet:true
    })    
  },

  onSwitchFirstLauchPageClose(e){
    this.setData({
      showFirstLauchSheet:!this.data.showFirstLauchSheet
    })    
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
    let that = this
    wx.setNavigationBarTitle({
      title: '个人设置', 
    })
    initNavigationColor()
    
    wx.getStorage({
      key: 'openSplash',
      success (res) {
        that.setData({openSplashSwitch:res.data})
      },
      fail(res){
        that.setData({openSplashSwitch:true})
      }
    })
    wx.getStorage({
      key: 'currentCampus',
      success (res) {
        that.setData({currentCampusName:res.data})
      },
      fail(res){
        that.setData({currentCampusName:"浮山校区"})
      }
    })
    

    wx.getStorage({
      key:"autoSearch",
      success (res) {
        that.setData({openAutoSearchSwitch:res.data})
      },
      fail(res){
        that.setData({openAutoSearchSwitch:false})
      }
    })

    wx.getStorage({
      key: 'first-page',
      success (res) {
        that.setData({
          firstLauchPage:res.data
        });        
      },
      fail(res){
        that.setData({firstLauchPage:"空教室页"})
      }
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
  onAboutPopClose:function(){
    this.setData({
      showAboutPop:false
    })
  },
  // 跳转到公众号的文章
  jumpToAboutPage(){
    wx.navigateTo({
      url: '../webview/webview',
    })

  },
  onAboutShow:function(){
    
    this.setData({
      showAboutPop:true
    })
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
  onShareAppMessage: function (ops) {    
    return {
      title: '青大空教室查询',
      path: 'pages/index/index?id=123&age=18',  // 路径，传递参数到指定页面。
      imageUrl:'../../images/share.png', // 分享的封面图
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onSwitchCampusClose(){
    this.setData({ showCampusSheet: false });
  },



  onShowSwitchThemes:function(){
    this.setData({
      showPickTheme:true
    })
  },

  pickColor(e) {
    // 这里先只修改主题色和文字颜色    
    console.log(e)
    let rgb = e.detail.color;
    let backgroundColor = this.rgb2hex(rgb)
    let frontColor = this.brightness(rgb)
    setThemeKey("--themeColor",backgroundColor)
    setThemeKey("--titleColor",frontColor)

    this.setData({
      rgb,currentTheme:backgroundColor
    })
    
    wx.setStorageSync('themeData', themeData['myStyle'])

    wx.setNavigationBarColor({
      backgroundColor:backgroundColor,
      frontColor:frontColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  
  /**
   * @desc 判断标题用白色还是黑色
   * @param {String} color:'rgb(255,0,0)'
   * @return {String} '#000000'
   */
  brightness:function(color){
    let rgb = color.split(',');
    let R = parseInt(rgb[0].split('(')[1]);
    let G = parseInt(rgb[1]);
    let B = parseInt(rgb[2].split(')')[0]);
    let bright =  0.299 * R + 0.587 * G + 0.114 * B;    
    return bright >= 151 ? "#000000" : "#ffffff";    
  },

  /**
   * @param {String} color:'rgb(255,0,0)'
   * @return {String} hex:'#000' 
   */

  rgb2hex:function(color){
    let rgb = color.split(',');
    let R = parseInt(rgb[0].split('(')[1]);
    let G = parseInt(rgb[1]);
    let B = parseInt(rgb[2].split(')')[0]);
    let hex = "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
    return hex;
  },

  /**
   * @param {String} hex:'#000' color:'rgb(255,0,0)'
   * @return {String} color:'rgb(255,0,0)'
   */

  hexToRgb:function (hex) { //十六进制转为RGB
    var rgb = []; // 定义rgb数组
    if (/^\#[0-9A-F]{3}$/i.test(hex)) { //判断传入是否为#三位十六进制数
     let sixHex = '#';
     hex.replace(/[0-9A-F]/ig, function(kw) {
      sixHex += kw + kw; //把三位16进制数转化为六位
     });
     hex = sixHex; //保存回hex
    }
    if (/^#[0-9A-F]{6}$/i.test(hex)) { //判断传入是否为#六位十六进制数
     hex.replace(/[0-9A-F]{2}/ig, function(kw) {
      rgb.push('0x' + kw); //十六进制转化为十进制并存如数组
     });
     return `rgb(${rgb.join(',')})`; //输出RGB格式颜色
    } else {
     console.log(`Input ${hex} is wrong!`);
     return 'rgb(0,0,0)';
    }
   },

  loginByWx:function(e){
    // 用这个获取用户基本信息
    wx.getUserProfile({
      desc:"吧啦吧啦吧啦啦吧啦",
      success:function(e){
        console.log(e)
        // 用这个换openid
        // 发送补充微信信息
        // url/api/user/updateWxInfo

      },
      fail:(res)=>{
        console.error("====fail====")
        console.error(res)
      }
    })
  },
})