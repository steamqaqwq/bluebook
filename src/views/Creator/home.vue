<template>
  <div class="home">
    <div class="person_msg">
      <div class="person_avatar">
        <img src="@/assets/avatar.png" alt="" />
      </div>
      <div class="person_detail">
        <p class="person_name text-xl text-bold text-black">XXu</p>
        <p><span>0 </span>关注&nbsp;&nbsp;&nbsp;&nbsp; <span>0 </span>粉丝&nbsp;&nbsp;&nbsp;&nbsp; <span>0 </span>获赞&nbsp;&nbsp;&nbsp;&nbsp; ID号： 4359349073</p>
        <p class="person_introduce">还没有简介</p>
      </div>
    </div>
    <div class="content">
      <div class="data-view">
        <creator-title><span class="text-2xl">数据总览</span></creator-title>
        <div class="data-show">
          <ul>
            <li v-for="data in datas" :key="data.title">
              <div class="text-sm text-gray-400">{{ data.title }}</div>
              <div class="text-3xl text-black mt-2">{{ data.nums }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreatorTitle from '@/components/CreatorTitle.vue';
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
</script>

<style lang="less" scoped>
  .home {
    padding: 20px;
    box-sizing: border-box;
    min-height: 650px;
    min-width: 1000px;
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
      width: 100px;
      height: 100px;
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
        height: 200px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        li {
          width: 22%;
          padding: 2px 12px;
          background: #f4f7f9;
          height: 100px;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
      }
    }
  }
</style>
