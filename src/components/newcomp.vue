<template>
  <div class="container">
    <div class="row">hhhh</div>
    <div>store.value:{{count}}</div>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import useMainStore from '@/store'
  const store = useMainStore()
  const { count } = storeToRefs(store)
 
</script>
<style lang="less" scoped>
.container {
  padding: 20px;
  .row {
    font-size: 30px;
  }
}
</style>