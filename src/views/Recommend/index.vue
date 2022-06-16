<template>
  <div class="containerbox">
    <div class="leftNav">
      <left-nav @updateData="updateData"></left-nav>
    </div>
    <div class="showItems" ref="notesElement">
      <!-- <main-show></main-show> -->
      <show-notes v-if="notes" :max-columns="6" :outer-width="outerwidth!" :notesListProp="notes"></show-notes>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick, toRaw } from 'vue';
  import LeftNav from './leftmenu.vue';
  import mainShow from './mainshow.vue';
  import ShowNotes from '@/components/ShowNotes.vue';
  import request from '@/utils/request';
  import { useUserStore } from '@/store/user';
  // 获取外盒子
  let outerwidth = ref<number>();
  const notesElement = ref();
  const timer = ref();
  const notes = ref();
  const noteBackup = ref();
  onMounted(() => {
    //获取个人信息
    request.get('/person/information').then((res: any) => {
      if (res.code == 200) console.log('personmsg', res);
      let data = res.map;
      let username = data.personName || 'XXu';
      let avatar = data.avatar || '@/assets/images/defaultAvatar.jpg';
      let id = data.personId;
      useUserStore().updateUser(username, avatar, id);
    });
    outerwidth.value = notesElement.value.clientWidth;
    // alert(outer_width.value);
    //简单的防抖函数
    function debounce(func, wait) {
      //定时器变量
      var timeout;
      return function () {
        //每次触发scrolle，先清除定时器
        clearTimeout(timeout);
        //指定多少秒后触发事件操作handler
        timeout = setTimeout(func, wait);
      };
    }
    window.addEventListener(
      'resize',
      debounce(() => {
        nextTick(() => {
          // console.log('页面变化！！', notesElement.value);
          if (notesElement.value) {
            if (notesElement.value.clientWidth) {
              outerwidth.value = notesElement.value.clientWidth;
            }
          }
        });
      }, 300)
    );
    requestData();
  });
  function requestData() {
    request.get('/blog/blogRecommend').then((res: any) => {
      console.log('blogs', res);
      // 去除无效图片链接
      let list = res.list.filter((item) => item.blogImage.includes('http'));
      console.log('list', list);
      notes.value = list;
      noteBackup.value = list;
    });
  }
  function updateData(nav) {
    console.log('nav', nav);
    if (nav == '视频') {
      let newlist = toRaw(noteBackup.value).filter((item) => {
        return item.videoOrImage == 1;
      });
      console.log('newlist', newlist);
      notes.value = newlist;
    } else if (nav == '推荐') {
      requestData();
    } else {
      notes.value = [];
    }
  }
</script>

<style lang="less" scoped>
  .containerbox {
    position: relative;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
  }
  .leftNav {
    position: relative;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: skyblue;
      background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ededed;
      border-radius: 10px;
    }
  }
  .showItems {
    width: 100%;
    overflow: hidden;
  }
  @media (max-width: @md) {
    .containerbox {
      flex-direction: column;
      margin-top: 10px;
    }
    .leftNav {
      overflow-x: auto;
    }
    .showItems {
      margin-top: 20px;
    }
  }
</style>
