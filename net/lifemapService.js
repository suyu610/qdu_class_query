import httpService from "./httpService";

import {
  getInitDataUrl,
  getStoresByListIdUrl,
  getCommentsByStoreIdUrl,
  submitStoreCommentUrl,
  submitReplyStoreCommentUrl,
  getMultiGoodListByStoreIdUrl,
  getUserAllUnreadMsgUrl,
  getGoodDetailByGoodIdUrl,
  addStoreCommentUrl,
  addFeedbackUrl,
  addStoreUrl,
  addStarCommentUrl,
  deleteCommentUrl
} from "./constants";


function deleteComment(commentId, handleSuccess) {
  httpService.get(
    deleteCommentUrl + commentId,
    "",
    res => {
      handleSuccess(res.data['data'])
    })
}

function getInitData(handleSuccess) {
  httpService.get(
    getInitDataUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    })
}

function getStoresByListId(listId, handleSuccess) {
  httpService.get(
    getStoresByListIdUrl + listId,
    "",
    res => {
      handleSuccess(res.data['data'])
    })
}

function getCommentsByStoreId(shopId, handleSuccess) {
  httpService.get(
    getCommentsByStoreIdUrl + shopId,
    "",
    res => {
      handleSuccess(res.data['data'])
    })
}

function submitStoreComment(data, handleSuccess) {
  httpService.post(
    submitStoreCommentUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    })
}

function submitReplyStoreComment(data, handleSuccess) {
  httpService.post(
    submitReplyStoreCommentUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    })
}


module.exports = {
  getInitData,
  getStoresByListId,
  getCommentsByStoreId,
  submitStoreComment,
  submitReplyStoreComment,
  deleteComment
}