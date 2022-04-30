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
    path: '/userbrief',
    component: () => import('@/views/Userbrief/index.vue'),
    meta: {
      // title: ''
    }
  },
  {
    path: '/',
    name: 'index',
    alias: '/',
    redirect: 'recommend',
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
          title: '关注',
          index: 1
        }
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: () => import('@/views/Recommend/index.vue'),
        meta: {
          title: '发现',
          index: 2
        }
      },
      {
        path: '/nearby',
        name: 'nearby',
        component: () => import('@/views/Nearby/index.vue'),
        meta: {
          title: '附近',
          index: 3
        }
      },
      {
        path: 'notedetail',
        name: 'notedetail',
        component: () => import('@/views/Notedetail/index.vue'),
        meta: {
          title: '接受参数'
        }
      }
    ]
  }
];
// 创作中心
const creatorRoute = [
  {
    path: '/creator',
    component: () => import('@/views/Creator/index.vue'),
    meta: {
      title: '创作者中心'
    },
    children: [
      {
        path: '/creator/uploadvideo',
        name: 'uploadvideo',
        component: () => import('@/views/Creator/video-upload.vue'),
        meta: {
          title: '视频上传'
        }
      },
      {
        path: '/creator/imgupload',
        name: 'uploadimg',
        component: () => import('@/views/Creator/img-upload.vue'),
        meta: {
          title: '图文上传'
        }
      },
      {
        path: '/creator/home',
        name: 'home',
        component: () => import('@/views/Creator/home.vue'),
        meta: {
          // title: ''
        }
      },
      {
        path: '/creator/notemanage',
        name: 'notemanage',
        component: () => import('@/views/Creator/notemanage.vue'),
        meta: {
          // title: '图文上传'
        }
      },
      {
        path: '/creator/datamanage',
        name: 'datamanage',
        component: () => import('@/views/Creator/datamanage.vue'),
        meta: {
          // title: '图文上传'
        }
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...creatorRoute]
});

router.afterEach((to, from) => {
  // console.log('后置',to,from)
  (document as any).title = '小蓝书-' + to.meta.title || from.meta.title;
});
export default router;
