// //note 单张卡片信息 mock数据
// interface note {
//   id: number | string;
//   username: string;
//   title: string;
//   avatar: string;
//   cover: string;
//   favs?: number | string;
//   isFav?: boolean;
//   isVideo?: boolean;
// }
type note = any;

// true Data
// interface note {
//   id: number | string;
//   username: string;
//   title: string;
//   avatar: string;
//   cover: string;
//   favs?: number | string;
//   isFav?: boolean;
//   isVideo?: boolean;
// }

// interface userMsg {
//   avatar: string;
//   birth: any;
//   briefInfor: string | null;
//   career?: string;
//   createBy: string;
//   createTime?: any;
//   fansSum: number;
//   followSum: number;
//   location: string;
//   personId: number;
//   personName: string;
//   phonenumber: string | number;
//   sex: string | number;
//   // updateBy: '';
//   // updateTime: '2022-05-04T17:05:32.000+08:00';
// }
declare interface Window {
  AMap: any
  initAMap: any
}