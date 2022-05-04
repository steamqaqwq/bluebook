<template>
  <div class="search_box">
    <div class="outer_box">
      <div class="filter_nav">
        <div class="filter_item" :class="{ active: index == curIndex }" v-for="(item, index) in navs" @click="changeType(item.type, index)">{{ item.title }}</div>
      </div>
      <div class="main_show">
        <component :is="comType"></component>
      </div>
    </div>
    <div class="ranks_show">
      <Rank></Rank>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Header from '@/components/header.vue';
  import search from '@/components/search.vue';
  import AllSearch from './AllSearch.vue';
  import UserSearch from './UserSearch.vue';
  import Rank from './Rank.vue';
  import { useRoute } from 'vue-router';

  import { ref, computed, onMounted } from 'vue';
  const curType = ref('all');
  const curIndex = ref(0);
  onMounted(() => {
    //获取路由当前key
    const key = useRoute().query.key;
    // console.log('当前搜索关键字为', key);
  });
  const navs = [
    { type: 'all', title: '全部' },
    { type: 'user', title: '用户' }
  ];
  const comType = computed(() => {
    return curType.value == 'all' ? AllSearch : UserSearch;
  });
  function changeType(type: string, index: number) {
    curType.value = type;
    curIndex.value = index;
  }
</script>

<style lang="less" scoped>
  .search_box {
    display: flex;
    flex-direction: row;
    max-width: 1100px;
    position: relative;
    margin: 0 auto;
    // background: #fff;
    .outer_box {
      width: 80%;
      margin-right: 30px;
    }
    // overflow: hidden;
    .filter_nav {
      display: flex;
      height: 60px;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .filter_item {
        font-weight: 400;
        font-size: 22px;
        margin-right: 20px;
        cursor: pointer;
        user-select: none;
        &:hover {
          color: @themecolor;
        }
      }
      .active {
        color: @themecolor;
      }
    }
  }
  .main_show {
    width: 100%;
  }
  .ranks_show {
    // position: fixed;
    // right: 20px;
  }
</style>
