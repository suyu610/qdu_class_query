// config/theme.js

function setThemeKey(key,value){
  let tmp = themeData['myStyle'].split(';')
  for (var i= 0;i< tmp.length; i++) {
    let tmpItem = tmp[i].split(":")
    if(tmpItem[0].trim()==key){
      console.log(tmpItem)
      themeData['myStyle'] = themeData['myStyle'].replace(tmpItem[1],value)      
      return
    }
  }
}

function initNavigationColor(){
  wx.setNavigationBarColor({
    backgroundColor: getThemeKey("--themeColor"),
    frontColor: getThemeKey("--titleColor"),
    animation: {
      duration: 400,
      timingFunc: 'easeIn'
    }
  })
}

function getThemeKey(key){
  let tmp = themeData['myStyle'].split(';')
  let res = 'errkey'

  for (var i= 0;i< tmp.length; i++) { 
    let tmpItem = tmp[i].split(":")
    if(tmpItem[0].trim()==key){
      return tmpItem[1].trim()
    }
  }
  return res;
}

var themeData = {  
  myStyle: "--themeColor: #ffe36e;--titleColor: #000000;--coupleCourseColor:#00b0f3;--hisCourseColor:#fee99b;"
}

export {initNavigationColor,themeData,setThemeKey,getThemeKey}