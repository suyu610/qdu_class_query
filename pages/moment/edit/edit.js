const app = getApp();
Page({
  data: {
    openid: undefined,
    adminOpenid: "orGq35MKlVtqoH7JdoGyTlIX-wnY", //管理员openid
    textareaTxt: undefined,
    article: undefined,
    files: [],
    adminInfo: {
      avatarUrl: "cloud://zhku-01.7a68-zhku-01-1258022644/home/logo1.jpg", //官方账号头像 
      nickName: "仲恺微校园" //官方账号名称
    },
    userInfo: undefined,
    selectTab:-1,
    selectPrivacyRole:-1,
    sendList: [{
      name: "默认",
      isSelect: true
    }, {
      name: "官方",
      isSelect: false
    }],
    privacyTabList:[{
      text:"公开",
      value:-1, 
    },{text:"匿名",value:0}],
    tabList: [{
      text: "选择标签",
      value: -1,      
    },
    {
      text: "教务资讯",
      value: 1,      
    },
    {
      text: "二手交易",
      value: 2,      
    },
    {
      text: "求助",
      value: 3,      
    },
    {
      text: "树洞",
      value: 4,      
    },
    {
      text: "学习指南",
      value: 5,      
    },
    {
      text: "生活指南",
      value: 6,      
    }
  ],
  },

  bindChangeUser(e) {
    console.log(e.currentTarget.dataset.index)
    var tab = this.data.sendList
    var that = this
    for (var i = 0; i < tab.length; i++) {
      tab[i].isSelect = false
    }
    tab[e.currentTarget.dataset.index].isSelect = true


    if (e.currentTarget.dataset.index === 1) {
      this.setData({
        userInfo: {
          avatarUrl: "cloud://zhku-01.7a68-zhku-01-1258022644/home/logo1.jpg",
          nickName: "仲恺微校园"
        }
      })
    }
    if (e.currentTarget.dataset.index === 0) {
      wx.getUserInfo({
        success(res) {
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
    this.setData({
      sendList: tab
    })
  },

  bindChangeListTab(e) {        
    this.setData({
      selectTab: e.detail
    })    
  },
  onShow() {
    // 查看是否授权
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                that.setData({
                  userInfo: res.userInfo
                }) 
              }
            })
          }
        }
      })
    }
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res.result.openid)
      if (res.result.openid === that.data.adminOpenid) {
        that.data.tabList.push({
          name: "通知公告",
          isSelect: false
        })
        that.setData({
          tabList: that.data.tabList
        })
      }
      that.setData({
        openid: res.result.openid
      })
    })
  },
  getInputGzh(e) {
    wx.showToast({
      title: '仅支持认证用户',
      icon: 'none'
    })
    var that = this
    if (e.detail.value.includes("https://mp.weixin.qq.com/s/")) {
      wx.showToast({
        title: '正在解析链接',
        icon: 'none'
      })
      wx.cloud.callFunction({
        name: 'wxparse',
        data: {
          url: e.detail.value
        }
      }).then(res => {
        if (res.result.data.code !== 0) {
          wx.showToast({
            title: '文章解析失败,请确认链接无误',
            icon: 'none'
          })
        }
        var title = res.result.data.data.msg_title
        var msg_cover = res.result.data.data.msg_cover
        that.setData({
          article: {
            title: title,
            url: e.detail.value,
            msg_cover: msg_cover
          }
        })
        console.log(res)
      })
    }
  },

  saveEditOrNot(e) {
    wx.switchTab({
      url: '../moment',
    })
    wx.showModal({
      title: '将此次编辑保留',
      content: '',
      cancelText: '不保留',
      confirmText: '保留',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  deleteImg(e) {
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

  getInputValue(e) {
    this.setData({
      textareaTxt: e.detail.value
    })
  },



  formSubmit: function(e) {
    var that = this
    var num = 0
    var tabList = that.data.tabList
    var tab = undefined
    var selectTab = this.data.selectTab ;
    
    if (selectTab === -1) {
      wx.showToast({
        title: '请选择一个标签',
        icon: 'none',
      })
      return
    }
    tab = this.data.tabList[selectTab].text;
    if (!this.data.userInfo) {
      wx.showToast({
        title: '未授权,2秒后跳转授权页面',
        icon: 'none',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../../mine/login/login',
        })
      }, 2000)
      return
    }
    if (!that.data.textareaTxt && that.data.files.length <= 0) {
      wx.showToast({
        title: '内容为空',
        icon: 'none',
      })
    } else {
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '正在提交数据',
      })
      var tempIds = [];
      const db = wx.cloud.database()
      if (that.data.files.length === 0) {
        console.log("没有发图");
        //内容安全检测
        wx.cloud.callFunction({
          name: 'msgCheck',
          //87014 违规 0成功
          data: {
            type: 'text',
            content: that.data.textareaTxt,
          },
        }).then(res => {
          console.log(that.data.textareaTxt)
          console.log(res)
          //检测到内容违规 标记
          if (res.result.errCode !== 0) {
            wx.showToast({
              title: '内容违规了，请不要发布敏感内容，互相理解。',
              icon: 'none',
              duration: 5000
            })
          } else {
            //继续
            db.collection('moment').add({
              data: {
                userInfo: this.data.userInfo,
                createTime: db.serverDate(),
                content: this.data.textareaTxt,
                time: new Date().getTime(),
                zans: [],
                images: [],
                comments: [],
                tab: tab,
                isTop: false,
                article: this.data.article,
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '提交成功',
                  icon: 'success'
                })
                wx.reLaunch({
                  url: '../moment',
                })
              }
            })
          }
        })
      }

      if (that.data.files.length > 0) {
        console.log("发了图片")
        var tempIds = [];
        for (var i = 0; i < that.data.files.length; i++) {
          const filePath = that.data.files[i]
          var rn = Math.floor(Math.random() * 10000 + 1) //随机数
          var name = Date.parse(new Date()) / 1000; //时间戳
          const cloudPath = 'moment/' + that.data.userInfo.nickName + "/" + rn + name + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: filePath,
            success: res => {
              console.log(res)
              tempIds.push(res.fileID)
              num = num + 1
              if (num === that.data.files.length) {
                console.log(that.data.textareaTxt)
                var con = that.data.textareaTxt
                if (!con) {
                  con = 123
                }

                // 图片内容安全检测
                wx.cloud.callFunction({
                  name: 'msgCheck',
                  //87014 违规 0成功
                  data: {
                    type: 'img',
                    content: con,
                  },
                });
                // 文字内容安全检测
                wx.cloud.callFunction({
                  name: 'msgCheck',
                  //87014 违规 0成功
                  data: {
                    type: 'text',
                    content: con,
                  },
                }).then(res => {
                  console.log(res.result)
                  //检测到内容违规 标记
                  if (res.result.errCode !== 0) {
                    wx.showToast({
                      title: '请不要发送敏感内容哦',
                      icon: 'none',
                      duration: 5000
                    })
                  } else {
                    console.log(tab)
                    db.collection('moment').add({
                      data: {
                        userInfo: this.data.userInfo,
                        content: this.data.textareaTxt,
                        createTime: db.serverDate(),
                        time: new Date().getTime(),
                        zans: [],
                        images: tempIds,
                        comments: [],
                        tab: tab,
                        isTop: false,
                        article: this.data.article,
                      },
                      success: res => {
                        wx.hideLoading()
                        wx.showToast({
                          title: '提交成功',
                          icon: 'success'
                        })
                        wx.reLaunch({
                          url: '../moment',
                        })
                      },
                    })
                  }
                })
              }
            },
          })
        }
      }
    }
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: 1,
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
            wx.cloud.callFunction({
              name: "msgCheck",
              data: {
                content: buffer.data,
                type:"img"
              }
            }).then(
              imgRes => {
                console.log(JSON.stringify(imgRes))
                wx.hideLoading()

              if(imgRes.result.errCode == '87014'){
                wx.showToast({
                  title:"图片含有违法违规内容",
                  icon:"none"
                })
                return
              }else{                
                that.setData({
                  files: that.data.files.concat(res.tempFilePaths)
                }); 
              }})
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
  }
})