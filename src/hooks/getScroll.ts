import { onMounted,reactive,onUnmounted } from "vue";
export default function(){
    const scrollPoint = reactive({
        clientHeight:0
    })
    const handleScroll = ()=>{
        scrollPoint.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
        // console.log("offset().top",window.scrollTop)
        // 设备/屏幕高度
        // let scrollObj = document.getElementById(div); // 滚动区域
        // let scrollTop = scrollObj.scrollTop; // div 到头部的距离
        // let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
        
    }
    onMounted(()=>{
        window.addEventListener('scroll', handleScroll, true)
    })
    onUnmounted(()=>{
        window.removeEventListener('scorll',handleScroll)
    })
    return scrollPoint
}