<template>
  <div class="carousel_box">
    <div class="carousel relative">
      <div class="slider">
        <ul>
          <li v-for="(imgurl, index) in imgs">
            <Transition name="right">
              <img :src="imgurl" alt="" v-show="index + 1 === curIndex" />
            </Transition>
          </li>
        </ul>
      </div>
      <div class="change-pic">
        <div @click="changepic(1)" class="picbtn left-btn iconfont icon-left-f absolute left-0 top-1/2 text-gray-300 text-3xl"></div>
        <div @click="changepic(2)" class="picbtn right-btn iconfont icon-right-f absolute right-0 top-1/2 text-gray-300 text-3xl"></div>
      </div>
      <div class="pages absolute bottom-2 right-20 text-white">{{ curIndex }} / {{ imgs.length }}</div>
    </div>
    <div class="small-pic">
      <div v-for="(imgurl, index) in imgs" class="item" :class="{ active: index + 1 == curIndex }" @click="changepic(3, index + 1)">
        <div class="img">
          <img :src="imgurl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, ref, reactive, watch } from 'vue';
  const props = defineProps<{
    imgs: string[];
  }>();
  const curIndex = ref(1);
  // 处理按钮
  const changepic = (num: number, index = 0) => {
    if (num == 1) {
      // 上一张
      if (curIndex.value == 1) {
        curIndex.value = props.imgs.length;
      } else {
        curIndex.value--;
      }
    } else if (num == 2) {
      // 下一张
      if (curIndex.value == props.imgs.length) {
        curIndex.value = 1;
      } else {
        curIndex.value++;
      }
    } else {
      //直接选定图片
      curIndex.value = index;
    }
  };
  watch(curIndex, (old, cur) => {});
</script>

<style lang="less" scoped>
  .carousel {
    width: 500px;
    height: 500px;
    .slider {
      width: 100%;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        position: relative;
        li {
          // display: none;
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }

      .active {
        display: block;
      }
    }
  }
  .change-pic {
    .picbtn {
      cursor: pointer;
      &:hover {
        color: #eee;
      }
    }
  }
  //动画效果处理

  .right-enter-from {
    // opacity: 0;
    // display: block !important;
    transform: translateX(100%);
  }
  //开始过度了
  .right-enter-active {
    transition: all 1s linear;
    transform: translateX(0%);
  }
  //过度完成
  .right-enter-to {
  }
  //离开的过度
  .right-leave-from {
  }
  //离开中过度
  .right-leave-active {
    transition: all 1s linear;
  }
  //离开完成
  .right-leave-to {
    // opacity: 0;
    // display: none;
  }
  .small-pic {
    overflow: hidden;
    margin: 10px 0;
    .item {
      width: 40px;
      height: 40px;
      display: inline-block;
      margin: 0 5px 0 0;
      border-radius: 4px;
      opacity: 0.6;
      transition: opacity 0.8s ease;
      cursor: pointer;
    }
    .img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .small-pic .active {
    box-shadow: 0 3px 8px 0 rgb(255 82 103 / 50%);
    border: 1px solid #ff2741;
    opacity: 1;
    transition: opacity 0.8s ease;
  }
</style>
