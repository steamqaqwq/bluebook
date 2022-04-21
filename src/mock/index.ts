import Mock from 'mockjs';
import institution from './data/instruction'; // 机构列表
import notes from './data/notes';
import newnotes from './data/newdata';
Mock.mock('/institution/list', 'get', institution.getList); // 查
Mock.mock('/institution/create', 'post', institution.create); // 增
Mock.mock('/notes/getnotes', 'get', notes.getNotes);

Mock.mock('/notes/getnewnotes', 'get', newnotes.getnewnotes);
export default Mock;
