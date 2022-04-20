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
const notes: any[] = [];
for (let i = 0; i <= 23; i++) {
  notes.push(
    Mock.mock({
      id: Random.id(),
      username: Random.cname(),
      title: Random.ctitle() + Random.ctitle(),
      'favs|1-1000': 100,
      'isFav|1-2': true,
      'isVideo|1-2': true,
      cover: Random.image('500x800', '#50B347', '#FFF', 'cover'),
      avatar: Random.image('100x100', '#50B347', '#FFF', 'user')
    })
  );
}
export default {
  getNotes: () => {
    return {
      notesLength: notes.length,
      notes
    };
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
};
