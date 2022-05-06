<template style="">
  <Header class="header"></Header>
  <div class="wrapper">
    <div class="main-content">
      <div class="left">
        <div class="user_avatar">
          <img src="@/assets/images/defaultAvatar.jpg" alt="" />
        </div>
        <div class="user_name text-2xl">XXu</div>
        <div class="user_id text-xs text-gray-400">id:234023098</div>
        <div class="user_status" v-for="item in statusData" :key="item.title">
          <p>{{ item.nums }}</p>
          <p class="text-gray-400 text-sm">{{ item.title }}</p>
        </div>
        <div class="brief text-xl text-gray-700">个人简介</div>
        <div class="my_brief text-gray-500">暂时没有简介~</div>
      </div>
      <div class="center">
        <div class="center_nav">
          <div class="nav_item" :class="{ active: index == curIndex }" v-for="(nav, index) in navs" :key="index" @click="changeNav(index)">{{ nav }}</div>
          <span class="iconfont icon-setting text-2xl text-blue-400 ml-auto cursor-pointer" @click="changeNav('setting')"></span>
        </div>
        <div class="center_main">
          <!-- 缓存组件 -->
          <keep-alive>
            <component :is="curNav"></component>
          </keep-alive>
        </div>
      </div>
      <div class="right">
        <div class="title">热门推荐</div>
        <div class="other">
          <img src="@/assets/images/banner1.png" alt="" />
        </div>
        <div class="other">
          <img src="@/assets/images/抗疫精神.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="attention-fans-container"></div>
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/header.vue';
  import request from '@/utils/request';
  import { ref, reactive, onMounted, computed } from 'vue';
  import MyNotes from './MyNotes.vue';
  import MyFavs from './MyFavs.vue';
  import MyThumbs from './MyThumbs.vue';
  import MySetting from './MySetting.vue';
  const statusData = [
    { nums: 0, title: '关注' },
    { nums: 3, title: '粉丝' },
    { nums: 3, title: '获赞与收藏' }
  ];
  const navs = ['笔记', '收藏', '赞过'];
  // 当前显示的组件
  // const curNav = ref(0);
  // 当前导航索引
  const curIndex = ref();
  function changeNav(index) {
    curIndex.value = index;
  }
  const curNav = computed(() => {
    switch (curIndex.value) {
      case 0:
        return MyNotes;
      case 1:
        return MyFavs;
      case 2:
        return MyThumbs;
      case 'setting':
        return MySetting;
      default:
        return MyNotes;
    }
  });
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    background-color: #fff;
    z-index: 999;
  }
  .wrapper {
    // min-height: 100vh;
    // overflow: auto;
    // width: 100vh;
    background-color: #f9f9f9;
  }
  .main-content {
    margin: 100px auto;
    overflow: hidden;
    background-color: #f9f9f9;
    max-width: @lg_m;
    display: flex;
    flex-direction: row;
    .left,
    .center .center_nav,
    .center .center_main,
    .right {
      background-color: #fff;
      border-radius: 12px;
    }
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      // width:200px;
      margin: 0 25px;
      width: 20%;
      padding: 20px 0;
      max-height: 600px;
      .user_avatar {
        height: 80px;
        width: 80px;
        overflow: hidden;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin-bottom: 5px;
        cursor: pointer;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .user_status {
        margin: 5px 0;
      }
      .brief {
        margin-top: 20px;
      }
      .my_brief {
        margin: 2px 20px 10px;
        // text-align: left;
        width: 80%;
        overflow: hidden;
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
    .center {
      width: 50%;
      box-sizing: border-box;
      margin-right: 30px;

      .center_nav {
        width: 100%;
        padding: 20px 10px;
        display: flex;
        flex-direction: row;
        .nav_item {
          padding: 2px 10px;
          cursor: pointer;
          user-select: none;
        }
        .active {
          border-bottom: 2px solid @themecolor;
        }
      }

      .center_main {
        margin-top: 20px;
      }
    }
    .right {
      width: 25%;
      // overflow: hidden;
      max-height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      .title {
        font-size: 20px;
        margin-bottom: 12px;
      }
      .other {
        width: 80%;
        margin: 10px 0;
        border-radius: 12px;
        overflow: hidden;
      }
    }
  }
</style>
