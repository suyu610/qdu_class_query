const router = require('../../router/index.js');

Page({
  data: {
    imgs: [
      "https://cdns.qdu.life/class/onboarding_1.png",
      "https://cdns.qdu.life/class/onboarding_2.png",
      "https://cdns.qdu.life/class/onboarding_last.png",
      "https://cdns.qdu.life/class/onboarding_last.png",
    ],
    currentSwiper: 0,
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
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },

  start() {
    console.log("123");
    try {
      wx.setStorageSync('guide', 'value')
    } catch (e) {
      console.log(e)
     }    
      router.push({name:'index'})
  },
})