
const app = getApp()
function getMarkersByBuildId(id,count){  
  return {
    title: buildingsInfo[id]["name"], 
    id: buildingsInfo[id]["id"], 
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
      content:buildingsInfo[id]["name"] + "\n" + count + "个",
      display: 'ALWAYS',
    },
  }  
}

function getNameById(id){ 
  return buildingNameAndId[id]
}
// 模拟数据
function getMarkersRandom(){
  let list = [1710,2310,1738,2306,4842,2036,2308,1748,1769,2186,2099,2139,6182,5893,2278,2419,2349,2050,1756,1904,1954,2204,2237,1783,1847,2260,2503];
  
  let count = Math.floor(Math.random()*list.length) + 1
  let id = list[count]
  
  return {
    title: buildingsInfo[id]["name"], 
    id: buildingsInfo[id]["id"],
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
let buildingNameAndId={
  1710:"睿思楼",  2310:"音乐厅",  1738:"学思楼",  2306:"行思楼",  4842:"西院体育馆",  2306:"西院体育场",  2308:"慎行楼",  1748:"慎思楼",  1769:"凝思楼",  2186:"静思三教",  2099:"静思二教",  2139:"静思一教",  6182:"浩园1号教学楼",  5893:"东院体育场",  2278:"东12教", 2419:"德晖楼", 2349:"德音楼", 2050:"德雅楼", 1756:"诚思楼", 1904:"博知楼", 1954:"博远楼", 2204:"博逸楼", 2237:"博雅楼", 1783:"博学楼", 1847:"博文楼", 2260:"博观楼",2503:"北院体育馆"
}
let buildingsInfo = {
  "睿思楼":{name:"睿思楼",latitude:"36.069972",longitude:"120.426991",id:1710},
  "音乐厅":{name:"音乐厅",latitude:"36.069001",longitude:"120.426460",id:2310},
  "学思楼":{name:"学思楼",latitude:"36.070151",longitude:"120.426391",id:1738},
  "行思楼":{name:"行思楼",latitude:"36.070488",longitude:"120.424995",id:2306},
  "西院体育馆":{name:"西院体育馆",latitude:"36.067961",longitude:"120.424751",id:4842},
  "西院体育场":{name:"西院体育场",latitude:"36.067543",longitude:"120.423031",id:2306},
  "慎行楼":{name:"慎行楼",latitude:"36.069004",longitude:"120.423628",id:2308},
  "慎思楼":{name:"慎思楼",latitude:"36.070273",longitude:"120.425621",id:1748},
  "凝思楼":{name:"凝思楼",latitude:"36.072961",longitude:"120.424210",id:1769},
  "静思三教":{name:"静思三教",latitude:"36.071790",longitude:"120.427025",id:2186},
  "静思二教":{name:"静思二教",latitude:"36.071331",longitude:"120.427160",id:2099},
  "静思一教":{name:"静思一教",latitude:"36.071148",longitude:"120.427586",id:2139},
  "浩园1教":{name:"浩园1教",latitude:"36.075310",longitude:"120.418286",id:6182},
  "东院体育场":{name:"东院体育场",latitude:"36.072771",longitude:"120.428400",id:5893},
  "东12教":{name:"东12教",latitude:"36.070500",longitude:"120.427055",id:2278},
  "德晖楼":{name:"德晖楼",latitude:"36.075380",longitude:"120.425075",id:2419},
  "德音楼":{name:"德音楼",latitude:"36.074727",longitude:"120.426070",id:2349},
  "德雅楼":{name:"德雅楼",latitude:"36.069516",longitude:"120.425750",id:2050},
  "诚思楼":{name:"诚思楼",latitude:"36.071062",longitude:"120.425351",id:1756},
  "博知楼":{name:"博知楼",latitude:"36.070731",longitude:"120.421331",id:1904},
  "博远楼":{name:"博远楼",latitude:"36.071982",longitude:"120.421451",id:1954},
  "博逸楼":{name:"博逸楼",latitude:"36.071354",longitude:"120.422156",id:2204},
  "博雅楼":{name:"博雅楼",latitude:"36.068703",longitude:"120.422691",id:2237},
  "博学楼":{name:"博学楼",latitude:"36.069352",longitude:"120.422761",id:1783},
  "博文楼":{name:"博文楼",latitude:"36.070280",longitude:"120.422069",id:1847},
  "博观楼":{name:"博观楼",latitude:"36.070635",longitude:"120.422709",id:2260},
  "北院体育馆":{name:"北院体育馆",latitude:"36.074781",longitude:"120.426910",id:2503}
};

module.exports = { 
  getMarkersByBuildId : getMarkersByBuildId,
  getMarkersRandom:getMarkersRandom,
  buildingsInfo:buildingsInfo,
  getNameById:getNameById
}
