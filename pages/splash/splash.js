// pages/splash/splash.js
const app = getApp();
import jinrishici from '../../libs/jinrishici.js'

Page({
  data: {
    timer:'',
    jinrishici:'',
    author:"",
	  icon_like: '../../images/icon/icon_like.png',
	  icon_unlike: '../../images/icon/icon_unlike.png',
	  like:false, //是否已点赞
	  count:0   //点赞数量
  },
  onLike(e) {
    wx.vibrateShort() //手机振动API
    this.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    })
 let like = this.properties.like
 let count = this.properties.count

 count = like ? count - 1 : count + 1

 if (!like) {
   setTimeout(function () {
     this.animation.scale(1.5).step();
     this.animation.scale(1.0).step();
     this.setData({
       animation: this.animation.export()
     });
   }.bind(this), 50);
 }

 this.setData({
   count,
   like: !like
 })

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    jinrishici.load(result => {
      // console.log(result.data)
      this.setData({
        author : result.data.origin.author,
        jinrishici : result.data.content
      })
      
    })
    // 设置顶部bar为主题色
    wx.setNavigationBarColor({
      backgroundColor: '#fff',
      frontColor: '#000000',
    })

    this.data.timer = setTimeout(function() {
      wx.switchTab({      
        url: '/pages/index/index',
      });
    }, 2600)
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
    this.setData({
      jinrishici:app.globalData.jinrishici,
      author:app.globalData.author
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
    wx.switchTab({     
      url: '/pages/index/index',
    });
  },
  jumpToFlag:function(){
    clearTimeout(this.data.timer);    
    wx.redirectTo({    
      url: '/pages/flag/flag',
    })
  }
})