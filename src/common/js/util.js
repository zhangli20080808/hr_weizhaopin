/**
 * 服务器地址
 * @return {String} url
 */


var user = "http://192.168.5.76:8088/hrm_test"; // 小辉测试本地
// var user = "http://192.168.5.76:8080/hrm"; // 小辉本地
// var user = "http://192.168.4.215:8090/hrm"; // 琦玉本地 
// var user = "http://192.168.4.10:8080/hrm"; // 丸子本地
// var user = "http://192.168.4.195:8080/hrm"; // 天明本地
// var user="http://121.199.182.2:30004/hrm"
// var user = "https://hr.ecbao.cn/hrm"; // 正式


exports.ukeyNo = false;//U盾的开关,正式:false,开发:true
exports.ukeyNo = true;//U盾的开关,正式:false,开发:true
exports.url = user + '/api.do';
exports.uploadURLForPay = user + '/upload.do?method=spwSalaryPay/leadSpwSalaryPays';//发送工资条上传专用
exports.uploadURLForCommon = user + '/upload.do?method=fileUpload/insertFileRecord';//文件上传公用
exports.downloadURL= user + '/download.do';//下载链接
exports.imgUploadURL= user + '/uploadUserHeadImg.do?method=fileUpload/uploadUserHeadImg';//上传头像

// 组织人事导入
exports.deptImportUrl = user + "/upload.do?method=department/importDepartment";
exports.quickImportUrl = user + "/upload.do?method=user/leadTemlate";
exports.staffImportUrl = user + "/upload.do?method=user/leadTemlate";
exports.dutyImportUrl = user + "/upload.do?method=dutyManage/importDutyData";
exports.postImportUrl = user + "/upload.do?method=positionManage/importPositionData";



/**
 * 请求方法method
 */

exports.methodStr = {
    duty: {
      tree: "dutyManage/getDutyTreeByParams",
      add: "dutyManage/addDutyInfo",
      delete: "dutyManage/delDutyInfo",
      update: "dutyManage/updateDutyInfo",
      query: "dutyManage/getDutyListByParams",
      dutyLevel: "dutyManage/getDutyLevelListByParams",
      dutyInfo: "dutyManage/getCompanyDutyInfoById",
      download: "dutyManage/exportDutyModelExcel",
      dataupload: "dutyManage/importDutyData",
      addDutyLevel: "dutyManage/addDutyLevel",
      updateDutyLevel: "dutyManage/updateDutyLevel",
      delDutyLevel: "dutyManage/delDutyLevel",
      exportDuty: "dutyManage/exportDutyListExcel",
      abilityRequire: {
        add: "dutyManage/addAbilityRequire",
        delete: "dutyManage/delAbilityRequire",
        update: "dutyManage/updateAbilityRequire",
        query: "dutyManage/getAbilityRequireListByParams",
        get: "getAbilityRequireById"
      }
    },
    org: {
      add: "department/addDepartment",
      delete: "department/delDepartment",
      update: "department/updateDepartment",
      queryList: "department/getDepartmentList",
      //    treeList: "department/getDepartmentTreeByCompanyId",
      treeList: "department/getCommonInfoByDepartmentTree",
      //人员编制
      personnalList: "departmentPersonNum/getDepartmentPersonNum",
      personnalAdd: "departmentPersonNum/addDepartmentPersonNum",
      personnalDelete: "departmentPersonNum/delDepartmentPersonNum",
      personnalUpdate: "departmentPersonNum/updateDepartmentPersonNum",
      //负责人列表
      principalList: "departmentPrincipal/getDepartmentPrincipal",
      principalAdd: "departmentPrincipal/addDepartmentPrincipal",
      principalDelete: "departmentPrincipal/delDepartmentPrincipal",
      principalUpdate: "departmentPrincipal/updateDepartmentPrincipal",
      //员工树形图
      getCommonInfoTree: "department/getCommonInfoByDepartmentTree",
      departmentList: "department/getDepartmentFramework",
      dataupload: "department/importDepartment",
      download: "department/downDeptModelExcel"
    },
    attendance:{
      query:'attendanceRule/getAttendanceRuleList',
      add:'attendanceRule/addAttendanceRule',
      detail:'attendanceRule/getAttendanceRuleDetail',
      dele:'attendanceRule/deleteAttendanceRule',
      update:'attendanceRule/updateAttendanceRule',
      queryDate:'attendanceRule/getSignRecords'
    },
    attendanceTj:{
      query:'signRecordCount/signRecordCountByDay',
      exports:"signRecordCount/exportSignRecordsByDay"
    },
    oaTask:{
      recall:"taskInfo/withdrawTaskInfos"
    }
}


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
