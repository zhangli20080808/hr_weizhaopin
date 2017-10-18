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

window.onresize = function() {
  window.location.reload()
}

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
