// packageSecondly/pages/life_map/list/list.js
var QQMapWX = require('../../../../libs/qqmap-wx-jssdk.min.js');
var app = getApp()
var qqmapsdk = "";
const router = require('../../../../router/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchS: [0, 0],
    touchE: [0, 0],
    scale: 19,
    dy: 340,
    globalDetailMode: false,
    islike: false,
    theme: 3,
    longitude: 120.42712,
    latitude: 36.071283,
    // 地图相关
    markers: [{
        title: "测试",
        id: 0,
        latitude: 36.070283,
        longitude: 120.42712,
        width: 1,
        height: 1,
        iconPath: "../../../../images/icon/icon_flag.png",
        callout: {
          id: 1,
          borderRadius: 5,
          padding: 7,
          bgColor: '#FDE06B',
          anchorX: 10,
          anchorY: 20,
          color: '#000',
          content: "小兔崽干洗店",
          display: 'ALWAYS',
        },
      }, {
        title: "理发店",
        id: 1,
        latitude: 36.071193,
        longitude: 120.42712,
        width: 1,
        height: 1,
        iconPath: "../../../../images/icon/icon_flag.png",
        callout: {
          id: 1,
          borderRadius: 5,
          padding: 7,
          bgColor: '#00000077',
          anchorX: 10,
          anchorY: 20,
          color: '#fff',
          content: "小猪猪干洗店",
          display: 'ALWAYS',
        },
      }, {
        title: "理发店",
        id: 2,
        latitude: 36.073273,
        longitude: 120.42712,
        width: 1,
        height: 1,
        iconPath: "../../../../images/icon/icon_flag.png",
        callout: {
          id: 1,
          borderRadius: 5,
          padding: 7,
          bgColor: '#00000077',
          anchorX: 10,
          anchorY: 20,
          color: '#fff',
          content: "小狗崽干洗店",
          display: 'ALWAYS',
        },
      },
      {
        title: "黄鹏宇的干洗店",
        id: 3,
        latitude: 36.073373,
        longitude: 120.42012,
        width: 1,
        height: 1,
        iconPath: "../../../../images/icon/icon_flag.png",
        callout: {
          id: 4,
          borderRadius: 5,
          padding: 7,
          bgColor: '#00000077',
          anchorX: 10,
          anchorY: 20,
          color: '#fff',
          content: "黄鹏宇的干洗店",
          display: 'ALWAYS',
        },
      },

    ],
    isCanDraw: false,
    showSharePopValue: false,
    shareOptions: [{
        name: '微信',
        icon: 'wechat',
        openType: 'share'
      },
      {
        name: '分享海报',
        icon: 'poster'
      }
    ],
    cardCur: 0,
    showRouter: false,
    // 区分滑动和点击
    isTouchMoved: false,
    swiperList: [{
      id: 0,
      storeName: '小兔崽干洗店',
      type: 'image',
      isAd: false,
      isLike: false,
      remark: 4,
      detailMode: false,
      location: {
        longitude: 120.42712,
        latitude: 36.071283,
      },
      telNumber: 1311311311,
      locationDesc: '浮山校区电动门旁边',
      desc: "具段字乱具量。工一的仅序出工数段不数的于序。们的乱打会现字文后一一排致篇以章字文顺打该落他序，文与的以作用把也原乱仅改，顺其打变乱是文乱的打及次随顺，可文打机他列",
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp6.zbjimg.com%2Fservice%2F2016-11%2F01%2Fservice%2F5818227c222c6.jpg&refer=http%3A%2F%2Fp6.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=375b0b30db03d4be6c4b366b39ffe70a',
      menu: [{
        menuName: "分类1",
        goods: [{
          name: "超声波除毛",
          price: "123"
        }, {
          name: "超声波除毛",
          price: "123"
        }]
      }, {
        menuName: "分类2",
        goods: [{
          name: "超声波除毛",
          price: "123"
        }, {
          name: "超声波除毛",
          price: "123"
        }]
      }, {
        menuName: "分类3",
        goods: [{
          name: "超声波除毛",
          price: "123"
        }, {
          name: "超声波除毛",
          price: "123"
        }]
      }],
    }, {
      id: 1,
      storeName: '小猪猪干洗店',
      type: 'image',
      isAd: false,
      isLike: false,
      remark: 4,
      telNumber: 1311311311,
      detailMode: false,
      desc: "其字文的仅随工顺的不序具打乱原的们可打变于字乱，他乱文，一的章序。段一字文他致排仅量数以篇与作序段机。后是出乱的用文次文现会改把顺打打具该一乱及也落，数工列以打顺",
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhomesitetask.zbjimg.com%2Fhomesite%2Ftask%2F20180402174823.jpg%2Forigine%2F79c48798-10e5-4af2-9b09-3c4a471ccf67&refer=http%3A%2F%2Fhomesitetask.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=c5713f7ead3de55e33d3a7dd0e9ea415',
      menu: [{
        menuName: "分类1",
        goods: [{
          name: "超声波除毛",
          price: "123"
        }, {
          name: "超声波除毛",
          price: "123"
        }]
      }, {
        menuName: "分类2",
        goods: [{
          name: "超声波除毛",
          price: "123"
        }, {
          name: "超声波除毛",
          price: "123"
        }]
      }, {
        menuName: "分类3",
        goods: [{
          name: "超声波除毛",
          price: "123"
        }, {
          name: "超声波除毛",
          price: "123"
        }]
      }],
    }, {
      id: 2,
      type: 'image',
      storeName: '小狗崽干洗店',
      isAd: true,
      remark: 4,

      isLike: true,
      desc: "具段字乱具量。工一的仅序出工数段不数的于序。们的乱打会现字文后一一排致篇以章字文顺打该落他序，文与的以作用把也原乱仅改，顺其打变乱是文乱的打及次随顺，可文打机他列",
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic-xiaoguotu.17house.com%2Fxgt%2Fs%2F22%2F1462891930156aa.jpg&refer=http%3A%2F%2Fstatic-xiaoguotu.17house.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=5c98b3efc359bf833d341d548ea5f02f'
    }, {
      storeName: '黄鹏宇的干洗店',
      id: 3,
      remark: 4,
      type: 'image',
      isAd: false,
      desc: "具段字乱具量。工一的仅序出工数段不数的于序。们的乱打会现字文后一一排致篇以章字文顺打该落他序，文与的以作用把也原乱仅改，顺其打变乱是文乱的打及次随顺，可文打机他列",
      isLike: false,
      detailMode: false,
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhomesitetask.zbjimg.com%2Fhomesite%2Ftask%2F%25E6%259C%2580%25E7%25BB%2588%25E6%2595%2588%25E6%259E%259C%25E5%259B%25BE-2.jpg%2Forigine%2Fd7316279-846b-4652-8f22-8718dfa86497&refer=http%3A%2F%2Fhomesitetask.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=0c0fd8c97981572aa165881e78a23346'
    }],
    showFeedbackPopValue: false,
    showDescPopValue: false,
    feedbackInputValue: '',
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

  jump2GoodDetail(e) {
    router.push({
      name: "life_map_good_detail",
      data: {}
    })
  },

  onShowDescPop() {
    this.setData({
      showDescPopValue: true,
    })
  },


  onCloseDescPop() {
    this.setData({
      showDescPopValue: false,
    })
  },
  submitFeedback() {
    let that = this;
    wx.showModal({
      title: "你的反馈意见",
      content: that.data.feedbackInputValue == '' ? '为空' : that.data.feedbackInputValue,
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.showToast({
            title: '谢谢，反馈成功',
          })
          that.onCloseFeedbackPop()
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


  onCloseFeedbackPop() {
    this.setData({
      showFeedbackPopValue: false
    })
  },
  onShowFeedbackPop() {
    this.setData({
      showFeedbackPopValue: true
    })
  },

  jump2Comment(e) {
    let source = e.currentTarget.dataset.source
    router.push({
      name: 'life_map_comment',
      data: {
        "source": source
      }
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


  onCloseSwipeItem(e) {
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
  onCloseSharePop() {
    this.setData({
      showSharePopValue: false
    })
  },
  onTapShareBtn(e) {
    this.setData({
      showSharePopValue: true
    })
  },
  onSelectShareType(e) {
    if (e.detail.name == "分享海报") {
      wx.showToast({
        icon: 'none',
        title: '开发中',
      })
      // this.setData({
      //   isCanDraw: !this.data.isCanDraw
      // })
    }
  },
  makeTel(e) {
    // console.log(e.currentTarget.dataset)
    let phoneNumber = 0
    phoneNumber = e.currentTarget.dataset.telnumber

    wx.showModal({
      title: "要拨打商家电话吗？",
      content: phoneNumber + "",
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber //仅为示例，并非真实的电话号码
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail(e) {
        console.log(e)
      }
    })
  },

  tapCallout(e) {
    let id = e.detail.markerId
    this.setData({
      cardCur: id
    })
  },
  getUserLocation() {
    wx.showLoading({
      title: '定位中',
    })
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        wx.hideLoading()
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var altitude = res.altitude
        let markers = that.data.markers
        markers.forEach(e => {
          if (e.id == -1) {
            var key = markers.indexOf(e)
            markers.splice(key, 1)
          }
        })
        markers.push({
          title: "测试",
          width: 50,
          height: 50,
          id: -1,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: "/images/icon/icon_flag_black.png",
        })

        that.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude,
          longitude: res.longitude,
          latitude: res.latitude,
          markers
        })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '定位失败',
        })
      }
    })
  },
  // cardSwiper
  cardSwiper(e) {
    // 如果在路线规划中，就不许swiper
    if (this.data.showRouter) {
      this.setData({
        showRouter: false
      })
    }
    let that = this
    let id = e.detail.current
    let swiperList = this.data.swiperList
    let markers = this.data.markers
    let longitude = 0
    let latitude = 0
    markers.forEach(element => {
      if (element.id == id) {
        element.callout.bgColor = "#FDE06B"
        element.callout.color = "#000"
        element.callout.content = element.callout.content
        longitude = element.longitude
        latitude = element.latitude
      } else if (element.callout != null) {
        element.callout.bgColor = "#00000077"
        element.callout.color = "#fff"
      }
    });

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
      markers,
      longitude,
      latitude
    })
  },

  jump2Navigation: function () {
    let index = this.data.cardCur
    let markers = this.data.markers

    wx.showModal({
      title: "要打开地图吗",
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.openLocation({
            latitude: markers[index].latitude, // 纬度，范围为-90~90，负数表示南纬
            longitude: markers[index].longitude, // 经度，范围为-180~180，负数表示西经
            scale: 13, // 缩放比例
            name: markers[index].callout.content,
            address: "测试详细地址",
            success: function (r) {
              console.log(r)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },

  jump2Goodlist() {
    router.push({
      name: "life_map_good_list",
      data: {}
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
  test: function (e) {
    console.log(e)
  },
  regionchange: function (e) {

    if (e.type == "begin") {
      this.setData({
        onSwipeMap: true
      })
    }
    if (e.type == "end") {
      this.setData({
        onSwipeMap: false
      })

    }
    // console.log(e)
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
  scrolltolower(e) {
    console.log(e)
  },
  generateRouter(e) {
    let that = this
    this.setData({
      showRouter: !this.data.showRouter
    })

    if (!this.data.showRouter) {
      return;
    }

    wx.showLoading({
      title: '路线规划中',
    })

    wx.showNavigationBarLoading()

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let markers = that.data.markers
        // 得删掉一个id=-1的
        markers.forEach(e => {
          if (e.id == -1) {
            var key = markers.indexOf(e)
            markers.splice(key, 1)
          }
        })
        markers.push({
          title: "测试",
          width: 50,
          height: 50,
          id: -1,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: "/images/icon/icon_flag_black.png",
        })

        that.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude,
          longitude: res.longitude,
          latitude: res.latitude,
          markers
        })

        let dest = {}

        let shopIndex = this.data.cardCur

        that.data.markers.forEach(e => {
          if (e.id == shopIndex) {
            console.log(e)
            dest = {
              "latitude": e.latitude,
              "longitude": e.longitude
            }
            console.log(dest)
            return;
          }
        })
        let from = {
          "latitude": this.data.userLatitude,
          "longitude": this.data.userLongitude
        }

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
            // console.log(pl)
            //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
            that.setData({
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
            wx.hideNavigationBarLoading()
          }
        });
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '路线规划失败,请重试',
        })
      },
      complete: function (res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })

  },
  showdialog2(e) {
    // - `size` 弹窗大小（normal：正常，large:大，small：小）
    // - `type` 弹窗样式类型
    // - `title` 弹窗标题
    // - `content` 弹窗内容
    // - `contentposition` 弹窗内容位置（居左或居中）
    // - `status` 是否显示蒙版
    // - `marsktap` 蒙版是否支持点击事件
    // - `foot` 是否有点击按钮
    let type = e.currentTarget.dataset.type
    let option = {}
    if (type == "ad") {
      option = {
        status: true,
        closeicon: true,
        content: `带有AD图标的卡片为推广内容，虽然已经经过我们的筛选，但还请自行判断内容真实性。`,
        marsktap: true,
        title: '广告',
        foot: [{
          text: '我知道了',
          cb: () => {}
        }]
      }
    } else {
      option = {
        status: true,
        closeicon: true,
        content: `此处距离为学校中心点到店铺的粗略值，具体距离请根据地图评估`,
        marsktap: true,
        title: '距离提示',
        foot: [{
          text: '我知道了',
          cb: () => {}
        }]
      }
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

  onShareAppMessage: function (options) {
    var shareObj = {
      title: "点击查看" + this.data.swiperList[this.data.cardCur].storeName,
      path: '/pages/empty/empty?url=life_map_list?id=123',
      imageUrl: 'https://cdns.qdu.life/img/share_1.png',
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {}
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
    }

    // 来自页面内的按钮的转发
    // if (options.from == 'button')       
    return shareObj;
  },
})