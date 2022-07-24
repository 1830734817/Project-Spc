import { get,put } from '../utils/request';

const requestList = {
  getDevice :'/iiot/basic/deviceType/getInfo',
  getDeviceList :'/iiot/basic/device/getInfo',
  getDeviceAll:'/iiot/device/monitor/listDevice',
  getWorkShopList:'/iiot/basic/workshop/getInfo',
  getAllConfig:'/iiot/device/config/listAll',

  /* -------------点检 && 保养--------------- */
  /* 库 */
  getMaintain:'/iiot/device/config/list', // 获取库
  singleRemove:'/iiot/device/config/remove',
  saveMaintain:'/iiot/device/config/save',
  getServeInfo:'/iiot/device/config/getInfo',

  /* 方案 */
  getScheme:'/iiot/device/configPath/list',
  batchDelSchema:'/iiot/device/configPath/batchRemove',
  delSchema:'/iiot/device/configPath/remove',
  saveSchema:'/iiot/device/configPath/save',
  schemaInfo:'/iiot/device/configPath/getInfo',

  /* 计划 */
  getPlan:'/iiot/device/configPlan/list',
  savePlan:'/iiot/device/configPlan/save',
  delPlan:'/iiot/device/configPlan/remove',
  batchDelPlan:'/iiot/device/configPlan/batchRemove',
  getPlanInfo:'/iiot/device/configPlan/getInfo',
  toDetail:'/iiot/device/configPlan/save',
  getDeviceByType:'/iiot/basic/device/listByTypeId',
  getSchemaByType:'/iiot/device/configPath/listByTypeId',
  recoverPlan:'/iiot/device/configPlan/remove',//回收计划

  /* 操作 */
  getDeviceByOp:'/iiot/basic/device/listByType',
  getOperateList:'/iiot/device/configTask/list',
  getListByConfigs:'/iiot/device/configPath/getDetailInfo', //弹窗内获取列表数据
  saveOperate:'/iiot/device/configTask/save',


  /* 查询 */
  getQuery:'/iiot/device/configTask/list',
  getResultInfo:'/iiot/device/configTask/getInfo',
  getWorkshopList:'/iiot/basic/workshop/getInfo',

  /* ------------设备监控------------- */
  getMonitor:'/iiot/device/monitor/list',
  getMonitorDetail:'/iiot/device/monitor/getDeviceDetail',
  getMonitorParams:'/iiot/device/monitor/listDeviceParamValue',
  getDeviceStatusNumber: '/iiot/device/monitor/statusNum',

  /* 设备日志 */
  getDeviceLog: '/iiot/device/maintainRecord/listNew',
  

  /* ------------工具---------------- */
  getMould:'/iiot/mould/mould/listAll',

  /* ------------异常统计---------------- */
  getAbnormalLineAnalyse: '/iiot/device/analy/abnormalLineAnalyse', //异常统计情况
  getAbnormalAnalyse: '/iiot/device/analy/abnormalAnalyse', //异常占比
  getAbnormalReasonAnalyse: '/iiot/device/analy/abnormalReasonAnalyse', //不合格项占比

  /* -----------维修报表 --------------- */
  getReportData: '/iiot/device/maintain/listAll',
  getDeviceAndGroup: '/iiot/basic/device/getAllInfo',
  getReportInfo: '/iiot/device/maintain/history',

  /* ---------- 维保分析 ---------- */
  getMaintainAnalysisData: '/iiot/device/analy/timelyAnalysis',

  /* ---------- 设备切片 ---------- */
  getDeviceSlice: '/iiot/basic/device/deviceSliceAnalyse',
  /**---------- 历史参数 ---------- */
  getDeviceListByWorkshop: '/iiot/basic/device/getInfoByWorkshopId',
}

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