<template>
  <div class="comments-list">
    <div class="comment-item" v-for="comment in comments">
      <div class="comment-title">
        <avatar width="50px" height="50px"></avatar>
        <div class="comment-author">{{ comment.author }}</div>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="comment-status">
        <span class="time">{{ timeFormat(comment.date) }}</span>
        <span class="ml-5 mr-5"><span class="thumbs iconfont icon-xihuan1"></span> {{ comment.favs }} </span>
        <span class="reply-btn" @click="reply(comment.id)">回复</span>
      </div>
      <div class="comment-reply-list" v-if="comment.children.length">
        <div class="comment-reply-item" v-for="replycomment in comment.children">
          <div class="reply-title">
            <avatar style="" class="mr-5" width="30px" height="30px"></avatar>
            <div>
              <span class="comment-author">{{ replycomment.author }}:</span>
              <span class="ml-5">{{ replycomment.content }}</span>
            </div>
          </div>
          <div class="comment-status">
            <span class="time">{{ timeFormat(replycomment.date) }}</span>
            <span class="ml-5 mr-5"><span class="thumbs iconfont icon-xihuan1"></span> {{ replycomment.favs }} </span>
            <span class="reply-btn" @click="reply(replycomment.id)">回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import avatar from '@/components/Avatar.vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime'; //使用dayjs 插件 fromnow
  import 'dayjs/locale/zh-cn'; // 导入本地化语言
  const props = defineProps(['comments']);
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');
  // const comments = [
  //   {
  //     id: 1,
  //     author: 'XXu',
  //     avatar: '@/assets/images/defaultAvatar.jpg',
  //     date: 1652005039383,
  //     favs: 2,
  //     content: '送来肯江三扥戳囧该呆呆呆呆呆呆呆呆呆呆鸡噢噢噢噢哦哦哦哦哦哦\nsdlfjoisdfhirhhhhhhhhhh\n',
  //     children: [
  //       {
  //         id: 2,
  //         author: 'zzXXu',
  //         avatar: '@/assets/images/defaultAvatar.jpg',
  //         date: 1651749679000,
  //         favs: 2,
  //         content: '来自远方的一条回复',
  //         children: []
  //       }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     author: 'XXu',
  //     avatar: '@/assets/images/defaultAvatar.jpg',
  //     date: 1611111212,
  //     favs: 2,
  //     content: '送来肯江三扥戳囧该呆呆呆呆呆呆呆呆呆呆鸡噢噢噢噢哦哦哦哦哦哦\nsdlfjoisdfhirhhhhhhhhhh\n',
  //     children: []
  //   }
  // ];
  // 回复
  function reply(id: number) {}

  // 格式化时间
  const timeFormat = (time) => {
    let time_: number = time;
    if (String(time).length <= 10) {
      time_ = time_ * 1000;
    }
    const timegap = Date.now() - time_;
    /* 
        1秒 1000
        1分钟 1000 * 60 60000 
        1小时 1000 * 60 * 60 3600000
        1天 1000 * 60 * 60 * 24 86400000
        1个月 1000 * 60 * 60 * 24 * 30 2592000000
        1年 1000 * 60 * 60 * 24 * 365 31536000000
      */
    const times = [31536000000, 2592000000, 86400000, 3600000, 60000, 1000];
    if (timegap > times[1] && timegap < times[0]) {
      return dayjs(time_).format('MM-DD');
    } else {
      return dayjs(time_).fromNow();
    }
  };
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
      .comment-status {
        margin-left: 50px;
        text-align: left;
        font-size: 0.6rem;
        color: gray;
        user-select: none;
        padding-bottom: 20px;

        .thumbs {
          // line-height: 0.6rem;
          vertical-align: middle;
          cursor: pointer;
          &:hover {
            color: @themecolor2;
          }
        }
        .reply-btn {
          user-select: none;
          cursor: pointer;
          &:hover {
            color: @themecolor2;
          }
        }
      }
    }
  }
  .comment-item .comment-reply-list {
    margin-left: 50px;
    .comment-status {
      margin-left: 50px;
    }
    .reply-title {
      display: flex;
      flex-direction: row;
      text-align: left;
    }
  }
</style>
