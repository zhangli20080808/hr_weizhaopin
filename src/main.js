// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'common/js/index'
import moment from 'moment'
import Methods from 'common/js/methods'
import Filters from 'common/js/filters'
import { WechatPlugin, AlertPlugin, ToastPlugin,ConfirmPlugin } from 'vux'
import 'components/css/main.css'

Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin,{position: 'top'});
Vue.use(WechatPlugin);
Vue.use(Methods);
Vue.use(VueAwesomeSwiper);
Vue.use(ConfirmPlugin);
Vue.config.productionTip = false


import 'common/stylus/index.styl'

Vue.use(ElementUI)


Object.defineProperty(Vue.prototype, '$moment', { value: moment });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  template: '<App/>',
  components: { App },

})

