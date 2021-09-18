import httpService from "./httpService";

import {  
  GetWholeRandomFoodUrl,CommentByFoodidUrl,InsertCommentByFoodidUrl,ToggleLikeFoodUrl
} from "./constants";

function getWholeRandomFood(handleSuccess){
  httpService.get(
    GetWholeRandomFoodUrl,
    "",
    res=>{
      handleSuccess(res.data['data'])
    }) 
}

function toggleLike(foodId){
  httpService.post(
    ToggleLikeFoodUrl+"?foodId="+foodId,
    "",
    )
}

function getCommentByFoodid(foodId,handleSuccess){
  httpService.get(
    CommentByFoodidUrl+"?foodId="+foodId,
    "",
    res=>{
      handleSuccess(res.data['data'])
    }) 
}

function insertCommentByFoodid(params,handleSuccess){
  httpService.post(
    InsertCommentByFoodidUrl,
    params,
    res=>{
      handleSuccess(res.data['data'])
    }) 
}

module.exports = {
  getWholeRandomFood:getWholeRandomFood,
  getCommentByFoodid:getCommentByFoodid,
  insertCommentByFoodid:insertCommentByFoodid,
  toggleLike:toggleLike
}