import httpService from "./httpService";

import {  
  CheckSubscribeUrl,CloseAlarmUrl
} from "./constants";

function checksubscribe(hour,mins,handleSuccess){
  httpService.get(
    CheckSubscribeUrl+"/"+hour+"/"+mins,
    "",
    res=>{
      handleSuccess(res.data['data'])
    })    
}

function closeAlarm(handleSuccess){
  httpService.get(
    CloseAlarmUrl,
    "",
    res=>{
      handleSuccess(res.data['data'])
    })
}

module.exports = {
  checksubscribe:checksubscribe,
  closeAlarm:closeAlarm
}