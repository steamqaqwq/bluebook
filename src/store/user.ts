import { defineStore } from 'pinia';
import {removeToken} from '@/utils/auth';
import {useRouter} from 'vue-router'
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
      // useRouter().push({path:'/'})
    },
    logout(){
      this.username= '';
      this.avatar =  '';
      removeToken();
      location.reload()
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
