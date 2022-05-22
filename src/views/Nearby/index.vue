<template>
  <div>附近</div>
  <div>
    <p id="p" class="text-left">重要信息：</p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  onMounted(() => {
    let ip = (window as any).returnCitySN.cip;
    // ak  F4oiQviHpdsR3rIuEafCWmPInZgIok4P
    // ip 183.236.187.196
    // console.log('ip', ip);
    interface posMsg {}

    //定位相关
    // function getLocation() {
    //   if (window.navigator.geolocation) {
    //     window.navigator.geolocation.getCurrentPosition(showPosition, () => {
    //       console.log('getError');
    //     });
    //   } else {
    //     alert('浏览器不支持地理定位。');
    //   }
    // }
    // function showPosition(position) {
    //   console.log('调用了');

    //   console.log(position);
    //   var lat = position.coords.latitude; //纬度

    //   var lag = position.coords.longitude; //经度
    //   console.log('纬度:' + lat + ',经度:' + lag);
    // }
    // getLocation();
    // // 高德地图
    // let AMap = window.AMap;
    // let mapObj = new AMap.Map('iCenter');
    // console.log(mapObj);

    // mapObj.plugin('AMap.Geolocation', function () {
    //   let geolocation = new AMap.Geolocation({
    //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
    //     timeout: 10000, //超过10秒后停止定位，默认：无穷大
    //     maximumAge: 0, //定位结果缓存0毫秒，默认：0
    //     convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    //     showButton: true, //显示定位按钮，默认：true
    //     buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
    //     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //     showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
    //     showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
    //     panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
    //     zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //   });
    //   mapObj.addControl(geolocation);
    //   console.log('getPositino', geolocation.getCurrentPosition());
    //   AMap.event.addListener(geolocation, 'complete', (res: any) => {
    //     var ress = '经纬度：' + res.position + '\n精度范围：' + res.accuracy + '米\n定位结果的来源：' + res.location_type + '\n状态信息：' + res.info + '\n地址：' + res.formattedAddress + '\n地址信息：' + JSON.stringify(res.addressComponent, null, 4);
    //     console.log('当前位置信息' + ress);
    //     document.querySelector('#p')!.innerHTML = ress;
    //   }); //返回定位信息
    //   AMap.event.addListener(geolocation, 'error', (res) => {
    //     console.log(res, '出错');
    //   }); //返回定位出错信息
    // });
    // function aMapSearchNearBy(centerPoint, city) {
    //   AMap.service(['AMap.PlaceSearch'], function () {
    //     var placeSearch = new AMap.PlaceSearch({
    //       pageSize: 20, // 每页10条
    //       pageIndex: 1, // 获取第一页
    //       city: city // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
    //     });

    //     // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
    //     // 第二个参数是经纬度，数组类型
    //     // 第三个参数是半径，周边的范围
    //     // 第四个参数为回调函数
    //     placeSearch.searchNearBy('', centerPoint, 200, function (status, result) {
    //       console.log('status', status);
    //       if (result.info === 'OK') {
    //         console.log('result', result);
    //         var locationList = result.poiList.pois; // 周边地标建筑列表
    //         // 生成地址列表html　　　　　　　　　 createLocationHtml(locationList);
    //       } else {
    //         console.log('获取位置信息失败!');
    //       }
    //     });
    //   });
    // }
    // aMapSearchNearBy([110.348442, 21.277466], '');
  });
</script>

<style lang="less" scoped></style>
