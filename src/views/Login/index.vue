<template>
  <div class="header font-sans text-3xl">
    <div class="logo">
      <!-- <img src="../../assets/logo.png" alt="" /> -->
    </div>
  </div>
  <div class="container">
    <div class="container_inner">
      <div class="introduce">
        <div class="introduce_text">
          <p>加入我们</p>
          <p>分享你的生活</p>
          <p>sdf</p>
        </div>
        <div class="introduce_background">
          <div data-v-70ee3835="" class="circle" style="background: rgb(246, 214, 231); transform: translate(11.6548px, 3.54394px)" data-fullscreen-container="true">
            <video data-v-70ee3835="" disableremoteplayback="" autoplay="true" muted="true" loop="true" mqn-lazyimage-video-no-play="" mqn-video-inview-play="" class="video"><source data-v-70ee3835="" src="https://fe-video-qc.xhscdn.com/picasso-editor/f1dbcdb3e3dae24e5b04a39512c7eb6c5ef202c2.mp4_video_original_mp4" type="video/mp4" /></video>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer"></div>
</template>

<script setup lang="ts">
  //   const title = import.meta.env.VITE_APP_TITLE;
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
  .container {
    overflow: hidden;
    min-height: 800px;
    background: url('@/assets/images/login_background.png');
    .introduce {
    }
  }
  .footer {
    height: 100px;
    width: 100%;
  }
</style>
