import Mock, { Random } from 'mockjs';

const comments: any[] = [];
for (let i = 0; i <= 12; i++) {
  comments.push(
    Mock.mock({
      id: Random.id(),
      author: Random.name(),
      avatar: '@/assets/images/defaultAvatar.jpg',
      date: 1652005039383,
      'favs|0-1000': 2,
      content: Random.cword(3, 40),
      'children|5-15': [
        {
          id: Mock.mock('@id'),
          author: Mock.mock('@cname'),
          avatar: '@/assets/images/defaultAvatar.jpg',
          date: 1652005039383,
          'favs|0-1000': 2,
          content: Random.cword(3, 40)
        }
      ]
    })
  );
}
export default {
  getcomments: () => {
    return {
      commentsLength: comments.length,
      comments
    };
  }
};
