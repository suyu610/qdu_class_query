// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInsert:false,
    report_text:'',
    feedback:0,
    feedbackOption: [
      { text: '表扬', value: 0 },
      { text: '反馈bug', value: 1 },
      { text: '信息有误', value: 2 },
      { text: '功能建议', value: 3 },
      { text: '使用帮助', value: 4 },
    ],
    feedbackType:-1,
    feedbackTypeList:[
      { text: '类别', value: -1 },
      { text: '表扬', value: 0 },
      { text: '反馈bug', value: 1 },
      { text: '信息有误', value: 2 },
      { text: '功能建议', value: 3 },
      { text: '使用帮助', value: 4 },
    ],

    feedbackStatus:-1,
    feedbackStatusList:[
      { text: '所有状态', value: -1 },
      { text: '已采纳', value: 0 },
      { text: '可行性分析中', value: 1},

    ],
    feedbackSort:-1,
    feedbackSortList:[
      { text: '按时间排序', value: -1 },
      { text: '按点赞数', value: 0 },
    ],
    feedbackResult:{
      totalPages:2,
      feedback:[
        {content:"我觉得教室类型要加上考研教室，因为经常走错地方了...另外你们这个小程序很棒，大大的表扬",type:"bug反馈",nickname:"suyu.cool",goodjobCount:"12",posttime:"2021-4-4",status:"正在进行可行性分析"},
        {content:"我觉得教室类型",type:"表扬",nickname:"suyu.cool",goodjobCount:"12",posttime:"2021-4-4",status:"正在进行可行性分析"},  
        {content:"我觉得教室类型要加上考另外你们这个小程序很棒，大大的表扬",type:"bug反馈",nickname:"suyu.cool",goodjobCount:"12",posttime:"2021-4-4",status:"正在进行可行性分析"}
      ],
      totalfeedbacks:123
    },
    activeNames:[],
    files: [],

  },

  onTapSearchItem:function(event){
    this.setData({
      activeNames: event.detail,
    });
  },

  onInsertBtnClick:function(){
    this.setData({showInsert:true})
  },
  onCloseInsertPopup(){
    this.setData({showInsert:false})
  },

  changeText(e){
    console.log(e.detail)
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: 1,
      feedbackResult:[],
      success: (res) => {
        if (res.tempFiles[0] && res.tempFiles[0].size > 1024 * 1024) {
          wx.showToast({
            title: '图片不能大于1M',
            icon: 'none'
          })
          return;
        }
        console.log(JSON.stringify(res))
        //校验图片
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          success: buffer => {
            wx.showLoading({
              title: '正在识别...',
            })
            console.log(buffer.data)
            
            that.setData({
              files: that.data.files.concat(res.tempFilePaths)
            }); 
            wx.hideLoading()

          },
        })
      } 
    })
    console.log(that.data.files)
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  deleteImg(e){
    var that = this
    wx.vibrateShort({

    })
    wx.showModal({
      title: '确认删除',
      content: '',
      cancelText: '取消',
      confirmText: '确认',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var data = that.data.files
          data.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            files: data
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  copyQQqun(){
  wx.setClipboardData({
    data: "744080689",
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          wx.showToast({title: '复制成功'})}})}})},

})