<template>
  <div class="video_upload">
    <div class="title">上传视频</div>
    <div class="content">
      <div class="upload_video">
        <el-upload class="upload-demo" :show-file-list="false" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽视频或<em>点击上传</em></div>
          <!-- <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </template> -->
        </el-upload>
      </div>
      <div class="upload_tips">
        <div class="tip">
          <p class="tip_title">视频大小</p>
          <p>支持时长5分钟以内，</p>
          <p>最大10GB的视频文件</p>
        </div>
        <div class="tip">
          <p class="tip_title">视频格式</p>
          <p>支持常用视频格式，</p>
          <p>推荐使用mp4、webm、mov</p>
        </div>
        <div class="tip">
          <p class="tip_title">视频分辨率</p>
          <p>推荐上传720P（1080*720）及以上视频，</p>
          <p>超过1280P的视频用网页端上传画质更清晰</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UploadFilled } from '@element-plus/icons-vue';
</script>

<style lang="less" scoped>
  .video_upload {
    padding: 20px;
    box-sizing: border-box;
    min-height: 800px;
    min-width: 1000px;
    width: auto;
    border-radius: 8px;
    background-color: #fff;

    .title {
      font-size: 28px;
      font-weight: 400;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        margin-right: 3px;
        height: 18px;
        width: 5px;
        display: inline-block;
        background-color: @themecolor2;
        border-radius: 3px;
      }
    }
  }
  .content {
    margin-top: 40px;
    .upload_video {
      .upload-demo,
      /deep/.el-upload,
      /deep/.el-upload-dragger {
        width: 100%;
        height: 500px;
      }
      /deep/.el-upload-dragger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      /deep/.el-upload__text {
        font-size: 30px;
      }
      /deep/.el-icon--upload {
        font-size: 100px;
      }
    }
    .upload_tips {
      margin-top: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .tip {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: 1px solid #eee;
        // min-width: 300px;
        width: 30%;
        box-sizing: border-box;
        padding: 20px;
        .tip_title {
          color: black;
        }
        p {
          color: gray;
        }
      }
    }
  }
</style>
