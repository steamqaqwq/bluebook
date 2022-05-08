import Mock, { Random } from 'mockjs';
export default [
  {
    url: '/api/followlist',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: Mock.mock({
          'users|10-40': [
            {
              'id|+1': 1,
              username: '@cname()',
              avatar: Random.image('100x100', '#aaa', '#FFF', 'user'),
              description: '简介都是浮云',
              'isFollow|1-2': true
            }
          ]
        })
      };
    }
  }
];
