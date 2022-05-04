import Mock, { Random } from 'mockjs';
const Ranks: any[] = [];
for (let i = 0; i <= 10; i++) {
  Ranks.push(
    Mock.mock({
      id: Random.id(),
      title: Random.ctitle() + Random.ctitle()
    })
  );
}
export default {
  getRanks: () => {
    return { Ranks };
  }
};
