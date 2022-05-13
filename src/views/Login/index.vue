<template>
  <div class="header font-sans text-3xl">
    <div class="logo">
      <!-- <img src="../../assets/logo.png" alt="" /> -->
    </div>
  </div>
  <div class="containerbox">
    <div class="container_inner">
      <div class="introduce">
        <div class="introduce_text">
          <p class="text-4xl font-bold text-black">加入我们</p>
          <p class="text-4xl font-bold text-black mt-1">分享你的生活</p>
          <p class="text-sm text-gray-400 mt-2">你的生活指南。</p>
        </div>
        <div class="introduce_video" v-for="item in data" :key="item.id">
          <div data-v-70ee3835="" class="circle" style="background: rgb(246, 214, 231)" data-fullscreen-container="true">
            <video data-v-70ee3835="" disableremoteplayback="" :autoplay="item.autoplay" :muted="item.muted" :loop="item.loop" mqn-lazyimage-video-no-play="" mqn-video-inview-play="" class="video"><source data-v-70ee3835="" :src="item.src" type="video/mp4" /></video>
          </div>
        </div>
      </div>
      <div class="login bg-gradient-to-tr from-purple-100 via-pink-300 to-blue-300">
        <div class="login_type absolute text-xl top-0 right-0" @click="changeIcon()">
          <span class="iconfont text-3xl" :class="curIcon"></span>
        </div>
        <div class="outerbox relative">
          <!-- <keep-alive> -->
          <template v-if="curLoginType == LoginType.message">
            <div class="text-xl font-bold text-left mb-5">短信登录</div>
            <el-row>
              <el-input v-model.number="formdata.username" class="w-50 m-2 login-input" placeholder="手机号" :prefix-icon="Iphone" />
            </el-row>
            <el-row class="relative">
              <el-input :prefix-icon="Message" v-model="formdata.password" class="w-50 m-2 login-input" placeholder="验证码" />
              <div class="sendCode" :style="{ color: formdata.username ? '#818cf8' : '#888', cursor: formdata.username ? 'pointer' : 'no-drop' }" @click="formdata.username ? sendCode() : ''">发送验证码</div>
            </el-row>
            <el-row> <button class="login-btn" @click="login(curLoginType)">登录</button></el-row>
          </template>
          <template v-else-if="curLoginType == LoginType.password">
            <div class="text-xl font-bold text-left mb-5">手机密码登录</div>
            <el-row>
              <el-input v-model="formdata.username" class="w-50 m-2 login-input" placeholder="手机号" :prefix-icon="User" />
            </el-row>
            <el-row> <el-input v-model="formdata.password" type="password" class="w-50 m-2 login-input" placeholder="密码" :prefix-icon="Lock" /></el-row>
            <el-row> <button class="login-btn" @click="login(curLoginType)">登录</button></el-row>
          </template>
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
  </div>
  <div class="footer"></div>
</template>

<script setup lang="ts">
  import { data } from '@/api/login';
  import { Message, User, Lock, Iphone } from '@element-plus/icons-vue';
  import { reactive, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { setToken } from '@/utils/auth';
  import request from '@/utils/request';
  import anime from 'animejs';
  const $router = useRouter();

  // 0为Password 1为message
  enum LoginType {
    password,
    message
  }
  const curLoginType = ref(LoginType.message);
  const curIcon = computed(() => {
    return curLoginType.value == LoginType.password ? 'icon-duanxinyanzheng' : 'icon-mima';
  });
  const changeIcon = () => {
    console.log(curIcon.value == 'icon-duanxinyanzheng');
    if (curIcon.value == 'icon-mima') {
      curLoginType.value = LoginType.password;
    } else if (curIcon.value == 'icon-duanxinyanzheng') {
      curLoginType.value = LoginType.message;
    }
  };
  // console.log('curLoginType', curLoginType);
  // 既是密码登录也是短信验证
  const formdata = reactive({
    username: '',
    password: ''
  });

  function login(loginType): void {
    // 短信验证
    if (formdata.username == '' && formdata.password == '') {
      ElMessage({
        message: '手机号或密码不能为空',
        type: 'error'
      });
      return;
    }
    let promise;
    if (loginType == LoginType.message) {
      promise = request({
        url: '/person/login/verify',
        method: 'post',
        params: {
          phonenumber: formdata.username,
          verify: formdata.password
        },
        headers: { person: 'person' }
      });
    } else if (loginType == LoginType.password) {
      promise = request({
        url: '/person/login/password',
        method: 'post',
        params: {
          phonenumber: formdata.username,
          password: formdata.password
        },
        headers: { person: 'person' }
      });
    }
    promise.then((res) => {
      if (res.code == 200) {
        ElMessage({
          message: '登录成功！',
          type: 'success'
        });
        setToken(res.token);
        $router.push({ path: '/' });
      } else {
        ElMessage({
          message: '登录失败！手机号或密码错误！',
          type: 'error'
        });
      }
    });
  }
  // 处理动画
  setTimeout(() => {
    anime({
      targets: '.introduce_video',
      translateX: function (el, i) {
        return anime.random(-20, 20);
      },
      translateY: function (el, i) {
        return anime.random(-20, 20);
      },
      direction: 'alternate',
      loop: true,
      autoplay: true,
      easing: 'easeInOutQuad',
      duration: 3000
    });
  }, 0);

  //发送验证码
  function sendCode() {
    //测试手机号码正则
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg.test(formdata.username)) {
      ElMessage({
        message: '短信发送成功!',
        type: 'success'
      });
      request({
        url: '/person/verification',
        method: 'GET',
        params: {
          phonenumber: formdata.username
        }
      }).then((res: any) => {
        // 弹窗
        formdata.password = res.verify;
      });
    } else {
      ElMessage({
        message: '请输入有效的手机号码!',
        type: 'error'
      });
    }
  }
