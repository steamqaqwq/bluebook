import { createWebHistory, createRouter } from 'vue-router';
import Index from '@/views/Index/index.vue';
import Login from '@/views/Login/index.vue';
export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    meta: {
      title: ''
    }
  },
  {
    path: '/',
    name: 'index',
    alias: '/',
    component: Index,
    meta: {
      title: '首页',
      // index: 1
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

router.afterEach((to, from) => {
  // console.log('后置',to,from)
  (document as any).title = '小蓝书-'+to.meta.title || from.meta.title;
});
export default router;
