<template>
  <Header></Header>
  <div class="main">
    <div class="left-menu">
      <leftmenu></leftmenu>
    </div>
    <div class="right-content"></div>
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/header.vue';
  import leftmenu from './leftmenu.vue';
</script>

<style lang="less" scoped>
  .main {
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: #edf0f8;
  }
  .left-menu {
    width: 210px;
    height: 100%;
    background-color: white;
  }
  .right-content {
    margin-left: 20px;
    width: 100%;
    height: 100%;
  }
</style>
