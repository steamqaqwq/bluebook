<template>
  <div class="usercard" v-if="item">
    <div class="user_avatar">
      <div class="avatar mr-5">
        <!-- <img :src="item.avatar" alt="" /> -->
        <avatar :src="item.avatar"></avatar>
      </div>
      <div class="username text-xl text-black">{{ item.personName }}</div>
      <div class="follow_btn"><button>关注</button></div>
    </div>
    <div class="user_desc">
      <p class="text-ms">小蓝书号：{{ item.identNumber || 123123 }}</p>
      <p class="text-ms">{{ item.blogSum }}笔记 {{ item.fansSum }}粉丝</p>
      <p class="user_say text-ms text-gray-400 truncate max-w-sm">{{ item.briefInfor ? item.briefInfor : '此用户没有填写简介' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  // interface usermsg {
  //   userid: number | string;
  //   notes: number;
  //   follows: number;
  //   avatar: string;
  //   user_desc: string;
  //   username: string;
  // }
  import avatar from '@/components/avatar.vue';
  const props = defineProps<{
    item: any;
  }>();
</script>

<style lang="less" scoped>
  .usercard {
    width: 100%;
    height: 200px;
    padding: 20px;
    border-radius: 4px;
    background-color: #d7d8f559;
    box-shadow: -1px 2px 2px 2px #b6bae2;
    font-family: xiawu;
    text-align: left;

    .user_avatar {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 80px;
      .username {
        // margin-left: 10px;
      }
      .avatar {
        height: 50px;
        width: 50px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .follow_btn {
        margin-left: auto;
        button {
          padding: 2px 10px;
          border-radius: 4px;
          color: #fff;
          background: @themecolor;
        }
      }
    }
  }
</style>
