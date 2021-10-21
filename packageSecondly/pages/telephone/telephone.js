Page({
  data: {
    indexList: ["紧急", "心理咨询", "后勤"],
    scrollTop: 0,
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  
  onLoad() {
    wx.setNavigationBarTitle({
      title: '常用电话',
    })
  },

  // 打电话
  tel(e) {
    console.log(e.currentTarget.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  }
});