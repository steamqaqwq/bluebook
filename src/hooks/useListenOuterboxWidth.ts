import {onMounted,ref,nextTick} from 'vue'
import {debounce} from '@/utils/debounce'
export default function(notesElement:any){
    let outerwidth = ref<number>();
    // const notesElement = ref();
    onMounted(() => {
        outerwidth.value = notesElement.value.clientWidth;
        window.addEventListener(
          'resize',
          debounce(() => {
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
