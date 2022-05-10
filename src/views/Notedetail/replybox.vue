<template>
  <div class="my_input">
    <avatar></avatar>
    <el-input ref="input" type="textarea" show-word-limit resize="none" :rows="2" v-model="my_input" :input-style="{ width: '300px' }" :placeholder="user.username ? `回复 @${user.username} :` : '回复一条有趣的评论'"></el-input>
    <el-button type="primary">评论</el-button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue';
  import avatar from '@/components/Avatar.vue';

  const my_input = ref();
  const input = ref();
  const props = withDefaults(
    defineProps<{
      user: {
        userid: number;
        username: string;
      };
    }>(),
    {
      //   placeholder: '回复一条有趣的评论'
    }
  );
  nextTick(() => {
    input.value.focus();
  });
</script>

<style lang="less" scoped>
  .my_input {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #888;
    margin-bottom: 20px;
    width: 100%;
    /deep/.el-button {
      width: 60px;
      height: 50px;
      margin-left: 20px;
    }
  }
</style>
