<template>
  <div>附近</div>
  <div>
    <!-- <showNotes :maxColumns="7" :notesList="noteList"></showNotes> -->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import request from '@/utils/request';
  import showNotes from '@/components/ShowNotes.vue';
  import useLocation from '@/hooks/useLocation';
  const location = useLocation();
  onMounted(async () => {
    console.log(222);

    let res = await location;
    console.log(res.location);
    await request
      .get('/blog/nearby', {
        params: {
          longitude: res.location.point.x,
          latitude: res.location.point.y
        }
      })
      .then((res) => {
        console.log(res);
      });

    console.log(1212);
  });
</script>

<style lang="less" scoped></style>
