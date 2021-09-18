let randomImgTimer;
const foodService = require('../../net/foodService.js')
const router = require('../../router/index.js');
const tool = require('../../utils/tool.js');
let app = getApp()
Page({
  data: {
    loaded:false,
    selectStartStatus:false,
    currentEatNameIndex:0,
    trueRandomStr:"什么",
    randomIndex:-1,
    selectFood:{},
    
    totalFoodArr:[],
    foodImageList:["mianbao","niunai","ningmengpian","miantiao","nainao","niupai","mogu","dangao"],
    foodImageIndex:0,
    eatNameList:["什么？","面包 ","蛋糕 ","荷包蛋 ","烧饼 ","饽饽 ","油条 ","馄饨 ","火腿 ","面条 ","小笼包 ","玉米粥 ","肉包 ","山东煎饼 ","饺子 ","煎蛋 ","烧卖 ","生煎 ","锅贴 ","包子 ","酸奶 ","苹果 ","梨 ","香蕉 ","皮蛋瘦肉粥 ","蛋挞 ","南瓜粥 ","煎饼 ","玉米糊 ","泡面 ","粥 ","馒头 ","燕麦片 ","水煮蛋 ","米粉 ","豆浆 ","牛奶 ","花卷 ","豆腐脑 ","煎饼果子 ","小米粥 ","黑米糕 ","鸡蛋饼 ","牛奶布丁 ","水果沙拉 ","鸡蛋羹 ","南瓜馅饼 ","鸡蛋灌饼 ","奶香小馒头 ","汉堡包 ","披萨 ","八宝粥 ","三明治 ","蛋包饭 ","豆沙红薯饼 ","驴肉火烧 ","粥 ","粢饭糕 ","蒸饺 ","白粥"],
    foodImages:["https://cdns.qdu.life/img/640.png","https://cdns.qdu.life/img/640.png"],
    showFilterPopup:false,
    sortOptions: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    sortValue:"a",
  },
  previewImage(e){
    let imageList = [] 
    this.data.selectFood.foodImageList.forEach(element => {
      imageList.push(element.imgUrl)
    }); 
    wx.previewImage({
      urls: imageList,
    })    
  },
  jump2Detail(e){
    router.push({ name: 'eatwhat_detail' })
  },
  onShowFilterPopup(){
    this.setData({showFilterPopup:true})
  },
  onCloseFilterPopup(){
    this.setData({showFilterPopup:false})
  },
  toggleCampus(){
    this.setData({isFushanCampus:!this.data.isFushanCampus})
  },
  // 加载字体
  loadFontFace() {
    wx.loadFontFace({
      family: '106',
      source: 'url("https://cdns.qdu.life/font/eatwhat@v2.ttf")',
      success: (res) => {
        console.log(res.status)
        this.setData({ loaded: true })
      },
      fail: function (res) {
        this.setData({ loaded: false })
      },
      complete: function (res) {

      }
    });
  },
  // 返回一个随机数
  
  // 点击开始按钮
  selectStart:function(){
    wx.vibrateShort()
    let that = this
    let currentEatNameIndex = this.data.currentEatNameIndex;
    if(!this.data.selectStartStatus){
      this.setData({selectStartStatus:true})
      let titleRandomArr = this.data.eatNameList
      randomImgTimer = setInterval(function(){ 
        let nextRandomIndex = Math.ceil(Math.random()*titleRandomArr.length);  
        while(nextRandomIndex == currentEatNameIndex){
          nextRandomIndex = Math.ceil(Math.random()*titleRandomArr.length);  
        }
        let foodImageIndex = nextRandomIndex % (that.data.foodImageList.length);
        that.setData({
          foodImageIndex,
          currentEatNameIndex:nextRandomIndex
        })
      }, 60);
    }else{
      this.stopSelect()
    }    
  },

  like_food:function(){

 
    


    if(app.globalData.selectFood.isLike == 1){      
      app.globalData.selectFood.isLike = 0
      app.globalData.selectFood.likeCount -= 1
    }else{
      wx.vibrateShort() //手机振动API
      this.animation = wx.createAnimation({
        duration: 300, // 动画持续时间，单位 ms
        timingFunction: 'linear', // 动画的效果
        delay: 10, // 动画延迟时间，单位 ms
        transformOrigin: '50% 50%' // 动画的中心点
      }) 
        setTimeout(function () {
          this.animation.scale(1.5).step();
          this.animation.scale(1.0).step();
          this.setData({
            animation: this.animation.export()
          });
        }.bind(this), 50);
        
      app.globalData.selectFood.isLike = 1;
      app.globalData.selectFood.likeCount += 1
    }

    foodService.toggleLike(app.globalData.selectFood.id)
    
    this.setData({selectFood:app.globalData.selectFood})
  },

  onShareAppMessage(option){
    console.log(option)
  },

  //  停止
  stopSelect:function(){
    // 来个随机
    let randomIndex = Math.ceil(Math.random()*this.data.totalFoodArr.length)-1;      
    app.globalData.selectFood = this.data.totalFoodArr[randomIndex]
    
    this.setData({selectStartStatus:false,randomIndex,selectFood:this.data.totalFoodArr[randomIndex]})    
    
    
    clearInterval(randomImgTimer)
  },

  handleGetFoodList:function(data){
    console.log(data)
    this.setData({totalFoodArr:data})    
  },
  onLoad: function (options) {
    this.loadFontFace()
    foodService.getWholeRandomFood(this.handleGetFoodList)
  },

})