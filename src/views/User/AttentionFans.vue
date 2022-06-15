<template>
  <div class="AttentionFans">
    <div class="close" @click="emit('close')"></div>
    <div class="title text-2xl jiangchengfont">我的好友</div>
    <div class="navs">
      <div class="nav jiangchengfont" v-for="(nav, index) in navs" :class="{ active: curIndex == index }" @click="changeData(nav, index)">{{ nav }}</div>
    </div>
    <div class="user-list" v-if="users">
      <div class="user" v-for="user in users" :key="user.personId">
        <div class="avatar">
          <avatar :src="user.avatar"></avatar>
        </div>
        <div class="user_brief">
          <p class="username jiangchengfont">{{ user.personName }}</p>
          <p class="userbrief truncate text-gray-400 text-xs">{{ user.briefInfor || '暂无简介' }}</p>
        </div>
        <!-- <button class="followBtn" @click="follow(user.isFollow)" v-if="curIndex == 1">{{ user.isFollow ? '取消关注' : '关注' }}</button> -->
      </div>
    </div>
    <div class="user-list" v-else>
      <span>{{ curIndex == 0 ? '暂时关注的博主' : '暂无粉丝' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import request from '@/utils/request';
  import { ElMessageBox } from 'element-plus';
  import { ElMessage } from 'element-plus';
  import avatar from '@/components/avatar.vue';
  const curIndex = ref(0);
  const navs = ['关注', '粉丝'];
  const emit = defineEmits(['close']);
  const users = ref<any>([]);
  onMounted(() => {
    // requestMock.get('/api/followlist').then((response: any) => {
    //   console.log('/api/followlist', response);
    //   users.value = response.data.users;
    // });
    requestBloger();
  });

  function requestBloger() {
    request.get('/follow/bloger').then((res: any) => {
      console.log('/api/followlist', res);
      users.value = res.bloger;
    });
  }
  function requestFans() {
    request.get('/follow/fans').then((res: any) => {
      console.log('/follow/fans', res);
      users.value = res.fans;
    });
  }
  // 切换up / 粉丝
  function changeData(nav, index) {
    curIndex.value = index;
    //关注列表
    if (index == 0) {
      requestBloger();
    } else if (index == 1) {
      requestFans();
    }
  }
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
  //定义字体
  @font-face {
    font-family: jiangcheng;
    src: url('@/assets/fonts/jiangchengfonts400.ttf');
  }
  .jiangchengfont {
    font-family: jiangcheng;
  }
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
    box-shadow: 0px 11px 5px 1px #a8affd;
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
