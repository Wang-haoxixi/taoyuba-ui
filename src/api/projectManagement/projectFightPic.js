import request from '@/router/request'
const baseUrl = '/proj/dnaprojectmilestone'

export function getProjectFightPic (params) {
  return request({
    url: `${baseUrl}/combatMap`,
    method: 'get',
    params: params || {},
  })

  // return {
  //   startMonth: '2019-03',
  //   endMonth: '2019-06',
  //   projects: [
  //     {
  //       id: 2,
  //       name: '浙江省行政执法监管平台',
  //       server: '省政府办公厅',
  //       degree: 50,
  //       activated: false,
  //       milepost: [
  //         {
  //           expectTime: '2019-05-10',
  //           desc: '5月10日 完成平台项目工作',
  //           timeLine: [
  //             {
  //               time: '2019-03-01',
  //               degree: 20,
  //               expection: -1,
  //             },
  //             {
  //               time: '2019-04-09',
  //               degree: 50,
  //               expection: 1,
  //             },
  //             {
  //               time: '2019-5-10',
  //               degree: 100,
  //               expection: 0,
  //             },
  //           ],
  //         },
  //         {
  //           expectTime: '2019-05-18',
  //           desc: '5月18日 完成平台项目工作',
  //           timeLine: [
  //             {
  //               time: '2019-03-16',
  //               degree: 20,
  //               expection: 1,
  //             },
  //             {
  //               time: '2019-04-16',
  //               degree: 50,
  //               expection: -1,
  //             },
  //             {
  //               time: '2019-5-1',
  //               degree: 100,
  //               expection: 1,
  //             },
  //           ],
  //         },
  //         {
  //           expectTime: '2019-04-30',
  //           desc: '4月30日 完成平台项目工作',
  //           timeLine: [
  //             {
  //               time: '2019-03-16',
  //               degree: 20,
  //               expection: -1,
  //             },
  //             {
  //               time: '2019-04-16',
  //               degree: 50,
  //               expection: 0,
  //             },
  //             {
  //               time: '2019-05-01',
  //               degree: 100,
  //               expection: -1,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // }
}
