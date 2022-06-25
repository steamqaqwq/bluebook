<template>
  <div style="height: 400px; width: 730px; margin: auto">
    <div id="container" style="width: 730px; height: 400px; left: 150px; border: 1px solid gray; overflow: hidden"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import request from '@/utils/request';

  onMounted(() => {
    // console.log((window as any).returnCitySN);
    // 请求获取ip
    let ip = (window as any).returnCitySN.cip;
    // ak  yourAk
    // ip 183.236.187.196
    request.get(`http://localhost:3000/baiduapi/location/ip?ak=yourAk&ip=${ip}&coor=bd09ll`).then((res) => {
      console.log('ip-res', res);
    });
    // var Ip = returnCitySN['cip'];
    // var cityname = returnCitySN['cname'];
    // console.log('ip',Ip)
    // localStorage.setItem('Ip', Ip);
    // console.log(localStorage.getItem('Ip', Ip));
    // localStorage.setItem('cityname', cityname);
    // console.log(localStorage.getItem('cityname', cityname));
  });
</script>

<style lang="less" scoped></style>
