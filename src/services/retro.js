import { get, post, put } from '../utils/request';

/* 存储请求地址*/
export const requestUrl = {
    getPlanNoList: '/iiot/frame/materialFrame/getByFrameCode',
    getTreeData: '/iiot/review/bom',
    getProcedureList: '/iiot/basic/techline/getProcedureByMaterialId',
    getTreeNodeDetail: '/iiot/review/getDetailInfo',
    getInspectByWork: '/iiot/inspect/task/list',
    getResultInfo:'/iiot/inspect/task/getInfo',
    getDeviceByWrk: '/iiot/trace/device',
}

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