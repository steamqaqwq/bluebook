<template>
  <div class="main">
    <!-- <template v-for="i in 5"> </template> -->
    <div class="note" v-for="note in notes" :key="note.id">
      <div>
        <img :src="note.cover" alt="" />
      </div>
      <div class="title">{{ note.title }}</div>
      <div class="usermsg">
        <div class="useravatar">
          <img :src="note.avatar" alt="" />
        </div>
        <div class="fav">
          <div class="icon"></div>
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
      const initColumns = 6;
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
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
  }
  .note {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid blue;
    margin: 10px;
    &:nth-of-type(4) {
      padding: 30px 0;
    }
  }
  .usermsg {
    display: flex;
    flex-direction: row;
  }
</style>
