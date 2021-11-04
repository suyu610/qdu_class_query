const {
  msg
} = require("../../router/routes");

const app = getApp();
Page({
  data: {
    iconList: [{
      icon: 'messagefill',
      color: 'green',
      badge: 120,
      name: '回复我的'
    }, {
      icon: 'appreciatefill',
      color: 'orange',
      badge: 1,
      name: '收到的赞'
    }, {
      icon: 'noticefill',
      color: 'blue',
      badge: 0,
      name: '系统通知'
    }],
    gridCol: 3,
    skin: true,
    msgList: [{
      type: 'admin',
      id: 1,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,
      createTime: "22:21"
    }, {
      type: 'admin',
      id: 2,
      content: "巴贝拉拉巴拉巴拉巴拉",
      createTime: "22:21",
      unread: true
    }, {
      type: 'admin',
      id: 3,
      content: "123",
      unread: true,

      createTime: "22:27"
    }, {
      type: 'admin',
      id: 4,
      content: "4444",
      unread: true,

      createTime: "22:23"
    }, {
      type: 'admin',
      id: 5,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 6,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 7,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 8,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 9,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 10,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 11,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 12,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 13,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 14,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,

      createTime: "22:21"
    }, {
      type: 'admin',
      id: 15,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,
      createTime: "22:21"
    }, {
      type: 'admin',
      id: 16,
      content: "巴贝拉拉巴拉巴拉巴拉",
      unread: true,
      createTime: "22:21"
    }],
  },
  delMsg(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let msgList = this.data.msgList
    msgList.forEach(e => {
      if (id == e.id) {
        let index = msgList.indexOf(e)
        msgList.splice(index, 1)
        that.setData({
          msgList
        })
        wx.showToast({
          title: '删除成功',
        })
        return;
      }
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '消息列表',
    })
  }
})