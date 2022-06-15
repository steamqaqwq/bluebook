<template>
  <!-- <div>附近</div> -->
  <div class="showItems" ref="notesElement">
    <show-notes v-if="notes" :max-columns="6" :outer-width="outerwidth!" :notesListProp="notes"></show-notes>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, nextTick } from 'vue';
  import request from '@/utils/request';
  import showNotes from '@/components/ShowNotes.vue';
  import useLocation from '@/hooks/useLocation';
  // import useListenOuterboxWidth from '@/hooks/useListenOuterboxWidth';
  // 获取地址信息钩子
  const location = useLocation().location;
  const notesElement = ref();
  // const outerwidth = useListenOuterboxWidth(notesElement).outerwidth;

  let outerwidth = ref<number>();
  const notes = ref();
  //获取
  onMounted(() => {
    // location 有请求数据 需要延迟
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
          if (notesElement.value.clientWidth) {
            outerwidth.value = notesElement.value.clientWidth;
          }
        });
      }, 300)
    );
    setTimeout(() => {
      request
        .get('/blog/nearby', {
          params: {
            longitude: location.point.x,
            latitude: location.point.y
          }
        })
        .then((res: any) => {
          console.log(res);
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
