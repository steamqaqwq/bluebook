import Mock, { Random } from 'mockjs';

const users: any[] = [];

// userid: string | number;
// notes: number;
// follows: number;
// avatar_src: string;
// user_desc: string;
// username
for (let i = 0; i <= 10; i++) {
  users.push(
    Mock.mock({
      userid: Random.id(),
      username: Random.cname(),
      'follows|1-1000': 100,
      'notes|0-50': 22,
      avatar_src: Random.image('100x100', '#50B347', '#FFF', 'A'),
      user_desc: Random.cparagraph()
    })
  );
}
export default {
  getusers: () => {
    return { users };
  }
};
