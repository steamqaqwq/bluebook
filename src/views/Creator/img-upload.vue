<template>
  <div class="img_upload">
    <div class="title">上传图片</div>
    <div class="content">
      <div class="upload_img">
        <!-- <el-upload action="#" drag multiple list-type="picture-card" ref="uploadRef" style="float: left" :before-upload="handleBeforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" :limit="9" :auto-upload="false">
          <el-icon><Plus /></el-icon>
        </el-upload> -->
        <el-upload action="#" drag multiple list-type="picture-card" ref="uploadRef" style="float: left" :before-upload="handleBeforeUpload" :http-request="uploadImage" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" :limit="9" :on-exceed="exceedTips">
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
        <el-progress v-if="false" class="progress" type="circle" :percentage="progressConfig.progressPercent" />
      </div>

      <!-- <div class="preview_imgs" style="width: 100%; height: 500px; display: flex; flex-direction: row; flex-wrap: wrap">
        <div class="preview_item w-20 h-20" v-for="img in fileList" :key="img.url">
          <img :src="img.url" alt="" class="w-20 h-20" />
        </div>
      </div> -->
      <div style="width: 200px">
        <el-select v-model="formdata.pos" allow-create filterable default-first-option class="m-2" placeholder="填写相关地区详情">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
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
    console.log('ip', ip);
    request.get(`http://localhost:3000/baiduapi/location/ip?ak=F4oiQviHpdsR3rIuEafCWmPInZgIok4P&ip=${ip}&coor=bd09ll`).then((res: any) => {
      // console.log('ip-res', res);
      options.value.push({ value: res.content.address_detail.city, label: res.content.address_detail.city });
      formdata.x = res.content.point.x;
      formdata.y = res.content.point.y;
    });
    // 高德地图
    // let AMap = window.AMap;
    // let mapObj = new AMap.Map('iCenter');
    // console.log(mapObj);

    // mapObj.plugin('AMap.Geolocation', function () {
    //   let geolocation = new AMap.Geolocation({
    //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
    //     timeout: 10000, //超过10秒后停止定位，默认：无穷大
    //     maximumAge: 0, //定位结果缓存0毫秒，默认：0
    //     convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    //     showButton: true, //显示定位按钮，默认：true
    //     buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
    //     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //     showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
    //     showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
    //     panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
    //     zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //   });
    //   mapObj.addControl(geolocation);
    //   console.log('getPositino', geolocation.getCurrentPosition());
    //   AMap.event.addListener(geolocation, 'complete', (res: any) => {
    //     console.log(res, '成功');
    //     var ress = '经纬度：' + res.position + '\n精度范围：' + res.accuracy + '米\n定位结果的来源：' + res.location_type + '\n状态信息：' + res.info + '\n地址：' + res.formattedAddress + '\n地址信息：' + JSON.stringify(res.addressComponent, null, 4);
    //     console.log('当前位置信息' + ress);
    //     document.querySelector('#p')!.innerHTML = ress;
    //   }); //返回定位信息
    //   AMap.event.addListener(geolocation, 'error', (res) => {
    //     console.log(res, '出错');
    //   }); //返回定位出错信息
    // });
    // function aMapSearchNearBy(centerPoint, city) {
    //   AMap.service(['AMap.PlaceSearch'], function () {
    //     var placeSearch = new AMap.PlaceSearch({
    //       pageSize: 20, // 每页10条
    //       pageIndex: 1, // 获取第一页
    //       city: city // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
    //     });

    //     // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
    //     // 第二个参数是经纬度，数组类型
    //     // 第三个参数是半径，周边的范围
    //     // 第四个参数为回调函数
    //     placeSearch.searchNearBy('', centerPoint, 200, function (status, result) {
    //       console.log('status', status);
    //       if (result.info === 'OK') {
    //         console.log('result', result);
    //         var locationList = result.poiList.pois; // 周边地标建筑列表
    //         // 生成地址列表html　　　　　　　　　 createLocationHtml(locationList);
    //       } else {
    //         console.log('获取位置信息失败!');
    //       }
    //     });
    //   });
    // }
    // aMapSearchNearBy([110.348442, 21.277466], '');
    //高德地图相关结束
    formdata.pos = options.value[0].value;
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
  //表单数据
  const formdata = reactive({
    title: '',
    description: '',
    tags: [],
    pos: '',
    x: '',
    y: '',
    imagesId: ''
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

  function uploadImage() {
    let form = new FormData();
    fileList.value.forEach((item) => {
      form.append('files', item['raw']!);
    });
    return request({
      url: '/upload/image',
      method: 'POST',
      data: form,
      onUploadProgress: (progressEvent) => {
        // progressEvent.loaded:已上传文件大小
        // progressEvent.total:被上传文件的总大小
        progressConfig.progressPercent = Number((progressEvent.loaded / progressEvent.total).toFixed(2));
      }
    }).then((res: any) => {
      formdata.imagesId = res.blog_image;
    });
  }
  function exceedTips() {
    ElMessage({
      type: 'error',
      message: '最多同时上传9张图'
    });
  }
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
    form.append('blogTheme', formdata.title); //标题
    form.append('blogTalk', formdata.description); //详情
    form.append('locationName', formdata.pos); //地点
    form.append('nearby.x', formdata.x); //经度
    form.append('nearby.y', formdata.y); //维度
    form.append('tag.tagNameArray', JSON.stringify(getTags())); //标签
    form.append('flag', 'image'); // 类型
    form.append('blogImage', formdata.imagesId);
    // fileList.value.forEach((item) => {
    //   form.append('files', item['raw']!);
    // });
    request({
      url: '/upload/uploadBlog',
      method: 'POST',
      data: form,
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
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
  };
  const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // previewImage(rawFile);
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
      // .upload-demo,
      // :deep(.el-upload),
      // :deep(.el-upload-dragger) {
      //   // width: 100%;
      //   // height: 400px;
      // }
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
    position: relative;

    .fun_face {
      position: relative;
      display: block;
      .faces_picker {
        height: 180px;
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 2;
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
    transform: translateY(47%);
    @media (min-width: @lg) {
      right: 16%;
      transform: translateY(-142%);
    }
  }
</style>
