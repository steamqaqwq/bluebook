<template>
  <div class="navmenu">
    <el-menu default-active="0">
      <el-menu-item v-for="(item, index) in navs" :key="item.id" :index="index.toString()" @click="emit('updateData', item.title)">
        <!-- <el-icon><icon-menu /></el-icon> -->
        <span class="iconfont text-xl mr-1" :class="[item.icon]"></span>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { navs } from '@/api/recommend';
  import { ref } from 'vue';
  import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
  const emit = defineEmits(['updateData']);
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
    user-select: none;
    // padding:10px;
    :deep(.el-menu) {
      border-right: none;
      border-radius: 15px;
      padding: 10px 0;
      background: linear-gradient(to bottom, rgb(213, 204, 204), @themecolor3);
      .el-menu-item {
        color: black;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    .is-active {
      background-color: #fff;
    }
    @media (max-width: @md) {
      :deep(.el-menu) {
        display: flex;
        border-radius: 0;
        background: none;
        padding: 0;
      }
      max-width: initial;
      width: 125%;
      margin-left: 0;
      overflow: initial;

      .is-active {
        background: linear-gradient(to bottom, rgb(213, 204, 204), @themecolor3);
      }
    }
  }
</style>
