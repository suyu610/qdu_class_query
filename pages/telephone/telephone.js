Page({
  data: {
    indexList: ["报警", "常用", 3, 4, 5, 6, 7, 8, 9, 10],
    scrollTop: 0,
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '常用电话',
    })
  },

  // 打电话
  tel(e){
    console.log(e.currentTarget.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  }
});
