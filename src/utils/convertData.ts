// 将后端传入数据格式化为前端数据

// 科室转换
export const convertKs = (ks: any) => {
    let c_ks = ks;
    c_ks = JSON.stringify(c_ks).replace(/ks/g, 'label');
    console.log(JSON.parse(c_ks));
    c_ks = JSON.parse(c_ks);
    const deliever = (c_ks) => {
      c_ks.forEach((item) => {
        if (!item.value) {
          item['value'] = item.label;
        }
        if (item.children) {
          deliever(item.children);
        }
      });
    };
    deliever(c_ks);
    return c_ks;
  };