export default [
  {
    url: '/api/mymsg',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
            username:'XXu2',
            avatar:'http://i1.hdslb.com/bfs/face/c161abb7557cd84b7bbf354896d7d39215be9906.jpg@68w_68h.jpg'
        }
      };
    }
  }
];
