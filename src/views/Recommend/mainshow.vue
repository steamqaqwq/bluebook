<template>
  <div class="main" v-if="notesList.length">
    <div class="column" v-for="notes in notesList">
      <div class="note" v-for="note in notes" :key="note.id">
        <div class="note_cover">
          <img :src="note.cover" alt="" />
        </div>
        <div class="video_icon" v-show="note.isVideo"><span class="iconfont icon-videofill text-xl text-white"></span></div>
        <div class="note_title">{{ note.title }}</div>
        <div class="note_usermsg">
          <div class="useravatar">
            <img :src="note.avatar" alt="" />
          </div>
          <div class="username text-xl">{{ note.username }}</div>
          <div class="fav">
            <div class="icon">
              <icon-svg iconClass="icon-Player"></icon-svg>
            </div>
            <div class="favnums text-xl">{{ note.favs }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/request';
  import { onMounted, ref, reactive, watch } from 'vue';
  const notes = ref<note[]>([]);
  const length = ref();
  const initColumns = ref(5);
  onMounted(() => {
    request({
      url: '/notes/getnotes',
      method: 'get'
    }).then((res) => {
      notes.value = (res as any).notes;
      initColumns.value = Math.floor(window.innerWidth / 200);
      // console.log(notes.value[0], notes.value[-1]);
      length.value = notes.value.length;
      // const initPoint = notes.value.length;
      // 需求 如 [1,2,3,4,5,6,7] 拆分为按3列 [1,4,7],[2,5],[3,6]
      // 监听页面大小变化 改变数组列数
      splitNotes(notes);
    });
    const splitNotes = (notes) => {
      if (notesList.value.length) {
        notesList.value = [];
      }
      notes.value.reduce((pre: number, cur) => {
        if (pre == initColumns.value) {
          pre = 0;
        }
        if (notesList.value[pre]) {
          notesList.value[pre].push(cur);
        } else {
          notesList.value[pre] = [];
          notesList.value[pre].push(cur);
        }
        return ++pre;
      }, 0);
    };

    var timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        initColumns.value = Math.floor(window.innerWidth / 200);
        //获取列数
      }, 200);
    });
    // 监听列数变化重新分列
    watch(initColumns, (old, cur) => {
      splitNotes(notes);
    });
    var lastChild;
    const io = new IntersectionObserver((config) => {
      // intersectionRatio 触发观测者显示的比例
      // io.disconnect() 讲该观测者失效
      //不观察box
      // console.log('config', config[0].intersectionRatio);
      // console.log('显示box');
      // 观测到最后一个元素
      if (config[0].intersectionRatio > 0) {
        io.unobserve(lastChild);
        request('/notes/getnewnotes').then((res) => {
          splitNotes(res.newnotes);
        });
      }
    });

    setTimeout(() => {
      let box = document.querySelectorAll('.note');
      var lastChild = box[box.length - 1];
      io.observe(lastChild);
    }, 1000);
  });

  const notesList = ref<note[][]>([]);
</script>

<style lang="less" scoped>
  .main {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    .column {
      flex: 1;
    }
  }
  .note {
    width: 200px;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 20px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    &:hover::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.234);
    }
    .video_icon {
      position: absolute;

      width: 28px;
      height: 28px;
      right: 10px;
      top: 10px;
    }
    &:nth-of-type(2n) {
      padding-bottom: 60px;
    }
  }
  .note_cover {
    width: 100%;
    img {
      width: 100%;
      height: auto;
      max-height: 300px;
    }
  }
  .note_title {
    // padding: 1px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .note_usermsg {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .useravatar {
      overflow: hidden;
      border-radius: 50%;
      width: 28px;
      height: 28px;
    }
    .username {
      margin-left: 2px;
      font-size: medium;
      color: #eee;
    }
    .fav {
      margin-left: auto;
    }
  }
</style>
