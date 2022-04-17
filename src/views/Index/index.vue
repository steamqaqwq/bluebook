<template>
  <div class="header">
    <div class="top">
      <div class="top-en">EN</div>
    </div>
    <div class="nav">
      <div class="logo">
        <img src="@/assets/logo.png" alt="xx医院" />
      </div>
      <div class="other-box" ref="otherBox">
        <ul class="navlist" ref="ulList">
          <li v-for="(item, index) in navlist" :key="item.title" @mouseover="changeHoverClass(index + 1)" @mouseleave="hover = false">
            <router-link :to="item.to" active-class="nav_active" exact>{{ item.title }}</router-link>
          </li>
          <div class="slider" :style="{ left: curLeftValue }" :class="{ initleft: isExactActive }"></div>
        </ul>
      </div>
      <div class="menu-btn" @click="changeBtn">
        <span :class="lineClass"></span>
      </div>
    </div>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>

  <div class="footer">
    <p>关于我们 | 联系我们</p>
    <p>Copyright xx医院 All Rights Reserved.</p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive, watch, computed } from 'vue';
  import { banners, kss, navlist } from '../../api/index';
  import { RouterLink, useLink } from 'vue-router';
  import { useRouter, onBeforeRouteUpdate } from 'vue-router';
  // 动画显示
  const isShowAnime = ref(false);
  //实现列表显示与影藏
  let lineClass = reactive({ line: true, 'line-main': true, 'line-open': false });
  const isShowList = ref(false);
  const ulList = ref(null);
  const otherBox = ref(null);
  const changeBtn = () => {
    lineClass['line-main'] = !lineClass['line-main'];
    lineClass['line-open'] = !lineClass['line-open'];
    isShowList.value = !isShowList.value;
    showList();
  };
  const showList = () => {
    const ul: HTMLUListElement = ulList.value!;
    const ob: HTMLElement = (otherBox as any).value;
    if (isShowList.value) {
      ob.style.visibility = 'visible';
      ul.style.transform = 'translateY(0%)';
    } else {
      ul.style.transform = 'translateY(-100%)';
    }
  };
  const { route, href, isActive, isExactActive, navigate } = useLink((RouterLink as any).props);
  // console.log('isExactActive', isExactActive.value);
  // console.log('href', route.value.meta.index);
  let curId: any = ref(route.value.meta.index) || 1;
  let hover = ref(false);
  const initLeftv: string = 10 + 120 * curId - 120 + 'px';
  let leftv: string = '10px';
  let curLeftValue = computed(() => {
    return hover.value ? leftv : initLeftv;
  });
  const changeHoverClass = (index) => {
    hover.value = true;
    leftv = 10 + 120 * index - 120 + 'px';
  };
  //监听路由变化 修改当前索引
  onBeforeRouteUpdate((to) => {
    curId.value = to.meta.index;
  });
</script>
<style lang="less" scoped>
  .header {
    height: 130px;
    border-bottom: 1px solid @themecolor;
    .top {
      height: 50px;
      background-color: @themecolor;
      line-height: 50px;
      .top-en {
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        float: right;
        margin-right: 30px;
      }
    }
    .nav {
      display: flex;
      position: relative;
      flex-direction: row;
      height: 80px;
      width: 100%;
      justify-content: center;
      margin: 0 auto;
      .logo {
        height: 80px;
        width: auto;
        img {
          height: 100%;
        }
      }
      .navlist {
        display: flex;
        position: relative;
        flex-direction: row;
        align-items: center;
        height: 100%;
        width: 600px;
        transform: initial;
        li {
          // padding: 20px;
          // width: 120px;
          // height: 60px;
          // line-height: 60px;
          a {
            display: block;
            width: 120px;
            height: 60px;
            line-height: 60px;
          }
          cursor: pointer;
          &:hover {
            a {
              color: #fff;
            }
            .initleft {
              left: initial !important;
            }
          }
        }
        // navBar 特效

        .slider {
          width: 100px;
          height: 60%;
          background-color: @themecolor2;
          border-radius: 4px;
          position: absolute;
          left: 10px;
          bottom: 10px;
          z-index: -1;
          transition: all ease 0.4s;
          animation: 2s ease-in-out waves infinite;
        }
        .initleft {
          left: 250px;
        }
        // @i: 0;
        .loop(@i) when (@i < 6) {
          .loop((@i+1));
          li:nth-child(@{i}):hover ~ .slider {
            left: (10px + @i * 120px-120px);
          }
        }
        .loop(0);
        @keyframes waves {
          from {
            clip-path: polygon(0% 17%, 9% 10%, 18% 4%, 30% 0%, 43% 1%, 49% 4%, 57% 7%, 66% 10%, 78% 11%, 89% 11%, 96% 9%, 100% 7%, 100% 100%, 0% 100%);
          }
          50% {
            clip-path: polygon(0% 4%, 6% 9%, 13% 13%, 23% 15%, 31% 16%, 42% 15%, 49% 13%, 61% 10%, 71% 5%, 81% 3%, 90% 2%, 100% 5%, 100% 100%, 0% 100%);
          }
          to {
            clip-path: polygon(0% 17%, 9% 10%, 18% 4%, 30% 0%, 43% 1%, 49% 4%, 57% 7%, 66% 10%, 78% 11%, 89% 11%, 96% 9%, 100% 7%, 100% 100%, 0% 100%);
          }
        }
      }
    }
  }
  // transform 两个变化
  #translate-open {
    transform: translateY(0%);
  }
  #translate-close {
    transform: translateY(-100%);
  }
  .menu-btn {
    display: none;
    position: absolute;
    right: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    // overflow: hidden;
    text-align: center;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    color: @themecolor;
    background-color: transparent;
  }
  .menu-btn .line-main {
    background: @themecolor;
    top: 0;
    bottom: 0;
    width: 1.5rem;
    height: 0.2rem;
    transition: transform 0.5s;
  }
  .line {
    &::before,
    &::after {
      background: @themecolor;
      border-radius: 10px;
      content: '';
      transition: transform 0.5s;
    }
    &::before {
      transform: translateY(-0.5rem);
    }
    &::after {
      transform: translateY(0.5rem);
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
    width: 1.5rem;
    height: 0.2rem;
    border-radius: 10px;
  }
  // 主要内容开始
  .main {
    width: 90%;
    margin: 20px auto;
  }

  // 页脚
  .footer {
    height: 60px;
    margin-top: auto;
    position: relative;
    bottom: 0;
    background: url('@/assets/images/foot.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: #ccc;
    padding: 20px;
  }
  //媒体查询
  @media only screen and (max-width: @lg) {
    .header {
      height: 110px;
    }
    .menu-btn {
      display: block;
    }
    .header .nav {
      height: 60px;
      .logo {
        margin: 0 auto;
        height: 100%;
      }
      .other-box {
        position: absolute;
        overflow: hidden;
        top: 60px;
        width: 100%;
        visibility: hidden;
      }
      .navlist {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        transition: transform 0.7s;
        transform: translateY(-100%);
        z-index: 999;
        .slider {
          display: none;
        }
        li {
          background-color: #6365f167;
          width: 100%;
          border-bottom: 1px solid #fff;
          a {
            color: #fff;
          }
        }
      }
    }
  }
  @media only screen and (min-width: @lg) {
    .navlist {
      transform: none !important;
    }
    .footer {
      min-height: 50px;
    }
  }
</style>
