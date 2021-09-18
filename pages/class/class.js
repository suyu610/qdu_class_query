// pages/class.js
let dateUtils = require('../../utils/date.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import {initNavigationColor,themeData} from '../../config/theme'
var roomCourseService = require('../../net/roomCourseService.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    themeData,
    parseData:[],
    tasklist:[],
    courseData:[],
    cname:"博远楼101",
    whichweek:"",
    loading:true,
    sequence : ["1",2,3,4,'T1',5,6,7,8,'T2',9,10,11]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    let that = this
    let whichweek = dateUtils.getSchoolWeek()
    this.setData({
      cname:options.cname,
      whichweek,
    })

    roomCourseService.getRoomCourseRequest(options.cname,whichweek,this.handleGetInfo);
    
  },
  handleGetInfoError:function(){
    Toast.fail('错误，请重试');
    setTimeout(function () {
      wx.navigateBack({
        delta: 0,
      })
     }, 1500) //延迟时间 这里是1秒       
  },
  handleGetInfo:function(res){
      this.setData({
        loading:false,
        parseData:this.parseCourseData(res)
      })
    
  },
  parseCourseData:function(origin){
    console.log(origin)
    let tasklist = [];
    // 把所有数据都拿出来
    // 解析详细课表
    for(let index=1;index<=7;index++){
      origin['detail'][index].forEach(function(e,indx){
        // 如果是未知，则要减去别人的值        
        if(e.courseName == "未知"){          
          if(e.seq.slice(0,2) =="11")
            tasklist.push({id:index,day:e.week-1,start:1,sections:2,course:e.courseName,type:-1})
          if(e.seq.slice(2,4) =="11")
            tasklist.push({id:index,day:e.week-1,start:3,sections:2,course:e.courseName,type:-1})
          if(e.seq.slice(5,7) =="11")
            tasklist.push({id:index,day:e.week-1,start:6,sections:2,course:e.courseName,type:-1})
          if(e.seq.slice(7,9) =="11")
            tasklist.push({id:index,day:e.week-1,start:8,sections:2,course:e.courseName,type:-1})
          if(e.seq.slice(10,12) =="11")
            tasklist.push({id:index,day:e.week-1,start:11,sections:2,course:e.courseName,type:-1})
          return
        }
        // TODO: 这里加个学生实名的判断
        if(true){
          let start = (e.seq+"").indexOf('1')+1
          let section = (e.seq+"").lastIndexOf('1')-(e.seq+"").indexOf('1')+1
          tasklist.push({id:index,day:e.week-1,start:start,sections:section,course:e.courseName})
        }
      })
    }

    // 然后把未知的弄进来
    // 两个两个的分把
        
     this.setData({
       tasklist
     })
      
  },

  parseCourseArr:function(arr){
    return 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container'),
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    initNavigationColor()
    this.setData({
      themeData:themeData
    })    
    wx.setNavigationBarTitle({
      title: '教室课表',
    })
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