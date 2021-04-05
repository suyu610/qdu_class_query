Page({
  data: {
    imgs: [
      " https://cdns.qdu.life/class/onboarding_1-min.png",
      " https://cdns.qdu.life/class/onboarding_2-min.png",
      " /images/logo.png",      
    ],
    currentSwiper: 0,
    text:["一键查询空教室\n按楼层\n按课次\n...","[ 天气预报 ]\n出门别忘带伞\n\n[ 小目标 ]\n全校为你加油","愿满天星光因你而闪烁"]
  },

  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  onLoad(){
    wx.setNavigationBarColor({
      backgroundColor: '#fff4cc',
      frontColor: '#000000',
    })
  },

  start() {
    
    try {
      wx.setStorageSync('guide', 'value')
    } catch (e) {
      console.log(e)
     }    
    wx.switchTab({     
      url: '../index/index'
    })
  },
})