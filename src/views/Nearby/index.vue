<template>
  <!-- <div>附近</div> -->
  <div class="showItems" ref="notesElement">
    <show-notes v-if="notes" :max-columns="6" :outer-width="outerwidth!" :notesListProp="notes"></show-notes>
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
  const notes = ref();
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
        .then((res: any) => {
          // console.log(res);
          notes.value = res.list;
        });
    }, 100);
  });
</script>

<style lang="less" scoped>
  .showItems {
    position: relative;
    margin-top: 40px;
    padding: 0 200px;
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
  }
</style>
