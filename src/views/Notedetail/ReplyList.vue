<template>
  <div class="comment-reply-list" v-if="replies">
    <div class="comment-reply-item" :class="{ hide_post: index > pageStatus.pageSize - 4 && !isShowmore }" v-for="(replycomment, index) in replies.slice((pageStatus.currentPage - 1) * pageStatus.pageSize, pageStatus.currentPage * pageStatus.pageSize)">
      <div class="reply-title">
        <avatar style="" class="mr-5" width="30px" height="30px"></avatar>
        <div>
          <span class="comment-author"
            >{{ replycomment.personName || '无名氏' }}
            <span v-if="replycomment.replyType == 0 && !replycomment.hisId" class="text-xs"
              >&nbsp回复 <a href="#" class="text-blue-400">@{{ getReplyName(replycomment.hisId) }}</a></span
            >:</span
          >
          <span class="ml-5 text-sm">{{ replycomment.replyContent || '评论的啥啊' }}</span>
        </div>
      </div>
      <div class="comment-status">
        <span class="time">{{ getFormatTime(replycomment.createTime) }}</span>
        <span class="ml-5 mr-5"><span class="thumbs iconfont icon-xihuan1"></span> {{ replycomment.replyLikes || 55 }} </span>
        <span class="reply-btn" @click="emit('reply', replycomment.personId, replycomment.personName, postid, postindex, replycomment.replyId)">回复</span>
      </div>
    </div>
    <div class="cursor-pointer text-blue-700" @click="isShowmore = true" v-if="!isShowmore && replies.length - pageStatus.showPageNums > 0">还有{{ replies.length - pageStatus.showPageNums }}条回复 显示更多</div>
    <el-pagination layout="prev, pager, next" v-if="isShowmore" :total="replies.length" @current-change="pageChange" :current-page="pageStatus.currentPage" hide-on-single-page> </el-pagination>
    <!-- <replybox v-if="showreply" :user="curReplyUser"></replybox> -->
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import avatar from '@/components/Avatar.vue';
  import replybox from './replybox.vue';
  import getFormatTime from '@/utils/getFormatTime';
  const props = defineProps(['replies', 'postid', 'postindex']);
  const emit = defineEmits(['reply']);

  // 通过id获取回复人名字
  function getReplyName(personId) {
    let reply = props.replies.filter((x) => {
      console.log('newId', personId, x.myId);
      return x.myId == personId;
    });

    // console.log('reply', reply);
    return reply[0] ? reply[0].personName : '无效回复人';
  }

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
