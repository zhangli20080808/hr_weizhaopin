/**
 * 全局过滤器集合
 * Created by  yeqiu on 18/01/20
 */

import Vue from 'vue'


//时间过滤器,去掉时分秒
Vue.filter('date-filter', function(val) {
    if(val && typeof val == "string"){
        let date = val.substr(0,10)
        return date
    }else{
        return val
    }
})

//根据出生日期计算年龄
Vue.filter("gloBirthday",function(val){
     if(val && typeof val == "string"){
        let year = parseInt(val.substr(0,4))
        let nowYear = new Date().getFullYear()
        return (nowYear - year) + "岁";
     }else{
        return val;
     }
})

//学历的枚举值
Vue.filter("gloEducationLev",function(val){
    //1：博士 2：研究生 3：MBA ...
    let educationLevs = ["博士","研究生",'MBA','本科','大专','大学','高中','中专','技校','中技','初中','小学','其他','大专以下','硕士']
    if(val > educationLevs.length || val < 1){
        return '其他'
    }else{
        return educationLevs[val - 1]
    }
})

//婚姻的枚举值
Vue.filter("gloMarryStatus",function(val){
    //1：未婚 2：已婚 3：离异 4：保密
    let marryStatus = ["未婚","已婚 ",'离异','保密']
    if(val > marryStatus.length || val < 1){
        return '保密'
    }else{
        return marryStatus[val - 1]
    }
})

//工作性质的枚举值
Vue.filter("gloWorkType",function(val){
    //1:全职 2：兼职 3实习
    switch(val){
        case 0:
        case 1:
         return "全职";
        case 2:
         return "兼职";
        case 3:
         return "实习";
        default:
          break;
    }
})