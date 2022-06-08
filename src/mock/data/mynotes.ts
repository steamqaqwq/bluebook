import Mock, { Random } from 'mockjs';
const notes: any[] = [];
for (let i = 0; i <= 10; i++) {
  notes.push(
    Mock.mock({
        id: Random.id(),
        username: Random.cname(),
        title: Random.ctitle() + Random.ctitle(),
        'favs|1-1000': 100,
        'isVideo|1-2': true,
        'likes|1-1000':10,
        'comments|1-20':12,
        cover: Random.image('500x800', '#50B347', '#FFF', 'cover')
    })
  );
}
export default [
  {
    url: '/api/mynotes',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: notes
      };
    }
  }
];
