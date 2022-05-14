<template>
  <div class="main">
    <div class="main_show">
      <div v-if="isVideo" class="video_show">
        <video controls="true" src="http://v.xiaohongshu.com/pre_post/01e2622d502039cc01837003804f849b35_259.mp4?sign=d37829fe289858d2d9f69dbf9c1c6186&t=62657400"></video>
      </div>
      <div v-else class="img_show">
        <carousel :imgs="imgs"></carousel>
      </div>
      <div class="note_title text-2xl font-semibold">烘培新手Or老手？快速教你打蛋器如何选？</div>
      <div class="note_text">
        <p class="break-words text-left whitespace-pre-wrap">{{ content }}</p>
      </div>
      <div class="signs"></div>
      <div class="time_msg text-gray-500 text-xl">发布于 2022-04-14 11:26</div>
      <div class="commends">
        <div class="title" id="comment">笔记评论</div>
        <div class="my_input">
          <avatar></avatar>
          <el-input type="textarea" show-word-limit resize="none" :rows="2" v-model="my_input" :input-style="{ width: '300px' }" placeholder="发一条想表达的评论.."></el-input>
          <el-button type="primary">评论</el-button>
        </div>
        <div>
          <Comments :comments="comments" v-if="comments.length"></Comments>
        </div>
      </div>
    </div>
    <div class="author_show">
      <div class="author_card">
        <div class="title">笔记作者</div>
        <div class="author_msg">
          <div class="author_avatar">
            <img src="https://sns-avatar-qc.xhscdn.com/avatar/5c1faef79b72b40001de57ba.jpg?imageView2/1/w/540/format/jpg" alt="" />
          </div>
          <div class="author_name">作者名称</div>
        </div>
        <el-divider />
        <div class="author_data">一些基本数据上</div>
      </div>
      <div class="note_about"></div>
      <div class="fav_funcs">
        <p>
          <span class="span1 iconfont icon-thumb-up" @click="love()"></span>
          <span class="span2">0</span>
        </p>
        <p>
          <a href="#comment"> <span class="span1 iconfont icon-pinglun"></span></a>
          <span class="span2">23</span>
        </p>
        <p>
          <span class="span1 iconfont icon-6Collection_01" @click="collection()"></span>
          <span class="span2">8</span>
        </p>
      </div>
    </div>
    <div class="fav_funcs_fixed">
      <p>
        <span class="span1 iconfont icon-thumb-up" @click="love()"></span>
        <span class="span2">0</span>
      </p>
      <p>
        <a href="#comment"> <span class="span1 iconfont icon-pinglun"></span></a>
        <span class="span2">23</span>
      </p>
      <p>
        <span class="span1 iconfont icon-6Collection_01" @click="collection()"></span>
        <span class="span2">8</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import carousel from '@/components/carousel.vue';
  import avatar from '@/components/Avatar.vue';
  import Comments from './comment.vue';
  import request from '@/utils/requestMock';
  const isVideo = ref(false);
  const my_input = ref();
  const imgs = ref(['https://ci.xiaohongshu.com/4c8bd876-2fa0-215d-c274-95696cbf84ff?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/7b6b921c-6307-e883-3e39-e8460444a13c?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/c676f40e-190f-2c98-ff7c-1c2e3667f596?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/f92ebc99-242c-62b4-b8be-bbcba01be146?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/8319245c-8f87-14e5-4f7a-72ffa6c2eaba?imageView2/2/w/1080/format/jpg']);
  const comments = ref([]);
  const content = `🔹感谢欧拉好猫品牌邀请，使用后真诚分享作为在广州生活的我，家里已经有辆汽油车 还需要一辆适合我这个宝妈的代步车价钱 不能太高，又要有实用性 所以我选择了开欧拉好猫回\n家颜值与实力并存，推荐~ #适合女生的车 #春日里的欧拉好猫\n\n#打蛋器 #家居 #新手烘焙 #买了不后悔的家电 #在家做甜品 #好物分享 #烘培 #我的烘培日记 #打蛋器 #电动打蛋器 #手持打蛋器 #打蛋器 #让生活更美好的小家电 #家居好物 #厨房好物 #视频分享好物 #好物推荐 #博世家电
  `;
  onMounted(() => {
    request.get('/api/comments').then((res: any) => {
      comments.value = res.comments;
    });
  });

  // 点赞 收藏
  function love() {}
  function collection() {}
</script>

<style lang="less" scoped>
  .main {
    max-width: @lg;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    // overflow: hidden;
    padding: 30px;
    padding-bottom: 60px;
    display: flex;
    justify-content: center;
    position: relative;
    .main_show {
      float: left;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 500px;
      margin-right: 40px;
      @media (max-width: @md) {
        margin-right: 0;
      }
    }
    .author_show {
      display: flex;
      flex-direction: column;
      width: 300px;
      max-height: 500px;
      // align-items: center;
      position: sticky;
      top: 10%;
      .author_card {
        width: 100%;
        min-height: 100px;
        border-radius: 5px;
        border: 1px solid #eee;
        .title {
          text-align: left;
          height: 50px;
          padding-left: 20px;
          line-height: 50px;
          border-bottom: 1px solid #eee;
        }
        .author_msg {
          min-height: 100px;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 20px;
          .author_avatar {
            min-width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        /deep/.el-divider {
          width: 90%;
          margin: 0 auto;
        }
      }
      .fav_funcs {
        display: flex;
        flex-direction: column;
        padding: 15px;
        width: 100px;
        margin-left: 25px;
        background: linear-gradient(to top right, #ffffff, #9198e5);
        border-radius: 10px;
        margin-top: 50px;
        p {
          text-align: left;
        }
        span {
          // color: #eadfdf;
          // color: @themecolor2;
          color: #fff;
        }
        .span1 {
          font-size: 24px;
          margin: 20px 10px;
          cursor: pointer;
          &:hover {
            color: @themecolor2;
          }
        }
        .span2 {
          font-size: 16px;
          user-select: none;
        }
      }
      @media (max-width: @md) {
        display: none;
      }
    }
  }
  .video_show {
    height: 500px;
    width: 500px;
    video {
      height: 100%;
      width: 100%;
      object-fit: contain;
      outline: none;
      background-color: #000;
    }
  }
  .img_show {
    min-height: 500px;
    width: 500px;
  }
  .note_title {
    margin: 10px 0;
  }
  .note_text {
    textarea {
      overflow: hidden;
      outline: none;
      min-height: 400px;
    }
  }
  .commends {
    margin-top: 20px;
    width: 100%;
    .title {
      width: 100%;
      border-left: 5px solid @themecolor2;
      font-size: 20px;
      font-weight: bold;
      padding-left: 8px;
      text-align: left;
    }
    .my_input {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100px;
      border-bottom: 1px solid #888;
      margin-bottom: 20px;
      // width: 100%;
      /deep/.el-button {
        width: 60px;
        height: 50px;
        margin-left: 20px;
      }
    }
  }

  .fav_funcs_fixed {
    position: fixed;
    bottom: 0;
    display: none;
    flex-direction: row;
    align-items: center;
    background-color: @themecolor;
    width: 100%;
    p {
      flex: 1;
      text-align: center;
    }
    span {
      color: rgb(244, 240, 240);
    }
    .span1 {
      font-size: 24px;
      margin: 20px 10px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .span2 {
      font-size: 16px;
      user-select: none;
    }
    @media (max-width: @md) {
      display: flex;
    }
  }
</style>
