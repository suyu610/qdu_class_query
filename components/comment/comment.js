// component/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object
    },
    realName: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready: function () {

    },

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function (e) {
      let urls = []
      this.data.data.pics.forEach(e => {
        if (e.fileType == 'image') {
          urls.push(e.url)
        }
      })

      let index = e.target.dataset.index;
      wx.previewImage({
        current: this.data.data.pics[index].url, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    },
    previewAddImage: function (e) {
      let index = e.target.dataset.index;
      wx.previewImage({
        current: this.data.data.addComment.pics[index], // 当前显示图片的http链接
        urls: this.data.data.addComment.pics // 需要预览的图片http链接列表
      })
    },
    showVideo: function (e) {
      this.triggerEvent('showVideoTapped', {
        src: e.currentTarget.dataset.src
      })
    },

    delComment: function (e) {
      this.triggerEvent('delComment', {
        id: e.currentTarget.dataset.id
      })

    },
    forbidNoNameTouch() {
      console.log("forbid")
      this.triggerEvent('forbidNoNameTouch', {})
    },
    likeBtnTapped(e) {

      if (this.data.realName == "" || this.data.realName == -1) {
        this.forbidNoNameTouch()
        return
      }
      let data = this.data.data
      data.hasLike = !data.hasLike
      if (data.hasLike) {
        data.likeCount++
      } else {
        data.likeCount--
      }
      this.setData({
        data
      })
      wx.vibrateShort({
        type: 'medium',
      })
      this.triggerEvent('likeBtnTapped', {
        id: e.currentTarget.dataset.id
      }) //triggerEvent广播数据 index为广播事件
    },


    replyLikeBtnTapped(e) {
      if (this.data.realName == "" || this.data.realName == -1) {
        this.forbidNoNameTouch()
        return
      }
      let id = e.currentTarget.dataset.id
      let data = this.data.data
      let subComment = data.subStoreComments
      subComment.forEach(e => {
        if (id == e.id) {
          e.hasLike = !e.hasLike
          if (e.hasLike) {
            e.likeCount++
          } else {
            e.likeCount--
          }
          return
        }
      })
      this.setData({
        data
      })
      wx.vibrateShort({
        type: 'medium',
      })
      this.triggerEvent('replyLikeBtnTapped', {
        id: e.currentTarget.dataset.id
      }) //triggerEvent广播数据 index为广播事件
    },

    commentBtnTapped(e) {
      if (this.data.realName == "" || this.data.realName == -1) {
        this.forbidNoNameTouch()
        return
      }
      let id = e.currentTarget.dataset.id
      this.triggerEvent('commentBtnTapped', {
        id
      }) //triggerEvent广播数据 index为广播事件
    }

  }
})