<template>
  <div class="navmenu">
    <el-menu default-active="0" :default-openeds="['2']">
      <el-menu-item @click="$router.push({ name: 'uploadimg' })">
        <router-link :to="{ name: 'uploadimg' }"> 发布图文 </router-link>
      </el-menu-item>
      <el-menu-item @click="$router.push({ name: 'uploadvideo' })">
        <router-link :to="{ name: 'uploadvideo' }"> 发布视频 </router-link>
      </el-menu-item>
      <el-menu-item index="0" @click="$router.push({ name: 'home' })">
        <el-icon><house /></el-icon>
        <template #title> 首页</template>
      </el-menu-item>
      <el-menu-item index="1" @click="$router.push({ name: 'notemanage' })">
        <el-icon><tickets /></el-icon>
        <template #title>笔记管理</template>
      </el-menu-item>
      <!-- <el-sub-menu index="2">
        <template #title>
          <span style="margin-right: 0.5rem; margin-left: 0.25rem" class="iconfont icon-data text-xl"></span>
          <span class="text-xl">数据看板</span>
        </template>
        <el-menu-item index="2-1" @click="$router.push({ name: 'datamanage' })">
          <el-icon><icon-menu /></el-icon>
          <template #title>笔记数据</template>
        </el-menu-item>
        <el-menu-item index="2-2"
          ><el-icon><icon-menu /></el-icon> <template #title>粉丝数据</template>
        </el-menu-item>
      </el-sub-menu> -->
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { navs } from '@/api/recommend';
  import { ref } from 'vue';
  import { Tickets, Menu as IconMenu, House, Setting } from '@element-plus/icons-vue';
  import { useRouter, useRoute } from 'vue-router';
  const $router = useRouter();
  const $route = useRoute();
</script>

<style lang="less" scoped>
  /deep/.el-menu {
    border-right: none;
  }
  .navmenu {
    padding: 10px 0;
    width: 210px;
    /deep/.el-menu-item,
    /deep/.el-sub-menu {
      font-size: 20px;
      font-weight: 300;
      border-bottom: 1px solid #eee;
    }
    /deep/.el-sub-menu .el-menu-item {
      border-bottom: none;
    }
    a:nth-child(-n + 1) {
      display: block;
      width: 176px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      text-align: center;
      background: #3a64ff;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
