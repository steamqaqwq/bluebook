import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      username: '',
      avatar: ''
    };
  },
  actions: {
    updateUser(username, avatar) {
      this.username = username;
      this.avatar = avatar;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        //存储形式
        // storage: localStorage,
        // 只持久化指定state
        // paths: ['username', 'avatar']
      }
    ]
  }
});
