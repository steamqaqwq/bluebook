interface ksss {
    id:number;
    ks:string;
    children:{
        ks: string;
    }[]
}
export const allKs = [
    {
        id:1,
        ks: '消化内科',
        children: [
          {
            ks: '消化内科(门诊)',
          },
          {
            ks: '消化内科肠道炎症性疾病中心',
          },
          {
            ks: '消化道早期癌专病中心'
          }
        ],
    },
    {
        id:2,
        ks:'骨科',
        children:[
            {ks:'骨科(门诊)'}
            ,{ks:'骨科(骨质疏松门诊)'}
        ]
    },
    {
        id:3,
        ks:'儿科',
        children:[
            {ks:'儿童哮喘专病中心'},
            {ks:'儿童内分泌专科'},
            {ks:'儿童医学中心(门诊)'}
        ]
    }
    
]