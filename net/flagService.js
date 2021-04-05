import httpService from "./httpService";

import {  
  GetPublicRandomFlagUrl, InsertNewPrivateFlagUrl,TogglePublicLikeFlagUrl,GetAllPrivateFlagUrl,TogglePrivacyFlagUrl,DeletePrivateFlagUrl
} from "./constants";


function getAllPrivateFlag(handleSuccess){
  httpService.get(
    GetAllPrivateFlagUrl,
    "",
    res=>{
      handleSuccess(res.data['data'])
    })    
}

function getPublicRandomFlag(handleSuccess) {
  httpService.get(
    GetPublicRandomFlagUrl,
    "",
    res=>{
      handleSuccess(res.data['data'])
    });
}

function insertPrivateFlag(params,handleSuccess){
  httpService.post(
    InsertNewPrivateFlagUrl,
    params,
    res=>{
      handleSuccess(res.data)
    });
}


function togglePublicLikeFlag(params){
  httpService.get(
    TogglePublicLikeFlagUrl + "/" +params,
    "",
   );
}
function togglePrivate(params,handleSuccess){
  httpService.get(
    TogglePrivacyFlagUrl + params,"",
    res=>{
      handleSuccess(res.data.data)
    }
  )
}

function deletePrivateFlag(params,handleSuccess){
  httpService.get(
    DeletePrivateFlagUrl + params,"",
    res=>{
      handleSuccess(res.data.data)
    }
  )
}
module.exports = {
  getPublicRandomFlag: getPublicRandomFlag,
  insertPrivateFlag:insertPrivateFlag,
  togglePublicLikeFlag:togglePublicLikeFlag,
  getAllPrivateFlag:getAllPrivateFlag,
  togglePrivate:togglePrivate,
  deletePrivateFlag:deletePrivateFlag

}