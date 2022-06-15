<template>
  <div class="my_input">
    <avatar :src="useUserStore().avatar"></avatar>
    <el-input ref="input" type="textarea" show-word-limit resize="none" :rows="2" v-model="my_input" :input-style="{ width: '300px' }" :placeholder="user.username ? `回复 @${user.username} :` : '回复一条有趣的评论'"></el-input>
    <el-button type="primary" @click="reply">评论</el-button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue';
  import avatar from '@/components/Avatar.vue';
  import { useNoteStore } from '@/store/note';
  import { useUserStore } from '@/store/user';
  const emit = defineEmits(['updateReplyList']);

  const my_input = ref();
  const input = ref();
  const props = withDefaults(
    defineProps<{
      user: {
        userid: number | string;
        username: string;
      };
      commentId: string;
    }>(),
    {
      //   placeholder: '回复一条有趣的评论'
    }
  );
  const reply = async () => {
    let res = await useNoteStore().reply({
      commentId: props.commentId,
      replyType: useNoteStore().curReply.replyType,
      replygoalId: useNoteStore().curReply.replygoalId || -1, //replyId
      replyContent: my_input.value
    });
    console.log('replyres', res);
    emit('updateReplyList', (res as any).reply);
  };
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
