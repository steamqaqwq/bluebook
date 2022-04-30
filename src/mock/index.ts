import Mock from 'mockjs';
// import institution from './data/instruction'; // 机构列表
import notes from './data/notes';
import newnotes from './data/newdata';
import usernotes from './data/usernotes';
// Mock.mock('/institution/list', 'get', institution.getList); // 查
// Mock.mock('/institution/create', 'post', institution.create); // 增
// 主界面获取的数据
Mock.mock('/notes/getnotes', 'get', notes.getNotes);
// 无限加载获取的数据
Mock.mock('/notes/getnewnotes', 'get', newnotes.getnewnotes);
// 用户拥有的notes
Mock.mock('/notes/usernotes', 'get', usernotes.getNotes);

// Mock.mock('upload/img','post',)
export default Mock;
