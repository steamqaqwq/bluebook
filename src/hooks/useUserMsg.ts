import {onMounted,reactive} from 'vue'
import request from '@/utils/request'

export default function(){
    const userInfo = reactive({})
    onMounted(()=>{
    request('/person/information',{params:{personId:3}}).then((res:any)=>{
        //请求黑名单
        let blackList = ['status','phonenumberPassword','updateTime','updateBy']
        
        if(res.code == 200){
            for (let i in res.map){
                if(!blackList.includes(i))userInfo[i] = res.map[i]
            }
        }
    })
})
    return {
        userInfo
    }
}