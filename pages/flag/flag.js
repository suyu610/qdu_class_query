// pages/flag/flag.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
var app = getApp();
Page({
  data:{
    openid:"",
    currentFlagId:"",
    currentFlagMessge:"",
    insertFlagMessge:"",
    autosize:{minHeight: 100},
    writeDialogShow:false,
    insertNewDialogShow:false,
    flagList:[
      {
      id:"a",
      title:"六级一定要超过100分",
      likeCount:14,
      showCount:4,
      isPrivate:false,
    },
    {
      id:"b",
      title:"八级一定要超过20分",
      likeCount:514,
      showCount:70,
      isPrivate:false,
    },
    {
      id:"c",
      title:"吧啦吧啦吧啦",
      likeCount:14,
      showCount:70,
      isPrivate:true,
    },
    ]
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
  showHelp(){
    Notify({ message: '向右滑修改目标状态',color: '#fff',background: '#f00',  duration: 700,});
  },
  reversePrivate(event){
    // 确认框
    var id = event.currentTarget.id;    
    // 先得到当前的值
    var isPrivate;
    var index;
    this.data.flagList.forEach((item, i) => {
      if (item.id == id) {
        isPrivate = !item.isPrivate;
        index = i;
      }
    })
    var str_title = "flagList[" + index + "].isPrivate";
    this.setData({
      [str_title]:isPrivate
    })
    Notify({ message: '修改成功',color: '#fff',background: '#000',  duration: 700,});
  },
  // 删除某一项
  deleteItem(event){
    let id = event.currentTarget.id;
    var tmpList = this.data.flagList;
    tmpList.forEach((item, i) => {
      if (item.id == id) {
        tmpList.splice(i, 1); // 从下标 i 开始, 删除 1 个元素
      }
    })
    // 删除下标为id,长度为1
    this.setData({flagList:tmpList})
    Notify({ message: '删除成功',color: '#fff',background: '#000',  duration: 700,});

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

  modify(){
    var index;
    this.data.flagList.forEach((item, i) => {
      if(item.id == this.data.currentFlagId){
        index = i;
      }
    })
    var str_title = "flagList[" + index + "].title";
    this.setData({
      [str_title]:this.data.currentFlagMessge,
      currentFlagMessge:""
    })    
  },

  privateSwitch({ detail }){
    this.setData({ checked: detail });
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
    // 1. 获得openID
    // 2. 向后端发送新增消息请求


    // 申请权限
    this.authToReceiveMsg(e);
    var obj = this.data.flagList;

    var tmpFlag = {
      id:"d",
      title:this.data.insertFlagMessge,
      likeCount:0,
      showCount:0,
      isPrivate:!this.data.checked,
    }
    obj.push(tmpFlag);
    this.setData({      
      flagList:obj
    })
  },

  authToReceiveMsg(e){
    wx.requestSubscribeMessage({
      tmplIds: ['xJrgdFZ_yDr6YPQVd1FidqOQCaiAWa4GqEYdQVBgEno'],       
      success () {        
        wx.showToast({
          title: '添加成功',
        })
      },
    })
    this.setData({
      openid:e.detail.formId
    })
  },
  insertItemBtn(){
    this.setData({
      currentFlagMessge:"",
      insertNewDialogShow:true
    })

  },
  modifyItem(event){
    var id = event.currentTarget.id;
    // 先得到当前的值
    this.data.flagList.forEach((item, i) => {
      if (item.id == id) {
        this.setData({
          currentFlagId:id,
          currentFlagMessge: item.title,
          writeDialogShow:true
        })
      }
    })

  },
  onOpen(event) {
    const { position, name } = event.detail;
    switch (position) {
      case 'left':
        break;
      case 'right':
        break;
    }
  },
  onShow:function(){
    wx.setNavigationBarTitle({
      title: '小目标',
    })
  }
});
