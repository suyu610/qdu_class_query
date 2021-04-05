//index.js
const app = getApp()
var qqmapsdk = "";
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var buildUtil = require('../../utils/building.js')
var locationUtil = require('../../utils/location.js')

var courseSeq = require('../../utils/course-time.js')
var dialogService = require('../../net/dialogService.js')
var roomService = require('../../net/roomService.js')

import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {initNavigationColor,themeData} from '../../config/theme'


Page({
  noop(){
  },
  
  data: {
    columns:["全部教学楼","博远楼","博学楼","静思楼","博雅楼","博文楼","东12教","慎思楼","慎行楼","行思楼","学思楼"],
    buildingListPopup:false,
    searchBuildingName:"全部教学楼",
    themeData: "",
    dialog:{
      title:"2020/12/25公告",
      content:"1.吧啦吧啦吧啦吧啦吧啦\n1.吧啦吧啦吧啦吧啦吧啦\n1.吧啦吧啦吧啦吧啦吧啦\n1.吧啦吧啦吧啦吧啦吧啦\n1.吧啦吧啦吧啦吧啦吧啦\n2.无吧啦吧啦吧啦\n3.无吧啦吧啦吧啦\n2.无\n2.无\n2.无",
      isShow:true,
      id:20201225
    },
    weather:{
      createtime:"",
      suggest:"今日降雨概率为0，但风很大",
      shorttext:"多云",
      rain:0,
      dayt:3,
      nightt:0,
      iconcode:408,
    },
    
    markers:[
      {
        latitude: app.globalData.latitude, 
        longitude: app.globalData.longitude,
        id:0,
        height:0,
        width:0
      }
    ],
    modalSearchShow:false,  //是否隐藏搜索对话框
    modalSeqShow:false,     //是否隐藏课序选择对话框
    modalWeatherShow:false, //是否隐藏天气详情
    showDetail:false,
    animationFadeOut: '',
    animationFadeIn:'',
    distance: "无限",
    theme:1,
    scale:8,    
    longitude:app.globalData.longitude,
    latitude:app.globalData.latitude,
    key: app.globalData.key,
    address: '',
    city: '',
    date:'今天',
    show: false,
    seqResult: [],
    timeResult:[],
    customCalloutMarkerIds: [2503, 2260, 1847, 1783, 2237, 2204, 1954, 1904, 1756, 2050, 2349, 2419, 2278, 5893, 6182, 2139, 2099, 2186, 1769, 1748, 2308, 2036, 4842, 2306, 1738, 2310, 1710],
    activeIcon:"images/icon/flag_1.png",    
    buildListJson:[],
    seqContent:"未选择课次",
    minDate: new Date().getTime(),
    maxDate: new Date().getTime()+1000 * 60 * 60 * 24 * 7,
    classSeq:['第1 2','第3 4','第5 6','第7 8','第9 10'],
    floorOption: [
      { text: '楼层', value: -1 },
      { text: '1楼', value: 1 },
      { text: '2楼', value: 2 },
      { text: '3楼', value: 3 },
      { text: '4楼', value: 4 },
      { text: '5楼', value: 5 },
      { text: '6楼', value: 6 },
    ],
    durationOption: [
      { text: '无课时长', value: '0' },
      { text: '1节', value: '1' },
      { text: '2节', value: '2' },
      { text: '3节', value: '3' },
      { text: '4节', value: '4' },
      { text: '5节', value: '5' },
      { text: '6节', value: '6' },
      { text: '7节', value: '7' },
      { text: '8节', value: '8' },
      { text: '9节', value: '9' },
      { text: '10节', value: '10' },
    ],
    floorValue: -1,
    durationValue: '0',
  },
  floorValueChange({detail}){
    this.setData({
      floorValue:detail
    })
  },
  durationValueChange({detail}){
    this.setData({
      durationValue:detail
    })
  },

  regionchange(e) {
    // 将搜索框隐藏
    // e.type = begin/end
    if(e.type == 'begin'){}
    if(this.data.showDetail){
      this.hideDetailSearch();
    }
  },

  changeDate() {
    if(this.data.date == "今天"){
      this.setData({date:"明天"})
    }else{
      this.setData({date:"今天"})
    }
  },
 
  formatDate(date) {
    date = new Date(date);
    let todayDate = new Date();
    console.log(todayDate.getDate())
    if(date.getMonth() == todayDate.getMonth() && date.getDay() == todayDate.getDay()){
      return `今天`;
    }
    if(date.getMonth() == todayDate.getMonth() && date.getDay() == todayDate.getDay()+1){
      return `明天`;
    }
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

  // 距离选择
  onDrag(event) {
    if(event.detail.value>=2000){
      this.setData({
        distance: "无限" ,
      });
    }else{
      this.setData({
        distance: event.detail.value + "m",
      });
    }
  },
  onDragEnd(event){
  },
  // 弹窗
  onDialogConfirm:function(e){
    // console.log("好")
  },

  // 复制群号
  onDialogClose:function(){    
    wx.setClipboardData({
      data: "744080689",
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({title: '复制成功'})}})}})      
  },

  // 课程选择
  seqChange:function(e){    
    this.setData({
      seqResult: e.detail,
    });
  },

  searchByDetail:function(e){
    // console.log(e)
    var _this = this;
    this.modalSearchClose();
    wx.showLoading({
      title: '拼命搜索中..',
    });
    
    // 发送的是所有教学楼的id
    let url = 'https://room.qdu.life/api/class/today/1710-1738-1748-1756-1769-1783-1847-1904-1954-2036-2050-2099-2139-2186-2204-2237-2260-2278-2306-2308-2310-2349-2419-2503-4842-5893-6182/'+ _this.data.floorValue+'/'+_this.data.durationValue

    wx.request({
      url: url,
      method:'POST',
      success (res) {        
        console.log(res)
        app.globalData.currentStatus = res.data.data;
        _this.handleResSuccess(res);
        wx.hideLoading();
      }    
    })
  },
  // 搜索教学楼
  showBuildingList:function(){
    this.setData({
      buildingListPopup:true
    })
  },
  onBuildingListChange:function(e){
    console.log(e)
    let searchBuildingName = e.detail.value;
    this.setData({searchBuildingName})
    
  },
  onBuildingListPopupClose:function(){
    this.setData({
      buildingListPopup:false
    })
  },
  // 按课次搜索
  searchBySeq:function(e){   
    var _this = this;
    let seq;
    if(this.data.seqResult.length == 0){    
       seq="_____________"      
       this.setData({
        seqContent:"未选择课次",
      });
    }else{
      //将["2", "1", "4"]转化为int值
      let temp = [];
      this.data.seqResult.forEach(element => {      
        temp.push(Number(element)*2+1)
        temp.push(Number(element)*2+2)
      });
 
      // 改进sort,让10排在9后面
      temp = temp.sort(function (a,b) {
        if (a < b ) {
            return -1;
        }
        if (a > b ) {
            return 1;
        }
        // a must be equal to b
        return 0;
      });
      // 将______转为___00__
      seq = ['_','_','_','_','_', '_','_','_','_','_',  '_','_','_',];
      // 因为没有t1,t2，所以要进行下面的变换
      temp.forEach(element =>{
        if(element<5){
          element -=1
        }
        // 1234 可以直接替换
        if(element>=5 && element<=8){
        }
        if(element >=9){
          element +=1
        }
        seq[element] = '0';                  
      });

      seq = seq.join("");
      temp = temp.join(" ");
      this.setData({
        seqContent:temp,
      });
      console.log(seq)
      // 发送请求
    }

    this.modalSeqClose();
    wx.showLoading({
      title: '拼命搜索中..',
    });

    roomService.getTodayFreeRoom(seq,this.handleResSuccess);    





  },

  handleResSuccess(res){
    wx.hideToast({
      success: (res) => {},
    })

    let markers=[];
    var tempData;
    if(res.data == null){
      tempData = res
      app.globalData.currentStatus = res
    }
    else{
      tempData =  res.data.data
      app.globalData.currentStatus = res.data.data
    }
    
    setTimeout(() => {wx.hideLoading();  }, 800);       
    tempData.forEach(element => {
      let marker = buildUtil.getMarkersByBuildId(element["bname"],element["matchedCount"]);
      markers.push(marker)
    });        
    //取第一个和最后一个
    this.setData({
      markers
    })
  },

  //清空选择
  clearSeqResult:function(e){
    this.setData({
      seqResult:[],timeResult:[],
    })
  },

  // 时间选择
  timeChange:function(e){
    // 当选择'当前'，则，课程全选中
    let seqResult = [];

    // 如果选中上午
    if(e.detail.indexOf("0") != -1){
      seqResult = seqResult.concat(["0","1"]);
    }
    // 如果选中下午
    if(e.detail.indexOf("1") != -1){
      seqResult = seqResult.concat(["2","3"]);
    }
    // 如果选中晚上
    if(e.detail.indexOf("2") != -1){
      seqResult = seqResult.concat(["4"]);
    }
    this.setData({
      seqResult,
      timeResult: e.detail,
    });
  },
  // 课次多选框
  toggle(event){
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  // 点击建筑物时
  bindmarkertap:function(e){    
    let markerId = e.markerId;
    console.log(e)
    // for (let item of markers){
    //   if (item.id === markerId) {
    //     lat = item.latitude;
    //     lon = item.longitude;
    //     name = item.callout.content;
    //     console.log(name)
    //   }
    // }
    app.globalData.tapBuildName =  buildUtil.getNameById(e.detail.markerId) ;
    // 带着id跳转到列表页
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },

  showSeq:function(){  
    this.setData({ modalSeqShow: true });
  },
  
  modalSeqClose() {
    this.setData({ modalSeqShow: false});
  },

  showWeather(){
    this.setData({ modalWeatherShow: true});
  },

  modalWeatherClose(){
    this.setData({ modalWeatherShow: false});

  },
 
  showDetailSearch:function(){    
    this.animationFadeOut.width("0vw").right("-40vw").step()
    this.animationFadeIn.width("90vw").left("5vw").step()
    this.setData({
      //输出动画  
      animationFadeOut: this.animationFadeOut.export(),
      animationFadeIn: this.animationFadeIn.export()
    })
    this.setData({
      showDetail:true
    })    
  },
 
  hideDetailSearch:function(){
    this.animationFadeOut.width("150rpx").right("10rpx").step()
    this.animationFadeIn.width("0vw").left("100vw").step()
    this.setData({
      //输出动画  
      animationFadeOut: this.animationFadeOut.export(),
      animationFadeIn: this.animationFadeIn.export()
    })
    this.setData({
      showDetail:true
    }) 
  },

  

  showSearch:function(){
    this.setData({ modalSearchShow: true });
  },
  
  modalSearchClose() {
    this.setData({ modalSearchShow: false});
  },
  
  getWeather:function(){
    weatherService.getWeatherRequest();    
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '青大空教室',
    })
    let that=this; 
    this.mapCtx = wx.createMapContext('map')

    wx.getStorage({
      key: 'autoSearch',
      success (res) {
        console.log(res.data)
        //  如果存在，又为True，就自动搜索当前的教室
        if(res.data){
          wx.showLoading({
            title: '搜索当前空教室',
          })
          let seq = courseSeq.getNowCourseSeq();
          let seqs = "_____________"
          let request_seq = that.changeStr(seqs,seq);
          
          roomService.getTodayFreeRoom(request_seq,that.handleResSuccess);    
        }        
      }      
    })
    
    qqmapsdk = new QQMapWX({
      key: app.globalData.key 
    });
    // this.getUserLocation()
    this.setData({
      weather:app.globalData.weather      
    })
    wx.setNavigationBarTitle({
      title: '青大空教室',
    })
    dialogService.getDialog(this.handleDialogSuccess)
    this.setData({theme:app.globalData.currentTheme})
  },



  // 先比较本地存储的id和dialogId
  handleDialogSuccess(data){
    let localDialogId = wx.getStorageSync('dialogId')    
    // 这样就不显示
    if(localDialogId != "" && localDialogId >= data.dialogId){
      return;
    }else{
      this.setData({
        dialog:data
      })
      Dialog.confirm({
        title:this.data.dialog.title,
        message: this.data.dialog.content.replace(/\\n/g, "\n"),      
        customStyle:"white-space:pre-wrap",
        messageAlign:'left',
        confirmButtonText:'不再提示',
        cancelButtonText:'复制群号',
        closeOnClickOverlay:false,
        transition:'fade',
      }).then(() => {
        // on confirm
        wx.setStorageSync('dialogId', data.dialogId)
        // console.log("存储")
      }).catch(()=>{
        // console.log("取消")
        wx.setStorageSync('dialogId', data.dialogId)
        this.onDialogClose()
      });
    }    
  },

  ondialogTap(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  // 获得坐标
 getUserLocation() {
    let _this = this;
    wx.getSetting({
      success: (res) => {              
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '需要使用你的位置',
            content: '可以不授权，仅影响距离筛选功能',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {          
          //调用wx.getLocation的API
          _this.getLocation();
        } else {
          //调用wx.getLocation的API
          _this.getLocation();
        }
      }
    })
  },

  // 微信获得经纬度
  getLocation() {
    let _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
      },
      fail: function(res) {
        wx.hideLoading();
      }
    })
  },
  
  onReady:function(){     
    this.animationFadeIn = wx.createAnimation({
      duration: 300,  
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'center center 0',
      success: function (res) {
        console.log(res)
      }
    }) 
    this.animationFadeOut = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'center center 0',
      success: function (res) {
        console.log(res)
      }
    }) 
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  
  changeTheme:function(){
    wx.navigateTo({
      url: '../webview/webview?url=https://www.qdu.life/eat',
    })
    // let tmp = this.data.theme;
    // if(tmp < 3){
    //   tmp += 1;
    // }else{
    //   tmp = 1;
    // }
    // this.setData({
    //   theme:tmp
    // })
    // app.globalData.currentTheme = tmp;
  },

  showHomePage:function(){
    wx.navigateTo({
      url: '../webview/webview?url=https://www.qdu.life',
    })
  },
  
  changeStr(str,index){
    let _index = parseInt(index);
    return str.slice(0,_index-1)+"0"+str.slice(_index);        
  },
 
  handleMoveToBtn:function(){
    this.getUserLocation()
    this.mapCtx.moveToLocation({
      longitude:app.globalData.longitude,
      latitude:app.globalData.latitude,
    })
  },

  onShow:function(){
    // 在这个地方设置导航颜色
    initNavigationColor()
    this.setData({
      themeData:themeData
    })
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    return {
      title: '青大空教室',
      path: 'pages/empty/empty?url=index&age=18',  // 路径，传递参数到指定页面。
      imageUrl:'../../images/share.png', // 分享的封面图
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 分享朋友圈
  onShareTimeline: function () {
		return {
	      title: '青大空教室',
	      query: {
	        key: value
	      },
	      imageUrl: ''
	    }
	},
})
