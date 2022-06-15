<template>
  <!-- <div class="">笔记班车</div> -->
  <div class="show_notes" ref="notesElement">
    <show-notes v-if="notes" :max-columns="2" :outer-width="outerwidth!" :noteWidth="200" :notesListProp="notes"></show-notes>
    <div v-else class="no_notes">
      <div class="bg"></div>
      <div class="bg_tips">暂无任何笔记~</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ShowNotes from '@/components/ShowNotes.vue';
  import { onMounted, ref } from 'vue';
  import { useUserStore } from '@/store/user';
  import request from '@/utils/request';
  const notesElement = ref();
  const notes = ref();
  let outerwidth = ref<number>();
  onMounted(() => {
    console.log(111111111);
    outerwidth.value = notesElement.value.clientWidth;
    // alert(outer_width.value);
    request.get(`/person/myblog?personId=${useUserStore().curPersonId}`).then((res: any) => {
      console.log(res);
      if (res.code == 200) notes.value = res.blog;
    });
  });
</script>

<style lang="less" scoped>
  .show_notes {
    width: 100%;
    padding: 20px 0;
  }
  .no_notes .bg {
    height: 100px;
    width: 100px;
    margin: 0 auto;
    background: url('@/assets/images/no_notes.png') no-repeat center;
  }
  .no_notes .bg_tips {
    color: gray;
    user-select: none;
  }
</style>
