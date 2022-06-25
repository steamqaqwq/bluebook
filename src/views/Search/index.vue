<template>
  <div class="search_box">
    <div class="outer_box">
      <div class="search_plus">
        <search ref="searchElem" width="100%" @getData="getData" v-model:key="key"></search>
      </div>
      <div class="search_guess_history" v-if="searchTips && !key">
        <p class="text-2xl mt-5 mb-2">猜你想搜</p>
        <div class="search_guess" v-if="searchTips.guess">
          <template v-for="item in searchTips.guess">
            <router-link :to="{ name: 'search', query: { key: item } }"
              ><div class="item">{{ item }}</div></router-link
            >
          </template>
        </div>
        <p class="text-2xl mt-5 mb-2">历史记录</p>
        <div class="search_history" v-if="searchTips.history.length">
          <template v-for="item in searchTips.history">
            <router-link :to="{ name: 'search', query: { key: item } }"
              ><div class="item">{{ item }}</div></router-link
            >
          </template>
        </div>
      </div>
      <template v-if="key">
        <div class="filter_nav">
          <div class="filter_item" :class="{ active: index == curIndex }" v-for="(item, index) in navs" @click="changeType(item.type, index)">{{ item.title }}</div>
        </div>
        <div class="main_show">
          <component :is="comType" :data="data" v-if="data"></component>
        </div>
      </template>
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
  import request from '@/utils/request';
  import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
  import { useNoteStore } from '@/store/note';
  import { ref, computed, onMounted } from 'vue';
  // import {}
  const curType = ref('all');
  const curIndex = ref(0);
  const searchTips = ref();
  const searchElem = ref();
  const key = ref('');

  const data = ref();
  const getData = (res) => {
    key.value = res.key;
    data.value = res.data;
    console.log('getData', res);
  };
  onBeforeRouteUpdate((to) => {
    console.log('to', to.query);
    key.value = to.query.key as string;
    // location.reload();
  });

  // !!!十分重要，可以跳轉路由了
  onBeforeRouteLeave((to) => {
    useNoteStore().curSearchKey = '';
    console.log('leave', to);
  });
  onMounted(() => {
    //获取路由当前key
    // key.value = useRoute().query.key;
    useNoteStore().curSearchKey = useRoute().query.key as string;
    key.value = useNoteStore().curSearchKey;
    console.log('当前搜索关键字为', key.value);
    request.get('/search/window').then((res: any) => {
      console.log(res);
      if (res.code == 200) {
        searchTips.value = res.map;
      }
    });
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
    z-index: 0;
    padding: 0 20px;
    min-height: 100vh;
    margin: 0 auto;
    // background: #fff;
    @media (max-width: @md_p) {
      justify-content: center;
      flex-wrap: wrap;
    }
    .outer_box {
      width: 80%;
      margin-right: 30px;
      @media (max-width: @md) {
        // width: initial;
        width: 100%;
        margin-right: 0;
        // margin-right: initial;
        padding: 10px;
      }
    }
    .search_plus {
      margin-top: 20px;
      // width: 500px;
      // width: 500px;
      width: 100%;
      height: 50px;
    }
    .search_guess_history {
      width: 100%;
      p {
        text-align: left;
      }
      .search_guess,
      .search_history {
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        border-radius: 10px;
        background-color: #eee;
        padding: 5px 10px;
        margin-right: 10px;
        cursor: pointer;
      }
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
    // min-width: 800px;
  }
  .ranks_show {
    // position: fixed;
    // right: 20px;
    @media (max-width: @md_p) {
      display: none;
    }
  }
</style>
