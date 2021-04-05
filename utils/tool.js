
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



module.exports = {
  throttle: throttle,
  debounce: debounce,
  saveImg2Local:saveImg2Local
};