<template>
  <div class="main" v-if="notesList.length">
    <div class="column" v-for="notes in notesList">
      <div class="note" v-for="note in notes" :key="note.id">
        <div class="note_cover">
          <img :src="note.cover" alt="" />
        </div>
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
  import { onMounted, ref, reactive } from 'vue';
  const notes = ref<note[]>([]);
  const length = ref();
  onMounted(() => {
    request({
      url: '/notes/getnotes',
      method: 'get'
    }).then((res) => {
      notes.value = (res as any).notes;
      const initColumns = 5;
      console.log(notes.value[0], notes.value[-1]);
      length.value = notes.value.length;
      // const initPoint = notes.value.length;
      // 需求 如 [1,2,3,4,5,6,7] 拆分为按3列 [1,4,7],[2,5],[3,6]
      // 监听页面大小变化 改变数组列数
      notes.value.reduce((pre: number, cur) => {
        if (pre == initColumns) {
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
    });
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
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.234);
    }

    &:nth-of-type(2n) {
      padding: 30px 0;
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
