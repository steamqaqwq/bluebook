import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import '@/permission' 
import '@/assets/styles/base.less';
import 'animate.css';
import '@/assets/styles/tailwind.css';
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import './mock'
import App from './App.vue';
const pinia = createPinia();
const app = createApp(App).use(pinia).use(router).mount('#app');
