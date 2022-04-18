<template>
  <div class="header">
    <div class="logo"></div>
    <div class="nav">
      <ul class="navlist" ref="ulList">
        <li v-for="(item, index) in navlist" :key="item.title" @mouseover="changeHoverClass(index + 1)" @mouseleave="hover = false">
          <router-link :to="item.to" active-class="nav_active" exact>{{ item.title }}</router-link>
        </li>
        <div class="slider" :style="{ left: curLeftValue }" :class="{ initleft: isExactActive }"></div>
      </ul>
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
  import { banners, kss, navlist } from '../../api/index';
  import { RouterLink, useLink } from 'vue-router';
  const { route, href, isActive, isExactActive, navigate } = useLink((RouterLink as any).props);
  let curId: any = ref(route.value.meta.index) || 1;
  let hover = ref(false);
  const initLeftv: string = 10 + 120 * curId - 120 + 'px';
  let leftv: string = '10px';
  let curLeftValue = computed(() => {
    return hover.value ? leftv : initLeftv;
  });
  const changeHoverClass = (index) => {
    hover.value = true;
    leftv = 10 + 120 * index - 120 + 'px';
  };
</script>

<style lang="less" scoped>
  .header {
    height: 80px;
    border-bottom: 1px solid #eee;
    .logo {
      height: 80px;
      width: 120px;
      margin-left: 120px;
      background: url('@/assets/logo.png') no-repeat center;
      background-size: 250% 250%;
    }
  }
</style>
