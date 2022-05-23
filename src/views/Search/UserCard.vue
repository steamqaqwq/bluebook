<template>
  <div class="usercard">
    <div class="user_avatar">
      <div class="avatar mr-5">
        <img :src="item.avatar_src" alt="" />
      </div>
      <div class="username text-xl text-black">{{ item.username }}</div>
      <div class="follow_btn"><button>关注</button></div>
    </div>
    <div class="user_desc">
      <p class="text-ms">小蓝书号：{{ item.userid }}</p>
      <p class="text-ms">{{ item.notes }}笔记 {{ item.follows }}粉丝</p>
      <p class="user_say text-ms text-gray-400 truncate max-w-sm">{{ item.user_desc ? item.user_desc : '此用户没有填写简介' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface usermsg {
    userid: number | string;
    notes: number;
    follows: number;
    avatar_src: string;
    user_desc: string;
    username: string;
  }
  const props = defineProps<{
    item: usermsg;
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
