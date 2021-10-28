// packageSecondly/pages/life_map/list/list.js
var QQMapWX = require('../../../../libs/qqmap-wx-jssdk.min.js');
var app = getApp()
var qqmapsdk = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchS: [0, 0],
    touchE: [0, 0],
    scale: 16,
    dy: 340,
    showCommentValue: false,
    globalDetailMode: false,
    islike: false,
    theme: 3,
    longitude: 120.42712,
    latitude: 36.071283,
    markers: [{
      title: "理发店",
      id: 1,
      latitude: 36.071283,
      longitude: 120.42712,
      width: 1,
      height: 1,
      iconPath: "../../../../images/icon/icon_flag.png",
      callout: {
        id: 1,
        borderRadius: 5,
        padding: 7,
        bgColor: '#000000aa',
        anchorX: 10,
        anchorY: 20,
        color: '#ffffff',
        content: "小兔崽干洗店",
        display: 'ALWAYS',
      },
    }],
    showCommentPopValue: false,
    yourRate: 0,
    isAd: false,
    cardCur: 0,
    showRouter: false,
    isTouchMoved: false,
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
    imgList: [
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg",
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=26&gp=0.jpg"
    ]
  },
  onChangeRateValue(e) {
    this.setData({
      yourRate: e.detail,
    });
  },


  submitRate() {
    let that = this;
    wx.showModal({
      title: "你的评分是",
      content: that.data.yourRate + "分",
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.showToast({
            title: '评分成功',
          })
          that.setData({
            showRatePopValue: !that.data.showRatePopValue
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  noop() {
    console.log("noop")

  },
  onToggleRatePop(e) {
    this.setData({
      showRatePopValue: !this.data.showRatePopValue
    })
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
  touchStart: function (e) {
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },

  touchMove: function (e) {
    if (!this.data.isTouchMoved) {
      this.setData({
        isTouchMoved: true
      })
    }
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },

  touchEnd: function (e) {
    if (!this.data.isTouchMoved) {
      return
    }
    this.setData({
      isTouchMoved: false
    })
    let start = this.data.touchS
    let end = this.data.touchE
    if (end[0] == 0 && end[1] == 0) {
      console.log('静止')
      return;
    }
    // 向下移动
    if (start[1] < end[1] - 50 && this.data.globalDetailMode) {
      this.onCloseSwipeItem(e);
      return;
    }
    // 向上移动
    if (start[1] > end[1] + 50 && !this.data.globalDetailMode) {
      this.onOpenSwipeItem(e);
      return;
    }
  },
  // 图片预览
  previewImages(e) {
    this.data.isPreviewImgMode = true
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
    let currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  },

  onCloseSwipeItem(e) {
    console.log(this.data.isPreviewImgMode)
    if (this.data.isPreviewImgMode) return;
    wx.vibrateShort()
    let id = e.currentTarget.dataset.id
    let swiperList = this.data.swiperList
    swiperList.forEach(element => {
      if (element.id == id) {
        element.detailMode = false;
        return;
      } else {
        element.detailMode = false
      }
    });

    this.setData({
      swiperList,
      globalDetailMode: false
    })
  },
  onOpenSwipeItem(e) {
    if (this.data.isPreviewImgMode) return;
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
        element.detailMode = true;
        return;
      } else {
        element.detailMode = false
      }
    });

    this.setData({
      swiperList,
      globalDetailMode: true
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
      scale: 13, // 缩放比例
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

  showdialog1() {
    console.log("showdialog1")
    let option = {
      status: true,
      closeicon: true,
      content: `这里是弹窗1`,
      foot: [{
        text: '我知道了',
        cb: () => {}
      }]
    }
    app.globalData.emitter.emit("dialogstatus", option)
    return
  },

  formSubmit(e) {
    this.setData({
      showRouter: !this.data.showRouter
    })
    if (!this.data.showRouter) {
      return;
    }

    wx.showLoading({
      title: '路线规划中',
    })
    //起点坐标：23.048914,113.390451 
    //终点坐标：23.061793,113.392056

    let from = {
      "latitude": 36.071283,
      "longitude": 120.42712
    }
    let dest = {
      "latitude": 36.070432,
      "longitude": 120.424168
    }
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: from,
      to: dest,
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          includePoints: [{
            "latitude": from.latitude,
            "longitude": from.longitude
          }, {
            "latitude": dest.latitude,
            "longitude": dest.longitude
          }],
          // latitude: (from.latitude + dest.latitude) / 2 - 0.001,
          // longitude: (from.longitude + dest.longitude) / 2 - 0.0007,
          polyline: [{
            points: pl,
            color: '#f00',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.log(error);
      },
      complete: function (res) {
        console.log(res);
        wx.hideLoading()
      }
    });
  },
  showdialog2() {
    // - `size` 弹窗大小（normal：正常，large:大，small：小）
    // - `type` 弹窗样式类型
    // - `title` 弹窗标题
    // - `content` 弹窗内容
    // - `contentposition` 弹窗内容位置（居左或居中）
    // - `status` 是否显示蒙版
    // - `marsktap` 蒙版是否支持点击事件
    // - `foot` 是否有点击按钮
    let option = {
      status: true,
      closeicon: true,
      content: `此处距离为近似值，具体距离请根据地图评估`,
      marsktap: true,
      title: '距离提示',
      foot: [{
        text: '我知道了',
        cb: () => {}
      }]
    }
    app.globalData.emitter.emit("bottomdialogstatus", option)
    return
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
    this.data.isPreviewImgMode = false
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