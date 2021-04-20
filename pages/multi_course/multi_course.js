// pages/multi_course/multi_course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    createRoomName:"",
    searchFocus:false,
    searchList:[
      {id:1,name:"素语核心团队",count:12,joinStatus:false},
      {id:2,name:"电子信息学生会",count:18,joinStatus:false},
      {id:3,name:"209周末干饭",count:18,joinStatus:false},
      {id:4,name:"青岛大学校学生会",count:18,joinStatus:false}
    ],
    myJoinLoadingList:[],
    myJoinList:[],
    myCreateList:[],
  },
  
  onChangeCreateRoomName(event) {
    this.setData({createRoomName:event.detail})
  },

  onTapJoinRoomBtn:function(e){    
    let tapId = e.currentTarget.dataset.id;
    let that = this;
    var myJoinList = this.data.myJoinList;
    // todo:向后台发送加入房间的请求
    // let room = searchList
    let searchList = this.data.searchList;
    searchList.forEach(function(e,index){
      if(e.id == tapId){
        myJoinList.push(e)
        
        searchList.splice(index, 1)
        // 然后把这个status改为true
        e.joinStatus = true
        searchList.splice(index,0,e)
        
        wx.showToast({
          icon:'none',
          title: '加入成功，等待审核',
          duration:1000,
        })
        return
      }
    })
    that.setData({
      myJoinList,
      searchList
    })
  },

  createRoom:function(){
    // sample
    let id = Math.ceil(Math.random()*1000); 
    if(this.data.createRoomName == ""){
      wx.showToast({
        icon:'error',
        title: '房间名不能为空',
      })
    }else{
      let room = {id:id,name:this.data.createRoomName,count:0,joinStatus:true}
      let myCreateList = this.data.myJoinList
      myCreateList.push(room)
      this.setData({myCreateList})
    }
  },
  onTapDismissBtn:function(e){
    let tapId = e.currentTarget.dataset.id;
    console.log(tapId)
    let that = this
    wx.showModal({
      title:"确认要解散吗？",
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let myCreateList = that.data.myCreateList;
          myCreateList.forEach(function(room,index){
            if(room.id == tapId){
              myCreateList.splice(index, 1)
              that.setData({myCreateList})
              wx.showToast({
                title: '解散成功',
                duration:1000,
              })
              return
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }}
      })   
  },
  onTapExitBtn:function(e){
    let tapId = e.currentTarget.dataset.id;
    console.log(tapId)
    let that = this
    wx.showModal({
      title:"确认要退出吗？",
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let myJoinList = that.data.myJoinList;
          myJoinList.forEach(function(room,index){
            if(room.id == tapId){
              myJoinList.splice(index, 1)
              that.setData({myJoinList})
              wx.showToast({
                title: '退出成功',
                duration:1000,
              })
              return
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }}
      })   
  },
  onSearchFocus:function(){ 
    this.setData({searchFocus:true})
  },
  onSearchFocusCancel:function(){
    this.setData({searchFocus:false})
  },

  onSearchCancel:function(){
    this.onSearchFocusCancel()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})