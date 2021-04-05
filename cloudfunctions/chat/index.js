// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const {
    type,
    userInfo,
    collectionname,
    data //{_id,username}
  } = event;

  const loveCollection = db.collection(collectionname);
  switch (type) {
    case "zan":
      // 首先查询
      return await loveCollection.doc(data._id).update({
        data: {
          zans: _.push({
            openid: wxContext.OPENID,
            name: data.username,
            createTime: db.serverDate(),
          })
        }
      })

      case "delete-zan":
        return await loveCollection.doc(data._id).update({
          data: {
            zans: _.pop({
              openid: wxContext.OPENID,
            })
          }
        })
        break;
    case "comment":
      return await loveCollection.doc(data._id).update({
        data: {
          comments: _.push({
            openid: wxContext.OPENID,
            comment: data.comment,
            createTime: db.serverDate(),
            username: data.username,
            userInfo: data.userInfo,
            toName: data.toName
          })
        }
      })
      break;

    case "delete":
      const result = cloud.deleteFile({
        fileList: data.fileIDs,
      })
      return await loveCollection.doc(data._id).remove()
      break;
    case "top":
      return await loveCollection.doc(data._id).update({
        data: {
          isTop: data.isTop
        },
      })
      break; 


  }

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}