// pages/mine/mine.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {    
    showCampusSheet:false,
    showThemesSheet:false,
    showAboutPop:false,
    currentTheme:'墨渊',
    currentCampus:'浮山校区',
    message:"",
    openSplashSwitch:true,
    campusOptions:[
      {
        name: '浮山校区',
      },
      {
        name: '金家岭校区',
        subname: '暂不支持,马上就好！',
      },
      {
        name: '其他校区',
        subname: '现在还有bug',
      },
    ],

    themesOptions:[
      {
        name: '墨渊',
        subname: '深色',
        id:'1',
      },
      {
        name: '澹月',
        subname: '蓝色',
        id:'2',
      },
      {
        name: '烟翠',
        subname: '浅色',
        id:'3',
      },

    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: true,//wx.canIUse('button.open-type.getUserInfo'),
    activeNames: '',
    nickname:'素语'
  },
  onSplashSwitchChange({detail}){
    this.setData({ openSplashSwitch: detail });
  },
  onSwitchCampusSelect(e) {
    // 把全局数据也同步修改
    this.setData({
      currentCampus:e.detail.name
    });
    
    wx.showToast({
      title: "切换 : " +e.detail.name,
    })
  },

  onSwitchThemesSelect(e){
    app.globalData.currentTheme = e.detail.id;
    this.setData({
      currentTheme:e.detail.name
    });
    
    wx.showToast({
      title: "切换 : " +e.detail.name,
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 显示校区选择
  onShowSwitchCampus(){
    this.setData({
      showCampusSheet:true
    })    
  },
  // 显示选择
  onShowSwitchThemes(){
    this.setData({
      showThemesSheet:true
    })    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getUserInfo()

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
  onAboutPopClose:function(){
    this.setData({
      showAboutPop:false
    })
  },
  // 跳转到公众号的文章
  jumpToAboutPage(){
    wx.navigateTo({
      url: '../../pages/about/about',
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
  onSwitchThemesClose(){
    this.setData({ showThemesSheet: false });
  },

  onShow:function(){    
    wx.setNavigationBarTitle({
      title: '个人设置',
    })
    // 拉取全局风格
    this.setData({currentTheme:this.data.themesOptions[app.globalData.currentTheme-1].name})
  }

})