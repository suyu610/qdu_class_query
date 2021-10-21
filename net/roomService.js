import httpService from "./httpService";

import {
  GetTodayFreeRoomUrl,
  getTodayDetailRoomStatusUrl,
  getTomorrowDetailRoomStatusUrl,
  getDetailRoomStatusUrl
} from "./constants";



function getTodayFreeRoom(param, handleSuccess) {
  httpService.post(
    GetTodayFreeRoomUrl + param,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

function getTodayDetailRoomStatus(params, handleSuccess) {
  httpService.post(
    getTodayDetailRoomStatusUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

function getTomorrowDetailRoomStatus(params, handleSuccess) {
  httpService.post(
    getTomorrowDetailRoomStatusUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

function getDetailRoomStatus(params, handleSuccess) {
  httpService.post(
    getDetailRoomStatusUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

module.exports = {
  getTodayFreeRoom,
  getTomorrowDetailRoomStatus,
  getTodayDetailRoomStatus,
  getDetailRoomStatus
}