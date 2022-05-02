<template>
  <div class="search">
    <input class="search_input" type="text" v-model="search_v" />
    <span class="iconfont icon-search" @click="toSearch" @keydown.enter="toSearch"></span>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  const $router = useRouter();
  const search_v = ref('');
  const toSearch = () => {
    $router.push({
      name: 'search',
      params: {
        key: search_v.value
      }
    });
  };
</script>

<style lang="less" scoped>
  .search {
    position: relative;
    .search_input {
      margin: 5px 0;
      padding: 1px 10px;
      width: 200px;
      border-radius: 3px;
      border: 1px solid #888;
      outline: none;
      transition: all 0.5s;
      &:hover,
      &:focus {
        border: 1px solid @themecolor;
        width: 300px;
      }
    }

    .icon-search {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      &:hover {
        color: @themecolor2;
      }
    }
  }
</style>
