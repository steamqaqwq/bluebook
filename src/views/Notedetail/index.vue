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
        <textarea name="" id="" cols="30" rows="10">
🔹感谢欧拉好猫品牌邀请，使用后真诚分享

作为在广州生活的我，家里已经有辆汽油车

还需要一辆适合我这个宝妈的代步车

价钱不能太高，又要有实用性

所以我选择了开欧拉好猫回家

颜值与实力并存，推荐~

#适合女生的车 #春日里的欧拉好猫
</textarea
        >
      </div>
      <div class="signs">#打蛋器 #家居 #新手烘焙 #买了不后悔的家电 #在家做甜品 #好物分享 #烘培 #我的烘培日记 #打蛋器 #电动打蛋器 #手持打蛋器 #打蛋器 #让生活更美好的小家电 #家居好物 #厨房好物 #视频分享好物 #好物推荐 #博世家电</div>
      <div class="time_msg text-gray-500 text-xl">发布于 2022-04-14 11:26</div>
      <div class="commends">
        <div class="title">笔记评论</div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import carousel from '@/components/carousel.vue';
  const isVideo = ref(false);
  const imgs = ref(['https://ci.xiaohongshu.com/4c8bd876-2fa0-215d-c274-95696cbf84ff?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/7b6b921c-6307-e883-3e39-e8460444a13c?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/c676f40e-190f-2c98-ff7c-1c2e3667f596?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/f92ebc99-242c-62b4-b8be-bbcba01be146?imageView2/2/w/1080/format/jpg', 'https://ci.xiaohongshu.com/8319245c-8f87-14e5-4f7a-72ffa6c2eaba?imageView2/2/w/1080/format/jpg']);
</script>

<style lang="less" scoped>
  .main {
    width: 850px;
    margin: 0 auto;
    margin-top: 50px;
    overflow: hidden;
    .main_show {
      float: left;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 500px;
      margin-right: 40px;
    }
    .author_show {
      display: flex;
      flex-direction: column;
      width: 300px;
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
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
          }
        }
        /deep/.el-divider {
          width: 90%;
          margin: 0 auto;
        }
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
    .title {
      width: 100%;
      border-left: 5px solid @themecolor2;
      font-size: 20px;
      font-weight: bold;
      padding-left: 8px;
    }
  }
</style>
