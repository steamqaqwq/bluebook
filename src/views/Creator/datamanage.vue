<template>
  <div class="outerbox">
    <div class="inner_box">
      <creator-title>笔记数据</creator-title>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreatorTitle from '@/components/CreatorTitle.vue';
</script>

<style lang="less" scoped>
  .outerbox {
    padding: 20px;
    box-sizing: border-box;
    min-height: 650px;
    min-width: 1000px;
    width: auto;
    border-radius: 8px;
  }
</style>
