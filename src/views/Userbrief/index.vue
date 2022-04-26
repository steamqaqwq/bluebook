<template>
  <Header></Header>
  <div class="wrapper">
    <div class="inner_box">
      <div class="author_msg">
        <div class="author_avatar">
          <img src="https://sns-avatar-qc.xhscdn.com/avatar/6232b13497e4e8e90da13e1b.jpg?imageView2/1/w/540/format/jpg" alt="" />
        </div>
        <div class="author_introduce">
          <p class="text-xl text-bold">薇娜贝Qing</p>
          <p class="author_type">母婴博主</p>
          <p class="author_say">📮3545369536@qq.com 🙋‍♀️高级育婴师📖分享五年育婴经验 👩‍👧母婴👠穿搭🏡家居💝好物 👧家有可爱的小公举一枚</p>
        </div>
      </div>
      <div class="author_notes"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/header.vue';
</script>

<style lang="less" scoped>
  .wrapper {
    background-color: #fbfbfb;
  }
  .inner_box {
    max-width: 1000px;
    margin: 0 auto;
  }
  .author_msg {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10px;
    width: 100%;
    height: 250px;
    .author_avatar {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 160px;
        height: 160px;
        // object-fit: content;
      }
    }
    .author_introduce {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      margin: 0 40px;
      text-align: left;
      p {
        margin: 5px 0;
      }
    }
  }
  //图片加载处理
  .lazyload-container {
    position: relative;
    filter: blur(30px);
    // 兼容ie
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius="50",MakeShadow=false);
    transition: filter 0.7s ease;
    .loaded {
      filter: none;
    }
    .lazyload {
      transition: opacity 0.7s ease;
      .load {
        opacity: 1;
      }
    }
  }
</style>
