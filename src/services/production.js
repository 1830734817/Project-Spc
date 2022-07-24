import { get,put } from '../utils/request';

const requestList = {
  /* 计划评审 */
  getOrder :'/iiot/product/order/list',
  generatePlan :'/iiot/product/order/generatePlan',
  rejectPlan :'/iiot/product/order/toOperate',
  batchReview:'/iiot/product/order/batchToOrder',

  /* 生产任务 */
  getPlanList :'/iiot/product/plan/list',
  generateOrderId:'/iiot/product/order/generateOrderId', // default generateOrderId
  getOrderList:'/iiot/product/order/orderList',//get related orderList
  getBomList:'/iiot/basic/material/getInfo', 
  savePlan:'/iiot/product/plan/save',
  removePlan:'/iiot/product/plan/remove',
  batchRemove:'/iiot/product/plan/batchRemove',
  toWork:'/iiot/product/plan/toWork',
  toSyncData:'/iiot/product/plan/sync',  

  /* 生产报工 */
  getDevice:'/iiot/basic/device/getDeviceAndGroupInfo', //获取设备
  getWorkReport:'/iiot/product/work/listWorks',
  startUp:'/iiot/product/report/startup',
  getWorker :'/iiot/sys/user/userList',
  toComplete: '/iiot/product/report/toComplete',
  getMaterialByWork:'/iiot/product/work/toReport',
  // editReport:'/iiot/product/report/getInfo',
  updateReport :'/iiot/product/work/report',
  inspectReport :'/iiot/inspect/inspecresult/saveInspectResult',
  getInspectInfo :'/iiot/inspect/inspecschema/listSchemaByCateAndPro',
  
  /* 生产排程 */
  getGanttList : '/iiot/product/schedule/listScheData',
  toWorkSchedule:'/iiot/product/plan/toWork', //确认保存排程信息
  listByOrderOrPlan:'/iiot/product/work/listByOrderOrPlan',
  getScheData:'/iiot/product/work/listByMaterialOrTechline',
  getRouteList:'/iiot/basic/techline/getTechlineByMaterialId',//根据物料获取工艺路线

  /* 联合排程 */
  getModuleList:'/iiot/mould/mould/listAll',
  getUnionList:'/iiot/product/plan/listByMouldId',
  toUnionWork:'/iiot/product/plan/toUnionWork',
  perUnionWork:'/iiot/product/plan/preUnionWork',

  /* 工单管理 */
  getWorkList:'/iiot/product/work/list',
  saveWork:'/iiot/product/work/save',
  removeWork:'/iiot/product/work/remove',
  reportWork:'/iiot/product/work/report',
  listProcedure: '/iiot/basic/procedure/getInfo',

  generateWorkId:'/iiot/product/work/generateWorkId',
  proceduresByCate:'/iiot/basic/techline/getProcedureByMaterialId',
  deviceByProcedure:'/iiot/basic/techline/getDeviceByMaterialIdAndProcedureId',
  editWorkInfo:'/iiot/product/work/getInfo',

  toRecall:'/iiot/product/work/toRecall',
  toCompleteWork :'/iiot/product/work/toComplete',
  toComfirm :'/iiot/product/work/toConfirm',

  // 工单操作的质检：
  getIsInspect:'/iiot/device/configTask/lastInspect',


  /* 生产分析 */
  getProductStatic:'/iiot/product/report/producStatic',
  getMonthPlanCount:'/iiot/product/analy/getMonthPlanCount',
  getMonthWorkCount:'/iiot/product/analy/getMonthWorkCount',
  getDayWorkCont:'/iiot/product/analy/getDayWorkCount',
  getListWork:'/iiot/product/work/listWork',
  getDaySuccessCount:'/iiot/product/analy/getDaySuccessCount',
  getReportCountByDate:'/iiot/product/analy/getReportCountByDate',

  // 产量统计
  output: '/iiot/product/analy/getOutputByProcedure',

  /** 执行情况 */
  getWorkshopList: '/iiot/basic/workshop/getInfo',
  getExecutionData: '/iiot/product/work/executeDetail',
}

/* 测试接口的数据 */
export function gets(type){
  return async function(data,options){
    return await get(requestList[type],data,options);
  }
}
export function posts(type){
  return async function(data,options){
    return await put(requestList[type],data,options);
  }
}
// test
// export async function deviceByProcedure(data,options){
//   return await get(data,options);
// }