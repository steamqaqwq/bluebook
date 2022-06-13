<template>
  <div class="home">
    <div class="person_msg" v-if="usermsg">
      <div class="person_avatar">
        <!-- <img :src="useUserStore().avatar" alt="" /> -->
        <!-- <img :src="usermsg.avatar" alt="" /> -->
        <Avatar :src="useUserStore().avatar" width="100px" height="100px"></Avatar>
      </div>
      <div class="person_detail">
        <p class="person_name text-xl text-bold text-black">{{ useUserStore().username }}</p>
        <p>
          <span>{{ usermsg.followSum }}</span
          >关注&nbsp;&nbsp;&nbsp;&nbsp; <span>{{ usermsg.fansSum }}</span
          >粉丝&nbsp;&nbsp;&nbsp;&nbsp; <span>0 </span>获赞&nbsp;&nbsp;&nbsp;&nbsp; ID号： {{ usermsg.identNumber || '1289373425' }}
        </p>
        <p class="person_introduce">{{ usermsg.briefInfor || '还没有简介' }}</p>
      </div>
    </div>
    <div class="content">
      <div class="data-view">
        <creator-title><span class="text-2xl">数据总览</span></creator-title>
        <div class="data-show">
          <ul>
            <li>
              <div class="text-sm text-gray-400">
                {{ datas[0].title }}
              </div>
              <div class="text-3xl text-black mt-2">{{ datas[0].nums }}</div>
            </li>
            <li class="relative">
              <div class="text-sm text-gray-400">
                {{ datas[1].title }}
              </div>
              <div class="text-3xl text-black mt-2">{{ datas[1].nums }}</div>
            </li>
            <li class="relative">
              <div class="text-sm text-gray-400">
                {{ datas[2].title }}
              </div>
              <div class="text-3xl text-black mt-2">{{ datas[2].nums }}</div>
            </li>
            <li class="relative">
              <div class="text-sm text-gray-400">
                {{ datas[3].title }}
                <span class="text-ms absolute r-2 t-2">
                  <el-tooltip content="互动数指点赞、收藏、评论总和" placement="top" effect="dark">
                    <svg t="1655106499445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10384" width="20" height="20">
                      <path d="M512.1 188c43.5 0 85.8 8.6 125.7 25.5 38.6 16.4 73.3 39.8 103.2 69.7 29.9 29.9 53.3 64.6 69.7 103.2 16.9 39.9 25.5 82.2 25.5 125.7s-8.6 85.8-25.5 125.7c-16.4 38.6-39.8 73.3-69.7 103.2-29.9 29.9-64.6 53.3-103.2 69.7-39.9 16.9-82.2 25.5-125.7 25.5s-85.8-8.6-125.7-25.5c-38.6-16.4-73.3-39.8-103.2-69.7-29.9-29.9-53.3-64.6-69.7-103.2-16.9-39.9-25.5-82.2-25.5-125.7s8.6-85.8 25.5-125.7c16.4-38.6 39.8-73.3 69.7-103.2 29.9-29.9 64.6-53.3 103.2-69.7 39.9-16.9 82.2-25.5 125.7-25.5m0-60C300.9 128 128 300.8 128 512.1c0 211.2 172.8 384.1 384.1 384.1 211.2 0 384.1-172.8 384.1-384.1S723.3 128 512.1 128z" p-id="10385"></path>
                      <path d="M512 604c-16.5 0-30-13.5-30-30V336c0-16.5 13.5-30 30-30s30 13.5 30 30v238c0 16.5-13.5 30-30 30z" p-id="10386"></path>
                      <path d="M512 675m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z" p-id="10387"></path>
                    </svg>
                  </el-tooltip>
                </span>
              </div>
              <div class="text-3xl text-black mt-2">{{ datas[3].nums }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreatorTitle from '@/components/CreatorTitle.vue';
  import request from '@/utils/request';
  import Avatar from '@/components/avatar.vue';
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/store/user';
  // import useUserMsg from '@/hooks/useUserMsg';
  // const usermsg = useUserMsg().userInfo as any;
  const usermsg = ref();
  const datas = [
    {
      title: '新增粉丝',
      nums: 0
    },
    {
      title: '主页访客',
      nums: 0
    },
    {
      title: '观看数',
      nums: 0
    },
    {
      title: '互动数',
      nums: 0
    }
  ];
  onMounted(() => {
    request.get('/statistics/person').then((res: any) => {
      console.log(res);
      let status = res.statistics;
      datas[0].nums = status.myFansSum;
      datas[1].nums = status.blogSum;
      datas[2].nums = status.personSum;
      datas[3].nums = status.interactionSum;
    });
    request.get('/person/information').then((res: any) => {
      if (res.code == 200) {
        usermsg.value = res.map;
      }
    });
  });
</script>

<style lang="less" scoped>
  .home {
    // padding: 20px;
    box-sizing: border-box;
    min-height: 650px;
    // min-width: 1000px;
    width: auto;
    border-radius: 8px;
    // background-color: #fff;
  }
  .person_msg {
    background-color: #fff;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    .person_avatar {
      min-width: 100px;
      min-height: 100px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        overflow: hidden;
        //   width:50px;
        //   height:50px;
      }
    }
    .person_detail {
      // display:flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items:flex-start
      margin-left: 30px;
      text-align: left;
      p:not(:nth-of-type(1)) {
        color: #888;
        margin-top: 10px;
        span {
          color: black;
        }
      }
    }
  }
  .content {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    min-height: 500px;
    margin-top: 20px;
    overflow: hidden;
    .data-view {
      .data-show > ul {
        width: 100%;
        // height: 200px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          width: 22%;
          margin-top: 20px;
          margin-right: 20px;
          min-width: 200px;
          padding: 2px 12px;
          background: #f4f7f9;
          height: 100px;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          // @media (max-width:@){

          // }
        }
      }
    }
  }
</style>
