<template>
  <div class="carousel">
    <el-carousel :height="screenwidth" :interval="5000" direction="vertical" :autoplay="true">
      <el-carousel-item v-for="pic in banners" :key="pic.title">
        <img :src="pic.url" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="main-fun">
    <div class="fun1">
      <router-link to="">
        <img src="@/assets/images/门诊服务.png" alt="" />
        <p>门诊服务</p>
      </router-link>
    </div>
    <div class="fun2">
      <router-link to="">
        <img src="@/assets/images/住院服务.png" alt="" />
        <p>住院服务</p>
      </router-link>
    </div>
    <div class="fun3">
      <router-link to="">
        <img src="@/assets/images/体检服务.png" alt="" />
        <p>体检服务</p>
      </router-link>
    </div>
  </div>

  <div class="ksNav">
    <el-row>
      <div class="title">
        <p>科室导航</p>
      </div>
    </el-row>
    <div class="ksNav-inner">
      <transition :duration="3000" leave-active-class="animate__animated animate__fadeOutLeft" enter-active-class="animate__animated animate__fadeInLeft">
        <div class="left-people" v-if="isShowAnime"></div>
      </transition>
      <transition :duration="1000" leave-active-class="animate__animated animate__fadeOutDown" enter-active-class="animate__animated animate__fadeInUp">
        <div class="ks-sort" v-if="isShowAnime">
          <div class="ks-sort-detail">
            <div class="ks-title" v-for="(ks, i) in kss" :key="i" :class="{ 'active-ks-nav': i === index }" v-on:click="index = i">
              <router-link to="">{{ ks }}</router-link>
            </div>
          </div>
          <div class="ks-detail">
            <ul>
              <li v-for="i in 20" :key="i">
                <a href="">xx{{ i }}xx科</a>
              </li>
              <i></i>
            </ul>
          </div></div
      ></transition>

      <div class="ksNav-inner-right">
        <transition :duration="1400" leave-active-class="animate__animated animate__fadeOutDown" enter-active-class="animate__animated animate__fadeInRight">
          <div class="right-people" v-if="isShowAnime"></div>
        </transition>

        <transition :duration="1600" leave-active-class="animate__animated animate__fadeOutRight" enter-active-class="animate__animated animate__fadeInUp">
          <div class="ksNav-more-detail" v-if="isShowAnime"><a href="">更多科室介绍→</a></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  import { banners, kss, navlist } from '../../api/index';

  // 动画显示
  const isShowAnime = ref(false);
  // main-fun index
  const index = ref(0);
  // 走马灯高度自适应
  let clientWidth = ref(0);
  let screenwidth = ref('');
  const calWidth = () => {
    (() => {
      const width = document.documentElement.clientWidth;
      clientWidth.value = width;
      if (width > 960) {
        // 750px 400->200
        screenwidth.value = (width * 755) / 2000 + 'px';
        // console.log(screenwidth.value);
      } else {
        screenwidth.value = (width * 755) / 2500 + 'px';
      }
    })();
  };
  onMounted(() => {
    // const anime1 = anime({
    //   targets: '.fun1',
    //   translateX: 270,
    //   easing: 'easeInOutSine',
    //   duration: 3000
    // });
    // 初始计算一次
    const ksNav = document.querySelector('.ksNav');
    const leftDc = document.querySelector('.left-people');
    const rightDc = document.querySelector('.right-people');
    window.addEventListener('scroll', (e: any) => {
      const scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const ksNavHeight = (ksNav as any).offsetHeight;
      console.log('scroll', scroll);
      console.log('ksnavHeight', window.innerHeight - ksNavHeight);
      if (scroll > window.innerHeight - ksNavHeight + 200) {
        isShowAnime.value = true;
      } else {
        isShowAnime.value = false;
      }
    });
    calWidth();
    // 获取屏幕宽度
    window.onresize = () => {
      return (() => {
        const width = document.documentElement.clientWidth;
        clientWidth.value = width;
        if (width > 960) {
          screenwidth.value = (width * 755) / 2000 + 'px';
          //   isShowList.value = false;
        } else {
          screenwidth.value = (width * 755) / 2500 + 'px';
        }
      })();
    };
  });
</script>

<style lang="less" scoped>
  // 轮播图
  .el-carousel__item {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .carousel {
    position: relative;
    z-index: -999;
  }
  // 主要内容--功能区块
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  .main-fun {
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-evenly;
    margin: 10px auto;
    // 功能区特效
    div {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      width: 300px;
      padding: 10px;
      font-size: 1.5rem;
      // background-color: rgba(255, 255, 255, 0.397);
      position: relative;
      z-index: 0;
      border-radius: 10px;
      &::before {
        content: '';
        position: absolute;
        z-index: -2;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        // background-color: rgb(10, 10, 10);
        background-repeat: no-repeat;
        background-position: 0 0;
        background-image: conic-gradient(transparent, @themecolor2, transparent 30%);
        animation: rotate 4s linear infinite;
      }

      &::after {
        content: '';
        position: absolute;
        z-index: -1;
        width: calc(100% - 12px);
        height: calc(100% - 12px);
        background: #fff;
        border-radius: 5px;
      }
      img {
        width: 100px;
      }
      a:hover {
        color: @themecolor;
      }
    }
  }

  .ksNav {
    margin: 30px auto;
    .title {
      text-align: center;
      height: 60px;
      width: 150px;
      border-bottom: 1px solid @themecolor;
      font-size: 2rem;
      color: @themecolor;
      margin: 50px auto;
    }
    .ksNav-inner {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      height: 700px;
      overflow: hidden;
      .left-people {
        flex: 1;
        height: 100%;
        background: url('@/assets/images/leftDC.jpg') no-repeat;
        background-size: cover;
      }
      .ksNav-inner-right {
        flex: 1;

        .right-people {
          height: 80%;
          background: url('@/assets/images/rightDC.jpg') no-repeat;
          background-size: cover;
        }
        .ksNav-more-detail {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px auto;
          border-radius: 10px;
          height: 15%;
          font-size: 1.5rem;
          background-color: @themecolor;
          a {
            color: #fff;
            font-weight: 700;
          }
        }
      }

      .ks-sort {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 2;
        margin: 0 20px;
        border-radius: 10px;
        box-shadow: inset 0 0px 4px 1px;
        border: 1px solid @themecolor2;
        .ks-sort-detail {
          display: flex;
          width: 100%;
          flex-direction: row;
          height: 60px;
          .ks-title {
            flex: 1;
            margin: 0 10px;
            line-height: 60px;
            height: 60px;
            a {
              display: block;
              height: 100%;
              width: 100%;
            }
            &:hover {
              border-bottom: 1px solid @themecolor;
              a {
                color: @themecolor2;
              }
            }
          }
        }
        .ks-detail {
          font-size: 1.2rem;
          ul {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-flow: row;
            grid-column-gap: 20px;
            width: 100%;
            li {
              position: relative;
              box-sizing: border-box;
              height: 60px;
              margin: 10px 10px;
              line-height: 60px;

              &::after {
                content: '';
                height: 4px;
                background-color: @themecolor;
                width: 0%;
                position: absolute;
                bottom: 0;
                left: 0;
                transition: width 1s ease;
              }
              &:hover {
                a {
                  color: @themecolor2;
                }
                &::after {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
    .active-ks-nav {
      border-bottom: 1px solid @themecolor;
    }
  }
</style>
