//获取应用实例
let app = getApp();
const router = require('../../../../router/index.js');
import lifemapService from '../../../../net/lifemapService.js'
import userService from '../../../../net/userService.js'



Page({
  data: {
    realName: '',
    hasNewMsg: false,
    hasGotDate: false,
    hasGotRealName: false,
    currentStoreListIndex: 0,
    toStoreListView: 0,
    navigate_type: '', //分类类型，是否包含二级分类
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: '', //当前滚动列表总长
    slideShow: true,
    slideRatio: '',
    tlist: [],
    // 刷新
    triggered: true,
    showAllStorePopValue: false,
    showStoreListPopValue: false,
    storeList: [
      [{
        distance: "2.5km",
        name: '小兔崽干洗店',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp6.zbjimg.com%2Fservice%2F2016-11%2F01%2Fservice%2F5818227c222c6.jpg&refer=http%3A%2F%2Fp6.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=375b0b30db03d4be6c4b366b39ffe70a',
        remark: 2,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        distance: "2.3km",
        name: '小狗崽干洗店',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhomesitetask.zbjimg.com%2Fhomesite%2Ftask%2F20180402174823.jpg%2Forigine%2F79c48798-10e5-4af2-9b09-3c4a471ccf67&refer=http%3A%2F%2Fhomesitetask.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=c5713f7ead3de55e33d3a7dd0e9ea415',
        remark: 2.5,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        name: '衣丽诺诗干洗店',
        distance: "1.3km",
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstatic-xiaoguotu.17house.com%2Fxgt%2Fs%2F22%2F1462891930156aa.jpg&refer=http%3A%2F%2Fstatic-xiaoguotu.17house.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=5c98b3efc359bf833d341d548ea5f02f',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ],
      [{
        name: '泡泡打印店',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhomesitetask.zbjimg.com%2Fhomesite%2Ftask%2F%25E6%259C%2580%25E7%25BB%2588%25E6%2595%2588%25E6%259E%259C%25E5%259B%25BE-2.jpg%2Forigine%2Fd7316279-846b-4652-8f22-8718dfa86497&refer=http%3A%2F%2Fhomesitetask.zbjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=0c0fd8c97981572aa165881e78a23346',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        name: '洁尔雅文印店',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170407%2F0bb5bfc848e949ceb334d6b346eb1e5d_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=096e5f33acecb87eb403192243dfcc26',
        remark: 3.5,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ],
      [{
        name: 'Pull And Bear',
        image: 'https://img1.baidu.com/it/u=2402787890,2259729110&fm=26&fmt=auto',
        remark: 3,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        name: 'Store 2',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ],
      [{
        name: 'Pull And Bear',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        businessHour: '10:00Am - 12:00 PM',
        remark: 4,
        badge: ''
      }, {
        name: 'Store 2',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ],
      [{
        name: 'Pull And Bear',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        name: 'Store 2',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ],
      [{
        name: 'Pull And Bear',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        name: 'Store 2',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679ch/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ],
      [{
        name: 'Pull And Bear',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        name: 'Store 2',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ],
      [{
        name: 'Pull And Bear',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, {
        name: 'Store 2',
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic16.nipic.com%2F20110822%2F3666845_120404347107_2.jpg&refer=http%3A%2F%2Fpic16.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637718218&t=8b3a55120df82aaa1cea547982ff4679',
        remark: 4,
        businessHour: '10:00Am - 12:00 PM',
        badge: ''
      }, ]
    ],
  },
  showAboutDialog() {
    // - `size` 弹窗大小（normal：正常，large:大，small：小）
    // - `type` 弹窗样式类型
    // - `title` 弹窗标题
    // - `content` 弹窗内容
    // - `contentposition` 弹窗内容位置（居左或居中）
    // - `status` 是否显示蒙版
    // - `marsktap` 蒙版是否支持点击事件
    // - `foot` 是否有点击按钮
    let dialog_1 = {}
    let dialog_2 = {}
    this.data.dialogList.forEach(e => {
      if (e.pid == 1) {
        dialog_1 = e
      }
      if (e.pid == 2) {
        dialog_2 = e
      }
    });


    let option = {
      status: true,
      closeicon: true,
      contentstyle: 'white-space:pre-wrap;justify-content:left',
      content: dialog_1.content.replace(/\\n/g, '\n'),
      marsktap: true,
      title: dialog_1.title,
      foot: [{
        text: '推广内容的说明',
        cb: () => {
          app.globalData.emitter.emit("bottomdialogstatus", option2)
        }
      }, {
        text: '我知道了',
        cb: () => {}
      }]
    }

    let option2 = {
      status: true,
      closeicon: true,
      contentstyle: 'white-space:pre-wrap;justify-content:left',
      content: dialog_2.content.replace(/\\n/g, '\n'),
      marsktap: true,
      title: dialog_2.title,
      foot: [{
        text: '我知道了',
        cb: () => {}
      }]
    }
    app.globalData.emitter.emit("bottomdialogstatus", option)
    return
  },
  jump2Msg() {
    router.push({
      name: "msg"
    })
  },
  jump2AddStore() {
    router.push({
      name: "life_map_add_store"
    })
  },
  jump2StoreDetail(e) {
    router.push({
      name: "life_map_list",
      data: {
        list_id: e.currentTarget.dataset.list_id,
        store_id: e.currentTarget.dataset.store_id
      }
    })
  },
  showAllStorePop() {
    this.setData({
      showAllStorePopValue: true
    })
  },

  hideAllStorePop() {
    this.setData({
      showAllStorePopValue: false
    })

  },

  hideStoreListPop() {
    this.setData({
      showStoreListPopValue: false
    })
  },
  showStoreListPop() {
    this.setData({
      showStoreListPopValue: true
    })
  },
  onPulling(e) {
    // console.log('onPulling:', e)
  },
  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      wx.showToast({
        title: '刷新成功',
      })
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 1000)
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },

  //////////////////////
  ////// 服务端 ////////
  /////////////////////
  handleGetInitDataSuccess(e) {
    console.log(e)
    this.setData({
      dialogList: e.dialogList,
      tlist: e.storeTypeList,
      hasGotDate: true,
      hasNewMsg: e.hasUnreadMsg
    })
    app.globalData.dialogList = e.dialogList
    //计算比例
    this.getRatio();
  },

  onLoad: function () {
    lifemapService.getInitData(this.handleGetInitDataSuccess)

    wx.setNavigationBarTitle({
      title: '青空教室 - 权小益出品',
    })


    const _this = this;
    // TODO: 获取数据
    let systemInfo = wx.getSystemInfoSync();
    _this.setData({
      windowHeight: systemInfo.windowHeight - 35,
      windowWidth: systemInfo.windowWidth,
    })
  },

  handleCheckImportFromJwSuccess(e) {
    let realName = e

    app.globalData.realName = realName
    this.setData({
      realName,
      hasGotRealName: true
    })
    // 返回姓名
  },
  showLogin() {
    let option = {
      status: true,
      closeicon: true,
      contentstyle: 'white-space:pre-wrap;justify-content:left',
      content: "本模块基于青大学生评分，未实名登录则只能浏览。\n目前只支持导入教务课表的方式登录。\n未来会添加青大邮箱、校园卡验证等多种方式。",
      marsktap: true,
      title: this.data.realName == '' || this.data.realName == '-1' ? '游客，' + "你好" : this.data.realName + "你好",
      foot: this.data.realName == '' || this.data.realName == '-1' ? [{
        text: '我知道了',
        cb: () => {}
      }, {
        text: '登录',
        cb: () => {
          router.push({
            name: 'course_import'
          })
        }
      }] : [{
        text: '我知道了',
        cb: () => {}
      }]
    }


    app.globalData.emitter.emit("bottomdialogstatus", option)
    return
  },
  onShow() {
    userService.CheckImportFromJw(this.handleCheckImportFromJwSuccess)
  },

  //根据分类获取比例
  getRatio() {
    const _this = this;
    if (!_this.data.tlist || _this.data.tlist.length <= 5) {
      this.setData({
        slideShow: false
      })
    } else {
      let _totalLength = _this.data.tlist.length * 300; //分类列表总长度
      let _ratio = 165 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
      let _showLength = 750 / _totalLength * 165; //当前显示红色滑条的长度(保留两位小数)
      this.setData({
        slideWidth: _showLength,
        totalLength: _totalLength,
        slideShow: true,
        slideRatio: _ratio
      })
    }
  },
  //slideLeft动态变化
  getleft(e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio
    })
  },


  //用户点击tab时调用
  titleClick: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentStoreListIndex: e.currentTarget.dataset.id,
      currentStoreListName: e.currentTarget.dataset.name,
      showStoreListPopValue: false
    })
  },

  //swiper切换时会调用
  pagechange: function (e) {
    let currentStoreListIndex = e.detail.current
    this.setData({
      currentStoreListIndex,
      currentStoreListName: this.data.tlist[currentStoreListIndex].id,

    })
  },
})