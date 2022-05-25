import {onMounted,reactive,toRefs} from 'vue'
export default async function (){
    const location = reactive({
        ip:'', 
        city:'',  //市
        adcode:'', // 市区代码
        cityCode:'', // 城市代码
        location:'',  //具体定位
        province:'', // 省
        point:{
            x:'', //经度
            y:'' //维度
        }
    })
    onMounted(async ()=>{
        let ip = (window as any).returnCitySN.cip;
        // ak  F4oiQviHpdsR3rIuEafCWmPInZgIok4P
        // ip 183.236.187.196
        location.ip = ip
        fetch(`http://localhost:3000/baiduapi/location/ip?ak=F4oiQviHpdsR3rIuEafCWmPInZgIok4P&ip=${ip}&coor=bd09ll`, {
            method: 'GET'
          })
            .then((res: any) => res.json())
            .then((res) => {
            let content = res.content.address_detail
            location.adcode = content.adcode
            location.city = content.city
            location.location = res.content.address
            location.cityCode = content.city_code
            location.province = content.province
            location.point = res.content.point
        });
    })

    return {
        location
    }
}
