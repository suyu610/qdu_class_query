import {
    Host
} from "./constants.js";
const app = getApp()

function myrequest(url, method, param, successCallback, failCallback) {
    if (app.globalData.debug) console.log('准备发起请求 :>> ', url);
    var that = this;
    let token = app.globalData.token

    if (token == "") token = wx.getStorageSync(app.globalData.tokenKey)

    wx.request({
        url: url,
        data: param,
        dataType: 'json',
        method: method,
        header: {
            'Authorization': 'Bearer ' + app.globalData.token
        },
        success: (res) => {
            if (res.data['status']['code'] == 200) {
                if (successCallback) {
                    successCallback(res);
                }
            }
            // 未授权
            if (res.data['status']['code'] == 502) {
                wx.login({
                    success(res) {
                        //发起网络请求
                        wx.request({
                            url: Host + "user/login/" + res.code,
                            method: "POST",
                            success(res) {
                                if (res.data['status']['code'] == 200) {
                                    wx.setStorageSync(app.globalData.tokenKey, res.data['data'])
                                    app.globalData.token = res.data['data']
                                    // 然后再发送重复的请求
                                    myrequest(url, method, param, successCallback, failCallback)
                                } else {
                                    console.log(res.data['status']['msg'])
                                }
                            },
                            fail(res) {
                                console.log(res)
                            }
                        })
                    }
                })
            }
            // 来自服务器的错误
            if (failCallback) {
                // 如果不是未授权，也不是200
                if (res.data['status']['code'] != 502 && res.data['status']['code'] != 200) {
                    wx.showToast({
                        icon: 'none',
                        title: res.data.status['msg'],
                        duration: 2000
                    })
                    failCallback(res);
                }
            }
        },
        fail: (res) => {
            wx.login({
                success(res) {
                    //发起网络请求
                    wx.request({
                        url: Host + "user/login/" + res.code,
                        method: "POST",
                        success(res) {
                            if (res.data['status']['code'] == 200) {
                                wx.setStorageSync(app.globalData.tokenKey, res.data['data'])
                                app.globalData.token = res.data['data']
                                that.myrequest()
                            } else {
                                console.log(res.data['status']['msg'])
                            }
                        },
                        fail(res) {
                            console.log(res)
                        }
                    })
                }
            })

            // 连接错误
            if (app.globalData.debug) console.log(res)
            if (failCallback) {
                failCallback(res);
            }
        }
    });
}

export default {
    get: function (url, param, success, fail) {
        return myrequest(Host + url, "GET", param, success, fail)
    },

    getSync: function (url, param) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "GET", param, resolve, reject)
        })
    },

    post: function (url, param, success, fail) {
        return myrequest(Host + url, "POST", param, success, fail)
    },

    postSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "POST", param, resolve, reject)
        })
    },

    put: function (url, param, success, fail) {
        return myrequest(Host + url, "PUT", param, success, fail)
    },

    putSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "PUT", param, resolve, reject)
        })
    },

    delete: function (url, param, success, fail) {
        return myrequest(Host + url, "DELETE", param, success, fail)
    },

    deleteSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "DELETE", param, resolve, reject)
        })
    }
}