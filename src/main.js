import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as filter from './filter'
import Common from './common/utils.js';
Vue.config.productionTip = false
Vue.prototype.$api=api;
Vue.use(ElementUI);
Vue.use(Common);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
