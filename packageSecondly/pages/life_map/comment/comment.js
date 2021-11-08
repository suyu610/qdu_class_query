// pages/comment/comment.js
let app = getApp()
const router = require('../../../../router/index.js');
import lifemapService from '../../../../net/lifemapService.js'
import userService from '../../../../net/userService.js'
import {
  TencentCloudStoragyUrl
} from "../../../../net/constants";

var videoContext = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: 1,
    isPlayingVideo: false,
    showAddCommentPopValue: false,
    showAddReplyCommentPopValue: false,
    active: "all",
    video_data: {}, //要播放的视频对象
    hasGotDate: false,
    isAnonymous: false,
    count: {},
    yourRate: 0,
    commentValue: '',
    goodCommentRate: 100,
    rate: 5,
    appendixList: [],
    comment: [],
    commentList: []
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
      content: `当同一用户存在多条评论时，其评分只会取最后一条`,
      marsktap: true,
      title: '关于评论评分',
      foot: [{
        text: '知道了',
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
          // 把他后面的都减一
          this.data.appendixList.forEach(e => {
            e.sort = this.data.appendixList.indexOf(e)
          })
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
          if (res.type == "image") {
            appendixList.push({
              fileType: res.type,
              url: e.tempFilePath,
              size: e.size,
              sort: 0
            })
          }
          if (res.type == "video") {
            appendixList.push({
              fileType: res.type,
              url: e.tempFilePath,
              thumb: e.thumbTempFilePath,
              size: e.size,
              duration: e.duration,
              sort: 0
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
      content: this.data.commentValue,
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
      content: that.data.commentValue,
      success(res) {
        // 点击确定
        if (res.confirm) {
          wx.showLoading({
            title: '提交中',
          })
          // todo
          // 要上传一下图片，传到微信云存储里吧
          data.appendixList.forEach(e => {
            e.sort = data.appendixList.indexOf(e)
          })
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

      const uploadTasks = fileList.map((file, index) => {
        // 获取后缀,原文件名
        // 还有thumb也要传一下
        // 如果是video，则上传他的thumb
        if (file.fileType == "video") {

          this.uploadFilePromise(cloudPath + '_thumb_' + index + "." + file.thumb.substr(file.url.lastIndexOf(".") + 1), file.thumb)
          file.thumb = TencentCloudStoragyUrl + cloudPath + '_thumb_' + index + "." + file.thumb.substr(file.url.lastIndexOf(".") + 1)
        }

        return this.uploadFilePromise(cloudPath + '_' + index + "." + file.url.substr(file.url.lastIndexOf(".") + 1), file.url)
      });

      Promise.all(uploadTasks)
        .then(result => {
          fileList = []
          result.forEach(e => {
            let startIndex = e.fileID.lastIndexOf("_") + 1
            let endIndex = e.fileID.lastIndexOf(".")
            let index = e.fileID.substring(startIndex, endIndex)
            console.log(e.fileID.substring(startIndex - 5, startIndex))
            if (e.fileID.substring(startIndex - 5, startIndex) != 'thumb') {
              data.appendixList[index].url = e.fileID
            }
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
  handleToggleCommentLikeSuccess(e) {
    console.log(e)
  },
  likeBtnTapped(e) {
    let id = e.detail.id
    console.log(id)
    lifemapService.toggleCommentLike(id, this.handleToggleCommentLikeSuccess)
  },
  getTimer: function (stringTime) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;

    var time1 = new Date().getTime(); //当前的时间戳
    var time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
    var time = time1 - time2;

    var result = null;
    if (time < 0) {
      alert("设置的时间不能早于当前时间！");
    } else if (time / month >= 1) {
      result = "发布于" + parseInt(time / month) + "月前";
    } else if (time / week >= 1) {
      result = "发布于" + parseInt(time / week) + "周前";
    } else if (time / day >= 1) {
      result = "发布于" + parseInt(time / day) + "天前";
    } else if (time / hour >= 1) {
      result = "发布于" + parseInt(time / hour) + "小时前";
    } else if (time / minute >= 1) {
      result = "发布于" + parseInt(time / minute) + "分钟前";
    } else {
      result = "刚刚发布";
    }
    return result;
  },

  handleGetCommentsByStoreIdSuccess(element) {
    wx.stopPullDownRefresh()
    wx.hideLoading()
    wx.hideToast()


    // 对顶部的分类数字进行汇总
    let pic = 0
    let reply = 0
    let good = 0
    let mid = 0
    let bad = 0
    element.forEach(e => {
      // 把时间格式化一下
      e.createTime = this.getTimer(e.createTime)
      e.subStoreComments.forEach(el => {
        el.createTime = this.getTimer(el.createTime)
      });

      if (e.pics.length > 0) pic++
      if (e.businessReply) reply++
      if (e.rate >= 4) good++
      if (e.rate == 4 || e.rate == 3) mid++
      if (e.rate <= 2) bad++
    })

    this.setData({
      commentList: element,
      comment: element,
      hasGotDate: true,
      count: {
        pic,
        reply,
        good,
        mid,
        bad
      }
    })
  },

  protectNameFunc: function (name) {
    if (name == null) {
      return
    }
    if (name.length == 0 || name == undefined) {
      return "";
    }
    var length = name.length;
    //判断当字符串长度为二时,隐藏末尾
    if (length === 2) {
      return name.substring(0, 1) + '*';
    }
    if (length === 3) {
      return name.substring(0, 1) + '*' + name.substring(2, 3);
    }

    //判断字符串长度大于首尾字符串长度之和时,隐藏中间部分
    else {
      return name.substring(0, 1) + "*".repeat(length - 2) + name.substring(length - 1, length);
    }
  },

  forbidNoNameTouch() {
    console.log("forbidNoNameTouch")
    wx.showModal({
      title: '注意',
      content: '未登录，不能点赞和评论哦',
      confirmText: '去登录',
      success(res) {
        if (res.confirm) {
          router.push({
            name: 'course_import'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  handleCheckImportFromJwSuccess(e) {
    let realName = e
    let protectName = ''
    if (e != '' && e != -1) {
      protectName = this.protectNameFunc(realName)
    }
    app.globalData.realName = realName
    this.setData({
      realName,
      hasGotRealName: true,
      protectName
    })
    // 返回姓名
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
    let protectName = ""
    let realName = app.globalData.realName
    if (realName && realName != '' && realName != '-1') {
      protectName = this.protectNameFunc(realName)
    }


    if (data != null) {
      this.setData({
        "storeId": data.store_id,
        "store_name": data.store_name,
        realName,
        protectName
      })
      lifemapService.getCommentsByStoreId(data.store_id, this.handleGetCommentsByStoreIdSuccess)

    } else {
      lifemapService.getCommentsByStoreId(1, this.handleGetCommentsByStoreIdSuccess)

    }

    wx.setNavigationBarTitle({
      title: '评论',
    })
  },
  noop() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("好了")
  },

  //弹出视频图层。播放视频
  showVideo(e) {
    console.log(e)
    let that = this
    let src = e.detail.src
    this.setData({
      video_data: src,
      isPlayingVideo: true
    })
    if (this.videoContext == null) {
      console.log("videoContext == null")
      this.videoContext = wx.createVideoContext('myVideo')
    }

    setTimeout(function () {
      that.videoContext.play()
    }, 500)

  },

  closeVideo(e) {
    //执行退出全屏方法
    this.setData({
      isPlayingVideo: false,
    })
    this.videoContext.stop()
    this.videoContext.seek(0)

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.realName == '' || app.globalData.realName == '-1') {

      userService.CheckImportFromJw(this.handleCheckImportFromJwSuccess)
    }
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