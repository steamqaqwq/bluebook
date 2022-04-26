<template>
  <div class="note">
    <div class="note_cover">
      <img :src="note.cover" alt="" />
    </div>
    <div class="video_icon" v-show="note.isVideo"><span class="iconfont icon-videofill text-xl text-white"></span></div>
    <div class="note_title">{{ note.title }}</div>
    <div class="note_usermsg">
      <div class="useravatar">
        <img :src="note.avatar" alt="" />
      </div>
      <div class="username text-sm text-gray-400">{{ note.username }}</div>
      <div class="fav">
        <div class="icon">
          <span class="iconfont icon-xihuan1"></span>
        </div>
        <div class="favnums text-xs">{{ note.favs }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  const props = defineProps<{
    note: note;
  }>();
</script>

<style lang="less" scoped>
  .note {
    width: 200px;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 20px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    &:hover::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.234);
    }
    .video_icon {
      position: absolute;
      width: 28px;
      height: 28px;
      right: 10px;
      top: 10px;
    }
  }
  .note_cover {
    width: 100%;
    img {
      width: 100%;
      height: auto;
      max-height: 300px;
    }
  }
  .note_title {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .note_usermsg {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .useravatar {
      overflow: hidden;
      border-radius: 50%;
      width: 28px;
      height: 28px;
    }
    .username {
      margin-left: 2px;
      font-size: medium;
    }
    .fav {
      margin-left: auto;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      .icon {
        margin: 0 5px;
      }
    }
  }
</style>
