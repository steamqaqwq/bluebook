<template>
  <div class="box1"></div>
  <div class="menu-btn" v-show="m_show" @click="changeBtn">
    <span :class="lineClass"></span>
    <div class="other-box">
      <ul ref="ulList">
        <li v-for="i in 5" :key="i">第{{ i }}项</li>
      </ul>
    </div>
  </div>
  <div ref="bottomBox" class="bottomBox" :class="exp_class ? 'wrapanimated' : 'wrapanimate'"></div>
  <div class="footer"></div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  import anime from 'animejs';
  const m_show = ref(true);
  let lineClass = reactive({ line: true, 'line-main': true, 'line-open': false });
  const isShowList = ref(false);
  const ulList = ref(null);
  const changeBtn = () => {
    lineClass['line-main'] = !lineClass['line-main'];
    lineClass['line-open'] = !lineClass['line-open'];
    isShowList.value = !isShowList.value;
    showList();
  };
  const showList = () => {
    const ul: HTMLUListElement = ulList.value!;
    if (isShowList.value) {
      ul.style.transform = 'translateY(-100%)';
    } else {
      ul.style.transform = 'translateY(0)';
    }
    console.log(ul.style);
  };
  let exp_class = ref(false);
  const bottomBox = ref(null);

  onMounted(() => {
    console.log('mounted!');
    // const box1 = document.querySelector('.box1')
    const anime1 = anime({
      targets: '.box1',
      translateX: 270,
      easing: 'easeInOutSine',
      loop: true,
      duration: 10000
    });
    let handleScroll = () => {
      var exp_height = (document as any).querySelector('.bottomBox').offset().top;
      console.log(document.querySelector('.bottomBox'));
      var clientheight = document.documentElement.clientHeight;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      if (clientheight + scrollTop > exp_height) {
        exp_class = ref(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
  });
</script>

<style lang="less" scoped>
  .box1 {
    width: 200px;
    height: 200px;
    background-color: @themecolor;
  }
  .menu-btn {
    width: 8rem;
    height: 8rem;
    // overflow: hidden;
    text-align: center;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: rgba(172, 89, 89, 0.123);
  }
  .menu-btn .line-main {
    background: #771127;
    top: 0;
    bottom: 0;
    width: 5rem;
    height: 0.4rem;
    transition: all 0.5s;
  }
  .line {
    &::before,
    &::after {
      background: #771127;
      border-radius: 10px;
      content: '';
      transition: transform 0.5s;
    }
    &::before {
      transform: translateY(-2rem);
    }
    &::after {
      transform: translateY(2rem);
    }
  }
  .line-open {
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
  .menu-btn .line,
  .menu-btn .line:before,
  .menu-btn .line:after {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 5rem;
    height: 0.4rem;
    border-radius: 10px;
  }
  * {
    padding: 0;
    margin: 0;
  }
  .other-box {
    position: absolute;
    overflow: hidden;
    left: 8rem;
    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 300px;
      list-style: none;
      transform: translateY(-100%);
      transition: all 0.5s;
    }
    li {
      background-color: rgba(194, 141, 141, 0.157);
      border-bottom: 1px solid #ccc;
      height: 50px;
      width: 300px;
      text-align: center;
      line-height: 50px;
    }
  }
  .bottomBox {
    margin: 600px 0;
    height: 300px;
    width: 300px;
    background-color: rgb(114, 85, 85);
  }
  .footer {
    height: 100px;
    width: 100%;
    position: relative;
    bottom: 0;
  }
  .wrapanimate {
    visibility: hidden;
  }
  .wrapanimated {
    visibility: visible;
  }
</style>
