import { get, post, put } from '../utils/request';

/* 存储请求地址*/
export const requestUrl = {
    defineList: '/iiot/abnormal/list',
    abnormalList: '/iiot/abnormal/getInfo',
    saveAbnormal: '/iiot/abnormal/save',
    removeAbnormal: '/iiot/abnormal/remove',
    batchRemoveAbnormal: '/iiot/abnormal/batchRemove',
    
    saveCall: '/iiot/abnormal/order/save',
    toResponse: '/iiot/abnormal/order/response',
    toHandle:'/iiot/abnormal/order/handle',
    callList: '/iiot/abnormal/order/list',
    
    typeList: '/iiot/abnormal/type/list',
    allTypeList:'/iiot/abnormal/type/getInfo',
    saveType: '/iiot/abnormal/type/save',
    removeType: '/iiot/abnormal/type/remove',
    batchRemoveType: '/iiot/abnormal/type/batchRemove',
    AbnormalTypeList: '/iiot/abnormal/type/listAbnormalType',
    
    resultList: '/iiot/abnormal/order/reslist',
    
    userList: '/uaa/user/list',
    devList: '/iiot/basic/device/getAllInfo',
    getWorkshopList:'/iiot/basic/workshop/getInfo',

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