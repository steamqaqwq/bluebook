<template>
  <div class="comments-list">
    <div class="comment-item" v-for="comment in comments">
      <div class="comment-title">
        <avatar width="50px" height="50px"></avatar>
        <div class="comment-author">{{ comment.author }}l</div>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="comment-status">
        <span class="time">{{ comment.date }}</span>
        <span class="thumbs ml-5 mr-5">{{ comment.favs }}{</span>
        <span class="reply-btn">回复</span>
      </div>
      <div class="comment-reply-list" v-if="comment.children.length">
        <div class="comment-reply-item" v-for="reply in comment.children"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import avatar from '@/components/Avatar.vue';
  const comments = [
    {
      id: 1,
      author: 'XXu',
      avatar: '@/assets/images/defaultAvatar.jpg',
      date: '2019-32-1',
      favs: 2,
      content: '送来肯江三扥戳囧该呆呆呆呆呆呆呆呆呆呆鸡噢噢噢噢哦哦哦哦哦哦\nsdlfjoisdfhirhhhhhhhhhh\n',
      children: [
        {
          id: 2,
          author: 'zzXXu',
          avatar: '@/assets/images/defaultAvatar.jpg',
          date: '2019-32-1',
          favs: 2,
          content: '来自远方的一条回复',
          children: []
        }
      ]
    }
  ];
</script>

<style lang="less" scoped>
  .comments-list {
    display: flex;
    flex-direction: column;
    .comment-item {
      position: relative;
      border-bottom: 1px solid #eee;
      display: flex;
      flex-direction: column;
      .comment-title {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .comment-content {
        margin-left: 50px;
        text-align: left;
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
  }
</style>
