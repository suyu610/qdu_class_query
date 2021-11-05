// pages/comment/comment.js
let app = getApp()
const router = require('../../../../router/index.js');
import lifemapService from '../../../../net/lifemapService.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: 1,
    showAddCommentPopValue: false,
    showAddReplyCommentPopValue: false,
    active: "all",
    video_data: {}, //要播放的视频对象
    fullScreen: false, //视频是否全屏

    isAnonymous: false,
    count: {
      pic: 2,
      reply: 1,
      good: 3,
      mid: 0,
      bad: 0
    },
    yourRate: 0,
    commentValue: '',
    goodCommentRate: 100,
    rate: 5,
    appendixList: [],
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
        content: "不错不错不错不错",
        likeCount: 17,
        viewCount: 12,
        rate: 3,
        createTime: '2019.09.18',
        spec: "银色 64G",
        pics: [
          "https://img30.360buyimg.com/shaidan/s616x405_jfs/t1/65005/20/4818/92581/5d2ffdb6Ebcbf3018/35411a583e29d52d.jpg",
          "https://img30.360buyimg.com/shaidan/s616x405_jfs/t1/74460/28/4830/96562/5d2ffdb7Ed5e9ce7a/e764b3daa92a9c67.jpg",
          "https://img13.360buyimg.com/n1/g6/M03/04/1A/rBEGC1DJTIkIAAAAAAIol0ZV_NgAAA8fQDxtksAAiiv498.jpg",
        ],
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
  handleDelCommentSuccess(e) {
    wx.hideLoading()
    wx.showToast({
      title: '删除成功',
    })

    lifemapService.getCommentsByStoreId(this.data.storeId, this.handleGetCommentsByStoreIdSuccess)
  },

  delComment(e) {
    let that = this
    console.log(e.detail.id)
    wx.showModal({
      title: '要删掉这条评论吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          lifemapService.deleteComment(e.detail.id, that.handleDelCommentSuccess)
        }
      }
    })
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

    let urls = []
    this.data.appendixList.forEach(e => {
      if (e.fileType == 'image') {
        urls.push(e.url)
      }
    })

    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: urls // 需要预览的图片http链接列表
    })

  },

  videoErrorCallback(e) {
    console.log(e)
  },



  delImg(e) {
    wx.showModal({
      content: '要删除这张照片吗？',
      success: res => {
        if (res.confirm) {
          this.data.appendixList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            appendixList: this.data.appendixList
          })
        }
      }
    })
  },

  onChangeRateValue(e) {
    this.setData({
      yourRate: e.detail,
    });
  },

  handleSubmitStoreCommentSuccess(e) {
    console.log(e)
    wx.hideLoading()
    wx.showToast({
      icon: 'none',
      title: '提交成功，等待审核',
    })
    this.setData({
      yourRate: 0,
      commentValue: '',
      appendixList: [],
      showAddCommentPopValue: false,
    })
  },

  chooseImage() {
    let appendixList = this.data.appendixList
    wx.chooseMedia({
      count: 4, //默认9
      mediaType: ['image', 'video'],
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        console.log(res)
        res.tempFiles.forEach(e => {
          if (e.fileType == "image") {
            appendixList.push({
              fileType: e.fileType,
              url: e.tempFilePath,
            })
          }
          if (e.fileType == "video") {
            appendixList.push({
              fileType: e.fileType,
              url: e.tempFilePath,
              thumb: e.thumbTempFilePath
            })
          }
        })

        this.setData({
          appendixList
        })
      },
      fail(e) {
        console.log(e)
      }
    });
  },

  handleSubmitReplyStoreCommentSuccess(e) {
    wx.hideLoading();
    wx.showToast({
      title: '提交成功',
    })

    this.setData({
      yourRate: 0,
      commentValue: '',
      showAddReplyCommentPopValue: false
    })
  },
  // 提交回复评论
  submitReplyComment(e) {
    if (this.data.commentValue == '') {
      wx.showToast({
        icon: 'none',
        title: '评论不能为空',
      })
      return;
    }
    let that = this
    let data = {
      "commentId": this.data.currentReplyId,
      "content": this.data.commentValue,
      "storeId": this.data.storeId,
      "anonymous": this.data.isAnonymous ? '1' : '0'
    }

    wx.showModal({
      content: "评论是" + this.data.commentValue,
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '提交中',
          })

          lifemapService.submitReplyStoreComment(data, that.handleSubmitReplyStoreCommentSuccess)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
    let data = {
      "rate": that.data.yourRate,
      "content": that.data.commentValue,
      "storeId": that.data.storeId,
      "appendixList": that.data.appendixList,
      "anonymous": that.data.isAnonymous ? '1' : '0'
    }
    wx.showModal({
      title: '评分为：' + that.data.yourRate,
      content: "评论是" + that.data.commentValue,
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.showLoading({
            title: '提交中',
          })
          // todo
          // 要上传一下图片，传到微信云存储里吧
          that.uploadToCloud(data)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },



  // 上传图片
  uploadToCloud(data) {
    let that = this
    wx.cloud.init();

    if (data.appendixList.length == 0) {
      // 如果没有图片要上传
      lifemapService.submitStoreComment(data, that.handleSubmitStoreCommentSuccess);
    } else {
      wx.showLoading({
        title: '上传图片中',
      })
      let fileList = data.appendixList
      var random = Math.floor(Math.random() * 10000 + 1) //随机数
      var name = Date.parse(new Date()) / 1000; //时间戳
      const cloudPath = 'lifemap/store_comment/' + random + name

      const uploadTasks = fileList.map((file, index) =>
        //获取后缀,原文件名
        // 还有thumb也要传一下
        this.uploadFilePromise(cloudPath + '_' + index + "." + file.url.substr(file.url.lastIndexOf(".") + 1), file.url)
      );

      Promise.all(uploadTasks)
        .then(result => {
          fileList = []
          result.forEach(e => {
            let startIndex = e.fileID.lastIndexOf("_") + 1
            let endIndex = e.fileID.lastIndexOf(".")
            let index = e.fileID.substring(startIndex, endIndex)
            data.appendixList[index].url = e.fileID
          })

          lifemapService.submitStoreComment(data, that.handleSubmitStoreCommentSuccess);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult
    });
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

  handleGetCommentsByStoreIdSuccess(e) {
    wx.stopPullDownRefresh()
    wx.hideLoading()
    wx.hideToast()


    // 对顶部的分类数字进行汇总
    let pic = 0
    let reply = 0
    let good = 0
    let mid = 0
    let bad = 0
    e.forEach(e => {
      if (e.pics.length > 0) pic++
      if (e.businessReply) reply++
      if (e.rate >= 4) good++
      if (e.rate == 4 || e.rate == 3) mid++
      if (e.rate <= 2) bad++
    })

    this.setData({
      commentList: e,
      comment: e,
      count: {
        pic,
        reply,
        good,
        mid,
        bad
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
    const data = router.extract(options);
    console.log(data)
    if (data != null && data.source != null && data.source == "rate") {
      this.setData({
        showAddCommentPopValue: true
      })
    }
    if (data != null) {
      this.setData({
        "storeId": data.store_id,
        "store_name":data.store_name,
      })
    }
    lifemapService.getCommentsByStoreId(data.store_id, this.handleGetCommentsByStoreIdSuccess)

    wx.setNavigationBarTitle({
      title: '评论',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //弹出视频图层。播放视频
  showVideo(e) {
    let src = e.detail.src
    var videoContext = wx.createVideoContext('myVideo', this);
    videoContext.requestFullScreen();
    this.setData({
      video_data: src,
      fullScreen: true
    })
    videoContext.play()
  },


  showPopVideo(e) {
    let src = e.currentTarget.dataset.src
    var videoContext = wx.createVideoContext('myVideo', this);
    videoContext.requestFullScreen();
    this.setData({
      video_data: src,
      fullScreen: true
    })
    videoContext.play()
  },

  closeVideo(e) {
    if (!e.detail.fullscreen) {
      //执行退出全屏方法
      this.setData({
        fullScreen: e.detail.fullScreen
      })
      var videoContext = wx.createVideoContext('myVideo', this);
      videoContext.stop()
      videoContext.exitFullScreen();
    }
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
    wx.showLoading({
      title: '刷新中',
    })
    lifemapService.getCommentsByStoreId(this.data.storeId, this.handleGetCommentsByStoreIdSuccess)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载更多信息")
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
    } else if (tag == "reply") {
      data = data.filter(v => {
        return v.businessReply;
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