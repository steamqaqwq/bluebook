<template>
  <div class="header">
    <div class="inner-header">
      <router-link target="_blank" :to="{ path: '/' }">
        <div class="logo"></div>
      </router-link>
      <div class="user_avatar">
        <div>{{ $store.username }}</div>
        <div class="avatar">
          <router-link :to="{ name: 'my', params: { userid: $store.userid } }">
            <img :src="$store.avatar" alt="" />
          </router-link>
          <div class="user_fun">
            <ul>
              <li @click="$store.logout()">退出账号</li>
              <li>其它</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/user';
  const $store = useUserStore();
</script>

<style lang="less" scoped>
  .header {
    height: 80px;
    width: 100%;
    line-height: 80px;
    // border-bottom: 1px solid #eee;
    box-shadow: 1px 2px 1px 0px #eee;
    .inner-header {
      margin: 0 auto;
      padding: 0 10px;
      max-width: 90%;
      height: 100%;
    }
    .user_avatar {
      height: 100%;
      float: right;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      user-select: none;
      cursor: pointer;
      &:hover {
        .user_fun {
          // display: flex;
          visibility: visible !important;
        }
      }
      .avatar {
        margin: 0 5px;
        height: 28px;
        width: 28px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user_fun {
        // display: none;
        visibility: hidden;
        position: absolute;
        flex-direction: column;
        width: 120px;
        overflow: hidden;
        right: 20px;
        border-radius: 6px;
        top: 70px;
        transition: visibility 0.8s;
        padding: 1px;
        background-color: #fff;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 4px 14px rgba(0, 0, 0, 0.1);
        ul {
          width: 100%;
          li {
            height: 50px;
            line-height: 50px;
            width: 100%;
            &:hover {
              background-color: #eee;
            }
          }
        }
      }
      &:hover {
        .user_fun {
          // display: flex;
          visibility: hidden;
        }
      }
    }
    .logo {
      height: 80px;
      width: 120px;
      background: url('@/assets/logo.png') no-repeat center;
      background-size: 250% 250%;
      float: left;
    }
  }
</style>
