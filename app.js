//app.js
const storage = require('./utils/storage');

App({
  storage: storage,
  getOpenid: function() {  
    let that = this;  //获取openid不需要授权
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        this.globalData.openid = res.result.openid;        
      }
    });
  },

  onShow: function () {
    wx.cloud.init({
      env: 'qdu-class-query-0gjy63ub39e21b96',   traceUser: true
    })
    this.getOpenid()
  },

  //获取配置，支持使用“.”
  //key为空，返回全部
  getConfig:function(key){
    let configs = wx.getStorageSync('configs')
    if(key){
      let keyArr = key.split('.')
      let result = ""
      if(configs.hasOwnProperty(keyArr[0])){
        result = configs[keyArr[0]]
      }
      if(keyArr.length == 1){
        return result
      }
      for(let i=1;i<keyArr.length;i++){
        if(result.hasOwnProperty(keyArr[i])){
          result = result[keyArr[i]]
        }else{
          return false
        }
      }
      return result
    }
    return configs
  },

  globalData: {
    rediretTo:"",
    debug:false,
    // 当前样式,注意这里配合腾讯地图，所以是从1开始
    currentTheme:1,
    currentCampus:1709,
    currentCourse:"",
    openid:"",
    token:"",
    userInfo:null,
    // 初始中心点
    // longitude:120.423621,
    // latitude:36.070106,    

    longitude:120.479515,
    latitude:36.115372,  
    // 腾讯地图的key
    key:"5WCBZ-U7RLU-RFHVG-2N6Q7-76LT6-DZBJO",
    // list界面的id,如果为0，则显示默认值
    listBuildID: 0,
    tapBuildName:"",
    currentStatus:'',
    // 由于tabbar不能传参，所以放在这
    // 这是给course.js用的
    onImportJwCourseOk:false,
    weather:{
      createtime:"",
      suggest:"今日降雨概率为0，但风很大",
      shorttext:"多云",
      rain:0,
      dayt:3,
      nightt:0,
      iconcode:408,
    },
    },
})