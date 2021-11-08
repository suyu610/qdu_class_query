//index.js


//获取应用实例
const app = getApp()

const wxCharts = require("../../../utils/wxcharts.js")
var lineChart = null;

//计数器
var interval = null;

//值越大旋转时间越长  即旋转速度
var intime = 50;
const router = require('../../../router/index.js');

Page({
  data: {
    textcolor1: '#014f8e',
    active: 0,
    debug: false,
    remainCount: 0,
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    chanceArr: [0.3, 0.0025, 0.013, 0.02, 0.05, 0.0025, 0.3, 0.0025],
    total_recorder: ["1", "1", "17", "38", "134", "3"],
    standar_recorder: ["0.005", "0.013", "0.02", "0.05", "0.6", "0.005"],
    //9张奖品图片
    images: ['/images/item.png', '/images/item1.png', '/images/item2.png', '/images/item3.png', '/images/item4.png', '/images/item1.png', '/images/item.png', '/images/item5.png'],
    lucky_text: ['现金红包1.88', '现金红包288.88', '现金红包88.88', "现金红包18.88", "现金红包5.88", "现金红包288.88", "现金红包1.88", "小米移动电源"],
    btnconfirm: 'https://cdns.qdu.life/icons/dianjichoujiang.png',
    clickLuck: 'clickLuck',
    luckPosition: 7,
    inviteCode: '',
    curPosition: 0,
    showGetMoreCount: false,
    options: [{
        name: '导入课表',
        icon: '/images/add.png',
        description: "第一次导入后+1"
      },
      {
        name: '分享小程序',
        icon: '/images/share.png',
        description: '对方完成导入后+1',
        openType: 'share'
      }
    ],
  },

  onSelectGetMoreCount(e) {
    // 0 为导入课表
    // 1 为分享小程序
    // 2 为生成海报

    let index = e.detail.index
    console.log(index)
    if (index == 0) {
      router.push({
        name: 'course_import'
      })
    }

  },

  getMoreCount: function () {
    this.setData({
      showGetMoreCount: true
      // remainCount: this.data.remainCount + 1
    })
  },

  onCloseGetMoreCount: function () {
    this.setData({
      showGetMoreCount: false
      // remainCount: this.data.remainCount + 1
    })
  },
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      path: '/pages/empty/empty?url=lucky_draw&params=2019205913', // 默认是当前页面，必须是以‘/’开头的完整路径
      title: "我的邀请码是23938", // 默认是小程序的名称(可以写slogan等)
      imageUrl: 'https://cdns.qdu.life/img/share_lucky.png', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {}
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    };

    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      var eData = options.target.dataset;
      // 此处可以修改 shareObj 中的内容
      shareObj.title = '我的邀请码是' + '23938';
    }
    // 返回shareObj
    return shareObj;

  },

  //图表点击事件
  touchcanvas: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  //折线图绘制方法
  OnWxChart: function (x_data, y_data, y_data_2, name_1, name_2) {
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 650 //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas', //输入wxml中canvas的id
      type: 'line', // 图表类型
      categories: x_data, // 模拟的x轴横坐标参数
      animation: true, // 是否开启动画
      series: [{
        name: name_1,
        data: y_data,
        format: function (val, name) {
          return val;
        }
      }, {
        name: name_2,
        data: y_data_2,
        format: function (val, name) {
          return val;
        }
      }],
      xAxis: { //是否隐藏x轴分割线
        disableGrid: true,
      },
      //y轴数据
      yAxis: {
        title: '', //标题
        format: function (val) { //返回数值
          return val.toFixed(0);
        },
        min: 0.00, //最小值
        gridColor: '#feedf7', // 图表里的横线
      },
      width: windowWidth * 1.1, //图表展示内容宽度
      height: windowHeight * 0.7, //图表展示内容高度
      dataLabel: true, //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve' //曲线
      },
    });
  },

  onChangeTabbar: function (e) {
    this.setData({
      active: e.detail.index
    })

    if (e.detail.index == 1) {
      var x_data = ["288.88", "88.88", "18.88", "5.88", "1.88", "移动电源"]
      // standar_recorder
      // 把标准的概率，乘以人数
      let standar_recorder = this.data.standar_recorder
      let cie = standar_recorder.map(item => Math.round(item * 234))

      //绘制折线图
      this.OnWxChart(x_data, this.data.total_recorder, cie, '实际人数', "理论值")

    }
    console.log(e)
  },
  onLoad: function (options) {
    const data = router.extract(options);
    let that = this
    if (data != null) {
      wx.showModal({
        title: '他的邀请码为',
        content: data,
        cancelText: '取消',
        confirmText: '复制',
        success(res) {
          if (res.cancel) {
            // 用户点击了取消属性的按钮，对应选择了'女'
            that.setData({
              userSex: 2
            })
          } else if (res.confirm) {
            wx.setClipboardData({
              data: data,

            })
          }
        }
      })
    }

    console.log(data); // { id: '123', type: 1 }    this.loadAnimation();

    wx.setNavigationBarTitle({
      title: '青空抽奖活动页面',
    })
    wx.setNavigationBarColor({
      backgroundColor: '#792db3',
      frontColor: '#ffffff',
    })
  },

  input: function (e) {
    var data = e.detail.value;
    this.setData({
      luckPosition: data
    })
  },


  // 根据概率去随机

  randomLucky: function () {
    let chanceArr = this.data.chanceArr
    var sum = 0,
      factor = 0,
      random = Math.random();

    for (var i = chanceArr.length - 1; i >= 0; i--) {
      sum += chanceArr[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for (var i = chanceArr.length - 1; i >= 0; i--) {
      factor += chanceArr[i];
      if (random <= factor)
        return i;
    };
    return null;
  },
  onCloseLuckyRecorder: function () {
    this.setData({
      showLuckyRecorder: false
    })
  },
  openLuckyRecorder: function () {
    this.setData({
      showLuckyRecorder: true
    })
  },
  //点击抽奖按钮
  clickLuck: function () {
    this.setData({
      luckPosition: this.randomLucky()
    })

    if (this.data.remainCount <= 0) {
      wx.showToast({
        icon: 'none',
        title: '无抽奖次数了哦',
      })
      return;
    }
    this.setData({
      remainCount: this.data.remainCount - 1
    })
    var that = this;

    //判断中奖位置格式
    if (that.data.luckPosition == null || isNaN(that.data.luckPosition) || that.data.luckPosition > 7) {
      wx.showModal({
        title: '提示',
        content: '请填写正确数值',
        showCancel: false,
      })
      return;
    }

    //设置按钮不可点击
    that.setData({
      btnconfirm: 'https://cdns.qdu.life/icons/dianjichoujiangd.png',
      clickLuck: '',
    })
    //清空计时器
    clearInterval(interval);
    var index = 0;
    //循环设置每一项的透明度
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        that.data.color[7] = 0.5
      } else if (index != 0) {
        that.data.color[index - 1] = 0.5
      }
      that.data.color[index] = 1
      that.setData({
        color: that.data.color,
      })
      index++;
      that.setData({
        curPosition: index
      })
      // setdataindex
    }, intime);

    //模拟网络请求时间  设为两秒
    var stoptime = 2000;
    setTimeout(function () {
      that.stop(that.data.luckPosition);
    }, stoptime)

  },

  //也可以写成点击按钮停止抽奖
  clickStop: function () {
    var stoptime = 2000;
    setTimeout(function () {
      that.stop(1);
    }, stoptime)
  },

  stop: function (which) {
    var that = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = that.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;

    that.stopLuck(which, index, intime, 10);
  },


  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck: function (which, index, time, splittime) {
    var that = this;
    //值越大出现中奖结果后减速时间越长
    var color = that.data.color;
    setTimeout(function () {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      that.setData({
        curPosition: index,
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 300 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        that.stopLuck(which, index, time, splittime);
      } else {
        //1秒后显示弹窗
        setTimeout(function () {
          //中奖
          wx.showModal({
            title: '恭喜中奖',
            content: that.data.lucky_text[which] + "\r\n将自动发放到微信账户",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //设置按钮可以点击
                that.setData({
                  btnconfirm: 'https://cdns.qdu.life/icons/dianjichoujiang.png',
                  clickLuck: 'clickLuck',
                })
                that.loadAnimation();
              }
            }
          })

        }, 300);
      }
    }, time);
  },
  //进入页面时缓慢切换
  loadAnimation: function () {
    var that = this;
    var index = 0;
    // if (interval == null){
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        that.data.color[7] = 0.5
      } else if (index != 0) {
        that.data.color[index - 1] = 0.5
      }
      that.data.color[index] = 1
      that.setData({
        curPosition: index,
        color: that.data.color,
      })
      index++;
    }, 1000);
  },


  // 从服务端请求剩余次数
  getRemainCount() {

  },

  // 服务端:得到抽奖结果
  getFinalPositionSuccess() {

  },
})