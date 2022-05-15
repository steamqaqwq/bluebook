<template>
  <div class="allSearch">
    <div class="filter_list">
      <div class="normal_tags">
        <div class="normal_tag" @click="curStatus.curNormalIndex = index" v-for="(item, index) in normal_tags" :class="{ active: index == curStatus.curNormalIndex }">
          {{ item }}
        </div>
      </div>
      <div class="key_tags">
        <div class="key_tag" @click="curStatus.curKeyTag = index" v-for="(item, index) in key_tags" :class="{ active: index == curStatus.curKeyTag }">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="show_main" ref="outerbox">
      <show-notes :max-columns="4" :outer-width="outerwidth" :note-width="200"></show-notes>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, nextTick, onUnmounted } from 'vue';
  import request from '@/utils/request';
  import ShowNotes from '@/components/ShowNotes.vue';
  const normal_tags = ref(['综合', '最热', '最新', '视频', '图文']);
  const key_tags = ref(['全部', '蔬菜保鲜', '屯才清单', '蔬菜存储', '冰箱收纳', '生鲜保鲜']);
  const curStatus = reactive({
    curNormalIndex: 0,
    curKeyTag: 0
  });
  const outerbox = ref<Element>();
  const outerwidth = ref(0);
  onMounted(() => {
    // 请求数据
    requestData();
    // 初始化
    outerwidth.value = outerbox.value!.clientWidth;

    console.log('outerbox', outerbox.value!.clientWidth);
    // console.log('outerbox', outerbox.value!.offsetWidth);
    var timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        outerwidth.value = outerbox.value!.clientWidth;
      }, 200);
    });
  });

  // 请求数据函数
  function requestData() {}
</script>

<style lang="less" scoped>
  .allSearch {
    // margin-top: 30px;
    // background-color: #edf0f8;
    width: 100%;
    .filter_list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .normal_tags,
    .key_tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin: 5px 0;
      div {
        margin-right: 20px;
        user-select: none;
        cursor: pointer;
        border-radius: 10px;
        padding: 2px 10px;
        &:hover {
          color: @themecolor2;
        }
      }
    }
  }
  .show_main {
    // height: 580px;
    margin-top: 20px;
    margin-left: 10px;
    // overflow-x: auto;
  }
  .active {
    color: @themecolor2;
    font-weight: 800;
    background-color: #dddddd78;
    // border: 1px solid @themecolor2;
  }
</style>
