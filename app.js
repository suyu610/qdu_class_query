//app.js
const storage = require('./utils/storage');

App({
  storage: storage,
  getOpenid: function() {  
    let that = this;  //获取openid不需要授权
    wx.cloud.callFunction({   
      name: 'getOpenid',   
      complete: res => {    
        // console.log('云函数获取到的openid: ', res.result)    
        var openid = res.result.openid;
        // 保存到全局
        this.globalData.openid = openid;        
      }
    });
  },
  onLaunch: function () {    
    // 判断是否第一次登陆
    let isFirst = wx.getStorageSync('first')
    console.log(isFirst)
    if(isFirst){
     wx.redirectTo({
        url: '/pages/splash/splash',
      });      
    } else {
      wx.redirectTo({
        url: '/pages/guide/guide',
      });
    }
    
    wx.cloud.init({   
      env: 'qdu-class-query-0gjy63ub39e21b96',   traceUser: true
    })

    //如果openid为空
    if(this.globalData.openid == "" ){
      // 应该持久化
      this.getOpenid();
    }    
  },

  onShow: function () {
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
    // 当前样式,注意这里配合腾讯地图，所以是从1开始
    currentTheme:1,
    currentCampus:0,
    openid:"",
    // 初始中心点
    longitude:120.423621,
    latitude:36.070106,    
    // 腾讯地图的key
    key:"5WCBZ-U7RLU-RFHVG-2N6Q7-76LT6-DZBJO",
    // list界面的id,如果为0，则显示默认值
    listBuildID: 0,
    tapBuildName:"",
    currentStatus:'',
    },
})