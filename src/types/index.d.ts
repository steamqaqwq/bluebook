//note 单张卡片信息
interface note {
  id: number | string;
  username: string;
  title: string;
  avatar: string;
  cover: string;
  favs?: number | string;
  isFav?: boolean;
  isVideo?: boolean;
}


declare interface Window {
  AMap: any
  initAMap: any
}