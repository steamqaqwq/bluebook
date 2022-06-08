<template>
  <div class="outerbox">
    <creator-title>笔记管理</creator-title>
    <div class="inner_box">
      <ul>
        <li v-for="(nav, index) in navs" :class="{ active: index == curIndex }" @click="curIndex = index">{{ nav }}</li>
      </ul>
      <div class="show_notes">
        <div class="all_notes" v-if="curIndex == 0 && notes.length">
          <div class="note" v-for="note in notes" :key="note.id" @mouseenter="showBtn(note.id)" @mouseleave="showBtn">
            <div class="left">
              <div class="img-outer">
                <img :src="note.cover" alt="" />
              </div>
            </div>
            <div class="right">
              <p class="title text-2xl">{{ note.title }}</p>
              <p class="status mt-4 mb-4 text-gray-400">favs: {{ note.favs }} comments:{{ note.comments }} likes:{{ note.likes }}</p>
              <p class="time text-gray-500">{{ new Date() }}</p>
              <p v-show="isshowBtn && curNoteid == note.id">
                <el-button type="danger" @click="dialogVisible = true">删除</el-button>
              </p>
            </div>
          </div>
          <el-dialog v-model="dialogVisible" title="提示" width="50%">
            <span>确认删除该笔记？</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确认</el-button>
              </span>
            </template>
          </el-dialog>
          <div>分页</div>
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
  import { ElMessageBox } from 'element-plus';

  import CreatorTitle from '@/components/CreatorTitle.vue';
  import { ref, onMounted } from 'vue';
  import request from '@/utils/request';
  import requestMock from '@/utils/requestMock';
  // const navs = ['全部笔记', '已发布', '审核中', '未通过'];
  const navs = ['全部笔记', '已发布'];
  const curIndex = ref(0);
  const curNoteid = ref();
  const notes = ref([]) as any;
  const isshowBtn = ref(false);
  const dialogVisible = ref(false);
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done();
      })
      .catch(() => {
        // catch error
      });
  };
  onMounted(() => {
    // request.get('/Myblog').then((res) => {
    //   console.log('myblog', res);
    // });

    requestMock.get('/api/mynotes').then((res) => {
      notes.value = res.data;
    });
  });
  const showBtn = (noteid) => {
    if (noteid) {
      curNoteid.value = noteid;
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
    .note {
      display: flex;
      flex-direction: row;
      margin: 10px 0;
      margin-bottom: 20px;
      overflow: hidden;
      .left {
        height: 100%;
        width: 200px;

        .img-outer {
          width: 150px;
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
</style>
