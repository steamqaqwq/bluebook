import { defineStore } from 'pinia';
import {removeToken} from '@/utils/auth';
import {useRouter} from 'vue-router'
export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      username: '',
      avatar: '',
      userid:''
    };
  },
  actions: {
    updateUser(username, avatar,userid) {
      this.username = username;
      this.avatar = avatar;
      this.userid = userid;
      // useRouter().push({path:'/'})
    },
    logout(){
      this.username= '';
      this.avatar =  '';
      this.userid = '';
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
