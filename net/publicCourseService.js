import httpService from "./httpService";

import {
  GetPublicCourseByNameUrl,
  AddPublicCourseUrl,
  GetAllMajorUrl,
  GetMajorDetailUrl,
  GetMajorClassCourseUrl,
  GetMajorClassUrl
} from "./constants";


function getPublicCourseByName(courseName, seq, week, campuses, index, handleSuccess, handleError) {
  httpService.get(
    GetPublicCourseByNameUrl + "/" + courseName + "/" + seq + "/" + week + "/" + campuses + "/" + index,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleError()
    });
}

function addPublicCourse(params, handleSuccess) {
  httpService.post(
    AddPublicCourseUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
  )
}


function GetMajorClassCourse(classId, handleSuccess) {
  httpService.get(
    GetMajorClassCourseUrl + classId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
  )
}

function GetMajorClass(majorId, handleSuccess) {
  httpService.get(
    GetMajorClassUrl + majorId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
  )
}


function GetAllMajor(handleSuccess) {
  httpService.get(
    GetAllMajorUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
  )
}

function GetMajorDetail(handleSuccess, data) {
  httpService.post(
    GetMajorDetailUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    },
  )
}

module.exports = {
  getPublicCourseByName,
  addPublicCourse,
  GetAllMajor,
  GetMajorDetail,
  GetMajorClassCourse,
  GetMajorClass
}