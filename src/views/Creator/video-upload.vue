<template>
  <div class="video_upload">
    <div class="title">上传视频</div>
    <div class="content">
      <div class="upload_video">
        <el-upload class="upload-demo" :limit="1" :show-file-list="true" drag action="#" :before-upload="handleBeforeUpload" :http-request="uploadVideo" :file-list="fileList">
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

      <div class="cv_from_img">
        <el-input class="input_title" type="text" placeholder="填写标题，能获得更多赞哦~" v-model="formdata.title" />
        <el-input type="textarea" class="input_textarea" show-word-limit maxlength="1000" @input="getTags" placeholder="填写相关信息，让更多人看见你吧！" name="" id="" resize="none" :autosize="{ minRows: 5 }" v-model="formdata.description"> </el-input>

        <div class="textarea_btns_fun">
          <div class="fun_face">
            <el-button type="primary" @click="insertEmoji(textArea, ' #')">#话题</el-button>
            <el-button type="primary" @click="isShowFaces = !isShowFaces">添加表情</el-button>
            <div class="faces" v-show="isShowFaces">
              <Picker :data="emojiIndex" set="apple" @select="showEmoji" class="faces_picker" :style="{ height: '180px' }" :showPreview="false" :i18n="i18n" :showSearch="false" color="#818cf8" />
            </div>
            <el-progress class="progress" type="circle" :percentage="progressConfig.progressPercent" />
          </div>
        </div>
        <div style="width: 200px">
          <el-select v-model="formdata.pos" allow-create filterable default-first-option class="m-2" placeholder="填写相关地区详情">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button class="pub-btn text-black w-20" @click="submitUpload"> 点击发布 </el-button>
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
  // 位置选择
  const options = ref([
    {
      value: '0',
      label: '不显示位置'
    }
  ]);
  onMounted(() => {
    textArea.value = document.querySelector('textArea');
    let ip = (window as any).returnCitySN.cip;
    // ak  F4oiQviHpdsR3rIuEafCWmPInZgIok4P
    // ip 183.236.187.196
    request.get(`http://localhost:3000/baiduapi/location/ip?ak=F4oiQviHpdsR3rIuEafCWmPInZgIok4P&ip=${ip}&coor=bd09ll`).then((res: any) => {
      // console.log('ip-res', res);
      options.value.push({ value: res.content.address_detail.city, label: res.content.address_detail.city });
      formdata.x = res.content.point.x;
      formdata.y = res.content.point.y;
    });
    formdata.pos = options.value[0].value;
  });
  //表情相关结束

  // 文件列表
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
  const file = ref<{ raw: File }>();
  // interface formdataType {
  //   title: string;
  //   description: string;
  //   tags: string[];
  // }
  const formdata = reactive({
    title: '',
    description: '',
    tags: [],
    pos: '',
    x: '',
    y: '',
    videoid: ''
  });
  // const fileList = ref<{ name: string; url: string }[]>([]);

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
  function uploadVideo() {
    let form = new FormData();
    fileList.value.forEach((item) => {
      form.append('video', item['raw']!);
    });
    form.append('type', 'video');
    return request({
      url: '/upload/video',
      method: 'POST',
      data: form,
      onUploadProgress: (progressEvent) => {
        // progressEvent.loaded:已上传文件大小
        // progressEvent.total:被上传文件的总大小
        console.log(progressEvent);
        if (progressEvent.lengthComputable) {
          progressConfig.progressPercent = Number((progressEvent.loaded / progressEvent.total).toFixed(2));
        }
      }
    }).then((res: any) => {
      if (res.code == 200) {
        progressConfig.progressPercent = 100;
        formdata.videoid = res.videoName;
      }
    });
  }
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
    form.append('blogTheme', formdata.title); //标题
    form.append('blogTalk', formdata.description); //详情
    form.append('locationName', formdata.pos); //地点
    form.append('nearby.x', formdata.x); //经度
    form.append('nearby.y', formdata.y); //维度
    form.append('tag.tagNameArray', JSON.stringify(getTags())); //标签
    form.append('flag', 'video'); // 类型
    form.append('blogImage', formdata.videoid);
    // fileList.value.forEach((item) => {
    //   form.append('files', item['raw']!);
    // });
    // 上传
    request({
      url: '/upload/uploadBlog',
      method: 'POST',
      data: form
      // onUploadProgress: (progressEvent) => {
      //   // progressEvent.loaded:已上传文件大小
      //   // progressEvent.total:被上传文件的总大小
      //   progressConfig.progressPercent = Number((progressEvent.loaded / progressEvent.total).toFixed(2));
      // }
    }).then((res: any) => {
      if (res.code == 200) {
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
    // fileList.value.push(rawFile);
    // (fileList as any).push({ name: rawFile.name, raw: rawFile });
    // console.log('fileList', toRaw(fileList));
  };
</script>

<style lang="less" scoped>
  .video_upload {
    padding: 20px;
    box-sizing: border-box;
    min-height: 800px;
    min-width: 600px;
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
  // cv_from_img

  .cv_from_img {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .input_title,
  .input_textarea {
    margin: 5px 0;
    box-sizing: border-box;
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
    position: relative;
    margin: 10px 0 20px;
    width: 100%;
    .fun_face {
      // position: relative;
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
    // width: 100%;
    height: 50px;
    color: #fff;
    background-color: @themecolor2;
    font-size: 25px;
  }
  .progress {
    position: absolute;
    right: 10%;
    bottom: -90px;
  }
</style>
