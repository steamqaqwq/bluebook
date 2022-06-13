
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; //使用dayjs 插件 fromnow
import 'dayjs/locale/zh-cn'; // 导入本地化语言

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
/**
 * @param {time} 
 * @paramtype {Date | timestamp-number | timestamp-string}
 * @return:如本年日期04-24/n年前/n秒前/n分钟前 
 */
 // 格式化时间
 export default function timeFormat(time:any) {
    let time_ = time;
    // 普通日期格式转换为时间戳
    if (Number.isNaN(Number(time_))) {
      // true 非数字即Date格式
      time_ = dayjs(time).unix();
    }
    if (String(time_).length <= 10) {
      time_ = time_ * 1000;
    }
    //计算时间差
    const timegap = Date.now() - time_;
    /*
        1秒 1000
        1分钟 1000 * 60 60000
        1小时 1000 * 60 * 60 3600000
        1天 1000 * 60 * 60 * 24 86400000
        1个月 1000 * 60 * 60 * 24 * 30 2592000000
        1年 1000 * 60 * 60 * 24 * 365 31536000000
      */
    const times = [31536000000, 2592000000, 86400000, 3600000, 60000, 1000];
    //  月<时间<年 显示为MM-DD形式
    if (timegap > times[1] && timegap < times[0]) {
      return dayjs(time_).format('MM-DD');
    } else {
      return dayjs(time_).fromNow();
    }
  };
  
 export function timeFormatMini(time=new Date()) {
  // let time = new Date()
  return dayjs(time).format('YYYY-MM-DD HH:mm');
 }