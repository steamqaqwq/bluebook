<template>
  <div class="users_box" v-if="users && users.length">
    <div class="user_card" v-for="user in users" :key="(user as any).personId">
      <user-card :item="user"></user-card>
    </div>
  </div>
  <div v-else>没有相关用户</div>
</template>

<script setup lang="ts">
  import UserCard from './UserCard.vue';
  import requestMock from '@/utils/requestMock';
  import request from '@/utils/request';
  import { useNoteStore } from '@/store/note';
  import { onMounted, ref } from 'vue';
  const users = ref([]);
  onMounted(() => {
    // requestMock.get('/search/users').then((res: any) => {
    //   users.value = res.users;
    //   // console.log('users', users);
    // });
    request.get(`/search/personSearch?tagName=${useNoteStore().curSearchKey}`).then((res: any) => {
      users.value = res.personList.personList;
      // console.log('users', users);
    });
  });
</script>

<style lang="less" scoped>
  .users_box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    row-gap: 10px;
    column-gap: 10px;
    @media (max-width: 1000px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
