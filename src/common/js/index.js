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


export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
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
  return obj;
}


