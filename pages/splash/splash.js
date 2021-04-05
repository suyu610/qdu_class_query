// pages/splash/splash.js
const app = getApp();
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const flagService = require('../../net/flagService.js')
const router = require('../../router/index.js');

Page({
  data: {
    timer:'',
    flag:{},    
	  icon_like: '../../images/icon/icon_like.png',
	  icon_unlike: '../../images/icon/icon_unlike.png',
  }, 

  onLike(e) {
    var flag = this.data.flag
    wx.vibrateShort() //手机振动API
    this.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    }) 

    let is_like = flag['is_like']
    let count = flag['like_count']
    count = is_like ? count - 1 : count + 1

    if (!is_like) {
      // 弹出消息提醒
      Notify({ 
        type: 'primary', 
        message: this.data.flag['reply'] ,
        color: '#000',
        background: '#fde06b',
      });

      setTimeout(function () {
        this.animation.scale(1.5).step();
        this.animation.scale(1.0).step();
        this.setData({
          animation: this.animation.export()
        });
      }.bind(this), 50);
    }

    flag['like_count'] = count
    flag['is_like'] = !flag['is_like']
    console.log(flag)
    this.setData({
      flag
    })
    flagService.togglePublicLikeFlag(flag['flag_id'],);
},
  // 当不为guide,不为splash时，判断该跳转哪个页面
  jumpWhere:function(){
    // 否则跳过        
    // 获取第一页是谁
    wx.getStorage({
      key: 'first-page',
      success (res) {
        switch (res.data) {
          case '空教室页':         
            router.push({name:'index'})
            break;
          case '课表页': 
            router.push({name:'course'})
            break;
          case '信息流': 
            router.push({name:'moment'})
            break;
          default:
            router.push({name:'index'})
        }
      },
      fail(){
        // 当没有值的时候，跳转空教室页
        router.push({name:'index'})
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let flag = app.globalData.flag;
    this.setData({flag})
    // 发起请求

    // 设置顶部bar为主题色
    wx.setNavigationBarColor({
      backgroundColor: '#fff',
      frontColor: '#000000',
    })

    this.data.timer = setTimeout(function() {
      // 获取第一页是谁
      that.jumpWhere() 
    }, 4000)
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
    clearTimeout(this.data.timer);
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

  },
  onJumpBtnClick:function(){
    this.jumpWhere();
  },
  jumpToFlag:function(){
    clearTimeout(this.data.timer);    
    app.globalData.rediretTo = "flag"
    router.push({name:'more',})
    // router.push({name:'flag',data:{url:"flag"}})
  }
})