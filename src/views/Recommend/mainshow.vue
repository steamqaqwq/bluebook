<template>
  <div class="main" v-if="">
    <div class="note" v-for="note in notes" :key="note.id">
      <div>
        <img src="" alt="" />
      </div>
      <div class="title"></div>
      <div class="usermsg">
        <div class="useravatar">
          <img src="" alt="" />
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
  import { onMounted, ref } from 'vue';
  const notes = ref(null);
  onMounted(() => {
    request({
      url: '/notes/getnotes',
      method: 'get'
    }).then((res) => {
      notes.value = (res as any).notes;
    });
  });
</script>

<style lang="less" scoped>
  .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .note {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .usermsg {
    display: flex;
    flex-direction: row;
  }
</style>
