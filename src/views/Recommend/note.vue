<template>
  <div class="note">
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
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  interface note {
    id: number;
    title: string;
  }
  const props = defineProps<{
    id: number;
    favs?: number;
  }>();
</script>

<style lang="less" scoped>
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
