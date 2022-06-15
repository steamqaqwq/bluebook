<template>
  <div class="my_favs">
    <div class="item_box">
      <div class="item" v-for="item in notes" :key="item.id">
        <div class="user_msg" v-if="item.person">
          <!-- <div class="avatar"> -->
          <router-link :to="{ name: 'my', params: { userid: item.person.personId } }">
            <Avatar :src="item.person.avatar"></Avatar>
          </router-link>
          <!-- </div> -->
          <div class="user_detail" v-if="item.person">
            <router-link :to="{ name: 'my', params: { userid: item.person.personId } }">
              <p class="username text-2xl">{{ item.person.personName }}</p>
            </router-link>
            <p class="time text-gray-400">{{ timeFormat(item.createTime) || 2022 }}</p>
          </div>
          <span class="iconfont"></span>
        </div>
        <div class="content">
          <router-link :to="{ name: 'notedetail', params: { id: item.blogId } }">
            <img :src="item.blogImage" alt="" />
          </router-link>
          <p class="text-xl mt-2">{{ item.blogTheme }}</p>
          <div class="status">
            <p>
              <span class="span1 iconfont icon-thumb-up" :class="{ active: item.likesIs }" @click="useNoteStore().love(item, item.blogId)"></span>
              <span class="span2">{{ item.likes + item.likesIs ? 1 : 0 || 0 }}</span>
            </p>
            <router-link :to="{ name: 'notedetail', params: { id: item.blogId } }">
              <p>
                <span class="span1 iconfont icon-pinglun"></span>
                <span class="span2">{{ item.comments_sum || 0 }}</span>
              </p>
            </router-link>

            <p>
              <span class="span1 iconfont icon-6Collection_01" :class="{ active: item.collectIs }" @click="useNoteStore().collection(item, item.blogId)"></span>
              <span class="span2">{{ item.collectSum + item.collectIs ? 1 : 0 || 0 }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/request';
  import { ref, onMounted } from 'vue';
  import timeFormat from '@/utils/getFormatTime';
  import Avatar from '@/components/avatar.vue';
  import { ElMessage } from 'element-plus';
  import { useNoteStore } from '@/store/note';

  const notes = ref();
  onMounted(() => {
    request.get('/blog/blogRecommend').then((res: any) => {
      console.log('blogs', res);
      // 去除无效图片链接
      let list = res.list.filter((item) => item.blogImage.includes('http'));
      notes.value = list;
    });
  });

  // 点赞 收藏
  function love(blogid) {
    request.get(`/blog/likes?blogId=${blogid}`).then((res: any) => {
      //  "msg": "进行点赞成功",
      // "code": 200,
      // "isLikes": true
      if (res.code == 200) {
        ElMessage({
          message: res.msg,
          type: 'success'
        });
      }
    });
  }
  function collection(blogid) {
    request.get(`/blog/likes?blogId=${blogid}`).then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          message: res.msg,
          type: 'success'
        });
      }
    });
  }
</script>

<style lang="less" scoped>
  .active {
    color: @themecolor2;
  }
  .my_favs {
    max-width: @lg;
    margin: 0 auto;
    background-color: #fff;
    min-height: 100vh;
    box-sizing: border-box;
    // padding
  }
  .item_box {
    max-width: @md_p;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .item {
      width: 100%;
      margin-bottom: 20px;
      .user_msg {
        display: flex;
        flex-direction: row;
        // height: 50px;
        padding: 10px 0;
        .avatar {
        }
        .user_detail {
          text-align: left;
          display: flex;
          flex-direction: column;
          // align-items: center;
          justify-content: center;
          margin-left: 30px;
        }
      }
      .content {
        text-align: left;
        max-width: 80%;
        margin: 0 auto;
      }
      .status {
        display: flex;
        flex-direction: row;
        // padding-left: 80px;
        p {
          text-align: left;
        }
        span {
          // color: #eadfdf;
          // color: @themecolor2;
          // color: ;
        }
        .span1 {
          font-size: 24px;
          margin: 20px 0;

          margin-right: 10px;
          // margin-top: 20px;
          cursor: pointer;
          // &:hover {
          // color: @themecolor2;
          // }
        }
        .span2 {
          font-size: 16px;
          user-select: none;
          margin-right: 20px;
        }
      }
    }
  }
</style>
