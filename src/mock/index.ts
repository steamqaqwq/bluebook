import Mock from 'mockjs';
// import institution from './data/instruction'; // 机构列表
import notes from './data/notes';
import newnotes from './data/newdata';
import usernotes from './data/usernotes';
import ranks from './data/rankdata';

// Mock.mock('/institution/list', 'get', institution.getList); // 查
// Mock.mock('/institution/create', 'post', institution.create); // 增
// 主界面获取的数据
Mock.mock('/notes/getnotes', 'get', notes.getNotes);
// 无限加载获取的数据
Mock.mock('/notes/getnewnotes', 'get', newnotes.getnewnotes);
// 用户拥有的notes
Mock.mock('/notes/usernotes', 'get', usernotes.getNotes);
// 搜索页面排行榜数据
Mock.mock('/api/ranks', 'get', ranks.getRanks);

// 搜索用户数据
import usercards from './data/usercards';
Mock.mock('/search/users', 'get', usercards.getusers);

// 模拟评论数据
import comments from './data/comments';
Mock.mock('/api/comments', 'get', comments.getcomments);
export default Mock;
