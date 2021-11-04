// component/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function (e) {
      let index = e.target.dataset.index;
      wx.previewImage({
        current: this.data.data.pics[index], // 当前显示图片的http链接
        urls: this.data.data.pics // 需要预览的图片http链接列表
      })
    },
    previewAddImage: function (e) {
      let index = e.target.dataset.index;
      wx.previewImage({
        current: this.data.data.addComment.pics[index], // 当前显示图片的http链接
        urls: this.data.data.addComment.pics // 需要预览的图片http链接列表
      })
    },
    likeBtnTapped(e) {
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
      this.triggerEvent('likeBtnTapped', {
        id: e.currentTarget.dataset.id
      }) //triggerEvent广播数据 index为广播事件
    },

    replyLikeBtnTapped(e) {
      let id = e.currentTarget.dataset.id
      let data = this.data.data
      let subComment = data.subComment
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
      this.triggerEvent('replyLikeBtnTapped', {
        id: e.currentTarget.dataset.id
      }) //triggerEvent广播数据 index为广播事件
    },
    commentBtnTapped(e) {
      this.triggerEvent('commentBtnTapped', {
        id: e.currentTarget.dataset.id
      }) //triggerEvent广播数据 index为广播事件
    }

  }
})