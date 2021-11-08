// pages/product/product.js
let WxParse = require("../../../../libs/wxParse/wxParse.js");
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast';
const router = require('../../../../router/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    isLogin: false,
    couponShow: false,
    serviceShow: false,
    cartList: [],
    deliveryAddress: {
      address: "北京市东城区东华门街道",
      time: "23:00",
      day: "",
      diff: "明天"
    },
    product: {
      id: 0,
      picUrl: "https://img11.360buyimg.com/n1/s450x450_jfs/t1/62813/33/2131/584186/5d079803E03084b0d/2b4970456b7bf49f.png", // 默认商品图片
      promotion: 0, // 促销活动 0无 1限时购 2领劵
      gallery: [{
          picUrl: "https://img11.360buyimg.com/n1/s450x450_jfs/t1/62813/33/2131/584186/5d079803E03084b0d/2b4970456b7bf49f.png",
          sortOrder: 1
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/4176/23/3653/281477/5b9a15d4E97e09d00/887e76e6c525324c.jpg",
          sortOrder: 2
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/5967/33/3617/54427/5b9a15d4Ebe8c2aed/99c9c06b72d356f7.jpg",
          sortOrder: 3
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/2522/37/3744/128519/5b9a15d4Eb916347a/bef9d7fae9c5d2ae.jpg",
          sortOrder: 4
        },
        {
          picUrl: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/1508/30/3667/24431/5b9a15d4E61cd63d4/592747ec9cd8ad81.jpg",
          sortOrder: 5
        }
      ], // 轮播图
      title: "这个功能等商家数据采集到一定量以后再做",
      description: "演示商品介绍",
      defaultPrice: '演示价格', // 默认显示价格
      price: 0.00,
      originPrice: 0.00,
      detail: "<div><img src='//img30.360buyimg.com/sku/jfs/t1/203337/8/1544/187195/6119cf1bE92014ce3/b94beab1debab233.jpg!q70.dpg.webp'><img src = '//img30.360buyimg.com/sku/jfs/t1/198589/9/3381/184882/6119cf1bE3d35bc7e/c4361ecbc5371e1d.jpg!q70.dpg.webp'><img src ='//img30.360buyimg.com/sku/jfs/t1/200269/16/3262/146936/6119cf1aE5fd1fa59/43dab8900a382d33.jpg!q70.dpg.webp' > </div>",
      //商品详情
      tags: [{
          id: 1,
          title: "演示标签-1"
        },
        {
          id: 2,
          title: "演示标签-2"
        }
      ],
      serviceList: [{
          id: 1,
          title: "演示商家提供的服务 - 1",
          desc: "巴拉巴拉巴拉"
        },
        {
          id: 2,
          title: "演示商家提供的服务 - 2",
          desc: "巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉"
        },
        {
          id: 3,
          title: "演示商家提供的服务 - 3",
          desc: "巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉"
        }
      ],
      comment: {
        goodCommentRate: 4.7, // 好评率
        count: 4, // 评论计数
        goodComment: {
          nickname: "Exrick",
          avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTqQ5hNKicCNEwW3cATfOTaXk6xMlNEfh1gm0kicPDtJrXwTf5YEqQXYea3m5vsuPyJUXc3U0OicXtA/132",
          content: "很好，手机很有质感，值得购买。",
          rate: 3,
          time: "2019.06.18",
          spec: "银色 64G",
          pics: [
            "https://img30.360buyimg.com/shaidan/s616x405_jfs/t1/65005/20/4818/92581/5d2ffdb6Ebcbf3018/35411a583e29d52d.jpg",
            "https://img30.360buyimg.com/shaidan/s616x405_jfs/t1/74460/28/4830/96562/5d2ffdb7Ed5e9ce7a/e764b3daa92a9c67.jpg"
          ]
        } // 精选评论
      },
      attribute: [{
          name: "品牌",
          value: "青空"
        },
        {
          name: "颜色",
          value: "黄色、黑色"
        },
        {
          name: "容量",
          value: "8G 16核 20M"
        }
      ] // 商品属性
    },
    recommend: [{
        id: 1,
        relateId: 0,
        title: "演示推荐的商品1",
        description: "演示推荐的商品1",
        price: 499.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/9bffe702b1f0aea221b1f18ddf886958.jpg"
      },
      {
        id: 2,
        relateId: 0,
        title: "演示推荐的商品2",
        description: "演示推荐的商品2",
        price: 1299.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/6ff92d05a3bfab4fad489ca04d3eea5a.png"
      },
      {
        id: 3,
        relateId: 0,
        title: "演示推荐的商品3",
        description: "演示推荐的商品3",
        price: 1799.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/c71ce2297b362f415f1e74d56d867aed.png"
      },
      {
        id: 4,
        relateId: 0,
        title: "演示推荐的商品4",
        description: "演示推荐的商品4",
        price: 199.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/578116bddf1d170c89e9af7ba5073fb6.jpg"
      },
      {
        id: 5,
        relateId: 0,
        title: "卫衣 开衫 热血",
        description: "风格简洁、舒适服帖",
        price: 299.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/ff8106afb5fe0ed8ec23e3594766b4f7.png"
      }
    ],
    hot: [{
        id: 1,
        relateId: 0,
        title: "古希腊银币笔记本套装",
        description: "大英博物馆系列，用笔墨书写历史",
        price: 99.00,
        type: 0,
        picUrl: "https://yanxuan.nosdn.127.net/d232d0d909ade20eb645dbc44677617b.png"
      },
      {
        id: 2,
        relateId: 0,
        title: "婴幼儿卡通棉袜",
        description: "萌趣动物 0-2岁适用",
        price: 4.90,
        type: 0,
        picUrl: "https://yanxuan.nosdn.127.net/2862a7c31788a61e0862d523f411b498.png"
      },
      {
        id: 3,
        relateId: 0,
        title: "W30BT蓝牙耳机",
        description: "联名款JBL，8小时续航",
        price: 219.00,
        type: 0,
        picUrl: "https://yanxuan.nosdn.127.net/268bcee838996e58c37744a44d99e68d.png"
      },
      {
        id: 4,
        relateId: 0,
        title: "Smartisan 帆布鞋",
        description: "一双踏实、舒适的帆布鞋",
        price: 199.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/578116bddf1d170c89e9af7ba5073fb6.jpg"
      },
      {
        id: 5,
        relateId: 0,
        title: "卫衣 开衫 热血",
        description: "风格简洁、舒适服帖",
        price: 299.00,
        type: 0,
        picUrl: "https://resource.smartisan.com/resource/ff8106afb5fe0ed8ec23e3594766b4f7.png"
      }
    ],
    sku: {
      show: false, // 显示属性规格
      noneSku: false, // 有无规格选择
      quota: 100, // 限购数量
      productId: 1, // 商品id
      picUrl: "", // 当前选择图片
      specText: "", // 所选规格属性
      specTextNoCount: "", // 所选规格属性 无数量
      tree: [{
          k: '颜色', // skuKeyName：规格类目名称
          v: [{
              id: 1, // skuValueId：规格值 id
              name: '银色', // skuValueName：规格值名称
              picUrl: 'https://img11.360buyimg.com/n1/s450x450_jfs/t1/62813/33/2131/584186/5d079803E03084b0d/2b4970456b7bf49f.png', // 规格类目图片，只有第一个规格类目可以定义图片
              selected: false, // 是否选择
              disabled: false // 禁用
            },
            {
              id: 2,
              name: '深空灰色',
              picUrl: 'https://img14.360buyimg.com/n0/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
              selected: false,
              disabled: false
            }
          ],
          ks: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        },
        {
          k: '内存',
          v: [{
              id: 3,
              name: '64GB',
              picUrl: '',
              selected: false,
              disabled: false
            },
            {
              id: 4,
              name: '256GB',
              picUrl: '',
              selected: false,
              disabled: false
            },
            {
              id: 5,
              name: '512GB',
              picUrl: '',
              selected: false,
              disabled: false
            }
          ],
          ks: 's2'
        }
      ],
      // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
      list: [{
          id: 1, // skuId，下单时后端需要
          price: 1.00, // 价格
          s1: 1, // 规格类目 ks 为 s1 的对应规格值 id
          s2: 3, // 规格类目 ks 为 s2 的对应规格值 id
          stockNum: 50 // 当前 sku 组合对应的库存
        },
        {
          id: 2,
          price: 2.00,
          s1: 1,
          s2: 4,
          stockNum: 100
        },
        {
          id: 3,
          price: 3.00,
          s1: 1,
          s2: 5,
          stockNum: 0
        },
        {
          id: 4,
          price: 4.00,
          s1: 2,
          s2: 3,
          stockNum: 100
        },
        {
          id: 5,
          price: 5.00,
          s1: 2,
          s2: 4,
          stockNum: 100
        },
        {
          id: 6,
          price: 6.00,
          s1: 2,
          s2: 5,
          stockNum: 50
        }
      ],
      // 选择的 sku 组合
      selectedSku: {},
      count: 1 // 选择的商品数量
    },
    couponList: [{
      id: '1',
      title: '60元直减劵',
      time: '2019.08.01-2019.08.30',
      description: '饮食类目专享；限时购等详情页标注不可用券的商品除外不可用券的商品除外',
      discount: 60, //折扣金额 -1代表全部
      disabled: false,
      showAll: false,
      selected: false,
      get: false,
      mode: "get",
      status: 0 // 0未使用 1已使用 2已失效
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    // 初始化配送时间
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 1;
    this.setData({
      'deliveryAddress.day': month + '月' + day + '日'
    })
    // 读取购物车
    let cartList = wx.getStorageSync("cartList");
    if (cartList) {
      this.setData({
        cartList: cartList
      })
    }
    // 加载sku后初始化selectedSku
    let tree = this.data.sku.tree;
    for (let i = 0; i < tree.length; i++) {
      let s = 'sku.selectedSku.' + tree[i].ks;
      this.setData({
        [s]: ''
      })
    }
    // 只有一种 sku 规格值时默认选中第一个
    if (tree.length == 1) {
      let k = 'sku.selectedSku.' + this.data.sku.tree[0].ks;
      this.setData({
        [`sku.tree[${0}].v[${0}].selected`]: true,
        [k]: this.data.sku.tree[0].v[0].id
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    // 加载商品详情数据
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    let that = this;
    WxParse.wxParse('productDetail', 'html', this.data.product.detail, that, 0);


    // 初始判断
    this.judgeAllItem();
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

  },
  openIndexPage: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  openCoupon: function () {
    this.setData({
      couponShow: true
    })
  },
  closeCoupon: function () {
    this.setData({
      couponShow: false
    })
  },
  openAddress: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        if (!res.address) {
          return;
        }
        that.setData({
          'deliveryAddress.address': res.address
        })
      },
    })
  },
  openService: function () {
    this.setData({
      serviceShow: true
    })
  },
  closeService: function () {
    this.setData({
      serviceShow: false
    })
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  toComment: function () {
    router.push({
      name: 'life_map_comment',
      data: {
        id: this.data.product.id,
      }
    })
  },
  toProduct: function (e) {
    let id = e.currentTarget.dataset.value.id;

    router.push({
      name: "life_map_good_detail",
      data: {
        id
      }
    })

  },

  // clickTag: function (e) {
  //   let v = e.currentTarget.dataset.value;
  //   wx.navigateTo({
  //     url: '/pages/promotion/promotion?id=' + v.id + '&title=' + v.title
  //   });
  // },
  previewThumb: function (e) {
    wx.previewImage({
      current: this.data.product.picUrl,
      urls: [this.data.product.picUrl]
    })
  },
  showSku: function (e) {
    this.setData({
      'sku.show': true
    })
  },
  closeSku: function (e) {
    this.setData({
      'sku.show': false
    })
  },
  selectSku: function (e) {
    let k = e.currentTarget.dataset.k;
    let v = e.currentTarget.dataset.value;
    let index = e.currentTarget.dataset.index;
    let iindex = e.currentTarget.dataset.iindex;
    if (this.data.sku.tree[index].v[iindex].disabled) {
      return;
    }
    // 勾选或反选 设置属性
    if (!this.data.sku.tree[index].v[iindex].selected) {
      // 勾选 记录
      let s = 'sku.selectedSku.' + k.ks;
      this.setData({
        [s]: v.id
      });
    } else {
      // 反选 删除值
      let s = 'sku.selectedSku.' + k.ks;
      this.setData({
        [s]: ''
      });
    }
    this.setData({
      [`sku.tree[${index}].v[${iindex}].selected`]: !this.data.sku.tree[index].v[iindex].selected
    });
    // 排除该组其他已选项
    let vList = this.data.sku.tree[index].v;
    for (let i = 0; i < vList.length; i++) {
      if (vList[i].id != v.id) {
        this.setData({
          [`sku.tree[${index}].v[${i}].selected`]: false
        })
      }
    }
    this.judgeAllItem();
    // 修改属性图片
    if (index == 0) {
      this.setData({
        'product.picUrl': this.data.sku.tree[0].v[iindex].picUrl
      })
    }
    // 修改选择商品价格信息
    if (this.isAllSelected()) {
      let skuComb = this.getSkuComb();
      this.setData({
        'product.price': skuComb.price
      })
    } else {
      // 恢复默认价格
      this.setData({
        'product.price': this.data.product.defaultPrice
      })
    }
  },
  // 循环判断所有属性是否可选
  judgeAllItem: function () {
    // 判断库存
    let tree = this.data.sku.tree;
    for (let i = 0; i < tree.length; i++) {
      let v = tree[i].v;
      for (let j = 0; j < v.length; j++) {
        if (this.isSkuChoosable(tree[i].ks, v[j].id)) {
          // 可点击
          this.setData({
            [`sku.tree[${i}].v[${j}].disabled`]: false
          })
        } else {
          // 不可点击
          this.setData({
            [`sku.tree[${i}].v[${j}].disabled`]: true
          })
        }
      }
    }
    this.getSelectedText();
  },
  isSkuChoosable: function (ks, vId) {

    let selectedSku = this.data.sku.selectedSku;
    let list = this.data.sku.list;

    // 先假设sku已选中，拼入已选中sku对象中
    let matchedSku = Object.assign({}, selectedSku, {
      [ks]: vId
    });

    // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中
    let skusToCheck = Object.keys(matchedSku).filter(
      skuKey => matchedSku[skuKey] != ''
    );

    let filteredSku = list.filter(sku => (
      skusToCheck.every(
        skuKey => String(matchedSku[skuKey]) == String(sku[skuKey])
      )
    ));

    let stock = filteredSku.reduce((total, sku) => {
      total += sku.stockNum;
      return total;
    }, 0);
    return stock > 0;
  },
  // 是否所有规格已选
  isAllSelected: function () {
    let selectedSku = this.data.sku.selectedSku;
    let selected = Object.keys(selectedSku).filter(
      skuKeyStr => selectedSku[skuKeyStr] != ""
    );
    return this.data.sku.tree.length == selected.length;
  },
  // 获得已选择的组合
  getSkuComb: function () {
    if (!this.isAllSelected()) {
      return {};
    }
    let selectedSku = this.data.sku.selectedSku;
    let list = this.data.sku.list;
    let skusToCheck = [];
    this.data.sku.tree.forEach(v => {
      skusToCheck.push(v.ks)
    })
    let filteredSku = list.filter(sku => (
      skusToCheck.every(
        skuKey => String(selectedSku[skuKey]) == String(sku[skuKey])
      )
    ));
    return filteredSku[0];
  },
  // 选择属性文字
  getSelectedText: function () {
    let selectedSku = this.data.sku.selectedSku;
    let text = "";
    Object.keys(selectedSku).forEach(
      skuKeyStr => {
        let id = selectedSku[skuKeyStr];
        let tree = this.data.sku.tree;
        for (let i = 0; i < tree.length; i++) {
          let v = tree[i].v;
          for (let j = 0; j < v.length; j++) {
            if (v[j].id == id) {
              text = text + ' ' + v[j].name
            }
          }
        }
      }
    )
    this.setData({
      'sku.specTextNoCount': text
    })
    if (this.isAllSelected()) {
      text = text + ' ×' + this.data.sku.count;
    }
    this.setData({
      'sku.specText': text
    })
  },
  changeCount: function (e) {
    this.setData({
      'sku.count': e.detail.value
    });
    this.getSelectedText();
  },
  // 未选择属性提示
  toChooseTip: function () {
    // 未选择规格属性
    if (!this.data.sku.show) {
      // 未显示选择面板则显示
      this.setData({
        'sku.show': true
      })
      return;
    }
    let selectedSku = this.data.sku.selectedSku;
    let skuNotChoose = Object.keys(selectedSku).filter(
      skuKeyStr => selectedSku[skuKeyStr] == ''
    )[0]
    this.data.sku.tree.forEach(v => {
      if (v.ks == skuNotChoose) {
        Toast("请选择：" + v.k);
      }
    })
  },
  buyNow: function () {
    if (!this.isAllSelected()) {
      // 提示
      this.toChooseTip();
    } else {
      // 下单 判断数量
      let skuComb = this.getSkuComb();
      if (this.data.sku.count > skuComb.stockNum) {
        Toast("库存不足，请减少购买数量");
        return;
      }
      // 跳转checkout页面
      wx.setStorageSync("checkoutProduct", this.data.product);
      wx.setStorageSync("checkoutProductSku", this.data.sku);
      wx.navigateTo({
        url: '/pages/checkout/checkout?from=product',
      })
    }
  },
  addToCart: function () {
    if (!this.isAllSelected()) {
      // 提示
      this.toChooseTip();
    } else {
      // 添加至购物车 判断数量
      let skuComb = this.getSkuComb();
      if (this.data.sku.count > skuComb.stockNum) {
        Toast("库存不足，请减少购买数量");
        return;
      }
      let cartList = this.data.cartList;
      cartList.push({
        id: this.data.product.id,
        checked: true,
        picUrl: this.data.product.picUrl,
        title: this.data.product.title,
        spec: this.data.sku.specTextNoCount,
        count: this.data.sku.count,
        maxNum: this.data.sku.quota,
        price: this.data.product.price
      });
      wx.setStorageSync("cartList", cartList);
      this.setData({
        cartList: cartList
      });
      Toast("加入购物车成功");
    }
  },
  toVip: function () {
    wx.navigateTo({
      url: '/pages/ucenter/vip/vip',
    })
  }
})