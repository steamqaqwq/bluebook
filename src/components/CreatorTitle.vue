<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .title {
    font-size: 28px;
    font-weight: 400;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      margin-right: 3px;
      height: 18px;
      width: 5px;
      display: inline-block;
      background-color: @themecolor2;
      border-radius: 3px;
    }
  }
</style>
