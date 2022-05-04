<template>
  <div class="users_box">
    <div class="user_card" v-for="user in users" :key="(user as any).userid">
      <user-card :item="user"></user-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import UserCard from './UserCard.vue';
  import request from '@/utils/requestMock';
  import { onMounted, ref } from 'vue';
  const users = ref([]);
  onMounted(() => {
    request.get('/search/users').then((res: any) => {
      users.value = res.users;
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
