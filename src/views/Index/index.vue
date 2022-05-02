<template>
  <div class="header">
    <div class="logo"></div>
    <div class="search">
      <Search></Search>
    </div>
    <div class="nav">
      <ul class="navlist" ref="ulList">
        <li v-for="(item, index) in navlist" :key="item.title" @mouseover="changeHoverClass(index + 1)" @mouseleave="changeHoverClassLeave">
          <router-link class="text-xl" :class="{ active: (hover || curIndex == initIndex) && curIndex == index + 1 }" :to="item.to" active-class="nav_active" exact>{{ item.title }}</router-link>
        </li>
        <div class="slider" :style="{ left: curLeftValue }" :class="{ initleft: isExactActive }"></div>
      </ul>
    </div>
    <div class="pub-btn">
      <el-button type="primary" :icon="Plus">发布</el-button>
    </div>
  </div>
  <div class="containerbox">
    <div class="inner_box">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive, watch, computed } from 'vue';
  import Search from '@/components/search.vue';
  import { banners, kss, navlist } from '../../api/index';
  import { RouterLink, useLink } from 'vue-router';
  import { useRouter, onBeforeRouteUpdate } from 'vue-router';
  import { Plus } from '@element-plus/icons-vue';
  const { route, href, isActive, isExactActive, navigate } = useLink((RouterLink as any).props);

  // 初始化标签
  let initIndex = ref((route.value.meta.index as number) || 2);
  let hover = ref(false);
  let initLeftv: string = 10 + 120 * initIndex.value - 120 + 'px';
  const curIndex = ref(initIndex.value);
  let leftv: string = '';
  // const initConfig = reactive({
  //   initIndex: (route.value.meta.index as number) || 2,
  //   initLeftv:10 + 120 * initIndex.value - 120 + 'px',
  //   curLeftv: '',
  //   curIndex: (route.value.meta.index as number) || 2,
  //   ishover: false
  // });
  let curLeftValue = computed(() => {
    return hover.value ? leftv : initLeftv;
  });
  const changeHoverClass = (index) => {
    hover.value = true;
    curIndex.value = index;
    leftv = 10 + 120 * index - 120 + 'px';
  };
  const changeHoverClassLeave = (index) => {
    hover.value = false;
    curIndex.value = initIndex.value;
  };
  //监听路由变化 修改当前索引
  onBeforeRouteUpdate((to) => {
    initIndex.value = to.meta.index as number;
    initLeftv = 10 + 120 * initIndex.value - 120 + 'px';
    curIndex.value = initIndex.value;
  });
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid #eee;
    position: relative;
    .search {
      position: absolute;
      left: 20%;
      top: 50%;
      transform: translateY(-50%);
    }
    .logo {
      height: 80px;
      width: 120px;
      margin-left: 120px;
      background: url('@/assets/logo.png') no-repeat center;
      background-size: 250% 250%;
      float: left;
    }
    .navlist {
      float: left;
      display: flex;
      position: relative;
      flex-direction: row;
      align-items: center;
      height: 100%;
      min-width: 600px;
      transform: initial;
      margin-left: 200px;
      li {
        a {
          display: block;
          width: 120px;
          height: 80px;
          line-height: 80px;
        }
        cursor: pointer;
        .active {
          color: #fff;
        }
        // &:hover {
        //   a {
        //     color: #fff;
        //   }
        //   .initleft {
        //     left: initial !important;
        //   }
        // }
      }
      // navBar 特效

      .slider {
        width: 100px;
        height: 60%;
        background-color: @themecolor2;
        border-radius: 4px;
        position: absolute;
        left: 10px;
        bottom: 10px;
        z-index: -1;
        transition: all ease 0.4s;
        animation: 2s ease-in-out waves infinite;
      }
      // .initleft {
      //   left: 250px;
      // }
      // // @i: 0;
      // .loop(@i) when (@i < 6) {
      //   .loop((@i+1));
      //   li:nth-child(@{i}):hover ~ .slider {
      //     left: (10px + @i * 120px-120px);
      //   }
      // }
      // .loop(0);
      @keyframes waves {
        from {
          clip-path: polygon(0% 17%, 9% 10%, 18% 4%, 30% 0%, 43% 1%, 49% 4%, 57% 7%, 66% 10%, 78% 11%, 89% 11%, 96% 9%, 100% 7%, 100% 100%, 0% 100%);
        }
        50% {
          clip-path: polygon(0% 4%, 6% 9%, 13% 13%, 23% 15%, 31% 16%, 42% 15%, 49% 13%, 61% 10%, 71% 5%, 81% 3%, 90% 2%, 100% 5%, 100% 100%, 0% 100%);
        }
        to {
          clip-path: polygon(0% 17%, 9% 10%, 18% 4%, 30% 0%, 43% 1%, 49% 4%, 57% 7%, 66% 10%, 78% 11%, 89% 11%, 96% 9%, 100% 7%, 100% 100%, 0% 100%);
        }
      }
    }
  }
  .pub-btn {
    float: right;
    margin-right: 20px;
    /deep/.el-button {
      width: 130px;
      height: 40px;
      background-color: @themecolor3;
      color: white;
      border: none;
      &:hover {
        filter: invert(1);
      }
    }
  }
</style>
