Page({
  data: {
    imgs: [
      " https://api.ixiaowai.cn/gqapi/gqapi.php",
      " https://api.ixiaowai.cn/gqapi/gqapi.php",
      " https://api.ixiaowai.cn/gqapi/gqapi.php",
    ],

    img: " https://api.ixiaowai.cn/gqapi/gqapi.php",
  },

  start() {
    
    try {
      wx.setStorageSync('first', 'value')
    } catch (e) {
      console.log(e)
     }
    console.log(wx.getStorage({
      key: 'first',
    }))
    wx.navigateTo({     
      url: '../splash/splash'
    })
  },


})