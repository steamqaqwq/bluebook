import { defineStore } from 'pinia';
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
export const useNoteStore = defineStore({
  id: 'note', // id必填，且需要唯一
  state: () => {
    return {
        curlikeIs:false,
        curCollectIs:false,
        curFav:false,
        curSearchKey:'', 
        curReply:{
          replygoalId:0,
        }
    };
  },
  actions: {
    // 文章点赞 收藏
   love(blogdata,blogid) {
    request.get(`/blog/likes?blogId=${blogid}`).then((res: any) => {
      //  "msg": "进行点赞成功",
      // "code": 200,
      // "isLikes": true
      // console.log('res',res);
      if (res.code == 200) {
        ElMessage({
          message: res.msg,
          type: 'success'
        });
        blogdata.likesIs = res.isLikes;
      }
    });
  },
   collection(blogdata,blogid) {
    request.get(`/collect/likes?blogId=${blogid}`).then((res: any) => {
      //  "msg": "进行点赞成功",
      // "code": 200,
      // "isLikes": true
      // console.log('res',res);
      
      if (res.code == 200) {
        ElMessage({
          message: res.msg,
          type: 'success'
        });
        blogdata.collectIs = res.isCollects;
      }
    });
  }, 
    search(key){
      // request.get(`/collect/likes?blogId=${blogid}`).then((res:any)=>{

      // })
    },
    //评论相关
    async reply(obj,type=0){
      let form = new FormData();
      // 对评论进行回复
      // console.log('relyType',type)
      // console.log('replydata',obj)
      if(type==1){
        form.append('blogId',obj.blogId)
        form.append('commentContent',obj.commentContent)
        return request({
          url: '/comment/addComment',
          method: 'POST',
          data: form
        })
      }
      form.append('commentId',obj.commentId)
      form.append('replyContent',obj.replyContent)
      form.append('replyType',obj.replyType)
      form.append('replygoalId',obj.replygoalId)
      // 正经回复
      return request({
        url: '/comment/addReply',
        method: 'POST',
        data: form
      })
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
