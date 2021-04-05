// pages/flag/flag.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
var timeUtils = require('../../utils/util.js');

const flagService = require('../../net/flagService.js')
var that = undefined;
var doommList = [];
var i = 0;
var ids=0;
var cycle=null  //计时器

// 弹幕参数
class Doomm {
  constructor(text, top, time, color) {  //内容，顶部距离，运行时间，颜色（参数可自定义增加）
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    this.id = i++;
  }
}
// 弹幕字体颜色
function getRandomColor() {
  // let rgb = []
  // for (let i = 0; i < 3; ++i) {
  //   let color = Math.floor(Math.random() * 256).toString(16)
  //   color = color.length == 1 ? '0' + color : color
  //   rgb.push(color)
  // }
  // return '#' + rgb.join('')
  return '#000'
}

var app = getApp();
Page({
  data:{
    getFlagListLoading:true,
    showDM:false,
    doommData: [],
    dmArr: ["滚动小目标功能还在开发中", "皇甫素素真好看", "黄鹏宇真厉害", "青大真不错", "六级报名也太简单了吧", "测试测试测试测试测试测试测试测试测试测试~~", "测试一个超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级超级长的弹幕", "接下来测试一个空弹幕", "", 9, 10],
    slideButtons: [
      {
        type: 'warn',
        text: '警示',
        extClass: 'test',
        src: 'https://cdns.qdu.life/icons/icon_delete.png', // icon的路径
      }],
    currentFlagId:"",
    currentFlagMessge:"",
    insertFlagMessge:"",
    autosize:{minHeight: 100},
    writeDialogShow:false,
    insertNewDialogShow:false,
    flagList:[],
    checked:true
  },

  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    });
  },
  
  handleDeleteFlagSuccess:function(id){
    // 从服务端删除
    console.log(id)
    // 然后刷新列表
    let tempflagList = this.data.flagList;
    this.data.flagList.forEach((item, i)=>{
        if (item['flag_id'] == id) {
          tempflagList.splice(i, 1); // 从下标 i 开始, 删除 1 个元素
        }
    })
    this.setData({flagList:tempflagList})
    Notify({ message: '删除成功',color: '#fff',background: '#000',  duration: 700,});
  },

  deleteFlag:function(id){
    flagService.deletePrivateFlag(id,this.handleDeleteFlagSuccess)
  },
  slideButtonTap:function(e){
    console.log(e.currentTarget.id)
    console.log(e.detail.index)
    switch(e.detail.index){
      // 第一个为删除
      case 0:
        this.deleteFlag(e.currentTarget.id)
        break;
      default:
    }
  },
  showHelp(){
    Notify({ message: '向右滑修改目标状态',color: '#fff',background: '#f00',  duration: 700,});
  },

  // 改变公开性
  togglePrivate(event){
    // 确认框
    var id = event.currentTarget.id;    
    flagService.togglePrivate(id,this.handleTogglePrivate);
  },

  // 改变公开性
  handleTogglePrivate:function(e){
    var id = e;
    console.log(id)
    if(id){
      // 有值
   // 先得到当前的值
   var is_public;
   var index;
   this.data.flagList.forEach((item, i) => {
     if (item['flag_id'] == id) {
    is_public = !item.is_public;
       index = i;
     }
   })
   var str_title = "flagList[" + index + "].is_public";
   console.log(is_public)
   this.setData({
     [str_title]:is_public,     
   })
   Notify({ message: '修改成功',color: '#fff',background: '#000',  duration: 700,});}
  },

  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'outsite':
        instance.close();
        break;
      case 'left':
        // 设置公开与否
        this.reversePrivate(event)
        instance.close();

        break;
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          this.deleteItem(event)
          instance.close();
        }).catch(() => {
          instance.close();
        });
        break;
    }
  },

  privateSwitch({ detail }){
    console.log(detail)
    this.setData({ checked: detail });
  },
  // 插入
  handleInsertSuccess:function(e){
    console.log(e)
    var obj = this.data.flagList;
    var tmpFlag = {
      id:e.data,
      content:this.data.insertFlagMessge,
      like_count:0,
      show_count:0,
      is_verify:0,
      is_public:this.data.checked,
    }
    obj.push(tmpFlag);
    this.setData({
      flagList:obj
    })

    wx.showToast({
      title: e.status['msg']
    })
    
  },
  
  insertItem(e){
    //如果为空
    if(this.data.insertFlagMessge == "") {
      Notify({ message: '内容不能为空',color: '#fff',background: '#f00',  duration: 700,});
      setTimeout(() => {
        this.setData({
          insertNewDialogShow:true
        })
      }, 900);
      return;
    }

    console.log(this.data.checked)
    var params = {"is_public":this.data.checked?"1":"0","is_verify":0,"content":this.data.insertFlagMessge};
    
    // 2. 向后端发送新增消息请求
    flagService.insertPrivateFlag(params,this.handleInsertSuccess)
      
  },


  // todo
  // 发送订阅消息
  authToReceiveMsg(e){
    wx.requestSubscribeMessage({
      tmplIds: ['xJrgdFZ_yDr6YPQVd1FidqOQCaiAWa4GqEYdQVBgEno'],       
      success () {        
        wx.showToast({
          title: '添加成功',
        })
      },
    })    
  },

  onTapInsertItemBtn(){
    this.setData({
      currentFlagMessge:"",
      insertNewDialogShow:true
    })

  },

  // cellOpen
  onCellOpen(event) {
    const { position, name } = event.detail;
    switch (position) {
      case 'left':
        break;
      case 'right':
        break;
    }
  },
  
  // 获取所有你的小目标
  handleGetAllFlagSuccess:function(data){
    console.log(data)
    // 这里要将时间戳转成时间格式
    let flagList = data;
    flagList.forEach(function(item, index){
        item.create_date = timeUtils.formatTime(item.create_date,"M/D h:m");         
    })
    this.setData({flagList,getFlagListLoading:false})    
  },
  onLoad:function(option){
    let that = this
    wx.getStorage({
      key: 'showDM',
      success (res) {
        // 如果为true，则打开弹幕
        if(res.data){
          that.initDM();
          that.setData({showDM:res.data})
        }        
      },
    })    
  },
  onShow:function(){
    wx.setNavigationBarTitle({
      title: '小目标',
    })
    flagService.getAllPrivateFlag(this.handleGetAllFlagSuccess,this.handleErrorGetFlagSuccess)
  },
  
  initDM:function(){
    let that = this;
    cycle= setInterval(function () {
       let arr=that.data.dmArr
        if(arr[ids]==undefined){
          ids = 0
          // 1.循环一次，清除计时器
          // doommList = []
          // clearInterval(cycle)

          // 2.无限循环弹幕
          doommList.push(new Doomm(arr[ids], Math.ceil(Math.random() * 80), 5, getRandomColor()));
          if(doommList.length>5){   //删除运行过后的dom
              doommList.splice(0, 1)
          }
          that.setData({
            doommData: doommList
          })
          ids++
        }else{
          doommList.push(new Doomm(arr[ids], Math.ceil(Math.random() * 80), 5, getRandomColor()));
          if(doommList.length>5){  
              doommList.splice(0, 1)
          }
          that.setData({
            doommData: doommList
          })     
          ids++
        }
    }, 1000)
  },

  // 测试：插入一条弹幕
  bindbt:function(){
    doommList.push(new Doomm("这是我的弹幕",Math.ceil(Math.random()*80),Math.ceil(Math.random()*10),getRandomColor()));
    this.setData({
      doommData : doommList
    })
  },

  // 开关弹幕
  toggleDM:function(){
    let that = this
    let showDM = !this.data.showDM
    Notify({ message: showDM?'已打开目标墙':'已关闭目标墙',color: '#fff',background: '#000',  duration: 700,});
    showDM ?  this.initDM():this.onHideDM() 
    wx.setStorage({
      key:"showDM",
      data:showDM
    })
    
 
    this.setData({showDM:showDM})
  },
  onHideDM(){    
    clearInterval(cycle)
    ids=0;
    doommList=[]
  },
  onUnload(){
    clearInterval(cycle)
    ids = 0;
    doommList = []
  },
});


