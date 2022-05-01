<template>
  <div class="img_upload">
    <div class="title">上传图片</div>
    <div class="content">
      <div class="upload_img">
        <el-upload action="#" drag multiple list-type="picture-card" ref="uploadRef" :before-upload="handleBeforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" :limit="9" :auto-upload="false">
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <input type="text" placeholder="请输入标题" v-model="formdata.title" />
      <textarea name="" id="" cols="30" rows="10" v-model="formdata.description"> </textarea>
      <!-- <div class="preview_imgs" style="width: 100%; height: 500px; display: flex; flex-direction: row; flex-wrap: wrap">
        <div class="preview_item w-20 h-20" v-for="img in fileList" :key="img.url">
          <img :src="img.url" alt="" class="w-20 h-20" />
        </div>
      </div> -->
      <el-button class="text-black" type="success" @click="submitUpload"> 点击上传 </el-button>
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
          <p>支持最多9张图片上传</p>
        </div>
        <el-progress type="circle" :percentage="progressConfig.progressPercent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UploadFilled } from '@element-plus/icons-vue';
  import { ref, reactive, toRaw } from 'vue';
  import { Plus } from '@element-plus/icons-vue';
  import request from '@/utils/request';
  import type { UploadProps, UploadUserFile, UploadInstance, UploadRequestHandler } from 'element-plus';
  const fileList = ref<UploadUserFile[]>([
    // {
    //   name: 'food.jpeg',
    //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    // }
  ]);
  const fileRawList = ref<{ raw: File }[]>([]);
  const formdata = reactive({
    title: '一个大标题',
    description: 'dfssssssssssdfsdf',
    tags: ['rap', '篮球', '唱跳']
  });
  // const fileList = ref<{ name: string; url: string }[]>([]);
  const dialogImageUrl = ref('');
  const dialogVisible = ref(false);

  // 进度条 与手动上传
  const progressConfig = reactive({
    progressPercent: 0,
    progressFlag: false
  });
  function uploadSectionFile(params) {
    console.log('上传次数');
  }

  const uploadRef = ref<UploadInstance>();
  function submitUpload() {
    const config = {
      //axios 进度条事件
      onUploadProgress: (progressEvent) => {
        // progressEvent.loaded:已上传文件大小
        // progressEvent.total:被上传文件的总大小
        progressConfig.progressPercent = Number(((progressEvent.loaded / progressEvent.total) * 90).toFixed(2));
      }
    };
    progressConfig.progressFlag = true;
    let form = new FormData();
    form.append('blogTheme', formdata.title);
    form.append('blogTalk', formdata.description);
    form.append('tag.tagNameArray', JSON.stringify(formdata.tags));
    fileList.value.forEach((item) => {
      form.append('files', item['raw']!);
    });
    request({
      url: '/upload/image',
      method: 'POST',
      data: form
    }).then((res) => {
      console.log('上传', res);
    });
  }
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('uploadFile', uploadFiles);
  };
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    // console.log('uploadfile', uploadFile);
    // dialogImageUrl.value = uploadFile.raw!;
    dialogVisible.value = true;
  };
  const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    previewImage(rawFile);

    // (fileList as any).push({ name: rawFile.name, raw: rawFile });
    // console.log('fileList', toRaw(fileList));
  };

  // 预加载图片
  function previewImage(rawFile) {
    try {
      var src = window.URL.createObjectURL(rawFile);
      // Array.prototype.push.call(fileList.value,);
      fileList.value.push({ name: rawFile.name, url: src, raw: rawFile });
      // target.onload = function () {
      // 	window.URL.revokeObjectURL(this.src);
      // };
    } catch (e) {
      throw new Error('游览器不支持URL');
    }
  }
</script>

<style lang="less" scoped>
  .img_upload {
    padding: 20px;
    box-sizing: border-box;
    min-height: 650px;
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
        // width: 100%;
        // height: 400px;
      }
      :deep(.el-upload-dragger) {
        display: flex;
        height: 100%;
        border: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      /deep/.el-upload__text {
        // font-size: 30px;
      }
      /deep/.el-icon--upload {
        // font-size: 100px;
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
