<template>
  <div class="header">
    <div class="inner-header">
      <div class="logo"></div>
      <div class="user_avatar">
        <div>username</div>
        <div class="avatar">
          <img src="@/assets/images/门诊服务.png" alt="" />
          <div class="user_fun">
            <ul>
              <li>退出账号</li>
              <li>退出账号</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .header {
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #eee;
    .inner-header {
      margin: 0 auto;
      width: 1200px;
      height: 100%;
    }
    .user_avatar {
      height: 100%;
      float: right;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar {
        margin: 0 5px;
        height: 28px;
        width: 28px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user_fun {
        display: flex;
        position: absolute;
        flex-direction: column;
        width: 120px;
        overflow: hidden;
        right: 20px;
        top: 70px;
        padding: 1px;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 4px 14px rgba(0, 0, 0, 0.1);
        ul {
          width: 100%;
          li {
            height: 50px;
            line-height: 50px;
            width: 100%;
            &:hover {
              background-color: #eee;
            }
          }
        }
      }
      &:hover {
        .user_fun {
          display: flex;
        }
      }
    }
    .logo {
      height: 80px;
      width: 120px;
      background: url('@/assets/logo.png') no-repeat center;
      background-size: 250% 250%;
      float: left;
    }
  }
</style>
