<template>
  <div class="searchRank">
    <p class="rank_title">小蓝书热榜</p>
    <ul class="rank_list">
      <li class="rank_item" v-for="item in ranks" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/requestMock';
  import { onMounted, ref } from 'vue';
  const ranks = ref<{ id: number | string; title: string }[]>([]);
  onMounted(() => {
    request.get('/api/ranks').then((res: any) => {
      ranks.value = res.Ranks;
      // console.log('rankres', res);
    });
  });
</script>

<style lang="less" scoped>
  .searchRank {
    width: 100%;
    padding: 5px;
    overflow: hidden;
    .rank_title {
      color: @themecolor;
      font-size: 22px;
      font-weight: 400;
      margin: 10px 0;
      text-align: left;
    }
    .rank_list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .rank_item {
        background-color: @themecolor3;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        // display: inline-block;
        font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        margin-bottom: 10px;
        max-width: 100%;
        overflow: hidden;
        padding: 4px 12px;
        text-overflow: ellipsis;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        white-space: nowrap;
        &:hover {
          filter: invert(0.1);
        }
      }
    }
  }
</style>
