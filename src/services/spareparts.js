import { get, put,post} from '../utils/request';

export const requestUrl = {
    getSpareType: '/iiot/spareType/1/list',//备件类型列表
    saveSpareType: '/iiot/spareType/1/save',//新增/修改备件类型
    // deleteSpareType: '/iiot/spareType/remove',//删除备件类型
    // changeSpareType:'/iiot/spareType/changeStatus',//修改备件类型状态
    allSpareType: '/iiot/spareType/1/getInfo',//所有备件类型-下拉框
    getSpare: '/iiot/spare/1/list',//备件列表
    saveSpare: '/iiot/spare/1/save',//新增/修改备件
    spareAll: '/iiot/spare/1/getInfo',//所有备件-下拉框
    // deleteSpare: '/iiot/spare/1/remove',//删除备件
    getDeviceType: '/iiot/basic/deviceType/getInfo',//设备型号-下拉框
    operationSpare: '/iiot/spare/record/1/save',//备件出入库 
    spareRecordList: '/iiot/spare/record/1/list',//出入库记录
    // warnList: '/iiot/spare/warn/list',//库存预警
    // getByType: '/iiot/work/getByType',//工单
    // export:'/iiot/spare/spare/export',
    // modelList: '/iiot/base/deviceModel/listByTypeId',//类型获取设备型号

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