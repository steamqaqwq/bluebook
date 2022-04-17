import Mock, { Random } from 'mockjs';
export default [
  {
    url: '/api/doctors',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: Mock.mock({
          'kss|20': [
              {
                'id|+1':1,
                ks_name:'@ctitle(1, 4)'+'科',
                'doctors|1-20': [
                    {
                      id:'@increment()',
                      dc_name: '@cname()'
                    }
                ]
              }
          ]
        })
      };
    }
  }
];
