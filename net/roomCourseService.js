import httpService from "./httpService";

import {
  GetRoomCourseUrl
} from "./constants";


function getRoomCourseRequest(cname,whichWeek,handleSuccess) {
  httpService.post(
    GetRoomCourseUrl +"/"+ cname +"/"+ whichWeek,
    "",
    res=>{
      handleSuccess(res.data['data'])
    },
    er=>{
    });
}

module.exports = {
  getRoomCourseRequest: getRoomCourseRequest,
}