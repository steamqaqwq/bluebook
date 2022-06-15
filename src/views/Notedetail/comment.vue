<template>
  <div class="comments-list">
    <div class="comment-item" v-for="(comment, index) in comments" :key="comment.personId">
      <div class="comment-title">
        <avatar width="50px" height="50px" :src="comment.avatar"></avatar>
        <div class="comment-author">{{ comment.personName }}</div>
      </div>
      <div class="comment-content">{{ comment.commentContent }}</div>
      <div class="comment-status">
        <span class="time">{{ getFormatTime(comment.createTime) }}</span>
        <span class="ml-5 mr-5"><span class="thumbs iconfont icon-xihuan1"></span> {{ comment.commentLikes }} </span>
        <span class="reply-btn" @click="reply(comment.personId, comment.personName, comment.personId, index, comment.replyId, 1)">回复</span>
      </div>
      <reply-list ref="reply_list" v-model:replies="comment.replyList" :postid="comment.personId" @reply="reply" :postindex="index"></reply-list>
      <!-- 回复框显示条件 1.点击回复 2.回复的楼主ID一致 3.回复的是当前贴index一致 -->
      <replybox v-if="showreply && comment.personId == curReplyId && index == curReplyIndex" @updateReplyList="updateReplyList" :user="curReplyUser" class="ml-10 border-none" :commentId="comment.commentId"></replybox>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue';
  import avatar from '@/components/Avatar.vue';
  import ReplyList from './ReplyList.vue';
  import replybox from './replybox.vue';
  import getFormatTime from '@/utils/getFormatTime';
  import request from '@/utils/request';
  import { useNoteStore } from '@/store/note';
  const props = defineProps(['comments']);
  const reply_list = ref([]);

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
  const curReplyId = ref(0); // 当前贴的楼主
  const curReplyIndex = ref(0); // 当前贴的index
  const curReplyUser = reactive({
    userid: 0,
    username: ''
  });
  function reply(id: number, username: string, postid: number, postindex: number, ...args) {
    console.log('username', username, postid, args[0]);
    // 存储 对回复目标的ID  -- 回复对回复
    useNoteStore().curReply.replygoalId = args[0];
    useNoteStore().curReply.replyType = args[1];
    showreply.value = false;
    // console.log('postindex', postindex);
    //初始化 清空当前
    curReplyUser.userid = 0;
    curReplyUser.username = '';
    showreply.value = true;

    //赋值
    curReplyUser.userid = id;
    curReplyUser.username = username;
    curReplyId.value = postid;
    curReplyIndex.value = postindex;
  }
  // 更新回复列表
  const updateReplyList = (reply) => {
    console.log('reply', reply);

    let commentId = reply.commentId;
    //找出对应的评论
    let comment = props.comments.filter((item) => item.commentId == commentId);
    console.log('对应的评论', comment);

    //加入到回复列表
    comment[0].replyList.push(reply);
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
