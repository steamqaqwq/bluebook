import Mock, { Random } from 'mockjs';
// interface note {
//     id:number|string;
//     username:string;
//     title:string;
//     avatar:string;
//     cover:string;
//     isFav?:boolean;
//     isVideo?:boolean;
// }
const notes:any[] = [];
for (let i = 0; i < 50; i++) {
    notes.push(
        Mock.mock({
        id: Random.id(),
        username: Random.cname(),
        title: Random.ctitle(),
        "isFav|1-2":true,
        "isVideo|1-2":true,
        cover:Random.image('300x200', '#50B347', '#FFF', 'cover')
        ,
        avatar:Random.image('100x100', '#50B347', '#FFF', 'user')
    })
    )
}
export default {
    getNotes: () => {
        return {
            notesLength: notes.length,
           notes
        }
    },
    // 增
    create: () => ({
        result: true,
        data: 'success'
    }),
    // 改
    update: () => ({
        result: true,
        data: 'success'
    })
}