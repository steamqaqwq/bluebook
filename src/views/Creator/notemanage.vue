<template>
  <div class="outerbox">
    <creator-title>笔记管理</creator-title>
    <div class="inner_box">
      <ul>
        <li v-for="(nav, index) in navs" :class="{ active: index == curIndex }" @click="curIndex = index">{{ nav }}</li>
      </ul>
      <div class="show_notes">
        <div class="all_notes" v-if="curIndex == 0 && notes.length">
          <div class="note" v-for="note in notes" :key="note.blogId" @mouseenter="showBtn(note.blogId, note.blogTheme)" @mouseleave="showBtn()">
            <div class="left">
              <router-link
                target="_blank"
                :to="{
                  name: 'notedetail',
                  params: {
                    id: note['blogId']
                  }
                }"
              >
                <div class="img-outer">
                  <img :src="note.blogImage" alt="" />
                  <div class="video_icon" v-show="note.videoOrImage"><span class="iconfont icon-videofill text-xl text-white"></span></div>
                </div>
              </router-link>
            </div>
            <div class="right relative">
              <router-link
                target="_blank"
                :to="{
                  name: 'notedetail',
                  params: {
                    id: note['blogId']
                  }
                }"
              >
                <p class="title text-2xl">{{ note.blogTheme }}</p>
              </router-link>
              <p class="status mt-4 mb-4 text-gray-400">点赞数: {{ note.likes }} 评论数:{{ note.comments || 0 }} 收藏数:{{ note.collectSum || 0 }}</p>
              <p class="time text-gray-500">发布日期：{{ note.createTime || timeFormatMini() }}</p>
              <p class="absolute bottom-0" v-show="isshowBtn && curNoteid == note.blogId">
                <el-button type="danger" @click="dialogVisible = true">删除</el-button>
              </p>
            </div>
          </div>
          <el-dialog v-model="dialogVisible" title="提示" width="50%">
            <span class="text-2xl text-red-400"
              >确认删除<span class="text-red-700">{{ curNoteName }}</span
              >笔记？</span
            >
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="deleteNote">确认</el-button>
              </span>
            </template>
          </el-dialog>
          <div class="pagination" v-if="false"><el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" /></div>
        </div>
        <div v-else class="no_notes">
          <div class="bg"></div>
          <div class="bg_tips">暂无任何笔记~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { throttle } from '@/utils/debounce';
  import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';
  import CreatorTitle from '@/components/CreatorTitle.vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import request from '@/utils/request';
  import requestMock from '@/utils/requestMock';
  import { useUserStore } from '@/store/user';
  import { timeFormatMini } from '@/utils/getFormatTime';
  // import dayjs from 'dayjs
  // const navs = ['全部笔记', '已发布', '审核中', '未通过'];
  const navs = ['全部笔记', '已发布'];
  const curIndex = ref(0);
  const curNoteid = ref();
  const curNoteName = ref();
  const notes = ref([]) as any;
  const isshowBtn = ref(false);
  const dialogVisible = ref(false);
  const deleteNote = () => {
    dialogVisible.value = false;
    request.delete(`/blog/delete/${curNoteid.value}`).then((res: any) => {
      if (res.code == 200) {
        ElNotification({
          title: '删除成功',
          message: res.msg,
          type: 'success',
          offset: 200
        });
        requestData();
      } else {
        ElNotification({
          title: '删除失败',
          message: res.msg,
          type: 'error',
          offset: 200
        });
      }
    });
  };
  function requestData() {
    request.get(`/blog/personBlog`).then((res: any) => {
      console.log('myblog', res);
      notes.value = res.list.blogs;
    });
  }
  onMounted(() => {
    requestData();
  });
  const showBtn = (noteid = -1, noteName = '') => {
    if (noteid !== -1) {
      curNoteid.value = noteid;
      curNoteName.value = noteName;
    }
    isshowBtn.value = !isshowBtn.value;
  };
  function popmsg() {}
</script>

<style lang="less" scoped>
  .outerbox {
    padding: 20px;
    box-sizing: border-box;
    min-height: 650px;
    // min-width: 600px;
    width: auto;
    border-radius: 8px;
    background-color: #fff;
  }
  .inner_box {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      li {
        padding: 17px 12px;
        min-width: 66px;
        text-align: center;
        position: relative;
        font-weight: 400;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
  .active {
    color: @themecolor;
    border-bottom: 3px solid @themecolor;
  }
  .show_notes {
    width: 100%;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .no_notes .bg {
      height: 100px;
      width: 100px;
      background: url('@/assets/images/no_notes.png') no-repeat center;
    }
    .no_notes .bg_tips {
      color: gray;
      user-select: none;
    }
  }
  .all_notes {
    height: 100%;
    width: 100%;
    min-height: 500px;
    .note {
      display: flex;
      flex-direction: row;
      margin: 10px 0;
      margin-bottom: 20px;
      overflow: hidden;
      min-height: 150px;
      .left {
        width: 200px;
        display: flex;
        align-items: center;
        .img-outer {
          // width: 150px;
          position: relative;
          margin: 0 auto;
          border-radius: 10px;
          overflow: hidden;
        }
        img {
          height: 100%;
          object-fit: cover;
          max-height: 300px;
        }
      }
      .right {
        text-align: left;
        margin-left: 20px;
      }
    }
  }
  .pagination {
    position: absolute;
    bottom: 0;
  }
  .video_icon {
    position: absolute;
    width: 28px;
    height: 28px;
    right: 10px;
    top: 10px;
  }
</style>
