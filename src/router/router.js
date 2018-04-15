import VueRouter from 'vue-router'
import Top from '../pages/Top.vue'

const routes = [
  { path: '', name: 'Top', component: Top },
  { path: '/page/:page', name: 'Page', component: Top }
];

export default new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
