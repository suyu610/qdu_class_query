Component({
  properties: {
    // xihuan | xianshi | xinxi | tongzhi | wenjian | paishe | yinle | yuyin | daka | daojishi | huiyuan | kabao | naozhong | yinhangka | zhekouquan | fenxiang | shezhi | sousuo | pinglun | huodong | shouye | biaoqian | yaoqing | youhuiquan | lipin | licai | shoucang | dengji | dianpu | dingdan | jine | jinrong | liwu | shanchu | wode1 | dianzan | paizhao | shijian | xiaoxi | fenlei | gouwuche | yinliang | zanting | bofang | bianji | kuaijin | kuaitui | fenlei1 | shangchuan | shenghuo | shouye1 | saomiao | shouye2 | xiazai | xiaoxi1 | dingwei | shuaxin | wenjian1 | zhibo | shaixuan | wenjianjia | duihuanquan | hongbao | jiangbei | paihangbang | erweima | jifen | mima | daifukuan | gouwu | kehu | pintuan | daifahuo | daishouhuo | shouyi | shouhou | ditu | hezuo | mingxi | wuliu | baocun | dayin | fenxiang1 | jinbi | quanyi | shubiao | jisuanqi | rili | shexiangtou | bianji1 | faxian1 | wode2 | yingshi | gouwudai | guanbi | guanbi1 | huangguan | lianjie | tishi | yujing | yundong | zhidao | neicun | pifu | tongxunlu | tupian | chaxunrenwu | shuaxin1 | tianjiahaoyou | wode3 | xuanzhonghaoyou | diannao | shanchuhaoyou | zhengjian | zixun | anquan | shouji | youjian | zuzhi | biaodan | daohang | dingwei1 | gonggao | huore | tonghua | yinle1 | yinliang1 | biaoqian1 | fangda | gengxin | suoxiao | fanhui | moban | qiehuan | tongji | yuncunchu | jiushui | quanpin | xiaoping | xunhuan | yincang | caidan | fenlei2 | liebiao | huizong | jiaoyi | xuanxiang | youxi | huodong1 | jiankong | jietu | yuyan | guanggao | jilu | liangdu | meishi | baihuo | chuhang | jiankang | ziyuan | lanya | shuju | wuxiaoxi | xueye | loufang | pingjia | yiwen | zidingyi | jiancha | jianshao | shuji | tianjia | jingxuan | xingbie | xunzhang | banquan | quanxian | quanxuan | beifen
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 24,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 24,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
