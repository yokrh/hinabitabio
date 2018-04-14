import './style/app.css';
import './favicon.ico'

import Vue from 'Vue'
import VueRouter from 'vue-router'

import router from './router/router'
import AppBody from './AppBody.vue'
import Top from './pages/Top.vue'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  template: '<AppBody/>',
  components: { AppBody }
})
