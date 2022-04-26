<template>
  <div class="main_box" v-if="notesList.length">
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
          <div class="username text-sm text-gray-400">{{ note.username }}</div>
          <div class="fav">
            <div class="icon">
              <span class="iconfont icon-xihuan1"></span>
            </div>
            <div class="favnums text-xs">{{ note.favs }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/request';
  import { onMounted, ref, reactive, watch, watchEffect } from 'vue';
  const notes = ref<note[]>([]);
  const length = ref();
  const initColumns = ref(5);
  const lastchild = ref<Element>(); //记录当前最后一个字元素
  onMounted(() => {
    request({
      url: '/notes/getnotes',
      method: 'get'
    })
      .then((res) => {
        notes.value = (res as any).notes;
        if (!initColumns.value) {
          initColumns.value = Math.floor(window.innerWidth / 200);

          if (initColumns.value > 5) {
            initColumns.value = 5;
          }
        }
        // console.log(notes.value[0], notes.value[-1]);
        length.value = notes.value.length;
        // const initPoint = notes.value.length;
        // 需求 如 [1,2,3,4,5,6,7] 拆分为按3列 [1,4,7],[2,5],[3,6]
        // 监听页面大小变化 改变数组列数
        splitNotes(notes.value);
      })
      .then((res) => {
        lastchild.value = getLastChild();
        io.observe(lastchild.value);
      });
    //分割数组
    const splitNotes = (notes) => {
      if (notesList.value.length) {
        notesList.value = [];
      }
      notes.reduce((pre: number, cur) => {
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

    // 基础上加？ 取出最短一列 从最短一列开始加
    // 重新分组?easy -> 加在原来的数组 在分割一次 性能差？
    // 分割新数组
    // const splitNewNotes = (notes) => {
    //   notes.value.reduce((pre: number, cur) => {
    //     if (pre == initColumns.value) {
    //       pre = 0;
    //     }
    //     if (notesList.value[pre]) {
    //       notesList.value[pre].push(cur);
    //     } else {
    //       notesList.value[pre] = [];
    //       notesList.value[pre].push(cur);
    //     }
    //     return ++pre;
    //   }, 0);
    // };
    //
    var timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let columns = Math.floor(window.innerWidth / 200);
        // console.log('columns', window.innerWidth);
        initColumns.value = columns > 5 ? 5 : columns;
        //获取列数
      }, 200);
    });
    // 监听列数变化重新分列
    watch(initColumns, (old, cur) => {
      splitNotes(notes.value);
    });
    watch(notes, (old, cur) => {
      splitNotes(notes.value);
    });
    watchEffect(() => {});
    const io = new IntersectionObserver((config) => {
      // intersectionRatio 触发观测者显示的比例
      // io.disconnect() 讲该观测者失效
      //不观察box
      // 观测到最后一个元素
      if (config[0].intersectionRatio > 0) {
        io.unobserve(lastchild.value!);
        request('/notes/getnewnotes')
          .then((res) => {
            notes.value = notes.value.concat((res as any).newnotes);
          })
          .then(() => {
            lastchild.value = getLastChild();
            io.observe(lastchild.value);
          });
      }
    });

    //获取最多子元素的一列 检测最后一个子元素
    const getLastChild = () => {
      let parentEle = document.querySelector('.column:first-child');
      let lastchild = parentEle!.lastElementChild!;
      return lastchild;
    };
  });

  const notesList = ref<note[][]>([]);
</script>

<style lang="less" scoped>
  .main_box {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    .column {
      // flex: 1;
      margin-left: 20px;
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
    }
    .fav {
      margin-left: auto;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      .icon {
        margin: 0 5px;
      }
    }
  }
</style>
