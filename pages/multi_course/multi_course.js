// pages/multi_course/multi_course.js
const userService = require('../../net/userService.js')
const multiCourseService = require('../../net/multiCourseService.js')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const router = require('../../router/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    createRoomName: "",
    roompassword: "",
    searchFocus: false,
    searchList: [],
    searchValue: "",
    showEnterPassword: false,
    myJoinLoadingList: [],
    myJoinList: [],
    myCreateList: [],
    curRoomId: 0
  },

  onChangeCreateRoomName(event) {
    this.setData({
      createRoomName: event.detail
    })
  },

  enterToDetail: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let roomName = e.currentTarget.dataset.name
    router.push({
      name: "multi_course_detail",
      data: {
        id,
        name: roomName
      },
    })
  },

  handleSearchSuccess: function (e) {
    if (e == null) {
      wx.showToast({
        icon: 'error',
        title: '房间不存在',
      })
    } else {
      // 要检查一下是否存在于createList 和 joinList

      let checkRoomIdArr = []

      this.data.myCreateList.forEach(element => {
        checkRoomIdArr.push(element.id)
      });

      this.data.myJoinList.forEach(element => {
        checkRoomIdArr.push(element.id)
      });

      console.log(checkRoomIdArr)
      console.log(checkRoomIdArr.indexOf(e.id) == -1)

      if (checkRoomIdArr.indexOf(e.id) == -1) {
        e.joinStatus = false
      } else {
        e.joinStatus = true
      }
      this.setData({
        searchList: [e]
      })
    }
  },

  onSearch(e) {
    let roomId = e.detail
    // 檢查roomId，是否為數字

    if (roomId == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入房间ID',
      })
      return;
    }
    var regNum = new RegExp('[0-9]', 'g');

    if (!regNum.exec(roomId)) {
      wx.showToast({
        icon: 'none',
        title: '房间ID只能是数字'
      });
      return false;
    }
    console.log(e.detail)
    multiCourseService.searchRoomById(this.handleSearchSuccess, this.handleSearchFail, e.detail)
  },

  handleJoinRoomSuccess: function (e) {
    wx.hideLoading()
    multiCourseService.getRoom(this.handleGetRoomSuccess)
    wx.showToast({
      title: '加入成功',
    })
    this.setData({
      searchFocus: false,
      searchValue: "",
      showEnterPassword: false
    })
  },

  handleJoinRoomFail: function (e) {
    wx.showToast({
      title: e,
    })
  },

  onCloseEnterPassword: function () {
    this.setData({
      showEnterPassword: false
    })
  },

  onTapJoinRoomByPasswordBtn: function (e) {
    let roomId = this.data.curRoomId;
    let roompassword = this.data.roompassword;

    let data = {
      id: roomId,
      password: roompassword
    }
    multiCourseService.joinRoom(this.handleJoinRoomSuccess, this.handleJoinRoomFail, data)

  },

  onTapJoinRoomBtn: function (e) {

    let hasPassword = e.currentTarget.dataset.haspassword;
    let roomId = e.currentTarget.dataset.id;

    let joinstatus = e.currentTarget.dataset.joinstatus
    // 已加入
    if (joinstatus || joinstatus == null) {
      return
    }

    this.setData({
      curRoomId: roomId
    })
    let that = this;

    // 如果有密码
    if (hasPassword) {
      // 弹个弹窗
      this.setData({
        showEnterPassword: true
      })

    } else {
      // todo:向后台发送加入房间的请求
      wx.showLoading({
        title: '处理中',
      })

      let data = {
        id: roomId,
        password: ""
      }

      multiCourseService.joinRoom(this.handleJoinRoomSuccess, this.handleJoinRoomFail, data)

      that.setData({
        searchFocus: false,
        searchValue: "",
        searchList: []
      })
    }
  },
  handleCreateRoomSuccess: function (e) {
    let that = this
    if (e != 0) {

      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '创建成功',
            duration: 700
          })
          that.setData({
            showCreateRoomPopUp: false
          })
        },
      })

      let room = {
        id: e,
        roomName: this.data.createRoomName,
        stuCount: 0,
        verifyConfig: true
      }

      let myCreateList = this.data.myCreateList

      myCreateList.push(room)

      this.setData({
        myCreateList
      })

    } else {
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '创建失败，请重试',
            duration: 700
          })
        },
      })
    }
    console.log(e)
  },
  createRoom: function () {
    if (this.data.createRoomName == "") {
      wx.showToast({
        icon: 'error',
        title: '房间名不能为空',
      })
    } else {
      let data = {
        'roomName': this.data.createRoomName,
        'verifyConfig': 1
      }
      wx.showLoading({
        title: '创建中..',
      })
      multiCourseService.createRoom(this.handleCreateRoomSuccess, data);
    }
  },

  handleDismissSuccess: function (e) {
    wx.hideLoading();
    let that = this
    let myCreateList = this.data.myCreateList;
    if (e != null) {
      myCreateList.forEach(function (room, index) {
        if (room.id == e) {
          // 从list中删除该id
          myCreateList.splice(index, 1)
          that.setData({
            myCreateList
          })

          wx.showToast({
            title: '解散成功',
            duration: 1000,
          })
          return
        }
      })




    }
  },
  handleDismissFail: function (e) {
    console.log(e)
  },

  onTapDismissBtn: function (e) {
    let tapId = e.currentTarget.dataset.id;
    console.log(tapId)
    let that = this
    wx.showModal({
      title: "确认要解散吗？",
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
          })
          let myCreateList = that.data.myCreateList;
          myCreateList.forEach(function (room) {
            if (room.id == tapId) {
              multiCourseService.dissmissRoom(that.handleDismissSuccess, that.handleDismissFail, room.id)
              return
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  handleExitRoomSuccess: function (e) {
    console.log(e)
    wx.hideLoading({
      success: (res) => {
        wx.showToast({
          title: '退出成功',
        })
        multiCourseService.getRoom(this.handleGetRoomSuccess)
      },
    })
  },
  handleExitRoomFail: function () {
    wx.hideLoading({
      success: (res) => {
        wx.showToast({
          icon: 'error',
          title: '退出失败',
        })
      }
    })
  },
  onTapExitBtn: function (e) {
    let tapId = e.currentTarget.dataset.id;
    console.log(tapId)
    let that = this
    wx.showModal({
      title: "确认要退出吗？",
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          })
          multiCourseService.exitRoom(that.handleExitRoomSuccess, that.handleExitRoomFail, tapId)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onSearchFocus: function () {

    this.setData({
      searchFocus: true
    })
  },
  onSearchFocusCancel: function () {
    this.setData({
      searchFocus: false
    })
  },

  onSearchCancel: function () {
    this.onSearchFocusCancel()
  },

  handleGetRoomSuccess: function (e) {
    wx.hideLoading({
      success: (res) => {},
    })
    wx.hideNavigationBarLoading(); //完成停止加载图标
    wx.stopPullDownRefresh();

    let myCreateList = e.create
    let myJoinList = e.join

    this.setData({
      myCreateList,
      myJoinList
    })
  },

  handleCheckImportFromJwSuccess: function (e) {
    if (!e) {
      wx.hideLoading()
      // 如果false，则跳转
      Dialog.confirm({
          title: '尚未导入课表',
          message: '由于你尚未导入课表，暂无法使用该功能。',
        })
        .then(() => {
          router.push({
            name: 'course_import'
          })
        })
        .catch(() => {
          // on cancel
          wx.navigateBack({
            delta: 1,
          })
        });
    } else {
      // 已经导入教务课表，则开始获取房间
      multiCourseService.getRoom(this.handleGetRoomSuccess)
    }
  },

  showCreateRoom: function () {
    this.setData({
      showCreateRoomPopUp: true
    })
  },
  onCloseCreateRoomPopUp: function () {
    this.setData({
      showCreateRoomPopUp: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '多人课表',
    })
    wx.showLoading({
      title: '加载数据中',
    })
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
    // 判断是否已经教务导入了
    userService.CheckImportFromJw(this.handleCheckImportFromJwSuccess)

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
    wx.showLoading({
      title: '加载数据中',
    })
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标    
    multiCourseService.getRoom(this.handleGetRoomSuccess)

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