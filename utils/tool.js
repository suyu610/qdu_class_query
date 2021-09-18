
//防止多次重复点击  （函数节流）

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1000
  }
 
  let _lastTime = null
 
  // 返回新的函数
  return function (e) {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      // fn.apply(this, arguments)   //将this和参数传给原函数
      fn(this,e)    //上方法不可行的解决办法 改变this和e
      _lastTime = _nowTime
    }
  }
}


/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,args);
    }, gapTime);
  };
}

/* 通过本地url，以base64保存图片 */
function saveImg2Local(url,key){
  wx.getFileSystemManager().readFile({
    filePath: url,
    encoding: "base64",
    success: function(data) {          
      wx.setStorage({
        key: key,
        data: data,
      })
    },
    fail:function(e){
      console.log(e)
    }
  })
}

/* 通过本地url，以base64保存图片 */

var familyNames=new Array("赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
"褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
"何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
"陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
"云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
"昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
"酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
"倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
"乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
"元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹");

var givenNames = new Array(
  "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
  "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
  "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
  "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
  "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
  "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
  "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
  "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
  "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
  "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
  );
  
function getName() {
    return(familyNames[Math.floor(Math.random() * (familyNames.length))] + givenNames[Math.floor(Math.random() * (givenNames.length))]);
}

module.exports = {
  throttle: throttle,
  debounce: debounce,
  getName:getName,
  saveImg2Local:saveImg2Local
};