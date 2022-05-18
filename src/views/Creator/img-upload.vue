<template>
  <div class="img_upload">
    <div class="title">上传图片</div>
    <div class="content">
      <div class="upload_img">
        <el-upload action="#" drag multiple list-type="picture-card" ref="uploadRef" style="float: left" :before-upload="handleBeforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" :limit="9" :auto-upload="false">
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <el-input class="input_title" type="text" placeholder="填写标题，能获得更多赞哦~" v-model="formdata.title" />
      <el-input type="textarea" class="input_textarea" show-word-limit maxlength="1000" @input="getTags" placeholder="填写相关信息，让更多人看见你吧！" name="" id="" resize="none" :autosize="{ minRows: 5 }" v-model="formdata.description"> </el-input>

      <div class="textarea_btns_fun">
        <div class="fun_face">
          <el-button type="primary" @click="insertEmoji(textArea, ' #')">#话题</el-button>

          <el-button type="primary" @click="isShowFaces = !isShowFaces">添加表情</el-button>

          <div class="faces" v-show="isShowFaces">
            <Picker :data="emojiIndex" set="apple" @select="showEmoji" class="faces_picker" :style="{ height: '180px' }" :showPreview="false" :i18n="i18n" :showSearch="false" color="#818cf8" />
          </div>
        </div>
      </div>

      <!-- <div class="preview_imgs" style="width: 100%; height: 500px; display: flex; flex-direction: row; flex-wrap: wrap">
        <div class="preview_item w-20 h-20" v-for="img in fileList" :key="img.url">
          <img :src="imig.url" alt="" class="w-20 h-20" />
        </div>
      </div> -->
      <el-button class="pub-btn text-black w-20" @click="submitUpload"> 点击发布 </el-button>
      <div class="upload_tips">
        <div class="tip">
          <p class="tip_title">图片大小</p>
          <p>图片大小最大10M</p>
          <p></p>
        </div>
        <div class="tip">
          <p class="tip_title">图片格式</p>
          <p>仅支持.jpg .jpeg</p>
        </div>
        <div class="tip">
          <p class="tip_title">图片数量</p>
          <p>支持最多9张图片同时上传</p>
        </div>
        <el-progress class="progress" type="circle" :percentage="progressConfig.progressPercent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UploadFilled } from '@element-plus/icons-vue';
  import { ref, reactive, toRaw, onMounted } from 'vue';
  import { Plus } from '@element-plus/icons-vue';
  import { ElMessage, ElNotification } from 'element-plus';
  import request from '@/utils/request';
  import type { UploadProps, UploadUserFile, UploadInstance, UploadRequestHandler } from 'element-plus';
  //表情相关
  // all emoji sets.
  import data from 'emoji-mart-vue-fast/data/all.json';
  // Import default CSS
  import 'emoji-mart-vue-fast/css/emoji-mart.css';
  import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src';
  const isShowFaces = ref(false);
  const i18n = {
    search: '搜索表情',
    notfound: '没有该表情',
    categories: {
      search: '搜索结果',
      recent: '最近使用',
      smileys: '常用表情',
      people: '肢体头像',
      nature: '动物自然',
      foods: '食物饮料',
      activity: '体育活动',
      places: '旅游地点',
      objects: '抽象物品',
      symbols: '符号',
      flags: '国旗',
      custom: '客制化'
    }
  };
  const emojiIndex = ref(new EmojiIndex(data));
  //点击表情时插入头像
  function showEmoji(emoji) {
    insertEmoji(textArea.value, emoji.native);
  }

  const textArea = ref();
  function insertEmoji(textArea, emoji: string) {
    if (window.getSelection()) {
      let startPos = textArea.selectionStart;
      formdata.description = formdata.description.slice(0, startPos) + emoji + formdata.description.slice(startPos);
      textArea.focus();
      // 设置好坐标
      setTimeout(() => {
        let newPos = startPos + emoji.length;
        textArea.setSelectionRange(newPos, newPos);
      }, 0);
    }
  }
  onMounted(() => {
    textArea.value = document.querySelector('textArea');
  });
  //表情相关结束
  const fileList = ref<UploadUserFile[]>([
    // {
    //   name: 'food.jpeg',
    //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    // }
  ]);
  // 从文本内容#xx中提取标签作为数组返回
  const getTags = () => {
    if (!formdata.description) return [];
    let tags = formdata.description.match(/#(\S*)/gi);
    if (!tags) return [];
    tags = tags!.map((tag) => tag.replace('#', ''));
    // 设置标签黑名单
    let blacktags = ['@', '#', '\\', '\/'];
    // 过滤掉无效标签
    tags = tags.filter((v) => {
      //判断是否有黑明单标签
      let hasBlackTag = blacktags.some((i) => v.includes(i));
      if (!hasBlackTag && v.length <= 6) return v;
    });
    // console.log(tags);
    return tags;
  };
  const fileRawList = ref<{ raw: File }[]>([]);
  const formdata = reactive({
    title: '',
    description: '',
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
    progressConfig.progressPercent = 0;
    const config = {
      //axios 进度条事件
      onUploadProgress: (progressEvent) => {
        // progressEvent.loaded:已上传文件大小
        // progressEvent.total:被上传文件的总大小
        progressConfig.progressPercent = Number((progressEvent.loaded / progressEvent.total).toFixed(2));
      }
    };
    progressConfig.progressFlag = true;
    let form = new FormData();
    form.append('blogTheme', formdata.title);
    form.append('blogTalk', formdata.description);
    form.append('tag.tagNameArray', JSON.stringify(getTags()));
    fileList.value.forEach((item) => {
      form.append('files', item['raw']!);
    });
    request({
      url: '/upload/image',
      method: 'POST',
      data: form,
      headers: {
        type: 'image'
      },
      onUploadProgress: (progressEvent) => {
        // progressEvent.loaded:已上传文件大小
        // progressEvent.total:被上传文件的总大小

        progressConfig.progressPercent = Number((progressEvent.loaded / progressEvent.total).toFixed(2));
      }
    }).then((res: any) => {
      if (res.code == 200) {
        progressConfig.progressPercent = 100;
        ElNotification({
          title: '上传通知',
          message: res.msg,
          type: 'success',
          offset: 200
        });
      } else {
        ElNotification({
          title: '上传通知',
          message: res.msg,
          type: 'error',
          offset: 200
        });
      }
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
    min-width: 500px;
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .upload_img {
      // width: 100%;
      .upload-demo,
      :deep(.el-upload),
      :deep(.el-upload-dragger) {
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
    }
    .upload_tips {
      margin-top: 40px;
      display: flex;
      flex-direction: row;
      width: 100%;

      justify-content: space-between;
      @media (max-width: @lg_p) {
        flex-direction: column;
        align-items: center;
        .tip {
          margin-top: 20px !important;
          width: 100% !important;
          transition: all 0.5s;
          margin: 0 auto;
        }
      }
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
  .input_title,
  .input_textarea {
    // margin: 5px 0;
    // padding: 1px 10px;
    margin: 5px 0;
    max-width: 700px;
    box-sizing: border-box;
    // padding-bottom: 10px;
    // border-radius: 3px;
    // border: 1px solid #888;
    // outline: none;
    // &:hover:focus {
    //   border: 1px solid @themecolor;
    // }
  }
  .input_textarea::after {
    content: '#话题 可为文章添加标签哦，标签长度大于6为无效标签⚠。';
    color: #909399;
    position: absolute;
    bottom: 3px;
    left: 10px;
    font-size: 12px;
  }
  .textarea_btns_fun {
    // float:left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0 20px;
    .fun_face {
      position: relative;
      display: block;
      .faces_picker {
        height: 180px;
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 0;
        &::before {
          position: absolute;
          content: '';
          width: 10px;
          height: 10px;
          border-right-color: transparent !important;
          border-top-color: transparent !important;
          background: var(--el-color-white);
          border: 1px solid var(--el-border-color-light);
          transform: rotate(135deg);
          top: -5px;
          left: 11%;
          color: #d9d9d9;
        }
      }
    }
  }
  :deep(.el-textarea__inner) {
    padding-bottom: 22px;
  }
  :deep(.pub-btn) {
    width: 200px;
    height: 80px;
    // color: @themecolor2;
    background-color: @themecolor2;
    color: #fff;
    &:hover {
      color: #fff;
      background-color: @themecolor2;
      border: none;
    }
  }
  .progress {
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: @lg_p) {
      right: 20%;
      top: 74%;
    }
    @media (max-width: @lg_m) {
      right: 5%;
    }
    @media (max-width: @md_p) {
      right: 5%;
    }
  }
</style>
