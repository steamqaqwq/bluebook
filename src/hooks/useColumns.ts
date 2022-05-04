import { onMounted, reactive } from 'vue';
export default function (maxColumns: number = 5, outerwidth: number, notewidth: number = 200, timeout = 200) {
  const columnConfig = reactive({
    // 获取初始列数
    initColumns: maxColumns
  });
  var timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let columns = Math.floor(outerwidth / 200);
      // console.log('columns', window.innerWidth);
      columnConfig.initColumns = columns > maxColumns ? maxColumns : columns;
      //获取列数
    }, timeout);
  });
  return columnConfig;
}
