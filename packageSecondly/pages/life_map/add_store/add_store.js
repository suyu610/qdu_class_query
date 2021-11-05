const app = getApp();
const chooseLocation = requirePlugin('chooseLocation');
const key = '5WCBZ-U7RLU-RFHVG-2N6Q7-76LT6-DZBJO'; //使用在腾讯位置服务申请的key
const referer = '青岛大学空教室查询'; //调用插件的app的名称
const location = JSON.stringify({
  latitude: 36.06623,
  longitude: 120.38299
});
const category = '大学,生活服务,娱乐休闲';
Page({
  data: {
    steps: [{
        desc: '商店信息',
      },
      {
        desc: '商品信息',
      }, {
        desc: '提交',
      }
    ],
    activeStep: 0,
    goodTypeInputValue: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    inSchool: true,
    goodList: [],
    goodTypeList: [],
    picker: [{
        id: 'a',
        name: "干洗店",
        icon: "/images/temp.png"
      }, {
        id: "b",
        name: "打印店",
        icon: "/images/printer.png"
      },
      {
        id: "c",
        name: "修手机",
        icon: "/images/iphone.png"
      },
      {
        id: "d",
        name: "眼镜店"
      },
      {
        id: "e",
        name: "配钥匙"
      },
      {
        id: "f",
        name: "花店"
      },
      {
        id: "g",
        name: "药店"
      },
      {
        id: "h",
        name: "理发店"
      },
      {
        id: "i",
        name: "健身馆",
        icon: "/images/printer.png"
      }
    ],

    multiIndex: [0, 0, 0],
    openTime: '09:00',
    closeTime: '22:00',

    date: '2018-12-25',
    region: ['广东省', '广州市', '海珠区'],
    imgList: [],
    textareaAValue: '',
    textareaBValue: ''
  },
  jump2ChoosePoint() {
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
  },

  nextStep() {
    this.setData({
      activeStep: 1
    })
  },
  prevStep() {
    this.setData({
      activeStep: 0
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  inSchoolChange(e) {
    this.setData({
      inSchool: e.detail.value
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e)
  },
  pickerChangeGoodTypeId(e) {
    console.log(e)
    let that = this
    let goodId = e.currentTarget.dataset.id
    let goodTypeId = e.detail.value
    let goodList = this.data.goodList
    goodList.forEach(e => {
      if (e.id == goodId) {
        e.goodTypeId = goodTypeId
        that.setData({
          goodList
        })
        return
      }
    })
  },
  onShowAddGoodTypePop() {
    this.setData({
      addGoodTypePopValue: true,
      goodTypeInputValue: ''
    })
  },
  onCloseAddGoodTypePop() {
    this.setData({
      addGoodTypePopValue: false,
      goodTypeInputValue: ''
    })
  },

  deleteGoodTypeItem(e) {
    let id = e.currentTarget.dataset.id
    let that = this
    let goodTypeList = this.data.goodTypeList
    let tmpName = ""
    let index = 0
    goodTypeList.forEach(e => {
      if (e.id == id) {
        tmpName = e.name
        index = goodTypeList.indexOf(e)
        return
      }
    })
    wx.showModal({
      title: '删除此项分类吗?',
      content: tmpName,
      success(res) {
        if (res.confirm) {
          goodTypeList.splice(index, 1)
          that.setData({
            goodTypeList
          })
          wx.showToast({
            title: '删除成功',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submitGoodType() {
    let that = this
    if (
      this.data.goodTypeInputValue != '') {
      let goodTypeList = that.data.goodTypeList


      let maxId = -1
      if (goodTypeList.length != 0) {
        maxId = Math.max.apply(Math, goodTypeList.map(item => {
          return item.id
        }))
      }
      let goodTypeItem = {
        'id': ++maxId,
        'name': this.data.goodTypeInputValue
      }
      goodTypeList.push(goodTypeItem)
      wx.showToast({
        title: '添加成功',
      })
      this.setData({
        goodTypeList,
        addGoodTypePopValue: false
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '分类名不能为空',
      })
    }
  },
  goodChanged(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    let goodList = this.data.goodList
    console.log(e)
    console.log(goodList)
    console.log(id)

    goodList.forEach(e => {
      if (e.id == id) {
        if (type == 'name') {
          e.name = value
        } else {
          e.price = value
        }
        that.setData({
          goodList
        })
        return;
      }
    })
  },
  addGoodCount() {
    let goodList = this.data.goodList
    // goodList里最大的

    let maxId = -1
    if (goodList.length != 0) {
      maxId = Math.max.apply(Math, goodList.map(item => {
        return item.id
      }))
    }
    let good = {
      'id': ++maxId,
      'name': '',
      'price': '',
      'goodTypeId': -1
    }
    goodList.push(good)
    this.setData({
      goodList
    })
  },

  showAboutDialog() {
    let option = {
      status: true,
      closeicon: true,
      content: `带有AD图标的卡片为推广内容，虽然已经经过我们的筛选，但还请自行判断内容真实性。`,
      marsktap: true,
      title: '关于添加商店',
      foot: [{
        text: '我知道了',
        cb: () => {}
      }]
    }

    app.globalData.emitter.emit("bottomdialogstatus", option)
    return
  },

  deleteGoodCount(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let that = this
    let goodList = this.data.goodList
    let tmpName = ""
    let index = 0
    goodList.forEach(e => {
      if (e.id == id) {
        tmpName = e.name
        index = goodList.indexOf(e)
        return
      }
    })
    wx.showModal({
      title: '删除此项商品吗?',
      content: tmpName,
      success(res) {
        if (res.confirm) {
          goodList.splice(index, 1)
          that.setData({
            goodList
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    })
  },

  openTimeChange(e) {
    this.setData({
      openTime: e.detail.value
    })
  },
  closeTimeChange(e) {
    this.setData({
      closeTime: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
  onShow() {
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    this.setData({
      location
    })
    console.log(location)
  },
  onUnload() {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  },
  onLoad(options) {
    wx.enableAlertBeforeUnload({
      message: "数据未保存，你确定要返回吗？"
    })
  }
})