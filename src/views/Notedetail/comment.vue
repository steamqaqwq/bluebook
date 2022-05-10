<template>
  <div class="comments-list">
    <div class="comment-item" v-for="(comment, index) in comments" :key="comment.id">
      <div class="comment-title">
        <avatar width="50px" height="50px"></avatar>
        <div class="comment-author">{{ comment.author }}</div>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="comment-status">
        <span class="time">{{ timeFormat(comment.date) }}</span>
        <span class="ml-5 mr-5"><span class="thumbs iconfont icon-xihuan1"></span> {{ comment.favs }} </span>
        <span class="reply-btn" @click="reply(comment.id, comment.author, comment.id)">回复</span>
      </div>
      <reply-list ref="reply_list" :replies="comment.children" :postid="comment.id" @reply="reply"></reply-list>
      <replybox v-if="showreply && comment.id == curReplyId" :user="curReplyUser" class="ml-10 border-none"></replybox>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue';
  import avatar from '@/components/Avatar.vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime'; //使用dayjs 插件 fromnow
  import 'dayjs/locale/zh-cn'; // 导入本地化语言
  import ReplyList from './ReplyList.vue';
  import replybox from './replybox.vue';
  const props = defineProps(['comments']);
  const reply_list = ref([]);
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  //显示更多
  const isShowmore = ref(false);
  // 分页
  const pageStatus = reactive({
    currentPage: 1, //当前页面
    currentPageIndex: '', //
    pageSize: 8 // 页面最大显示
  });

  // 分页索引继承
  function changeIndex(index) {
    return (pageStatus.currentPage - 1) * pageStatus.pageSize + index + 1;
  }
  function pageChange(curpage) {
    pageStatus.currentPage = curpage;
  }
  // 回复
  const showreply = ref(false);
  const curReplyId = ref(0);
  const curReplyUser = reactive({
    userid: 0,
    username: ''
  });
  function reply(id: number, username: string, postid: number) {
    //初始化 清空当前
    curReplyUser.userid = 0;
    curReplyUser.username = '';
    showreply.value = true;

    //赋值
    curReplyUser.userid = id;
    curReplyUser.username = username;
    curReplyId.value = postid;
  }
  // 格式化时间
  const timeFormat = (time) => {
    let time_: number = time;
    // 统一时间以毫秒为单位
    if (String(time).length <= 10) {
      time_ = time_ * 1000;
    }
    // 时间差值
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

<style lang="less">
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
    transition: all 0.7s;
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

  .hide_post {
    display: none;
    // color: blue;
  }
</style>
