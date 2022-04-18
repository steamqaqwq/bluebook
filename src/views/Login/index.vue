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
      <div class="login">
        <div class="text-xl font-bold text-left mb-5">短信登录</div>
        <el-row>
          <el-input v-model="formdata.input2" class="w-50 m-2 login-input" placeholder="手机号" :prefix-icon="Message" />
        </el-row>
        <el-row> <el-input v-model="formdata.input" class="w-50 m-2 login-input" placeholder="验证码" /></el-row>

        <el-row> <button class="login-btn" @click="login()">登录</button></el-row>
      </div>
    </div>
  </div>
  <div class="footer"></div>
</template>

<script setup lang="ts">
  import { data } from '@/api/login';
  import { Message } from '@element-plus/icons-vue';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import anime from 'animejs';
  const formdata = reactive({
    input: '',
    input2: ''
  });

  function login(): void {
    const $router = useRouter();
    $router.push({ name: 'index' });
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
        width: 200px;
        transition: all 0.5s;
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
      top: 50%;
      transform: translateY(-50%);
      // background-color: #fff;
      padding: 30px;
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
    }
  }
</style>
