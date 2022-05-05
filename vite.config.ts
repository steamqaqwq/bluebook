import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// element plus 自动按需导入
// @ts-ignore
import AutoImport from 'unplugin-auto-import/vite';
// @ts-ignore
import Components from 'unplugin-vue-components/vite';
// @ts-ignore
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// mock serve
import { viteMockServe } from 'vite-plugin-mock';
const localEnabled: boolean = process.env.NODE_ENV === 'development' || false;
const prodEnabled: boolean = process.env.NODE_ENV === 'production' || false;
//setup增强
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './src/mock',
      supportTs: true, //如果使用 js发开，则需要配置 supportTs 为 false
      localEnabled: localEnabled,
      prodEnabled: prodEnabled,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue'] //自动引入vue3常用api
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    //setup增强
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '*': path.resolve('')
    }
  },
  css: {
    // 配置全局less
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/base.less')}";`
      }
    }
  },
  server: {
    proxy: {
      '/baiduapi': {
        target: 'http://api.map.baidu.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baiduapi/, '')
      }
    }
  }
});
