import httpService from "./httpService";

import {
  LoginByTokenUrl,
  CheckImportFromJwUrl
} from "./constants";

function LoginByToken(handleSuccess, handleFail, data) {
  httpService.post(
    LoginByTokenUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    },
    fail => {
      handleFail(fail.data.status.msg)
    })
}

function CheckImportFromJw(handleSuccess, handleFail) {
  httpService.get(
    CheckImportFromJwUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    fail => {
      handleFail(fail.data.status.msg)
    })
}

module.exports = {
  LoginByToken,
  CheckImportFromJw
}