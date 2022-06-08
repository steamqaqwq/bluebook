<template>
  <!-- <div>附近</div> -->
  <div class="showItems" ref="notesElement">
    <show-notes :max-columns="6" :outer-width="outerwidth!"></show-notes>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import request from '@/utils/request';
  import showNotes from '@/components/ShowNotes.vue';
  import useLocation from '@/hooks/useLocation';
  import useListenOuterboxWidth from '@/hooks/useListenOuterboxWidth';
  // 获取地址信息钩子
  const location = useLocation().location;
  const notesElement = ref();
  const outerwidth = useListenOuterboxWidth(notesElement).outerwidth;
  //获取
  onMounted(() => {
    // location 有请求数据 需要延迟
    setTimeout(() => {
      request
        .get('/blog/nearby', {
          params: {
            longitude: location.point.x,
            latitude: location.point.y
          }
        })
        .then((res) => {
          console.log(res);
        });
    }, 100);
  });
</script>

<style lang="less" scoped>
  .showItems {
    width: 100%;
    overflow: hidden;
  }
</style>
