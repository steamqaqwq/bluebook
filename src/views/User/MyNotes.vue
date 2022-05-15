<template>
  <!-- <div class="">笔记班车</div> -->
  <div class="show_notes" ref="notesElement">
    <show-notes :max-columns="2" :outer-width="outerwidth!" :noteWidth="200"></show-notes>
  </div>
</template>

<script setup lang="ts">
  import ShowNotes from '@/components/ShowNotes.vue';
  import { onMounted, ref } from 'vue';
  const notesElement = ref();
  let outerwidth = ref<number>();
  onMounted(() => {
    outerwidth.value = notesElement.value.clientWidth;
    // alert(outer_width.value);
  });
</script>

<style lang="less" scoped>
  .show_notes {
    width: 100%;
    padding: 20px 0;
  }
</style>
