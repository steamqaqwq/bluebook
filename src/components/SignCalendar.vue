<template>
  <div>
    <el-calendar v-if="SignDataList.length">
      <template #dateCell="{ data }">
        <p :class="isToday(data.day.split('-')[2]) ? 'is-selected2' : ''" @click="signToday(data.day.split('-')[2])">
          {{ data.day.split('-')[2] }}
          <!-- {{ !data.isSelected ? '签' : data.day.split('-')[2] }} -->
          <span :class="{ 'sign-have': isSignToday(data.day.split('-')[2], data.type) }"> </span>
        </p>
      </template>
    </el-calendar>
    <div class="mt-3">
      已连续签到<span class="text-blue-500 text-bold text-xl">{{ continuousSign }}</span
      >天
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import request from '@/utils/request';
  import { ElMessage } from 'element-plus';
  const value = ref(new Date());
  const curDay = dayjs().date();
  const continuousSign = ref();
  /**判断是否为今天*/
  const isToday = (day) => {
    console.log(day == dayjs().date());
    if (day == dayjs().date()) {
      return true;
    }
    return false;
  };
  /**今日是否签到 */
  const isSignToday = (day, type) => {
    if (type !== 'current-month') return false;
    let index = parseInt(day) - 1; //使用当前日转为索引
    // console.log(index, SignDataList.value[index]);
    return SignDataList.value[index] == 1 ? true : false;
  };
  const SignDataList = ref([]) as any;

  /**对今天进行签到 */
  const signToday = (day) => {
    console.log(isToday(day));
    if (isToday(day)) {
      request('/sign/person').then((res: any) => {
        if (res.code == 200) {
          ElMessage({
            type: 'success',
            message: '今日签到成功'
          });
        }
      });
    }
  };
  onMounted(() => {
    request.get('/sign/showSign').then((res: any) => {
      SignDataList.value = res.array;
    });
    request.get('/sign/continuous').then((res: any) => {
      continuousSign.value = res.sign;
    });
  });
</script>

<style lang="less" scoped>
  // 签到图标
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
    &:not(.is-range) {
      //使不是本月的日期不可点击，不会跳转到其他月份
      td.next {
        pointer-events: none;
      }
      td.prev {
        pointer-events: none;
      }
      //td{
      //    pointer-events: none;
      //}
    }

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
          // background-color: @themecolor3;
          // color: @themecolor;
        }
      }
    }
    .is-selected2 {
      // 选中日期颜色
      // background-color: @themecolor3;
      color: @themecolor !important;
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
      // &:last-child {
      //   background-color: #f5f5f5;
      // }
    }
  }
</style>
