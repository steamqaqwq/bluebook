<template>
  <div class="my_avatar">
    <img v-if="src" :src="src" alt="" @error="errImage($event)" />
    <img v-else src="@/assets/images/defaultAvatar.jpg" alt="" />
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      src?: string;
      width?: string;
      height?: string;
    }>(),
    {
      width: '50px',
      height: '50px',
      src: '/src/assets/images/defaultAvatar.jpg'
    }
  );
  const errImage = (e) => {
    e.path[0].src = '/public/defaultAvatar.jpg';
  };
  // 必须动态获取的才处理 错误示范 const url = new URL(xxx)
  //   function getSrc(src) {
  //     if (src) {
  //       return new URL(src, import.meta.url).href;
  //     } else {
  //       return new URL('@/assets/images/defaultAvatar.jpg', import.meta.url).href;
  //     }
  //   }
</script>

<style lang="less" scoped>
  .my_avatar {
    width: v-bind(width);
    height: v-bind(height);
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
