<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <anime></anime> -->
  <router-view></router-view>
</template>
<script setup lang="ts"></script>

<style>
  html,
  body {
    height: 100%;
  }
  #app {
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    /* font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
</style>
