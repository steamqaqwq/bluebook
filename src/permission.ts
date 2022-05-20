import router from './router';
import store from './store';
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/error']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  //   NProgress.start()
  // set page title
  //   document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()
  const hasToken = sessionStorage.getItem('token') || getToken();
  // console.log('hasToken',hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    // 未登录
    // 测试放行
    next();
    if (whiteList.indexOf(to.path) !== -1) {
      // 非白名单直接过
      next();
    } else {
      // 否则返回登录页
      // next()
      next(`/login?redirect=${to.path}`);
      //   NProgress.done()
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  //   NProgress.done()
});
