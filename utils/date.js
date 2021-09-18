/**
 * 日期操作类
 */

/*
 *  获得今天是第几周
 */

export var getSchoolWeek = function () {
  let today = new Date() // 当前日期

  const schoolBeginDate = new Date("2021/9/6")

  let day = Math.round((today.valueOf() - schoolBeginDate.valueOf()) / 86400000) // 当前日期是今年第多少天

  // 用day加当前年的第一天的周差距的和在除以7就是本年第几周
  return Math.ceil((day + ((schoolBeginDate.getDay()) - 1)) / 7)
}


/** 
 * 获取该周，是本学期第几周
 */
export var getWhichWeekByDate = function (date) {
  let today = new Date(date) // 当前日期
  const schoolBeginDate = new Date("2021/9/6")

  let day = Math.round((today.valueOf() - schoolBeginDate.valueOf()) / 86400000) // 当前日期是今年第多少天
  console.log("已经过去：%d", day)
  // 用day加当前学期的第一天的周差距的和在除以7就是本年第几周
  return Math.ceil((day + ((schoolBeginDate.getDay()))) / 7)
}



export var getDiffDate = function (dateTime, dayCount) {
  var resultDate = new Date((dateTime / 1000 + (86400 * dayCount)) * 1000); //增加n天后的日期 
  return resultDate;
}


// 根据给定日期，获取这周周一的日期
export var getFirstDayDate = function (date) {
  let deltaDay = date.getDay();
  // 如果是周日，他为0，所以应该相差7天
  if (deltaDay == 0)
    deltaDay = 7
  return (getDiffDate(date, -(deltaDay - 1)))
}

export let formatWeekDate = function (date) {
  return (date.getMonth() + 1 + "-" + date.getDate())
}