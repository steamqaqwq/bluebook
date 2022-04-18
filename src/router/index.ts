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
      title: '首页'
    },
    children: [
      {
        path: '/fav',
        name: 'fav',
        component: () => import('@/views/Fav/index.vue'),
        meta: {
          title: '关注'
        }
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: () => import('@/views/Recommend/index.vue'),
        meta: {
          title: '发现'
        }
      },
      {
        path: '/nearby',
        name: 'nearby',
        component: () => import('@/views/Nearby/index.vue'),
        meta: {
          title: '附近'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

router.afterEach((to, from) => {
  // console.log('后置',to,from)
  (document as any).title = '小蓝书-' + to.meta.title || from.meta.title;
});
export default router;
