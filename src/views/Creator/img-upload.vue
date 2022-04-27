<template>
  <div class="img_upload">
    <div class="title">上传图片</div>
    <div class="content">
      <div class="upload_img">
        <el-upload class="upload-demo" :show-file-list="true" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        </el-upload>
      </div>
      <div class="upload_tips">
        <div class="tip">
          <p class="tip_title">图片大小</p>
          <p>支持时长5分钟以内，</p>
          <p>最大10GB的视频文件</p>
        </div>
        <div class="tip">
          <p class="tip_title">图片格式</p>
          <p>目前仅支持.jpg</p>
        </div>
        <div class="tip">
          <p class="tip_title">图片数量</p>
          <p>仅支持最多9张图片上传</p>
          <!-- <p></p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UploadFilled } from '@element-plus/icons-vue';
</script>

<style lang="less" scoped>
  .img_upload {
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
    .upload_img {
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
