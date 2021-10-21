import httpService from "./httpService";

import {
  CheckSubscribeUrl,
  CloseAlarmUrl
} from "./constants";

function checksubscribe(handleSuccess, params) {
  httpService.post(
    CheckSubscribeUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    })
}

function closeAlarm(handleSuccess) {
  httpService.get(
    CloseAlarmUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    })
}

module.exports = {
  checksubscribe,
  closeAlarm
}