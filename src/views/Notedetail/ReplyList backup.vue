<template>
  <div class="comment-reply-list" v-if="replies.length">
    <div class="comment-reply-item" :class="{ hide_post: index > pageStatus.pageSize - 4 && !isShowmore }" v-for="(replycomment, index) in replies.slice((pageStatus.currentPage - 1) * pageStatus.pageSize, pageStatus.currentPage * pageStatus.pageSize)">
      <div class="reply-title">
        <avatar style="" class="mr-5" width="30px" height="30px"></avatar>
        <div>
          <span class="comment-author">{{ replycomment.author }}:</span>
          <span class="ml-5 text-sm">{{ replycomment.content }}</span>
        </div>
      </div>
      <div class="comment-status">
        <span class="time">{{ timeFormat(replycomment.date) }}</span>
        <span class="ml-5 mr-5"><span class="thumbs iconfont icon-xihuan1"></span> {{ replycomment.favs }} </span>
        <span class="reply-btn" @click="emit('reply', replycomment.id, replycomment.author, postid)">回复</span>
      </div>
    </div>
    <div class="cursor-pointer text-blue-700" @click="isShowmore = true" v-if="!isShowmore">还有{{ replies.length - pageStatus.showPageNums }}条回复 显示更多</div>
    <el-pagination layout="prev, pager, next" v-if="isShowmore" :total="replies.length" @current-change="pageChange" :current-page="pageStatus.currentPage" hide-on-single-page> </el-pagination>
    <!-- <replybox v-if="showreply" :user="curReplyUser"></replybox> -->
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import avatar from '@/components/Avatar.vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime'; //使用dayjs 插件 fromnow
  import 'dayjs/locale/zh-cn'; // 导入本地化语言
  import replybox from './replybox.vue';
  const props = defineProps(['replies', 'postid']);
  const emit = defineEmits(['reply']);

  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');
  //显示更多
  const isShowmore = ref(false);
  // 分页
  const pageStatus = reactive({
    currentPage: 1, //当前页面
    currentPageIndex: '', //
    pageSize: 8, // 页面最大显示
    showPageNums: 5
  });

  // 分页索引继承
  function changeIndex(index) {
    return (pageStatus.currentPage - 1) * pageStatus.pageSize + index + 1;
  }
  function pageChange(curpage) {
    pageStatus.currentPage = curpage;
  }
  // // 回复
  // const showreply = ref(false);
  // const curReplyUser = reactive({
  //   userid: 0,
  //   username: ''
  // });
  // function reply(id: number, username: string) {
  //   showreply.value = true;
  //   curReplyUser.userid = id;
  //   curReplyUser.username = username;
  // }

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
  .comment-reply-list {
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
