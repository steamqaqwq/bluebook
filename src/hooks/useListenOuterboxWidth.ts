import {onMounted,ref,nextTick,watch} from 'vue'
import {debounce} from '@/utils/debounce'
export default function(notesElement:any){
  console.log('notesElementonmount',notesElement.value.clientWidth)
    let outerwidth = ref<number>();
    // const notesElement = ref();
    // watch(outerwidth,()=>{
    //   outerwidth.value = notesElement.value.clientWidth;
    // })
    onMounted(() => {
        outerwidth.value = notesElement.value.clientWidth;
        window.addEventListener(
          'resize',
          debounce(() => {
            console.log('notesElement',notesElement.value)
            nextTick(() => {
              if (notesElement.value.clientWidth) {
                outerwidth.value = notesElement.value.clientWidth;
              }
            });
          }, 300)
        );
      })

      return {
          outerwidth
      }
}
