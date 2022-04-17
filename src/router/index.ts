import { createWebHistory, createRouter } from 'vue-router';
import Index from '@/views/Index/index.vue';
import Login from '@/views/Login/index.vue';
export const constantRoutes = [
  {
    path: '/',
    component: Login,
    meta: {
      title: '首页'
    }

    // children: [
    //   //主页面内容
    //   {
    //     path: '/main',
    //     name: 'main',
    //     alias: '/',
    //     component: () => import('@/views/Index/main.vue'),
    //     meta: {
    //       title: '首页',
    //       index: 1
    //     }
    //   }
    // ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

router.afterEach((to, from) => {
  // console.log('后置',to,from)
  (document as any).title = to.meta.title || from.meta.title;
});
export default router;
