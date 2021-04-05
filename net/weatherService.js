import httpService from "./httpService";

import {
  GetWeatherUrl
} from "./constants";



function getWeatherRequest(handleSuccess) {
  httpService.get(
    GetWeatherUrl,
    "",
    res=>{
      handleSuccess(res.data['data'])
    },
    er=>{

    });
}

module.exports = {
  getWeatherRequest: getWeatherRequest,
}