import httpService from "./httpService";

import {  
  GetTodayFreeRoomUrl
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

module.exports = {
  getTodayFreeRoom: getTodayFreeRoom,
}