</script>

<style lang="less" scoped>
  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    .logo {
      height: 60px;
      width: 120px;
      background: url('@/assets/logo.png') no-repeat center;
      background-size: 200% 200%;
    }
  }
  .containerbox {
    overflow: hidden;
    min-height: 800px;
    background: url('@/assets/images/login_background.png');
    width: 100%;
    height: 100%;
    .container_inner {
      position: relative;
      height: 100%;
      width: 80%;
      margin: 0 auto;
    }
    .introduce {
      width: 300px;
      .introduce_text {
        position: absolute;
        top: 10%;
        left: 10%;
        text-align: left;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Roboto, Arial, PingFang SC, Microsoft Yahei, Microsoft JhengHei, sans-serif;
      }
      @keyframes showitem {
        0% {
          transform: scale(0);
        }
        70% {
          transfrom: scale(1.1);
        }
        100% {
          transfrom: scale(1);
        }
      }
      .introduce_video {
        position: absolute;
        height: auto;
        z-index: 1;
        width: 200px;
        transition: all 0.5s;
        @media (max-width: @md) {
          display: none;
        }
        .circle {
          border-radius: 50%;
          overflow: hidden;
          animation: showitem 0.8s ease 0s 1 normal;
        }
        &:nth-of-type(1) {
          left: 15%;
          top: 29%;
          width: 219px;
        }

        &:nth-of-type(2) {
          left: 8%;
          top: 44%;
          width: 178px;
        }
        &:nth-of-type(3) {
          left: 20%;
          top: 20%;
          width: 200px;
        }
        &:nth-of-type(4) {
          left: 20%;
          top: 67%;
          width: 175px;
        }
        &:nth-of-type(5) {
          left: 50%;
          top: 20%;
          width: 200px;
        }
        &:nth-of-type(6) {
          left: 45%;
          top: 72%;
          width: 200px;
        }
        &:nth-of-type(7) {
          left: 58%;
          top: 52%;
          width: 100px;
        }
        &:nth-of-type(8) {
          left: 30%;
          top: 35%;
          width: 300px;
        }
      }
    }
    .login {
      position: absolute;
      width: 320px;
      height: 362px;
      box-shadow: 0 0 40px rgb(0 0 0 / 10%);
      border-radius: 16px;
      right: 20px;
      z-index: 999;
      overflow: hidden;
      top: 50%;

      transform: translateY(-50%);
      background-color: #fff;
      padding: 30px;
      @media (max-width: @md) {
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .login_type {
        width: 50px;
        height: 50px;
        line-height: 50px;
        background-color: @themecolor3;
        color: white;
        clip-path: polygon(0 0, 100% 0, 100% 100%);
        cursor: pointer;
      }
      .login-btn {
        background-color: @themecolor3;
        color: white;
        font-size: 20px;
        width: 100%;
        height: 60px;

        margin-top: 20px;
        border-radius: 10px;
      }

      /deep/.el-input__inner {
        height: 50px;
        font-size: 16px;
        border-radius: 10px;
      }

      .sendCode {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10%;
        color: #888;
        font-size: 15px;
        cursor: no-drop;
        user-select: none;
        &:before {
          content: '';
          border-left: 1px solid #eee;
          margin-right: 10px;
        }
      }
    }
  }
</style>
