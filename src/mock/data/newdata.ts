import Mock, { Random } from 'mockjs';

const newnotes: any[] = [];
for (let i = 0; i <= 10; i++) {
  newnotes.push(
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
  getnewnotes: () => {
    return {
      newnotesLength: newnotes.length,
      newnotes
    };
  }
};
