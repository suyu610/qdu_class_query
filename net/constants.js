// export const Host =  'http://localhost:4396/v1/';
export const Host = 'https://api.qdu.life/v1/';
// export const Host = 'http://10.195.129.148:4396/v1/';


export const GetRoomCourseUrl = 'roomshedule/single';

////////////
/// 天气 ///
///////////

// 获取天气信息
export const GetWeatherUrl = 'weather/today';

////////////////
/// 教室状态 ///
///////////////

// 反馈
export const FeedBackUrl = 'feedback/postnew'

// 查询
export const GetTodayFreeRoomUrl = 'class/sequence/today/'

// 详细查询明天的
export const getTomorrowDetailRoomStatusUrl = 'classroomstatus/tomorrow'

// 详细查询今天的
export const getTodayDetailRoomStatusUrl = 'classroomstatus/today'

// 详细查询未来的
export const getDetailRoomStatusUrl = 'classroomstatus/future'

///////////////
/// 个人课表 ///
////////////// 

// 获得个人教务课表
export const GetMyJwCourseUrl = 'user/getCourse/'
export const getMyAddCourseUrl = 'user/getAddCourse/'
export const GetFriendJwCourseUrl = 'user/getCourse/friend/'
export const CheckBindFriendUrl = 'user/checkBindFriend/'
export const CheckTokenAndBindUrl = 'user/checkTokenAndBind'
export const DismissFriendUrl = 'user/dismissFriend'

///////////////
//// 用户 /////
//////////////

// 更新
export const UpdateUserinfoUrl = 'user/updateInfo/'
export const LoginByTokenUrl = 'user/loginByToken'
export const CheckImportFromJwUrl = 'user/checkImportFromJw'


//////////////
/// 小目标 ///
////////////

/// 个人
export const GetAllPrivateFlagUrl = 'flag/private/get_all'
export const InsertNewPrivateFlagUrl = 'flag/private/insert'
export const DeletePrivateFlagUrl = 'flag/private/delete/'

// 翻转私人目标的公开性
export const TogglePrivacyFlagUrl = 'flag/private/toggleprivacy/'

/// 公共
export const GetPublicRandomFlagUrl = 'flag/public/random'
export const GetPublicAllFlagUrl = 'flag/public/all'
// 给公共小目标点赞，参数为该目标id，如果已经点赞，则为取消点赞
export const TogglePublicLikeFlagUrl = 'flag/public/togglelike'

////////////
/// 消息 ///
///////////

////////////
/// 课程 ///
///////////
export const GetPublicCourseByNameUrl = 'course/getCourseByName'
export const AddPublicCourseUrl = 'course/addPublicCourse'
export const GetAllMajorUrl = 'course/getAllMajor'
export const GetMajorDetailUrl = 'course/getMajorDetail/'
export const GetMajorClassCourseUrl = 'course/getMajorClassCourse/'
export const GetMajorClassUrl = 'course/getMajorClass/'


///////////////
/// 课程闹钟 ///
//////////////

export const CheckSubscribeUrl = 'user/checkSubscribe'
export const CloseAlarmUrl = 'user/closeAlarm'


////////////
/// 公告 ///
///////////

export const GetDialogUrl = 'dialog/getNewDialog'

////////////
/// 倒计时 ///
///////////
export const GetCountdownAfterTodayUrl = 'countdown/get/after_today'

////////////////////
/// 今天吃什么相关 ///
///////////////////

export const GetWholeRandomFoodUrl = 'eat/allfood'
export const CommentByFoodidUrl = 'eat/comment'
export const InsertCommentByFoodidUrl = 'eat/insertcomment'
export const ToggleLikeFoodUrl = 'eat/togglelike'

////////////////////
/// 多人课表相关  ///
////////////////////

export const MultiCourse_CreateRoomUrl = 'multicourse/createRoom/'
export const MultiCourse_UpdateRoomNameUrl = 'multicourse/updateRoomName/'
export const MultiCourse_UpdateRoomPwdUrl = 'multicourse/updateRoomPwd/'

export const MultiCourse_RemovePeopleFromRoomUrl = 'multicourse/removePeopleFromRoom/'
export const MultiCourse_DismissRoomUrl = 'multicourse/dismissRoom/'

export const MultiCourse_SearchRoomByIdUrl = 'multicourse/searchRoomById/'
export const MultiCourse_GetRoomUrl = 'multicourse/getRoom/'
export const MultiCourse_JoinRoomUrl = 'multicourse/joinRoom/'
export const MultiCourse_ExitRoomUrl = 'multicourse/exitRoom/'
export const MultiCourse_GetRoomDetailUrl = 'multicourse/getRoomDetail/'



/////////////////
///  faq相关  ///
////////////////
export const Faq_GetFaqInitDataUrl = 'faq/getFaqInitData/'
export const Faq_GetFaqListUrl = 'faq/getFaqList/'
