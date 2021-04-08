import httpService from "./httpService";

import {  
  GetTodayFreeRoomUrl,getTodayDetailRoomStatusUrl,getTomorrowDetailRoomStatusUrl
} from "./constants";



function getTodayFreeRoom(param,handleSuccess) {
  httpService.post(
    GetTodayFreeRoomUrl+param,
    "",
    res=>{
      handleSuccess(res.data['data'])
    },
    er=>{

    });
}

function getTodayDetailRoomStatus(params,handleSuccess) {
  httpService.post(
    getTodayDetailRoomStatusUrl,
    params,
    res=>{
      handleSuccess(res.data['data'])
    },
    er=>{

    });
}
function getTomorrowDetailRoomStatus(params,handleSuccess) {
  httpService.post(
    getTomorrowDetailRoomStatusUrl,
    params,
    res=>{
      handleSuccess(res.data['data'])
    },
    er=>{

    });
}
module.exports = {
  getTodayFreeRoom: getTodayFreeRoom,
  getTomorrowDetailRoomStatus:getTomorrowDetailRoomStatus,
  getTodayDetailRoomStatus:getTodayDetailRoomStatus
}