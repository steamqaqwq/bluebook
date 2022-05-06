<template>
  <div class="setting">
    <div class="avatar" @click="uploadAvatar">
      <img src="@/assets/images/defaultAvatar.jpg" alt="" />
    </div>
    <input type="file" hidden style="" ref="avatarinput" accept="image/jpg, image/png" @change="unloadAvatorChange" />
    <el-form>
      <el-form-item label="名字">
        <el-input v-model="formdata.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="小蓝书号">
        <el-input disabled v-model="formdata.id"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formdata.brief"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="formdata.sex" label="男">男</el-radio>
        <el-radio v-model="formdata.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="formdata.birthday" type="date" placeholder="选择日期"> </el-date-picker>
      </el-form-item>
      <el-form-item label="地区">
        <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange"> </el-cascader>
      </el-form-item>

      <el-form-item>
        <button class="updateBtn" @click="updateData">更新</button>
        <button class="updateBtn mt-5" @click="resetData">重置</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import request from '@/utils/requestMock';
  import { provinceAndCityDataPlus } from 'element-china-area-data';
  const options = provinceAndCityDataPlus;
  const selectedOptions = ref([]);
  const avatarinput = ref();
  const formdata = ref({
    name: 'XXu',
    id: '234234324',
    brief: '',
    sex: '男',
    birthday: '',
    job: '',
    region: ''
  });
  const formdataInit = {
    name: 'XXu',
    id: '234234324',
    brief: '',
    sex: '男',
    birthday: '',
    job: '',
    region: ''
  };
  function handleChange(v) {
    console.log(v);
  }
  function updateData() {
    console.log();
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
    // request.get('/user/msg');
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
      border: 1px solid #eee;
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
</style>
