import { get, post, put } from '../utils/request';

/* 存储请求地址*/
export const requestUrl = {
	/* 通用 */
	getMaterial: '/iiot/basic/material/getInfo',
	getProcedure:'/iiot/basic/techline/getProcedureByMaterialId',

	/* SPC analysis */
	getCate: '/iiot/inspect/inspecschema/getCateCode',
	getInspectRules: '/iiot/inspect/inspecschema/getInspectByCateCode',
	getProcedureList: '/iiot/inspect/inspecstatistic/getProcedureIdByCateCode',
	getMeasureData: '/iiot/inspect/spcAnaly/list',
	getNumberData: '/iiot/inspect/spcAnaly/list',
	getDevice :'/iiot/basic/deviceType/getInfo',
  getDeviceList :'/iiot/basic/device/getDevice',
  configByProcedure:'/iiot/inspect/item/listByProcedureId',
  configByPath:'/iiot/inspect/path/getInfo',

    getRXData: '/iiot/inspect/analy/spcAnalyseXR',
    getPData: '/iiot/inspect/analy/spcAnalyseP',

    /**
     * 质量分析
     */
    getRate: '/iiot/inspect/analy/inspectRateAnalyse',
    getPie: '/iiot/inspect/analy/defectAnalysis',
    getWorkshopList: '/iiot/basic/workshop/getInfo',

  /* -------------点检 && 保养--------------- */
  /* 库 */
  getMaintain:'/iiot/inspect/item/list', // 获取库
  singleRemove:'/iiot/inspect/item/remove',
  saveMaintain:'/iiot/inspect/item/save',
  getServeInfo:'/iiot/device/config/getInfo',

  /* 方案 */
  getScheme:'/iiot/inspect/path/list',
  delSchema:'/iiot/inspect/path/remove',
  saveSchema:'/iiot/inspect/path/save',
  schemaInfo:'/iiot/inspect/path/getInfo',

  /* 计划 */
  getPlan:'/iiot/inspect/plan/list',
  savePlan:'/iiot/inspect/plan/save',
  delPlan:'/iiot/inspect/plan/remove',
  batchDelPlan:'/iiot/inspect/plan/batchRemove',
  getPlanInfo:'/iiot/inspect/plan/getInfo',
  toDetail:'/iiot/inspect/plan/save',

  /* 查询 */
  getQuery:'/iiot/inspect/task/list',
  getResultInfo:'/iiot/inspect/task/getInfo',
  allBomList:'/iiot/basic/material/getInfo',
  procedureList:'/iiot/basic/procedure/getInfo',

  /* 执行报表 */
  getExecuteCharts: '/iiot/inspect/task/getExeAnalyse',
  getExecuteTable: '/iiot/inspect/task/getExecuteDetail',
};

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
	return await get(url, data, options);
}

/* 测试接口的数据 */
export async function postRequest(url, data, options) {
	return await post(url, data, options);
}
/* 测试接口的数据 */
export async function putRequest(url, data, options) {
	return await put(url, data, options);
}
