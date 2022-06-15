<template>
  <div class="header">
    <div class="logo"></div>
    <div class="nav">
      <ul class="navlist" ref="ulList">
        <li v-for="(item, index) in navList" :key="item.title" @mouseover="changeHoverClass(index + 1)" @mouseleave="changeHoverClassLeave">
          <router-link class="text-xl" :class="{ active: (hover || curIndex == initIndex) && curIndex == index + 1 }" :to="item.to" active-class="nav_active">{{ item.title }}</router-link>
        </li>
        <div class="slider" :style="{ left: curLeftValue }" :class="{ initleft: isExactActive }"></div>
      </ul>
    </div>

    <div class="other-fun">
      <div class="search" ref="search">
        <Search class="search-1" @showSearchList="showSearchList" v-if="isShowSearch()"></Search>
        <Transition leave-active-class="animate__animated animate__fadeOut" enter-active-class="animate__animated animate__fadeIn">
          <div class="searchList" v-show="isShowSearchList" v-if="history">
            <div class="searchItem" v-for="(item, index) in history" :key="item.index" :class="{ active: curSearchIndex == index }" @mouseover="curSearchIndex = index" @mouseout="curSearchIndex = -1" @click="searchItemClick(item)">
              {{ item }}
              <!-- <span class="absolute iconfont icon-xihuan" style="right: 10%" @click="deleteSearch(item.id)"></span> -->
            </div>
          </div>
        </Transition>
      </div>

      <toggleBtn></toggleBtn>

      <div class="usermsg">
        <router-link to="/search" class="search-2 mr-5"><span @click="expandSearch" class="iconfont icon-search relative hover:text-indigo-500 text-2xl"></span></router-link>
        <div class="avatar" @click="jumpNewWindow('my')">
          <img :src="$store.avatar" alt="" @error="errImage($event)" />
        </div>
        <div class="username">{{ $store.username }}</div>
      </div>
      <div class="pub-btn">
        <el-button type="primary" :icon="Plus" @click="jumpNewWindow('home')">发布</el-button>
      </div>
    </div>
  </div>
  <div class="containerbox">
    <div class="inner_box">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive, watch, computed } from 'vue';
  import Search from '@/components/search.vue';
  import { navlist } from '../../api/index';
  import { RouterLink, useLink } from 'vue-router';
  import { useRouter, onBeforeRouteUpdate, useRoute } from 'vue-router';
  import { Plus } from '@element-plus/icons-vue';
  import { getToken } from '@/utils/auth';
  import requestMock from '@/utils/requestMock';
  import request from '@/utils/request';
  import { useUserStore } from '@/store/user';
  import toggleBtn from '@/components/ToggleTheme.vue';
  const { route, href, isActive, isExactActive, navigate } = useLink((RouterLink as any).props);
  const $router = useRouter();
  const $store = useUserStore();
  // 初始化列表
  const navList = ref(navlist);
  // 初始化标签
  let initIndex = ref((route.value.meta.index as number) || 2);
  let hover = ref(false);
  let initLeftv: string = 10 + 120 * initIndex.value - 120 + 'px';
  const curIndex = ref(initIndex.value);
  let leftv: string = '';
  // const initConfig = reactive({
  //   initIndex: (route.value.meta.index as number) || 2,
  //   initLeftv:10 + 120 * initIndex.value - 120 + 'px',
  //   curLeftv: '',
  //   curIndex: (route.value.meta.index as number) || 2,
  //   ishover: false
  // });
  let curLeftValue = computed(() => {
    return hover.value ? leftv : initLeftv;
  });
  const changeHoverClass = (index) => {
    hover.value = true;
    curIndex.value = index;
    leftv = 10 + 120 * index - 120 + 'px';
  };
  const changeHoverClassLeave = (index) => {
    hover.value = false;
    curIndex.value = initIndex.value;
  };
  const isShowSearch = () => {
    console.log('useRoute', useRoute());
    if (useRoute().path.includes('search')) {
      return false;
    }
  };
  const errImage = (e) => {
    // console.log('errsrc', src);
    e.path[0].src = '/public/defaultAvatar.jpg';
  };
  //搜索相关
  const searchList = ref([
    { id: 1, content: '历史记录1' },
    { id: 2, content: '历史记录2' },
    { id: 3, content: '历史记录3' },
    { id: 4, content: '历史记录4' },
    { id: 5, content: '历史记录5' }
  ]);
  const isShowSearchList = ref(false);
  const search = ref();
  const curSearchIndex = ref(-1);
  const history = ref<any>([]);
  const showSearchList = () => {
    isShowSearchList.value = true;
    request.get('/search/window').then((res: any) => {
      if (res.code == 200) {
        history.value = res.map.history;
      }
      /**
       * "map": {
        "guess": [
            "后端",
            "篮球",
            "前端",
            "菜鸟"
        ],
        "history": []
    }
       */
    });
    // setTimeout(() => {
    //   isShowSearchList.value = false;
    // }, 3000);
  };
  const deleteSearch = (id) => {};
  const searchItemClick = (searchkey) => {
    isShowSearchList.value = false;
    $router.push({
      name: 'search',
      query: {
        key: searchkey
      }
    });
  };
  //监听路由变化 修改当前索引
  onBeforeRouteUpdate((to) => {
    initIndex.value = to.meta.index as number;
    initLeftv = 10 + 120 * initIndex.value - 120 + 'px';
    curIndex.value = initIndex.value;
  });

  // 路由跳转到新窗口
  function jumpNewWindow(routeName) {
    let routeUrl;
    if (routeName == 'my') {
      routeUrl = $router.resolve({
        name: routeName,
        params: {
          userid: $store.userid
        }
      });
    } else {
      routeUrl = $router.resolve({
        name: routeName
      });
    }

    window.open(routeUrl.href, '_blank');
  }
  function expandSearch() {}

  onMounted(() => {
    // 搜索相关 -添加全局点击事件
    // 判断点击元素是否为search元素的子元素，不是隐藏
    console.log('search', search.value);
    document.addEventListener('click', (e) => {
      if (search.value) {
        let isSelf = (search.value as any).contains(e.target);
        if (!isSelf) {
          isShowSearchList.value = false;
        }
      }
    });

    //获取个人信息
    requestMock.get('/api/mymsg', { headers: { token: getToken()! } }).then((res: any) => {
      // console.log(res);
      // res = res.data;
      // let username = res.username ? res.username : 'XXu';
      // let avatar = res.avatar ? res.avatar : '@/assets/images/defaultAvatar.jpg';
      // let id = res.userid;
      // useUserStore().updateUser(username, avatar, id);
      // 获取IP地址信息 修改navList信息
      let ip = (window as any).returnCitySN.cip;
      // ak  F4oiQviHpdsR3rIuEafCWmPInZgIok4P
      // ip 183.236.187.196
      fetch(`http://localhost:3000/baiduapi/location/ip?ak=F4oiQviHpdsR3rIuEafCWmPInZgIok4P&ip=${ip}&coor=bd09ll`, {
        method: 'GET'
      })
        .then((res: any) => res.json())
        .then((data) => {
          // console.log(data);
          let city = data.content.address_detail.city;
          city = city.replace('市', '');
          navList.value[2].title = city;
        });
    });
    // 获取个人资料--真
    // request.get('/person/information').then((res: any) => {
    //   if (res.code == 200) console.log('personmsg', res);
    //   let data = res.map;
    //   let username = data.personName || 'XXu';
    //   let avatar = data.avatar || '@/assets/images/defaultAvatar.jpg';
    //   let id = data.personId;
    //   useUserStore().updateUser(username, avatar, id);
    // });
    // 获取搜索历史记录
  });
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid #eee;
    position: relative;
    background-color: #fff;
    .search {
      position: absolute;
      left: 63%;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      @media (max-width: @lg_m) {
        .search-1 {
          display: none;
        }
      }
      @media (min-width: @lg_p) {
        // max-width:
      }

      .searchList {
        position: absolute;
        // width: 200px;
        width: 260px;
        background-color: #fff;
        padding: 10px;
        border-radius: 10px;
        box-sizing: border-box;
        transform: translateY(10%);
        border: 1px solid @themecolor;
        z-index: 20;
        .searchItem {
          border-radius: 5px;
          width: 100%;
          height: 40px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          padding-left: 10px;
          align-items: center;
        }
        .active {
          background-color: @bg_wrapper;
        }
      }
    }
    .usermsg {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 10px;
      .search-2 {
        display: none;
        @media (max-width: @lg_m) {
          display: block;
        }
      }
      .avatar {
        height: 38px;
        width: 38px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        img {
          object-fit: cover;
        }
      }
      .username {
        user-select: none;
      }
    }
    .logo {
      height: 80px;
      min-width: 120px;
      margin-left: 20px;
      background: url('@/assets/logo.png') no-repeat center;
      background-size: 250% 250%;
    }
    .other-fun {
      display: flex;
      flex-direction: row;
    }
    .nav {
      // max-width: 600px;
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .navlist {
      float: left;
      display: flex;
      position: relative;
      flex-direction: row;
      align-items: center;
      height: 100%;
      transform: initial;
      li {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // 去除手机
        z-index: 3;
        position: relative;
        a {
          display: block;
          width: 120px;
          height: 80px;
          line-height: 80px;
        }
        cursor: pointer;
        .active {
          color: #fff;
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
        transition: all ease 0.4s;
        animation: 2s ease-in-out waves infinite;
      }
      // .initleft {
      //   left: 250px;
      // }
      // // @i: 0;
      // .loop(@i) when (@i < 6) {
      //   .loop((@i+1));
      //   li:nth-child(@{i}):hover ~ .slider {
      //     left: (10px + @i * 120px-120px);
      //   }
      // }
      // .loop(0);
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

    @media (max-width: @md) {
      .nav {
        width: 100%;
      }
      .logo,
      .search,
      .usermsg,
      .pub-btn {
        display: none;
      }
      .navlist {
        width: 100%;
        justify-content: center;
        margin-left: 0;
      }

      //设置顶部滑动
      .slider {
        display: none;
      }
      .nav_active {
        color: @themecolor2 !important;
        // border-bottom: 2px solid @themecolor2;
      }
      .navlist {
        li {
          .active {
            color: @themecolor2;
            &:after {
              content: '';
              border-bottom: 4px solid;
              position: absolute;
              bottom: 0;
              width: 60%;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
      //滑动样式结束
    }
  }
  .pub-btn {
    float: right;
    margin-right: 20px;
    :deep(.el-button) {
      width: 100px;
      height: 40px;
      background-color: @themecolor3;
      color: white;
      border: none;
      &:hover {
        color: white;
        background-color: @themecolor;
      }
    }
    @media (max-width: 750px) {
      display: none;
    }
  }

  .containerbox {
    // background-color: @bg1;
    background-color: @bg_wrapper;
  }
</style>
