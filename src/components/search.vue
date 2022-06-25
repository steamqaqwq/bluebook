<template>
  <div class="search">
    <input class="search_input" v-if="isShowInput" :style="{ width: width }" :class="{}" placeholder="搜你想搜" type="text" v-model="search_v" @focus="emit('showSearchList')" @keydown.enter="toSearch" />
    <!-- <span class="close" @click="clean">x</span> -->
    <span class="iconfont icon-search" @click="toSearch"></span>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/request';
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useNoteStore } from '@/store/note';
  const emit = defineEmits(['getData', 'showSearchList']);
  const props = withDefaults(
    defineProps<{
      width?: string;
      isShowInput?: boolean;
      key?: string;
    }>(),
    {
      isShowInput: true
    }
  );
  const $router = useRouter();
  function clean() {
    useNoteStore().curSearchKey = '';
    search_v.value = '';
  }
  onMounted(() => {
    // console.log('props.key', props.key);
    if (search_v.value) {
      toSearch();
    }
  });
  const search_v = ref(useNoteStore().curSearchKey);
  // const res = ref('')
  const toSearch = () => {
    useNoteStore().curSearchKey = search_v.value;
    $router.push({
      name: 'search',
      query: {
        key: search_v.value
      }
    });
    request({
      method: 'POST',
      url: `/tag/hot`,
      params: {
        tagName: search_v.value,
        pageNum: 1,
        pageSize: 10
      }
    }).then((res: any) => {
      emit('getData', {
        key: search_v.value,
        data: res
      });
      // res.value = res
    });
  };
</script>

<style lang="less" scoped>
  .search {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    height: 100%;
    font-family: xiawu;
    .search_input {
      margin: 5px 0;
      padding: 1px 10px;
      width: 150px;
      min-height: 30px;
      height: 100%;
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
        width: 180px;
        height: 40px;
        &:focus {
          width: 280px;
        }
      }
      @media (min-width: @lg_p) {
        width: 250px;
      }
    }

    .icon-search,
    .close {
      position: absolute;
      right: 10px;
      top: 50%;
      z-index: 999;
      transform: translateY(-50%);
      cursor: pointer;
      &:hover {
        color: @themecolor2;
      }
    }
    .close {
      font-size: 24px;
      right: 30px !important;
    }
  }
</style>
