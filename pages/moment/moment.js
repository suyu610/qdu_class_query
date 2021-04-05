const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const tool = require('../../utils/tool.js')
import {initNavigationColor,themeData} from '../../config/theme'

const db = wx.cloud.database()
const _ = db.command
let delta_time = 100 * 3600000; 


Page({
  data: {
    showNoticePopup:true,
    showAddTag:false,
    // 骨架
    loading: true,
    cardCur: 0,
    userTag:['1','2','6'],
    TagList: [{
      id:'0',
      title: '奖学金',
      name: 'red',
      color: '#e54d42'
    },
    {
      id:'1',
      title: '比赛',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      id:'2',
      title: '四、六级',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      id:'3',
      title: '英语',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      id:'4',
      title: '普通话',
      name: 'green',
      color: '#39b54a'
    },
    {
      id:'5',
      title: '选课',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      id:'6',
      title: '违规',
      name: 'blue',
      color: '#0081ff'
    },
    {
      id:'7',
      title: '数学建模',
      name: 'purple',
      color: '#6739b6'
    },
    {
      id:'8',
      title: '机器人',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      id:'9',
      title: '火车票',
      name: 'pink',
      color: '#e03997'
    },
    {      
      id:'10',
      title: '学生证',
      name: 'brown',
      color: '#a5673f'
    },
    {
      id:'11',
      title: '期末考试',
      name: 'grey',
      color: '#8799a3'
    },
    {
      id:'12',
      title: '大创项目',
      name: 'gray',
      color: '#aaaaaa'
    },
  ],
  wikiList:{data:[
    {
      title:"宿舍床上用品尺寸",
      desc:"被子，被套等床上用品的尺寸",
      detail:
      `
      <table class="table">
      <thead colspan="4">
        <tr>
          <td rowspan="2" class="td">名称</td>
          <td colspan="2" class="td">规格</td>          
        </tr>
        <tr>
          <td class="td">长度(m)</td>
          <td class="td">宽度(m)</td>
        </tr>
      </thead>
        <tr class="tr">
          <td class="td">棉被</td>
          <td class="td">2.10</td> 
          <td class="td">1.48</td> 
        </tr>
        <tr class="tr">
          <td class="td">棉褥</td> 
          <td class="td">2.00</td> 
          <td class="td">0.90</td>  
        </tr>
        <tr class="tr">
          <td class="td">硬质棉床垫</td> 
          <td class="td">1.95</td> 
          <td class="td">0.90</td>  
        </tr>
        <tr class="tr">
          <td class="td">被套</td> 
          <td class="td">2.20</td> 
          <td class="td">1.55</td>  
        </tr>
        <tr class="tr">
          <td class="td">床单</td> 
          <td class="td">2.30</td> 
          <td class="td">1.20</td>   
        </tr>
        <tr class="tr">
          <td class="td">蚊帐</td> 
          <td class="td" colspan="2">2.00*0.90*1.70</td>  
        </tr>
        <tr class="tr">
          <td class="td">枕芯</td> 
          <td class="td">0.60</td> 
          <td class="td">0.38</td>  
        </tr>
        <tr class="tr">
          <td class="td">枕巾</td> 
          <td class="td">0.75</td> 
          <td class="td">0.46</td>  
        </tr>
        <tr class="tr">
          <td class="td">枕套</td> 
          <td class="td">0.65</td> 
          <td class="td">0.40</td>  
        </tr>
        <tr class="tr">
          <td class="td">夏凉被</td> 
          <td class="td">2.00</td> 
          <td class="td">1.42</td>  
        </tr>
    </table>
      `,
      url:"http://www.baidu.com"
    },
    {
      title:"中心校区常用电话",
      desc:"受技术限制这里只能展示，在查看详情中，可以直接拨打",
      detail:`
      <table class="table">
      <thead class="tr">
        <tr>
          <td class="td">部门</td>
          <td class="td">电话</td>
          <td class="td">备注</td>
        </tr>
      </thead>
    <tbody>
      <tr class="tr">
        <td class="td">保卫处“110"</td>
        <td class="td">85951110</td> 
        <td class="td">24小时</td>
      </tr>
      <tr class="tr">
        <td class="td">校医院</td> 
        <td class="td">85955120</td> 
        <td class="td">24小时</td>
      </tr>
      <tr class="tr">
        <td class="td">校总值班室</td> 
        <td class="td">85952502</td>
        <td class="td"></td>  
      </tr>
      <tr class="tr">
        <td class="td">心理咨询电话</td> 
        <td class="td">85953102</td>
        <td class="td"></td>  
      </tr>    
      <tr class="tr">
        <td class="td">后勤质检部（食品安全投诉）电话</td> 
        <td class="td">85986061</td>
        <td class="td"></td>  
      </tr>    
      
      <tr class="tr">
        <td class="td">校长公开电话</td> 
        <td class="td">85951111</td>
        <td class="td"></td>
      </tr>      
      <tr class="tr">
        <td class="td">网络中心</td> 
        <td class="td">85955990</td>
        <td class="td"></td>     

      </tr>
      <tr class="tr">
        <td class="td">图书馆咨询电话</td> 
        <td class="td">85954239</td>
        <td class="td"></td>     

      </tr>   
      <tr class="tr" ontap:>
        <td class="td" rowspan="2">学生处</td> 
        <td class="td">85953126</td>
        <td class="td">办公室</td>     

      </tr>
      <tr class="tr">
        <td class="td">85953265</td> 
        <td class="td">学生公寓管理中心</td>   

      </tr>
      <tr class="tr">
        <td class="td" rowspan="4">后勤处</td> 
        <td class="td">85952315</td>
        <td class="td">投诉建议</td>     

      </tr>
      <tr class="tr">
        <td class="td">85951498</td> 
        <td class="td">物业维修</td>   

      </tr>
      <tr class="tr">
        <td class="td">85951747</td> 
        <td class="td">水电维修</td>  

      </tr>
      <tr class="tr">
        <td class="td"><a href="tel:85951363">85951363</a></td> 
        <td class="td">暖气维修</td>  
      </tr>
    </tbody>
  </table>
      `,
      url:"http://www.baidu.com"
    },
    {
      title:"一些默认密码",
      desc:"邮箱、教务网、校园卡等等默认密码",
      detail:`<table class="table">
      <thead class="tr">
        <tr>
          <td class="td">名称</td>
          <td class="td">地址</td>
          <td class="td">账号</td>
          <td class="td">默认密码</td>          
          </tr>
          </thead>      
    <tbody>
      <tr class="tr">
        <td class="td">邮箱</td>
        <td class="td">mail.qdu.life</td> 
        <td class="td">学号@qdu.edu.cn</td> 
        <td class="td">身份证后10位</td>
      </tr>
      <tbody>
      </table>`,
      url:"http://www.baidu.com"
    },
    {
      title:"常用的时间节点",
      desc:"澡堂开关门的时间、图书馆开关门等等",
      detail:`
      <table class="table">
      <thead class="tr">
        <tr>
          <td class="td">建筑</td>
          <td class="td">开门</td>
          <td class="td">关门</td>          
        </thead>
      </tr>
    <tbody>
      <tr class="tr">
        <td class="td">中心校医院</td>
        <td class="td">正在查</td> 
        <td class="td">20:00</td>
      </tr>
      <tr class="tr">
        <td class="td">浮山公寓下面的医务室</td>
        <td class="td">正在查</td> 
        <td class="td">20:00</td>
      </tr>
      <tr class="tr">
        <td class="td">浴室</td>
        <td class="td">10:30</td> 
        <td class="td">21:30</td>
      </tr>
      <tr class="tr">
        <td class="td">图书馆自习</td> 
        <td class="td">正在查</td> 
        <td class="td">正在查</td>
      </tr>
      <tr class="tr">
        <td class="td">图书馆借书</td> 
        <td class="td">正在查</td> 
        <td class="td">正在查</td>
      </tr>
       <tr class="tr">
        <td class="td">快递大厅</td> 
        <td class="td">正在查</td> 
        <td class="td">正在查</td>
      </tr>
    </tbody>
  </table>`,
      url:"http://www.baidu.com"
    }
  ]},
    swiperList:
    [{
      id: 0,
      type: 'image',
      url: 'https://cdns.qdu.life/img/header_1@v4.jpg',
      navUrl:'https://www.baidu.com'
    }, {
      id: 1,
        type: 'image',
        url: 'https://cdns.qdu.life/img/header_2@v4.jpg',
        navUrl:'https://www.qq.com'
    }, {
      id: 2,
      type: 'image',
      url: 'https://cdns.qdu.life/img/header_1.jpeg',
      navUrl:'https://www.baidu.com'
    },],
    themeData,
    activeNames:['1'],
    //导航栏
    tabIndex: 0,
    tabList: [
      {
        name: "资讯",
        isSelect: false
      },
      {
        name: "青大百科",
        isSelect: true
      },
      {
        name: "青鸟说",
        isSelect: false
      }
    ],
    statusBarHeight: app.globalData.statusBarHeight,
    wallData: [],
    showZan: -1, //显示点赞按钮
    showPinLun: false,
    commentValue: '',
    placeholderPL: '评论',
    userInfo: undefined,
    batchTimes: undefined, //分页
    btoText: "正在加载...",
    nowCommentIndex:-1,
    adminOpenid: "orGq35M1vYYqy38PADVDbq-Q-isw",
    shareObg: {
      title: '青空',
      desc: '',
      path: '/pages/pyq/circle/index',
      imageUrl: "/image/pyq/pyq03.jpg",
    } //转发样式
  }, 
  onTapWikiItem(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  tapHeaderImage:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/webview/webview?url='+this.data.swiperList[index].navUrl,
    })
  },
  onTapDevBtn:function(){
    wx.showToast({
      icon:'none',
      title: '正在开发..马上就好',
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },

  onCloseTag(e){
    var userTag = this.data.userTag;
    for(var i = 0 ; i<userTag.length;i++){
      if(userTag[i] == e.currentTarget.id){
        userTag.splice(i,1);
        this.setData({userTag})
        return       
      }
    }
  },
  call:function(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: '17685837371',
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 初始化顶部轮播图
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },

  toggleTag:function(e){
    // 转成字符串
    let tagIndex = e.currentTarget.dataset.index + '';
    let userTag = this.data.userTag;
    var isExist = userTag.indexOf(tagIndex)
    if(isExist == -1){
      // 如果userTag中不存在则添加
      userTag.push(tagIndex);
      this.setData({userTag})
      return
    }else{      
      // 如果 userTag 中存在，则删除
      for (var i = 0; i < userTag.length; i++) {
        if (userTag[i] == tagIndex) {
          userTag.splice(i, 1);
          this.setData({userTag})
          return
        }
      }
    }

  },
  onTapAddTagBtn:function(e){
      this.setData({showAddTag:true})
  },

  onTapCloseTagBtn:function(e){
    this.setData({showAddTag:false})
  },
  getUserInfo: function(e) {
    this.setData({
      userInfo: e.detail.userInfo,
    })
  },

  lookDetail(e) {
    wx.navigateTo({
      url: './detail?id=' + e.currentTarget.dataset.index,
    })
  },

  getcomment(e) {
    this.setData({
      commentValue: e.detail.value
    })
  },

  bindComment(e) {
    this.setData({
      placeholderPL: "回复: " + e.currentTarget.dataset.name,
      showZan: e.currentTarget.dataset.index,
      showPinLun: true,
    })
  },

  lookArticle(e) {
    wx.navigateTo({
      url: '/pages/code/article/index?url=' + e.currentTarget.dataset.url,
    })
  },

  showPinLun(e) {        
    var main = this.data.wallData[e.target.dataset.indexn].userInfo.nickName
    let indexn = e.target.dataset.indexn
    this.setData({
      placeholderPL: "留言: " + main,
      showPinLun: !this.data.showPinLun,
      nowCommentIndex:indexn,
    })
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
    })
  },

  dianzan:    
    tool.throttle(function (e){
      if (!this.data.userInfo) {
        wx.pageScrollTo({
          scrollTop: 200,
        })
        wx.showToast({
          title: '需要授权才能点赞评论,见第一条墙消息.',
          icon: 'none'
        })
        return
      }
  
      let openid = getApp().globalData.openid
      var isZan = true;
      if(this.data.wallData[e.currentTarget.dataset.indexn].zans.length==0){
        isZan = false
      }else{
        this.data.wallData[e.currentTarget.dataset.indexn].zans.forEach(a => {
          if(a.openid == openid){
            isZan = true
            return
          }else{
          isZan =  false
          }
        })
      }      

      //未点赞
        if (!isZan) {
          var data = this.data.wallData
          data[e.currentTarget.dataset.indexn].zans.push({
            name: this.data.userInfo.nickName,
          })
          data[e.currentTarget.dataset.indexn].zanText = data[e.currentTarget.dataset.indexn].zans.map(a => {
            return a.name
          }).join(", ")
          this.setData({
            wallData: data
          })
          wx.cloud.callFunction({
            name: 'chat',
            data: {
              type: 'zan',
              collectionname: 'moment',
              data: {
                username: this.data.userInfo.nickName,
                _id: e.currentTarget.dataset._id,
              }
            }
          }).then(res => {
            // 刷新此项数据
            const db = wx.cloud.database()
            db.collection("moment").doc(e.currentTarget.dataset._id).get().then(
              res => {
                var data = this.data.wallData
                data[e.currentTarget.dataset.indexn] = res.data
                for (let i = 0; i < data.length; i++) {
                  data[i].time = this.parseTime(data[i].createTime.getTime())
                  data[i].zanText = data[i].zans.map(a => {
                    if(a.name == this.data.userInfo.nickName){
                      data[i].isMineLove = true
                    }
                    return a.name
                  }).join(", ")
                }
                this.setData({
                  wallData: data
                })
              }
            )
          })
        }else{
          //已点赞
          wx.cloud.callFunction({
            name: 'chat',
            data: {
              type: 'delete-zan',
              collectionname: 'moment',
              data: {              
                openid: e.currentTarget.dataset._openid,
                _id: e.currentTarget.dataset._id
              }
            }
          }).then(res => {
            // 刷新此项数据
            const db = wx.cloud.database()
            db.collection("moment").doc(e.currentTarget.dataset._id).get().then(
              res => {
                var data = this.data.wallData
                data[e.currentTarget.dataset.indexn] = res.data
                for (let i = 0; i < data.length; i++) {
                  data[i].time = this.parseTime(data[i].createTime.getTime())
                  data[i].isMineLove = false

                  data[i].zanText = data[i].zans.map(a => {
                    return a.name
                  }).join(", ")
                }
                this.setData({
                  wallData: data
                })
              }
            )
          })        
        }
        this.setData({
          showZan: -1,
          placeholderPL: "留言"
        })    
    }),

  submitComment(e) {
    if (!this.data.userInfo) {
      wx.pageScrollTo({
        scrollTop: 200,
      })
      wx.showToast({
        title: '需要授权才能点赞评论,见第一条墙消息.',
        icon: 'none',
        duration: 5000
      })
      return
    }
    if (this.data.commentValue.length <= 0) {
      wx.showToast({
        title: '内容为空',
        icon: 'none'
      })
      return
    }
    var _id = this.data.wallData[this.data.nowCommentIndex]._id
    var formId = e.detail.formId
    var toName = ""
    if (this.data.placeholderPL.includes("回复")) {
      toName = this.data.placeholderPL.replace("回复:", "")
    }
    wx.cloud.callFunction({
      name: 'chat',
      data: {
        type: 'comment',
        collectionname: 'moment',
        data: {
          username: this.data.userInfo.nickName,
          userInfo: this.data.userInfo,
          formId: formId,
          _id: _id,
          comment: this.data.commentValue,
          toName: toName
        }
      }
    }).then(res => {
      // 刷新此项数据
      let id = this.data.wallData[this.data.nowCommentIndex]._id
      const db = wx.cloud.database()
      db.collection("moment").doc(id).get().then(
        res => { 
          var data = this.data.wallData
          data[this.data.nowCommentIndex] = res.data       
          wx.showToast({
            title: '评论成功',
          }) 
          this.setData({
            wallData: data,
            // 隐藏评论框
            showPinLun:false,
            // 清空评论框
            commentValue:"",
          })
        }
      )
    },300)
  },

  copyText(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
    })
  },

  toEdit() {
    wx.navigateTo({
      url: 'edit/edit',
    })
  },


  getMyWallData() {
    wx.showNavigationBarLoading()
    wx.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      const db = wx.cloud.database()
      db.collection("moment").where({
        _openid: res.result.openid
      }).get().then(res => {
        var zanText
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].time = this.parseTime(res.data[i].createTime.getTime())
          res.data[i].zanText = res.data[i].zans.map(a => {
            return a.name
          }).join(", ")
        }
        var data = res.data.sort(function(a, b) {
          return b.createTime.getTime() - a.createTime.getTime()
        })
        this.setData({
          wallData: data
        })
        wx.hideNavigationBarLoading()

      })
    })
  },

  getWallData(skip = 0, limit = 30, concat = true, tab = undefined) {
    let that = this
    wx.showNavigationBarLoading()

    const db = wx.cloud.database()

    if (tab === "表白墙") {
      tab = "表白"
    }
    
    if (tab === "全部") {
      tab = undefined
    }

    let time = new Date().getTime() - delta_time;

    db.collection("moment").skip(skip).limit(limit).orderBy('time', 'desc').where({
      "time":_.gt(time),

      tab: tab,
      isTop: false
    }).get().then(res => {
      var zanText
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].time = this.parseTime(res.data[i].createTime.getTime())
        res.data[i].isMineLove = false
        res.data[i].zanText = res.data[i].zans.map(a => { 
          // 在这里添加一个是否为本人
          if(this.data.userInfo!=null && a.name == this.data.userInfo.nickName){
            res.data[i].isMineLove = true
          }                   
          return a.name
        }).join(", ")
        
        if (res.data[i].content != null && res.data[i].content.length > 100) {
          res.data[i].isOver = true
          res.data[i].content = res.data[i].content.slice(0, 96) + "..."
        }

        res.data[i].comments = res.data[i].comments.sort(function(a, b) {
          return a.createTime.getTime() - b.createTime.getTime()
        })
      } 

      var data = res.data.sort(function(a, b) {
        return b.createTime.getTime() - a.createTime.getTime()
      })
      if (concat) {
        data = this.data.wallData.concat(data)
      }
      if (data.length === 0) {
        this.setData({
          btoText: '暂无更多~'
        })
      }else{
        this.setData({
          btoText: '加载完毕~'
        })
      }

      that.setData({
        wallData:data,
        loading:false
      })

      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },

  cancleTop(e) {
    var that = this
    var item = e.currentTarget.dataset.item
    const db = wx.cloud.database()
    wx.showModal({
      title: '提示',
      content: '确定取消置顶吗',
      cancelText: '取消',
      confirmText: '确定取消',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'chat',
            data: {
              type: 'top',
              collectionname: 'moment',
              data: {
                _id: item._id,
                isTop: false
              }
            }
          }).then(res => {
            // 刷新此项
            wx.showToast({
              title: '成功',
            })
          })
        }
      }
    })
  },

  adminTopPyq(e) {
    var that = this
    var item = e.currentTarget.dataset.item
    const db = wx.cloud.database()
    wx.showModal({
      title: '提示',
      content: '确定置顶吗',
      cancelText: '取消',
      confirmText: '置顶',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'chat',
            data: {
              type: 'top',
              collectionname: 'moment',
              data: {
                _id: item._id,
                isTop: true 
              }
            }
          }).then(res => {
            wx.showToast({
              title: '成功',
            })
          })
        }
      }
    })
  },
  adminDeletePyq(e) {
    var that = this
    var item = e.currentTarget.dataset.item
    const db = wx.cloud.database()
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      cancelText: '取消',
      confirmText: '删除',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'chat',
            data: {
              type: 'delete',
              collectionname: 'moment',
              data: {
                fileIDs: item.images,
                _id: item._id
              }
            }
          }).then(res => {
            var data = that.data.wallData
            data.splice(e.currentTarget.dataset.index, 1)
            that.setData({
              wallData: data
            })

          })
        }
      }
    })

  },

  deletePyq(e) {
    var that = this
    var item = e.currentTarget.dataset.item
    const db = wx.cloud.database()
    wx.showModal({ 
      title: '提示',
      content: '确定删除吗',
      cancelText: '取消',
      confirmText: '删除',
      success(res) {
        if (res.confirm) {
          var data = that.data.wallData
          data.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            wallData: data
          })

          db.collection('moment').doc(item._id).remove()
            .then(console.log)
            .catch(console.error)

          db.collection('momentback').add({
            data: {
              userInfo: item.userInfo,
              createTime: item.createTime,
              content: item.content,
              zans: item.zans,
              images: item.images,
              comments: item.comments,
            },
          })
          // wx.cloud.deleteFile({
          //   fileList: ['a7xzcb']
          // }).then(res => {
          //   // handle success
          //   console.log(res.fileList)
          // }).catch(error => {
          //   // handle error
          // })
        } else if (res.cancel) {}
      }
    })
  },

  onLoad: function(options) {
    let that = this
    setTimeout(() => {
      that.setData({loading:false,btoText:'加载完成'})
    }, 1000);
    // this.towerSwiper('swiperList');
    // this.getWallData(0, 30, false)
    // this.getTopWallData()
  },

  hideNoticePopup:function(){
    this.setData({showNoticePopup:false})
  },


  toShowZan(e) {
    if (e.currentTarget.dataset.index === this.data.showZan) {
      this.setData({
        showZan: -1,
        placeholderPL: "留言"
      })
    } else {
      this.setData({
        showZan: e.currentTarget.dataset.index
      })
    }
  },

  onReachBottom: function() {
    this.setData({btoText:"到底了"})
  },

  bindShare(e) {
    var that = this
    var item = e.currentTarget.dataset.item
    var imageUrl = ""
    if (item.images.length > 0) {
      imageUrl = item.images[0]
    }
    var shareObg = {
      title: '仲恺校友圈',
      desc: item.content,
      path: '/pages/pyq/circle/index',
      imageUrl: imageUrl,
    } //转发
    this.setData({
      shareObg: shareObg
    })
  },

  onShow: function() {
    wx.setNavigationBarTitle({
      title: '信息流',
    })
    initNavigationColor()
    this.setData({
      themeData:themeData
    })

    // wx.cloud.callFunction({
    //   name: 'wxparse',
    //   data: {"url":"https://qdu.life"},      
    //   success:((res)=>{
    //     console.log(res)
    //   }),
    //   fail:((res)=>{
    //     console.log(res)
    //   })
    // })

    this.setData({showNoticePopup:true})

    // var that = this
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    // } else {
    //   // 查看是否授权
    //   wx.getSetting({
        
    //     success(res) {
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //         wx.getUserInfo({
    //           success(res) {     
    //             let userInfo = res.userInfo;
    //             that.setData({
    //               userInfo:res.userInfo,
    //             })
    //             app.globalData.userInfo = userInfo     
    //           }
            
    //         }) 
            
    //       }else{ 
    //         Toast({
    //           type:"fail",
    //           message:
    //           '未登录，将跳转至登陆页面',
    //           duration:1500,
    //           onClose: () => {
    //             // wx.navigateTo({
    //             //   url: '../mine/login/login',
    //             // })     
    //           },
    //         });                               
    //       }
    //     }
    //   })

      // wx.cloud.callFunction({
      //   name: 'getOpenid'
      // }).then(res => {
      //   app.globalData.openid = res.result.openid
      //   that.setData({
      //     openid: res.result.openid
      //   })        
      // })
    // }
    //只让查看最近10个小时的消息    
    // let time = new Date().getTime() - delta_time;
    //   db.collection('moment').where({      
    //   "time": _.gte(time)
    // }).count().then(res => {      
    //   const total = res.total
    //   // 计算需分几次取
    //   const batchTimes = Math.ceil(total / 10)
    //   this.setData({
    //     batchTimes: batchTimes - 1
    //   })
    // })
  },

  onShareAppMessage: function(e) {
    var that = this
    var item = e.target.dataset.item
    var desc = item.content.slice(0, 10)
    var imageUrl = "/image/pyq/2.jpg"
    if (item.content.length < 2 || !item.content) {
      desc = item.userInfo.nickName + "给你发来一条消息"
    }
    var shareObg = {
      desc: desc,
      path: '/pages/pyq/circle/detail?id=' + item._id,
      imageUrl: imageUrl,
    } //转发
    return shareObg
  },

  onPageScroll: function(e) {
    this.setData({
      showZan: -1,
      placeholderPL: "留言",
      showPinLun: false,
    })
  },
  // 预览doc
  downloadFile: function (e) {

    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '进度 0 %',
      selector: '#custom-selector',
    });

    var that = this;
    var filePath = e.currentTarget.dataset.url;//对应的网络路径，可以是内网的或者外网
    var fileType = e.currentTarget.dataset.type; 
    var downloadTask = wx.downloadFile({//下载对应文件
      url: filePath,
      success: function (res) {    
        var filePath = res.tempFilePath;//文件路径    
        wx.openDocument({
          filePath: filePath,   // 装载对应文件的路径
          fileType: fileType,   // 指定打开的文件类型
          showMenu: true,       // 右上角的菜单转发分享操作
          success: function (res) {
            console.log("打开成功");
            Toast.clear();
          },
          fail: function (res) {
            console.log(res);
            Toast.fail("打开失败");

          }
        })   
      },
      fail: function (res) {
        console.log(res);
      }
    })
    downloadTask.onProgressUpdate((e)=>{
      console.log(e.progress)
      toast.setData({
        message: `进度 ${e.progress} %`,
      });
    })
  },
  parseTime(dateTimeStamp) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime(); //获取当前时间毫秒
    var diffValue = now - dateTimeStamp; //时间差

    if (diffValue < 0) {
      return;
    }
    var minC = diffValue / minute; //计算时间差的分，时，天，周，月
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    var result = "23分钟前"
    if (monthC >= 1 && monthC <= 3) {
      result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
      result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
      result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
      result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
      result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = "刚刚"
    } else {
      var datetime = new Date();
      datetime.setTime(dateTimeStamp);
      var Nyear = datetime.getFullYear();
      var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
  },

  getTopWallData() {
    const db = wx.cloud.database()
    db.collection("moment").orderBy('time', 'desc').where({
      isTop: true
    }).get().then(res => {
      var zanText
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].time = this.parseTime(res.data[i].createTime.getTime())
        res.data[i].zanText = res.data[i].zans.map(a => {
          return a.name
        }).join(", ")
        
        if (res.data[i].content != null && res.data[i].content.length > 100) {
          res.data[i].isOver = true
          res.data[i].content = res.data[i].content.slice(0, 96) + "..."
        }

        res.data[i].comments = res.data[i].comments.sort(function(a, b) {
          return a.createTime.getTime() - b.createTime.getTime()
        })
      }

      var data = res.data.sort(function(a, b) {
        return b.createTime.getTime() - a.createTime.getTime()
      })
      this.setData({
        topData: data
      })
      
    })
  },

})