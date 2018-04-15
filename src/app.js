import './style/app.css'
import './image/cocona_02.png'
import './image/ibu05.jpg'
import './image/marika04.jpg'
import './image/meu00.png'
import './image/natsuhi_02.png'
import './image/rin06.jpg'
import './image/sakiko05.jpg'
import './image/marika_1.png'
import './favicon.ico'
import './serviceworker.js'
import './manifest.json'

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
