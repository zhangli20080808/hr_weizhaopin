/**
 * Created by liliwa on 17/10/7.
 */
//->REM
~function () {
  var desW = 750,
    winW = document.documentElement.clientWidth || document.body.clientWidth;
  if (winW > desW) {
    document.getElementById('app').style.width = desW + 'px';
    return;
  }
  document.documentElement.style.fontSize = winW / desW * 100 + 'px';
}()

export function dateFormat(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */

export function urlParse() {

  let url = window.location.search;
  let obj = {};
  //正则匹配 匹配？&^非+多个  对应    包含？&的字符 后面  非^&的字符 一个或者多个  等号连接
  let reg = /[?&][^?&]+=[^?&]+/g;
  //返回一个数组
  // ['？id=12345','&a=b']
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      //substring字符串 截取
      let tempArr = item.substring(1).split('=');
      //这里我们需要调用一个decode  因为是url参数
      let key = decodeURIComponent(tempArr[0]);

      let val = decodeURIComponent(tempArr[1]);

      obj[key] = val;
    });
  }
  console.log(obj)
  return obj;
}
