/**
 * 服务器地址
 * @return {String} url
 */

var user = "http://192.168.5.76:8089/hrm_test"; // 小辉测试本地

var user = "http://192.168.5.76:8080/hrm"; // 小辉本地
// var user = "http://192.168.4.215:8090/hrm"; // 琦玉本地
// var user = "http://192.168.4.186:8080/hrm"; // 丸子本地
// var user = "http://192.168.4.195:8080/hrm"; // 天明本地
// var user = "http://192.168.4.87:8080/hrm"; // 江流本地
// var user = "http://192.168.4.65:8080/hrm";  //鹿丸

// var user="http://121.199.182.2:30004/hrm" //测试

// var user="http://121.199.182.2:30004/hrm" //测试

// var user = "https://aijuhr.com/hrm"; // 正式环境


exports.url = user + '/api.do';
exports.loginUrl=user+'/account/climbingResume.do';//新接口登录
exports.uploadURLForCommon = user + '/upload.do?method=fileUpload/insertFileRecord';//文件上传公用
exports.downloadURL= user + '/download.do';//下载链接

// 组织人事导入
exports.deptImportUrl = user + "/upload.do?method=department/importDepartment";
exports.quickImportUrl = user + "/upload.do?method=user/leadTemlate";
exports.staffImportUrl = user + "/upload.do?method=user/leadTemlate";
exports.dutyImportUrl = user + "/upload.do?method=dutyManage/importDutyData";
exports.postImportUrl = user + "/upload.do?method=positionManage/importPositionData";

//微信获取code
exports.wxUrl=user+"/weixin/getCode.do";
exports.wxSignature=user+"/weixin/js/getSignature.do"

//员工没有头像显示的默认背景颜色
exports.noHeadImage = {
  A:"#97c5e8",
  B:"#9acbe1",
  C:"#84d1d9",
  D:"#f2b591",
  E:"#e3c097",
  F:"#b9a29a",
  G:"#97c5e8",
  H:"#9acbe1",
  I:"#84d1d9",
  J:"#f2b591",
  K:"#e3c097",
  L:"#b9a29a",
  M:"#97c5e8",
  N:"#9acbe1",
  O:"#84d1d9",
  P:"#f2b591",
  Q:"#e3c097",
  R:"#b9a29a",
  S:"#97c5e8",
  T:"#9acbe1",
  U:"#84d1d9",
  V:"#f2b591",
  W:"#e3c097",
  X:"#b9a29a",
  Y:"#97c5e8",
  Z:"#9acbe1",
}
