//note 单张卡片信息
interface note {
    id: number | string;
    username: string;
    title: string;
    avatar: string;
    cover: string;
    isFav?: boolean;
    isVideo?: boolean;
  }