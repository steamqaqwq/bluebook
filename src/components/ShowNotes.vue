<template>
  <div class="main_box" v-if="notesList.length">
    <div class="column" v-for="(notes, index) in notesList" :key="index">
      <template v-for="note in notes" :key="note.id">
        <router-link
          :to="{
            name: 'notedetail',
            params: {
              id: note.id
            }
          }"
        >
          <div class="note">
            <div class="note_cover" :class="{ animation: isanimate }">
              <img src="/public/imgLoading.png" @load="loadImage(note.cover, $event)" @error="" @alt="" />
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
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import requestMock from '@/utils/requestMock';
  import request from '@/utils/request';
  import { onMounted, ref, reactive, watch, watchEffect, nextTick, computed } from 'vue';
  import useColumns from '@/hooks/useColumns';
  import { throttle, debounce } from '@/utils/debounce';
  const props = withDefaults(
    defineProps<{
      maxColumns: number;
      outerWidth: number;
      noteWidth?: number;
      timeout?: number;
      notesList?;
    }>(),
    {
      timeout: 200,
      noteWidth: 200
    }
  );
  const noteWidthString = props.noteWidth + 'px';
  const notes = ref<note[]>([]);
  const length = ref();
  const initColumns = computed(() => {
    let columns = Math.floor(props.outerWidth / props.noteWidth);
    // console.log('resize_columns', props.outerWidth);
    return columns > props.maxColumns ? props.maxColumns : columns;
  });
  const lastchild = ref<Element>(); //记录当前最后一个子元素

  onMounted(() => {
    // 创建交叉观测者
    const io = new IntersectionObserver((config) => {
      // intersectionRatio 触发观测者显示的比例
      // io.disconnect() 讲该观测者失效
      //不观察box
      // 观测到最后一个元素
      if (config[0].intersectionRatio > 0) {
        io.unobserve(lastchild.value!);
        requestMock('/notes/getnewnotes')
          .then((res: any) => {
            // console.log(notes.value);
            notes.value = notes.value.concat(res.newnotes);
          })
          .then(() => {
            lastchild.value = getLastChild();
            io.observe(lastchild.value);
          });
      }
    });
    Promise.resolve()
      .then(() => {
        if (props.notesList) {
          notes.value = props.notesList;
        } else {
          requestMock({
            url: '/notes/getnotes',
            method: 'get'
          }).then((res) => {
            notes.value = (res as any).notes;
          });
        }
      })
      .then((res) => {
        // notes.value = (res as any).notes;
        length.value = notes.value.length;
        // const initPoint = notes.value.length;
        // 需求 如 [1,2,3,4,5,6,7] 拆分为按3列 [1,4,7],[2,5],[3,6]
        // 监听页面大小变化 改变数组列数
        splitNotes(notes.value);
      })
      .then((res) => {
        setTimeout(() => {
          lastchild.value = getLastChild();
          io.observe(lastchild.value);
        }, 200);
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

    // 监听列数变化 笔记变化 再分列
    watch(initColumns, (old, cur) => {
      throttle(splitNotes(notes.value), 500);
    });
    watch(notes, (old, cur) => {
      splitNotes(notes.value);
    });
    watch(lastchild, (old, cur) => {
      if (!cur) {
        lastchild.value = getLastChild();
      }
    });

    //获取最多子元素的一列 检测最后一个子元素
    const getLastChild = () => {
      let parentEle = document.querySelector('.column:first-child');
      let lastchild = parentEle!.lastElementChild!;
      // console.log('lastchild', lastchild);
      // 将最后一个子元素背景设置为黑 方便观测
      console.log('lastchild', lastchild);
      (lastchild as HTMLElement).style.color = 'purple';
      return lastchild;
    };
  });

  const notesList = ref<note[][]>([]);

  // 加载图片处理
  // const showPic = ref(false);
  const blurSet = ref('7px');
  const isanimate = ref(true);
  const loadImage = (src, e) => {
    isanimate.value = false;
    e.path[0].src = src;
    blurSet.value = '0px';
  };
</script>

<style lang="less" scoped>
  .main_box {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    // .column {
    //   // flex: 1;
    //   // margin-left: 20px;
    // }
  }
  .note {
    font-family: xiawu;
    width: v-bind(noteWidthString);
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 20px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;
    margin-right: 10px;
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
    min-height: 250px;
    height: auto;
    position: relative;
    filter: blur(v-bind(blurSet));
    //
    // animation:
    transition: all 0.5s;

    img {
      width: 100%;
      height: auto;
      max-height: 300px;
    }
    // &::before {
    //   display: block;
    //   content: '';
    //   position: absolute;
    //   width: 100%;
    //   height: 250px;
    //   transform: translateX(-100%);
    //   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    //   animation: loading 1.5s infinite;
    // }
    // @keyframes loading {
    //   100% {
    //     transform: translateX(100%);
    //   }
    // }
  }
  .animation {
    animation: flash 3s ease-in-out infinite;
    @keyframes flash {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
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
