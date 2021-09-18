import httpService from "./httpService";

import {
  GetPublicCourseByNameUrl,AddPublicCourseUrl
} from "./constants";


function getPublicCourseByName(courseName,seq,week,campuses,index,handleSuccess,handleError) {
  httpService.get(
    GetPublicCourseByNameUrl + "/" + courseName + "/" + seq +"/" + week + "/" + campuses + "/" + index,
    "",
    res=>{
      handleSuccess(res.data['data'])
    },
    er=>{
      handleError()
    });
}
function addPublicCourse(params,handleSuccess){
  httpService.post(
    AddPublicCourseUrl,
    params,
    res=>{
      handleSuccess(res.data['data'])
    },
  )
}
module.exports = {
  getPublicCourseByName: getPublicCourseByName,
  addPublicCourse:addPublicCourse
}