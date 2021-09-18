import httpService from "./httpService";

import {
  MultiCourse_CreateRoomUrl,
  MultiCourse_GetRoomUrl,
  MultiCourse_UpdateRoomNameUrl,
  MultiCourse_UpdateRoomPwdUrl,

  MultiCourse_RemovePeopleFromRoomUrl,
  MultiCourse_DismissRoomUrl,
  MultiCourse_SearchRoomByIdUrl,
  MultiCourse_JoinRoomUrl,
  MultiCourse_ExitRoomUrl,
  MultiCourse_GetRoomDetailUrl
} from "./constants";



function removePeople(handleSuccess, handleFail, roomId, stuNumber) {
  httpService.get(
    MultiCourse_RemovePeopleFromRoomUrl + roomId + "/" + stuNumber,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFail(er.data['msg'])
    });
}



function createRoom(handleSuccess, data) {
  httpService.post(
    MultiCourse_CreateRoomUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}


function getRoom(handleSuccess) {
  httpService.get(
    MultiCourse_GetRoomUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}


function updateRoomName(handleSuccess, handleFail, roomId, roomName) {
  httpService.get(
    MultiCourse_UpdateRoomNameUrl + roomId + "/" + roomName,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFail(er.data['msg'])
    });
}

function updateRoomPwd(handleSuccess, handleFail, roomId, roomName) {
  httpService.get(
    MultiCourse_UpdateRoomPwdUrl + roomId + "/" + roomName,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFail(er.data['msg'])
    });
}


function dissmissRoom(handleSuccess, handleFail, roomId) {
  httpService.get(
    MultiCourse_DismissRoomUrl + roomId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFail(er.data['msg'])
    });
}


function searchRoomById(handleSuccess, handleFail, roomId) {
  httpService.get(
    MultiCourse_SearchRoomByIdUrl + roomId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFail(er.data['msg'])
    });
}

function joinRoom(handleSuccess, handleFail, data) {
  httpService.post(
    MultiCourse_JoinRoomUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFail(er.data['msg'])
    });
}

function exitRoom(handleSuccess, handleFail, roomId) {
  httpService.get(
    MultiCourse_ExitRoomUrl + roomId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFail(er.data['msg'])
    });
}

function getRoomDetail(handleSuccess, handleFail, roomId) {
  httpService.get(
    MultiCourse_GetRoomDetailUrl + roomId,
    "",
    res => {
      handleSuccess(res)
    },
    er => {
      handleFail(er.data['msg'])
    });
}





module.exports = {
  removePeople,
  createRoom,
  getRoom,
  dissmissRoom,
  searchRoomById,
  joinRoom,
  exitRoom,
  getRoomDetail,
  updateRoomPwd,
  updateRoomName
}