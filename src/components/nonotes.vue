<template>
  <div class="no_notes">
    <div class="bg"></div>
    <div class="bg_tips">暂无任何笔记~</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .no_notes .bg {
    height: 100px;
    width: 100px;
    margin: 0 auto;
    background: url('@/assets/images/no_notes.png') no-repeat center;
  }
  .no_notes .bg_tips {
    color: gray;
    user-select: none;
  }
</style>
