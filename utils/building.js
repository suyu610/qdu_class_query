
const app = getApp()
function getMarkersByBuildId(id,count){  
  return {
    title: buildingsInfo[id]["name"], 
    id: id, 
    latitude:  buildingsInfo[id]["latitude"], 
    longitude: buildingsInfo[id]["longitude"], 
    width: 50,
    height:50, 
    iconPath:"../../images/icon/icon_flag.png",
    callout: {
      id:id,
      borderRadius:5,
      padding:7,      
      bgColor:'#000000' ,
      anchorX:10, 
      anchorY:20,
      color:'#ffffff',      
      content:"#"+buildingsInfo[id]["name"] + "\n" + count + "个",
      display: 'ALWAYS',
    },
  }  
}
// 模拟数据
function getMarkersRandom(){
  let list = [1710,2310,1738,2306,4842,2036,2308,1748,1769,2186,2099,2139,6182,5893,2278,2419,2349,2050,1756,1904,1954,2204,2237,1783,1847,2260,2503];
  
  let count = Math.floor(Math.random()*list.length) + 1
  let id = list[count]
  
  return {
    title: buildingsInfo[id]["name"], 
    id: id, 
    latitude:  buildingsInfo[id]["latitude"], 
    longitude: buildingsInfo[id]["longitude"], 
    width: 50,
    height:50, 
    iconPath:"../../images/icon/icon_flag.png",
    callout: {
      id:id,
      borderRadius:5,
      padding:7,      
      bgColor:'#000000' ,
      anchorX:10, 
      anchorY:20,
      color:'#ffffff',      
      content:"#"+buildingsInfo[id]["name"] + "\n" + count + "个",
      display: 'ALWAYS',
    },
  }  

}

let buildingsInfo = {
  "睿思楼":{name:"睿思楼",latitude:"36.069972",longitude:"120.426991"},
  "音乐厅":{name:"音乐厅",latitude:"36.069001",longitude:"120.426460"},
  "学思楼":{name:"学思楼",latitude:"36.070151",longitude:"120.426391"},
  "行思楼":{name:"行思楼",latitude:"36.070488",longitude:"120.424995"},
  "西院体育馆":{name:"西院体育馆",latitude:"36.067961",longitude:"120.424751"},
  "西院体育场":{name:"西院体育场",latitude:"36.067543",longitude:"120.423031"},
  "慎行楼":{name:"慎行楼",latitude:"36.069004",longitude:"120.423628"},
  "慎思楼":{name:"慎思楼",latitude:"36.070273",longitude:"120.425621"},
  "凝思楼":{name:"凝思楼",latitude:"36.072961",longitude:"120.424210"},
  "静思三教":{name:"静思三教",latitude:"36.071790",longitude:"120.427025"},
  "静思二教":{name:"静思二教",latitude:"36.071331",longitude:"120.427160"},
  "静思一教":{name:"静思一教",latitude:"36.071148",longitude:"120.427586"},
  "浩园1号教学楼":{name:"浩园1号教学楼",latitude:"36.075310",longitude:"120.418286"},
  "东院体育场":{name:"东院体育场",latitude:"36.072771",longitude:"120.428400"},
  "东12教":{name:"东12教",latitude:"36.070500",longitude:"120.427055"},
  "德晖楼":{name:"德晖楼",latitude:"36.075380",longitude:"120.425075"},
  "德音楼":{name:"德音楼",latitude:"36.074727",longitude:"120.426070"},
  "德雅楼":{name:"德雅楼",latitude:"36.069516",longitude:"120.425750"},
  "诚思楼":{name:"诚思楼",latitude:"36.071062",longitude:"120.425351"},
  "博知楼":{name:"博知楼",latitude:"36.070731",longitude:"120.421331"},
  "博远楼":{name:"博远楼",latitude:"36.071982",longitude:"120.421451"},
  "博逸楼":{name:"博逸楼",latitude:"36.071354",longitude:"120.422156"},
  "博雅楼":{name:"博雅楼",latitude:"36.068703",longitude:"120.422691"},
  "博学楼":{name:"博学楼",latitude:"36.069352",longitude:"120.422761"},
  "博文楼":{name:"博文楼",latitude:"36.070280",longitude:"120.422069"},
  "博观楼":{name:"博观楼",latitude:"36.070635",longitude:"120.422709"},
  "北院体育馆":{name:"北院体育馆",latitude:"36.074781",longitude:"120.426910"}
};

module.exports = { 
  getMarkersByBuildId : getMarkersByBuildId,
  getMarkersRandom:getMarkersRandom,
  buildingsInfo:buildingsInfo,
}
