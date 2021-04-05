import httpService from "./httpService";

import {  
  GetCountdownAfterTodayUrl
} from "./constants";

function getCountdownAfterToday(handleSuccess){
  httpService.get(
    GetCountdownAfterTodayUrl,
    "",
    res=>{
      handleSuccess(res.data['data'])
    })    
}

module.exports = {
  getCountdownAfterToday:getCountdownAfterToday}