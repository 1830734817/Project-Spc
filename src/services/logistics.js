import { get, post, put } from '../utils/request';

/* 存储请求地址*/
export const requestUrl = {
    /* fahuo  */
    deliveryList: '/iiot/warehouse/delivery/list',//发货管理获取列表
    saveDelivery: '/iiot/warehouse/delivery/save',//发货管理获取列表
    updateDelivery: '/iiot/warehouse/delivery/update',//发货管理获取列表
    removeDelivery: '/iiot/warehouse/delivery/remove',//发货管理获取列表

    /* 库存历史 */
    warehouseList: '/iiot/warehouse/stock/list',//仓库管理获取仓库列表
    allWarehouse: '/iiot/basic/warehouse/getInfo', //所有仓库的获取
    stockHistoryList: "/iiot/warehouse/stockHis/list",//仓库历史列表

    outInStock: '/iiot/warehouse/stock/save',//出入库
    bomList: '/iiot/warehouse/stock/getMaterialInfo',//仓库内物料信息
    materialInfo:'/iiot/basic/material/getInfo',//所有物料信息
    listByCompentCode: "/iiot/warehouse/stockOccupy/listByCompentCode",
    
    /* 流转库存 */
    getComponentIdList:'/iiot/basic/material/getInfo',
    getDetailByComponent:'/iiot/warehouse/circulation/list',
    getChildComponent:'/iiot/basic/bom/listAll',
    getProcedure:'/iiot/basic/procedure/listAll',
    saveLogisticManage:'/iiot/warehouse/stockProcedure/save',
    saveLogisticModify:'/iiot/ss',
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