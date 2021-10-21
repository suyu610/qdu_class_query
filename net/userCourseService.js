import httpService from "./httpService";

import {
  GetMyJwCourseUrl,
  CheckBindFriendUrl,
  UpdateUserinfoUrl,
  GetFriendJwCourseUrl,
  CheckTokenAndBindUrl,
  getMyAddCourseUrl,
  DismissFriendUrl,
} from "./constants";


function getFriendJwCourse(handleSuccess) {
  httpService.get(
    GetFriendJwCourseUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

function dismissFriend(handleSuccess) {
  httpService.get(
    DismissFriendUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    })
}

function checkTokenAndBind(params, handleSuccess) {
  httpService.post(
    CheckTokenAndBindUrl, {
      "token": params
    },
    res => {
      handleSuccess(res.data['data'])
    })
}

function getMyJwCourse(handleSuccess) {
  httpService.get(
    GetMyJwCourseUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

function getMyAddCourse(handleSuccess) {
  httpService.get(
    getMyAddCourseUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

// 判断用户是否已经绑定好友，若已绑定，则返回-1，如果没有，则返回一串临时字符串。
function checkBindFriend(handleSuccess) {
  httpService.get(
    CheckBindFriendUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    }, )
}


function updateUserinfo(params) {
  httpService.post(
    UpdateUserinfoUrl, params)
}

module.exports = {
  getMyJwCourse: getMyJwCourse,
  checkBindFriend: checkBindFriend,
  updateUserinfo: updateUserinfo,
  getFriendJwCourse: getFriendJwCourse,
  checkTokenAndBind: checkTokenAndBind,
  getMyAddCourse: getMyAddCourse,
  dismissFriend: dismissFriend
}