<template>
  <div class="allSearch">
    <div class="filter_list">
      <div class="normal_tags">
        <div class="normal_tag" @click="toSort(index, item)" v-for="(item, index) in normal_tags" :class="{ active: index == curStatus.curNormalIndex }">
          {{ item }}
        </div>
      </div>
      <div class="key_tags" v-if="false">
        <div class="key_tag" @click="curStatus.curKeyTag = index" v-for="(item, index) in key_tags" :class="{ active: index == curStatus.curKeyTag }">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="show_main" ref="notesElement">
      <show-notes v-if="notesList" :max-columns="3" :outer-width="outerwidth!" :note-width="200" :notesListProp="notesList"></show-notes>
      <div v-else>没有该记录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, nextTick, onUnmounted } from 'vue';
  import request from '@/utils/request';
  import ShowNotes from '@/components/ShowNotes.vue';
  import { useRouter, onBeforeRouteUpdate } from 'vue-router';
  import useListenOuterboxWidth from '@/hooks/useListenOuterboxWidth';
  import { debounce } from '@/utils/debounce';
  import { useNoteStore } from '@/store/note';
  const props = defineProps(['data', 'key']);
  const normal_tags = ref(['最热', '最新', '视频', '图文']);
  const key_tags = ref(['全部', '蔬菜保鲜', '屯才清单', '蔬菜存储', '冰箱收纳', '生鲜保鲜']);
  const curStatus = reactive({
    curNormalIndex: 0,
    curKeyTag: 0
  });
  const notesList = ref<any>([]);
  const toSort = (index, tagName) => {
    console.log('toSort', tagName);
    curStatus.curNormalIndex = index;
    console.log('tagName', tagName);
    switch (tagName) {
      case '最新':
        requestData('newest');
      default:
        requestData();
    }
  };
  const notesElement = ref();
  const outerwidth = ref();
  setTimeout(() => {
    outerwidth.value = useListenOuterboxWidth(notesElement).outerwidth;
  }, 100);

  onBeforeRouteUpdate(() => {
    console.log('该更新了');
    notesList.value = props.data.blog;
  });
  onMounted(() => {
    notesList.value = props.data.blog;
    let ele = document.querySelector('show_main');
    notesElement.value = ele;
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
    // 请求数据
    // requestData();
    // 初始化
    // outerwidth.value = outerbox.value!.clientWidth;
    // console.log('outerbox', outerbox.value!.clientWidth);
    // var timer;
    // window.addEventListener('resize', () => {
    //   clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     outerwidth.value = outerbox.value!.clientWidth;
    //   }, 200);
    // });
  });

  // 请求数据函数
  async function requestData(tag = 'hot') {
    console.log('进入reuqesData');
    // let res = request({
    //   method: 'POST',
    //   url: `/tag/hot`,
    //   params: {
    //     tagName: props.data.key,
    //     pageNum: 1,
    //     pageSize: 10
    //   }
    // }).then((res: any) => {
    //   notesList.value = res.blog;
    //   console.log('res', res);
    //   // res.value = res
    // });
    // let key = await props.data.key;
    let key = useNoteStore().curSearchKey;
    console.log('key', key);
    if (!key) return;
    let res: any = await request({
      method: 'POST',
      url: `/tag/${tag}`,
      params: {
        tagName: key,
        pageNum: 1,
        pageSize: 10
      }
    });
    if (tag == 'hot') {
      notesList.value = res.blog;
    } else if (tag == 'newest') {
      notesList.value = res.list;
    }
    console.log('res', res);
  }
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
    width: 100%;
    // min-height: 100vh;
    // overflow-x: auto;
  }
  .active {
    color: @themecolor2;
    font-weight: 800;
    background-color: #dddddd78;
    // border: 1px solid @themecolor2;
  }
</style>
