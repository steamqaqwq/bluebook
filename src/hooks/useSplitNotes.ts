import {ref} from 'vue'
const splitNotes = (notes)=>{
    notes.value.reduce((pre: number, cur) => {
        if (pre == initColumns) {
          pre = 0;
        }
        if (notesList.value[pre]) {
          notesList.value[pre].push(cur);
        } else {
          notesList.value[pre] = [];
          notesList.value[pre].push(cur);
        }
        return ++pre;
      }, 0);
}