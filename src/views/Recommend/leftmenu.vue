<template>
  <div class="navmenu">
    <el-menu default-active="0">
      <el-menu-item v-for="(item, index) in navs" :key="item" :index="index.toString()">
        <el-icon><icon-menu /></el-icon>
        <template #title>{{ item }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { navs } from '@/api/recommend';
  import { ref } from 'vue';
  import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
</script>

<style lang="less" scoped>
  .navmenu {
    margin-left: 20px;
    border-radius: 5px;
    // border: 1px solid @themecolor2;
    padding: 1px;
    max-width: 100px;
    position: sticky;
    overflow: hidden;
    top: 10%;
    z-index: 100;
    // padding:10px;
    :deep(.el-menu) {
      border-right: none;
      .el-menu-item {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    @media (max-width: @md) {
      :deep(.el-menu) {
        display: flex;
      }
      margin-left: 0;
      overflow: initial;
    }
  }
</style>
