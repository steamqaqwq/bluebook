import axios from 'axios'
// import { ElNotification , ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'


const service = axios.create({
//   baseURL: 'http://localhost:9090',
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // store.state.isloading = true
    // if (store.getters.token) {
      if(getToken()){
        // config.headers['token'] = getToken()
      }
    // }
    return config
  },
  error => {
    
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // store.state.isloading = false
    const res = response.data
   
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }

    return res
  },
  error => {
    // let whiteList = []
    // console.log('err' + error) // for debug
    // console.log(error.message.match(/[0-9]+/))
    //获取错误代码 若大于2000则不报错
    // let errorCode = error.message.match(/[0-9]+/)[0]
    // if(errorCode<2000){
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }else{
    //   store.state.isloading = false
    // }
    setTimeout(()=>{
    //   store.state.isloading = false
    },5000)
    return Promise.reject(error)
  }
)

export default service
