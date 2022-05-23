import { createApp } from 'vue';
import store from './store';
import router from './router/index';
import '@/permission';
import '@/assets/styles/base.less';
import 'animate.css';
import '@/assets/styles/tailwind.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import './mock';
import App from './App.vue';
import iconFont from '@/components/iconFont.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 手机端控制台
// import Vconsole from 'vconsole';
// var vConsole = new Vconsole();

// const pinia = createPinia();
const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
  })
app.component('iconSvg', iconFont); // 注册全局图标
app.use(store).use(router).mount('#app');
