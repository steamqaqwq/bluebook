<template>
  <div class="containerbox">
    <div class="leftNav">
      <left-nav></left-nav>
    </div>
    <div class="showItems">
      <main-show></main-show>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LeftNav from './leftmenu.vue';
  import mainShow from './mainshow.vue';
</script>

<style lang="less" scoped>
  .containerbox {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .showItems {
    width: 100%;
  }
</style>
