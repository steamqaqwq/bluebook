<template>
  <div class="search_box">
    <div class="main_show">
      <div class="filter_nav">
        <ul>
          <li>全部</li>
          <li>用户</li>
        </ul>
      </div>
      <div class="filter_nav2">
        <components :is="comType"></components>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Header from '@/components/header.vue';
  import search from '@/components/search.vue';
  import { ref } from 'vue';
  const comType = ref('');
</script>

<style lang="less" scoped></style>
