<template>
  <div class="AttentionFans">
    <div class="close" @click="emit('close')"></div>
    <div class="title text-2xl text-bold-500">我的好友</div>
    <div class="navs">
      <div class="nav" v-for="(nav, index) in navs" @click="curIndex = index" :class="{ active: curIndex == index }">{{ nav }}</div>
    </div>
    <div class="user-list">
      <div class="user" v-for="user in users" :key="user.id">
        <div class="avatar">
          <img :src="user.avatar" alt="" />
        </div>
        <div class="user_brief">
          <p class="username">{{ user.username }}</p>
          <p class="userbrief truncate text-gray-400 text-xs">{{ user.description }}</p>
        </div>
        <button class="followBtn" @click="follow(user.isFollow)">{{ user.isFollow ? '取消关注' : '关注' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import request from '@/utils/requestMock';
  import { ElMessageBox } from 'element-plus';
  import { ElMessage } from 'element-plus';
  const curIndex = ref(0);
  const navs = ['关注', '粉丝'];
  const emit = defineEmits(['close']);
  const users = ref<
    {
      id: number;
      avatar: string;
      description: string;
      username: string;
      isFollow: any;
    }[]
  >([]);
  onMounted(() => {
    request.get('/api/followlist').then((response: any) => {
      console.log('/api/followlist', response);
      users.value = response.data.users;
    });
  });
  // 点击关注/取关
  function follow(isFollow: boolean) {
    if (isFollow) {
      ElMessageBox.confirm('确认不再关注?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 执行取关
          ElMessage({
            type: 'success',
            message: '取消关注成功!'
          });
        })
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    }
  }
  //   function close() {}
</script>

<style lang="less" scoped>
  .AttentionFans {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0px 0px 7px 1px #818cf8;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 7px;
      background-color: rgba(74, 97, 204, 1);
    }

    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px @themecolor2;
      border-radius: 10px;
      background-color: #eee;
    }

    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: @themecolor2;
      border-style: dashed;
      border-color: transparent;
      border-width: 2px;
      background-clip: padding-box;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: @themecolor;
    }

    .close {
      position: absolute;
      top: 20px;
      left: 5%;
      width: 20px;
      height: 20px;
      font-size: 20px;
      line-height: 20px;
      cursor: pointer;
      &:before {
        content: 'X';
        height: 100%;
        width: 100%;
      }
    }
  }
  .navs {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    .nav {
      flex: 1;
      cursor: pointer;
      user-select: none;
    }
    .active {
      border-bottom: 2px solid @themecolor;
    }
  }
  .user-list {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    .user {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .avatar {
        height: 50px;
        width: 50px;
        overflow: hidden;
        border-radius: 50%;
      }
    }
    .user_brief {
      text-align: left;
      margin: 10px;
    }
    .followBtn {
      border-radius: 5px;
      color: @themecolor;
      border: 1px solid @themecolor;
      background-color: #fff;
      padding: 1px 5px;
      margin-left: auto;
      &:hover {
        background-color: @themecolor2;
        color: #fff;
      }
    }
  }
</style>
