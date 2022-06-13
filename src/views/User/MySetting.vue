<template>
  <div class="setting">
    <div class="avatar" @click="uploadAvatar">
      <!-- <img v-if="usermsg" src="@/assets/images/defaultAvatar.jpg" alt="" /> -->
      <!-- <img :src="usermsg.avatar" alt="" /> -->
      <Avatar :src="usermsg.avatar" width="80px" height="80px"></Avatar>
    </div>
    <input type="file" hidden style="" ref="avatarinput" accept="image/jpg, image/png" @change="unloadAvatorChange" />
    <div class="form">
      <el-form>
        <el-form-item label="名字">
          <el-input v-model="formdata.personName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="ID号">
          <el-input disabled v-model="formdata.identNumber"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formdata.briefInfor"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="formdata.sex" label="0">男</el-radio>
          <el-radio v-model="formdata.sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="formdata.createTime" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="地区">
          <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange"> </el-cascader>
        </el-form-item>
        <el-form-item>
          <button type="button" class="updateBtn" @click="updateData">更新</button>
          <button type="button" class="updateBtn mt-5" @click="resetData">重置</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, inject } from 'vue';
  import request from '@/utils/request';
  import Avatar from '@/components/avatar.vue';
  import { provinceAndCityDataPlus, CodeToText } from 'element-china-area-data';
  const options = provinceAndCityDataPlus;
  const selectedOptions = ref([]);
  const avatarinput = ref();
  const props = defineProps(['userMsg']);
  const usermsg: any = inject('usermsg');
  // console.log('message', message.value);
  const formdata = ref({
    personName: usermsg.value.personName,
    identNumber: usermsg.value.identNumber || 123123123,
    briefInfor: usermsg.value.briefInfor,
    sex: usermsg.value.sex,
    createTime: usermsg.value.createTime || '',
    career: usermsg.value.career || '',
    location: usermsg.value.location || ''
  });
  const formdataInit = {
    personName: usermsg.value.personName,
    identNumber: usermsg.value.identNumber || 123123123,
    briefInfor: usermsg.value.briefInfor,
    sex: usermsg.value.sex,
    createTime: usermsg.value.createTime || '',
    career: usermsg.value.career || '',
    location: usermsg.value.location || ''
  };
  function handleChange(v) {
    let newstr = '';
    selectedOptions.value.forEach((item) => {
      newstr += CodeToText[item];
    });
    formdata.value.location = newstr;
  }
  function updateData() {
    request.post('/person/update', formdata.value);
  }
  function resetData() {
    formdata.value = formdataInit;
  }
  // 上传头像
  function uploadAvatar() {
    avatarinput.value.click();
    // avatarinput.value.submit();
  }
  // 头像上传事件 unloadAvatorChange
  function unloadAvatorChange() {}
  onMounted(() => {
    request.get('/user/msg');
  });
</script>

<style lang="less" scoped>
  .setting {
    padding: 20px;
    width: 100%;
    .avatar {
      border-radius: 50%;
      overflow: hidden;
      height: 80px;
      width: 80px;
      margin: 10px auto;
      position: relative;
      cursor: pointer;

      &:hover {
        &:before {
          content: '+';
          font-size: 40px;
          color: #fff;
          line-height: 200%;
          background-color: #d3cbcb78;
          height: 100%;
          width: 100%;
          transform: translateX(-50%);
          position: absolute;
          transition: all 0.5s;
        }
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
    /deep/.el-form-item__content {
      margin-left: auto;
    }
  }
  .updateBtn {
    // width: 100px;
    width: 100%;
    // padding: 10px;
    background-color: #fff;
    color: @themecolor;
    border: 1px solid @themecolor;
    border-radius: 12px;
    &:hover {
      color: #fff;
      background-color: @themecolor;
    }
  }
  .form {
    width: 70%;
    margin: 0 auto;
    :deep(.el-input, .el-input__inner, .el-cascader) {
      width: 100%;
    }
    :deep(.el-cascader) {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
</style>
