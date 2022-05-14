<template>
  <div class="search">
    <input class="search_input" v-if="isShowInput" :style="{ width: width }" :class="{}" placeholder="搜你想搜" type="text" v-model="search_v" @keyup.enter="toSearch" />
    <span class="iconfont icon-search" @click="toSearch"></span>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  const props = withDefaults(
    defineProps<{
      width?: string;
      isShowInput?: boolean;
    }>(),
    {
      isShowInput: true
    }
  );
  const $router = useRouter();
  const search_v = ref('');
  const toSearch = () => {
    $router.push({
      name: 'search',
      query: {
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
      width: 150px;
      z-index: 100;
      border-radius: 3px;
      border: 1px solid #888;
      outline: none;
      transition: all 0.5s;
      &:hover {
        border: 1px solid @themecolor;
      }
      &:focus {
        border: 1px solid @themecolor;
        width: 200px;
      }
      @media (min-width: @lg) {
        width: 250px;
        height: 40px;
        &:focus {
          width: 300px;
        }
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
