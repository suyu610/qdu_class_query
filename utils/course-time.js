const dayjs = require('../pages/list/dayjs/dayjs.js')

// 用来获取当前第几节课
const timeIntervals = {
  1: [{h: 0, m: 0}, {h: 8, m: 50}],  
  2: [{h: 8, m: 50}, {h: 9, m: 50}],  
  3: [{h: 9, m: 50}, {h: 11, m: 0}],
  4: [{h: 11, m: 0}, {h: 12, m: 0}],    
  5: [{h: 12, m: 0}, {h: 13, m: 30}],
  6: [{h: 13, m: 30}, {h: 14, m: 20}],  
  7: [{h: 14, m: 20}, {h: 15, m: 20}],  
  8: [{h: 15, m: 20}, {h: 16, m: 20}], 
  9: [{h: 16, m: 20}, {h: 17, m: 20}], 
  10: [{h: 17, m: 20}, {h: 18, m: 0}],
  11: [{h: 18, m: 0}, {h: 19, m: 20}],
  12: [{h: 19, m: 20}, {h: 23, m: 59}],
};

function getNowCourseSeq(){
  let now = dayjs()
  let today = now.startOf('day')

  let nowInterval = 0;
  for (let i in timeIntervals) {
    let startTime = today.add(timeIntervals[i][0].h, 'hour').add(timeIntervals[i][0].m, 'minute')
    let endTime = today.add(timeIntervals[i][1].h, 'hour').add(timeIntervals[i][1].m, 'minute')
    if (now.isAfter(startTime) && now.isBefore(endTime)) {
      nowInterval = i
      break
    }
  }
  return nowInterval;
}

module.exports = {
  getNowCourseSeq: getNowCourseSeq,
}
