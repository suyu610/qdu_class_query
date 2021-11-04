// pages/comment/comment.js
let app = getApp()
const router = require('../../../../router/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddCommentPopValue: false,
    showAddReplyCommentPopValue: false,
    active: "all",
    isAnonymous: false,
    count: {
      pic: 2,
      add: 1,
      good: 3,
      mid: 0,
      bad: 0
    },
    yourRate: 0,
    commentValue: '',
    goodCommentRate: 100,
    rate: 5,
    imgList: [],
    comment: [],
    commentList: [{
        id: 0,
        nickname: "李梓赫",
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTqQ5hNKicCNEwW3cATfOTaXk6xMlNEfh1gm0kicPDtJrXwTf5YEqQXYea3m5vsuPyJUXc3U0OicXtA/132",
        content: "很好，手机很有质感，值得购买。",
        rate: 5,
        likeCount: 24,
        viewCount: 12,
        createTime: '2019.08.18',
        spec: "银色 64G",
        hasLike: true,
        pics: [
          "https://img30.360buyimg.com/shaidan/s616x405_jfs/t1/65005/20/4818/92581/5d2ffdb6Ebcbf3018/35411a583e29d52d.jpg",
          "https://img30.360buyimg.com/shaidan/s616x405_jfs/t1/74460/28/4830/96562/5d2ffdb7Ed5e9ce7a/e764b3daa92a9c67.jpg",
          "https://img13.360buyimg.com/n1/g6/M03/04/1A/rBEGC1DJTIkIAAAAAAIol0ZV_NgAAA8fQDxtksAAiiv498.jpg",
          "https://img30.360buyimg.com/shaidan/s616x405_LBVeTh98J1pdxlJY.jpg",
          "https://img30.360buyimg.com/shaidan/s616x405_jfs/t1/186649/2/10243/117965/60d69108E21ff8400/1e94dc197aaaa420.jpg"

        ],
        businessReply: {
          content: '感谢支持'
        }
      },
      {
        id: 1,
        nickname: "黄*宇",
        hasLike: false,
        likeCount: 3,
        viewCount: 12,
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTqQ5hNKicCNEwW3cATfOTaXk6xMlNEfh1gm0kicPDtJrXwTf5YEqQXYea3m5vsuPyJUXc3U0OicXtA/132",
        content: "使用了一段时间了，没有问题，美观大方实用，屏幕分辨率高，屏幕也很大，上网速度快，一点儿也不卡，非常喜欢，应该是正品，高大上的手机。",
        rate: 2,
        createTime: '2019.07.18',
        spec: "银色 128G",
        pics: [
          "https://img30.360buyimg.com/shaidan/s616x405_jfs/t30139/201/1464242510/283903/eb956f0c/5ce123a6Na2d27731.jpg"
        ]
      },
      {
        id: 2,
        nickname: "甫素崽",
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTqQ5hNKicCNEwW3cATfOTaXk6xMlNEfh1gm0kicPDtJrXwTf5YEqQXYea3m5vsuPyJUXc3U0OicXtA/132",
        content: "Nice！",
        likeCount: 17,
        viewCount: 12,

        rate: 3,
        createTime: '2019.09.18',
        spec: "银色 64G",
        pics: [],
        hasLike: false,
        subComment: [{
          hasLike: false,
          viewCount: 88,
          likeCount: 10,
          id: 3,
          nickname: "张峻宁",
          avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTqQ5hNKicCNEwW3cATfOTaXk6xMlNEfh1gm0kicPDtJrXwTf5YEqQXYea3m5vsuPyJUXc3U0OicXtA/132",
          content: "123123",
          rate: 3,
          createTime: '2019.09.18',
          spec: "银色 64G",
          pics: [],
          businessReply: {
            content: '123'
          }
        }, {
          id: 4,
          nickname: "皇甫素崽",
          avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTqQ5hNKicCNEwW3cATfOTaXk6xMlNEfh1gm0kicPDtJrXwTf5YEqQXYea3m5vsuPyJUXc3U0OicXtA/132",
          content: "123123",
          rate: 3,
          createTime: '2019.09.18',
          viewCount: 12,
          likeCount: 12,
          spec: "银色 64G",
          pics: [],
          hasLike: false,
          businessReply: {
            content: '123'
          }
        }]
      }
    ]
  },
  likeBtnTapped(e) {
    let id = e.detail.id
  },
  commentBtnTapped(e) {
    this.setData({
      showAddReplyCommentPopValue: true,
      currentReplyId: e.detail.id
    })
  },
  anonymousChange(e) {
    this.setData({
      isAnonymous: e.detail.value
    })
    // console.log(e.detail.value)
  },
  showAddCommentDialog() {
    let option = {
      status: true,
      closeicon: true,
      content: `请`,
      marsktap: true,
      title: '关于评论',
      foot: [{
        text: '我知道了',
        cb: () => {}
      }]
    }

    app.globalData.emitter.emit("bottomdialogstatus", option)
    return
  },

  onCloseAddReplyCommentPop() {
    this.setData({
      showAddReplyCommentPopValue: false
    })
  },
  viewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  delImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '确定',
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
  chooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
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

  onChangeRateValue(e) {
    this.setData({
      yourRate: e.detail,
    });
  },

  submitComment() {
    if (this.data.commentValue == '') {
      wx.showToast({
        icon: 'none',
        title: '评论不能为空',
      })
      return;
    }
    let that = this;
    wx.showModal({
      title: "你的评论是",
      content: that.data.commentValue + '\r\n\r\n' + '评分为：' + that.data.yourRate,
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.showToast({
            title: '评论成功',
          })
          that.onCloseAddCommentPop()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShowAddCommentPop() {
    this.setData({
      showAddCommentPopValue: true
    })
  },
  onCloseAddCommentPop() {
    this.setData({
      showAddCommentPopValue: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);

    if (data != null && data.source != null && data.source == "rate") {
      this.setData({
        showAddCommentPopValue: true
      })
    }
    this.setData({
      comment: this.data.commentList
    })
    wx.setNavigationBarTitle({
      title: '评论',
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

  },
  changeTag: function (e) {
    let tag = e.currentTarget.dataset.value;
    this.setData({
      active: tag
    });
    let data = this.data.commentList;
    if (tag == "new") {
      data.sort(function (a, b) {
        if (b.createTime > a.createTime) {
          return 1;
        }
        if (b.createTime < a.createTime) {
          return -1;
        }
        return 0;
      });
    } else if (tag == "pic") {
      data = data.filter(v => {
        return v.pics.length > 0;
      });
    } else if (tag == "add") {
      data = data.filter(v => {
        return v.addComment;
      })
    } else if (tag == "good") {
      data = data.filter(v => {
        return v.rate >= 4;
      })
    } else if (tag == "mid") {
      data = data.filter(v => {
        return v.rate == 4 || v.rate == 3;
      })
    } else if (tag == "bad") {
      data = data.filter(v => {
        return v.rate <= 2;
      })
    }
    this.setData({
      comment: data
    })
  }
})