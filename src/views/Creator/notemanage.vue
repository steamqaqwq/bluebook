<template>
  <div class="outerbox">
    <creator-title>笔记管理</creator-title>
    <div class="inner_box">
      <ul>
        <li v-for="(nav, index) in navs" :class="{ active: index == curIndex }" @click="curIndex = index">{{ nav }}</li>
      </ul>
      <div class="show_notes">
        <div class="all_notes" v-if="curIndex == 0 && notes.length"></div>
        <div v-else class="no_notes">
          <div class="bg"></div>
          <div class="bg_tips">暂无任何笔记~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreatorTitle from '@/components/CreatorTitle.vue';
  import { ref } from 'vue';
  const navs = ['全部笔记', '已发布', '审核中', '未通过'];
  const curIndex = ref(0);
  const notes = ref([]);
</script>

<style lang="less" scoped>
  .outerbox {
    padding: 20px;
    box-sizing: border-box;
    min-height: 650px;
    min-width: 1000px;
    width: auto;
    border-radius: 8px;
    background-color: #fff;
  }
  .inner_box {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      li {
        padding: 17px 12px;
        min-width: 66px;
        text-align: center;
        position: relative;
        font-weight: 400;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
  .active {
    color: @themecolor;
    border-bottom: 3px solid @themecolor;
  }
  .show_notes {
    width: 100%;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    .no_notes .bg {
      height: 100px;
      width: 100px;
      background: url('@/assets/images/no_notes.png') no-repeat center;
    }
    .no_notes .bg_tips {
      color: gray;
      user-select: none;
    }
  }
</style>
