// packageSecondly/pages/life_map/list/list.js
var QQMapWX = require('../../../../libs/qqmap-wx-jssdk.min.js');
var app = getApp()
var qqmapsdk = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCommentValue: false,
    globalDetailMode: false,
    islike: false,
    theme: 3,
    longitude: app.globalData.longitude,
    latitude: app.globalData.latitude,
    markers: [{
      title: "理发店",
      id: 1,
      latitude: 36.071993,
      longitude: 120.422793,
      width: 50,
      height: 50,
      iconPath: "../../../../images/icon/icon_flag.png",
      callout: {
        id: 1,
        borderRadius: 5,
        padding: 7,
        bgColor: '#000000',
        anchorX: 10,
        anchorY: 20,
        color: '#ffffff',
        content: "123",
        display: 'ALWAYS',
      },
    }],
    showCommentPopValue: false,
    isAd: false,
    cardCur: 0,
    swiperList: [{
      id: 0,
      storeName: 'UNIQLO',
      type: 'image',
      isAd: false,
      isLike: false,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp6.zbjimg.com%2Fservice%2F2016-11%2F01%2Fservice%2F5818227c222c6.jpg&refer=http%3A%2F%2Fp6.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=375b0b30db03d4be6c4b366b39ffe70a'
    }, {
      id: 1,
      storeName: '小兔崽干洗店',
      type: 'image',
      isAd: false,
      isLike: false,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhomesitetask.zbjimg.com%2Fhomesite%2Ftask%2F20180402174823.jpg%2Forigine%2F79c48798-10e5-4af2-9b09-3c4a471ccf67&refer=http%3A%2F%2Fhomesitetask.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=c5713f7ead3de55e33d3a7dd0e9ea415',
    }, {
      id: 2,
      type: 'image',
      storeName: '小狗崽干洗店',
      isAd: true,
      isLike: true,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic-xiaoguotu.17house.com%2Fxgt%2Fs%2F22%2F1462891930156aa.jpg&refer=http%3A%2F%2Fstatic-xiaoguotu.17house.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=5c98b3efc359bf833d341d548ea5f02f'
    }, {
      storeName: '小鸡崽干洗店',

      id: 3,
      type: 'image',
      isAd: false,
      isLike: false,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhomesitetask.zbjimg.com%2Fhomesite%2Ftask%2F%25E6%259C%2580%25E7%25BB%2588%25E6%2595%2588%25E6%259E%259C%25E5%259B%25BE-2.jpg%2Forigine%2Fd7316279-846b-4652-8f22-8718dfa86497&refer=http%3A%2F%2Fhomesitetask.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=0c0fd8c97981572aa165881e78a23346'
    }, {
      id: 4,
      storeName: '小牛干洗店',

      type: 'image',
      isAd: false,
      isLike: false,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170407%2F0bb5bfc848e949ceb334d6b346eb1e5d_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=096e5f33acecb87eb403192243dfcc26'
    }, {
      id: 5,
      storeName: '小马干洗店',

      type: 'image',
      isAd: false,
      isLike: false,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170407%2F0bb5bfc848e949ceb334d6b346eb1e5d_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=096e5f33acecb87eb403192243dfcc26'
    }, {
      id: 6,
      storeName: '小猪干洗店',
      type: 'image',
      isAd: true,
      isLike: false,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170407%2F0bb5bfc848e949ceb334d6b346eb1e5d_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=096e5f33acecb87eb403192243dfcc26'
    }],
  },

  onToggleShowComment(e) {
    this.setData({
      showCommentValue: !this.data.showCommentValue
    })
  },
  onCloseCommentPop() {
    this.setData({
      showCommentPopValue: false
    })
  },
  onShowCommentPop() {
    this.setData({
      showCommentPopValue: true
    })
  },
  onTapSwipeItem(e) {

    wx.vibrateShort({
      success: function () {
        console.log("vibrate success");
      },

      fail: function () {
        console.log("vibrate fail");
      }
    })
    let id = e.currentTarget.dataset.id
    let swiperList = this.data.swiperList
    swiperList.forEach(element => {
      if (element.id == id) {
        element.detailMode = !element.detailMode;
        return;
      } else {
        element.detailMode = false
      }
    });

    this.setData({
      swiperList,
      globalDetailMode: !this.data.globalDetailMode
    })
  },
  onTaploveStoreBtn(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let swiperList = this.data.swiperList
    swiperList.forEach(element => {
      if (element.id == id) {
        element.isLike = !element.isLike
        that.setData({
          swiperList
        })
        return;
      }
    });

  },
  tel(e) {
    let phoneNumber = e.currentTarget.dataset.number

    wx.showModal({
      title: "要拨打商家电话吗？",
      content: phoneNumber,
      cancelColor: 'cancelColor',
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber //仅为示例，并非真实的电话号码
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // cardSwiper
  cardSwiper(e) {
    let that = this
    let id = e.detail.current
    let swiperList = this.data.swiperList
    swiperList.forEach(element => {
      if (element.id == id) {
        element.detailMode = this.data.globalDetailMode
        wx.setNavigationBarTitle({
          title: element.storeName,
        })
        return;
      }
    });

    this.setData({
      swiperList,
      cardCur: e.detail.current,
      longitude: this.data.longitude + 0.0001,
      latitude: this.data.latitude + 0.0001,
    })
  },

  toMapApp: function () {
    wx.openLocation({
      latitude: 31, // 纬度，范围为-90~90，负数表示南纬
      longitude: 121, // 经度，范围为-180~180，负数表示西经
      scale: 8, // 缩放比例
      name: "测试",
      address: "测试详细地址",
      success: function (r) {
        console.log(r)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showNavigationBarLoading()
    // wx.hideNavigationBarLoading({
    //   success: (res) => {},
    // })
    wx.setNavigationBarTitle({
      title: '洗衣店',
    })
    this.mapCtx = wx.createMapContext('map')
    qqmapsdk = new QQMapWX({
      key: app.globalData.key
    });
  },

  regionchange: function (e) {
    console.log(e)
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

  }
})