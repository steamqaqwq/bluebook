<template>
  <div>
    <el-calendar>
      <template #dateCell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-')[2] }}
          <!-- {{ !data.isSelected ? '签' : data.day.split('-')[2] }} -->
          <span :class="{ 'sign-have': data.isSelected }"> </span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  const value = ref();
  //   Dayjs.
</script>

<style lang="less" scoped>
  .sign-have {
    position: absolute;
    width: 25px;
    height: 25px;
    left: 3px;
    z-index: -1;
    background: url('@/assets/images/sign_have.gif');
  }
  ::v-deep .el-calendar__header {
    // 修改头部背景颜色
    background-color: @themecolor2;
    padding: 3px 5px;
    border: none;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .el-calendar__title {
      // 修改头部标题的字体颜色
      color: white !important;
      font-size: 18px;
      font-weight: bolder;
    }
  }

  ::v-deep .el-calendar__body {
    // 修改主题部分
    padding: 0;
  }

  ::v-deep .el-calendar-table {
    thead {
      th {
        // 修改头部星期部分
        padding: 0;
        background-color: @themecolor2;
        color: white;
      }
    }

    .is-selected {
      .el-calendar-day {
        p {
          // 选中日期颜色
          //   color: white;
        }
      }
    }

    .el-calendar-day {
      // 每天小块样式设置
      padding: 0;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      p {
        // 所有日期颜色
        color: black;
        z-index: 1;
      }
    }
  }

  // 非本月字体修改
  ::v-deep .el-calendar-table__row {
    .prev,
    .next {
      // 修改非本月
      .el-calendar-day {
        p {
          color: #f0d9d5;
        }
      }
    }

    td {
      // 修改每一个日期td标签
      &:first-child,
      &:last-child {
        background-color: #f5f5f5;
      }
    }
  }
</style>
