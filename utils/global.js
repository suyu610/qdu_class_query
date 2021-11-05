const globalData = {
    capsuleBtnInfo: {},
    rediretTo: "",
    params: "",
    debug: true,
    debug: false,
    debugRouter: "msg",
    debugRouter: "life_map_add_store",
    debugRouter:"life_map_list",
    debugRouter: "life_map_comment",
    debugRouter:"life_map_home",

    // 当前样式,这里配合腾讯地图，所以是从1开始
    currentTheme: 1,
    currentCampus: 1709,
    myJwCourseKey: "my-jw-course-v4",
    tokenKey: 'token_2',
    currentCourse: "",
    openid: "",
    token: "",
    userInfo: null,
    // 初始中心点
    longitude: 120.423621,
    latitude: 36.070106,
    version: '测试版',
    // 腾讯地图的key
    key: "5WCBZ-U7RLU-RFHVG-2N6Q7-76LT6-DZBJO",
    // list界面的id,如果为0，则显示默认值
    listBuildID: 0,
    tapBuildName: "",
    currentStatus: '',
    // 由于tabbar不能传参，所以放在这
    // 这是给course.js用的
    onImportJwCourseOk: false,
    weather: {
        createtime: "",
        suggest: "今日降雨概率为0，但风很大",
        shorttext: "多云",
        rain: 0,
        dayt: 3,
        nightt: 0,
        iconcode: 408,
    },
};
export {
    globalData
};