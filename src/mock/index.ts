import Mock from 'mockjs';
import institution from './data/instruction';  // 机构列表
import notes from './data/notes'
Mock.mock('/institution/list', 'get' ,institution.getList); // 查
Mock.mock('/institution/create', 'post' ,institution.create); // 增
Mock.mock('/notes/getnotes','get',notes.getNotes)
export default Mock
