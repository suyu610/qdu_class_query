import httpService from "./httpService";

import {
  Faq_GetFaqInitDataUrl,
  Faq_GetFaqListUrl,
} from "./constants";



function Faq_GetFaqInitData(handleSuccess) {
  httpService.get(
    Faq_GetFaqInitDataUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

function Faq_GetFaqList(listId, handleSuccess) {
  httpService.get(
    Faq_GetFaqListUrl + listId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

module.exports = {
  Faq_GetFaqInitData,
  Faq_GetFaqList
}