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
