const util = require('./util')

//获取当前学期名称
function getNowTerm(){
  let nowTerm = util.getConfig('nowTerm')
  if(nowTerm === false){
    return null
  }
  return {
    term: nowTerm.term,
    name: this.term2Name(nowTerm.term),
    term_date: nowTerm.date
  }
}

//根据学期代号获取名称
function term2Name(term){
  if(!term) return ''
  let year = parseInt(term / 10)
  let num = term % 10
  return `${year} - ${year+1}学年 第${num+1}学期`
}

//获取当前课表学期
function getNowCourseTerm(){
  let cache = wx.getStorageSync('course_term')
  if(!cache || cache.term != '20200'){
    let term = this.getNowTerm()
    wx.setStorageSync('course_term', term)
    return term
  }
  return cache
}

module.exports = {
  getNowTerm: getNowTerm,
  term2Name: term2Name,
  getNowCourseTerm: getNowCourseTerm
}