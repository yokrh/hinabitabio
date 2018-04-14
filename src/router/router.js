import VueRouter from 'vue-router'
import Top from '../pages/Top.vue'

const routes = [
  { path: '', name: 'Top', component: Top }
];

export default new VueRouter({
    routes
})
