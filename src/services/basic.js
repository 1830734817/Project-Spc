import { get, post, put } from '../utils/request';

/* 存储请求地址*/
export const requestUrl = {
    /* 消息中心 */
    message: '/iiot/basic/message/list',//消息中心获取列表
    
    departmentList: '/uaa/dept/list',//部门列表
    /* 设备定义 */
    processList: '/iiot/basic/procedure/list',//工序列表
    allProcess: '/iiot/basic/procedure/listAll',//工序列表
    orderList: '/iiot/basic/defineColumn/list',//订单列表
    warehouseList: '/iiot/basic/warehouse/list',//仓库列表
    zeroWarehouse: '/iiot/basic/warehouse/warehouseList',//仓库列表
    deviceList: '/iiot/basic/device/list',//设备列表
    deviceGroupList:'/iiot/basic/deviceGroup/list',//设备组列表
    removeDeviceGroup:'/iiot/basic/deviceGroup/remove',//删除设备组
    saveDeviceGroup:'/iiot/basic/deviceGroup/save',//增加设备组
    getDeviceList :'/iiot/basic/device/getInfo', //获取所有的设备列表
    getGroupDevice:'/iiot/basic/deviceGroup/getDevice',//获取设备组设备 ？id=
    removeGroupDevice:'/iiot/basic/deviceGroup/removeDevice',//删除设备组下的设备 ?id = 设备id
    deviceTypeList: '/iiot/basic/deviceType/list',//设备类型列表
    typeAttributeList: '/iiot/basic/deviceType/noPagedListAttribute',//设备类型属性列表
    getAttributeDetail: '/iiot/basic/deviceType/getAttributeDetail', //设备类型属性获取离线列表
    saveType: '/iiot/basic/deviceType/save',
    updateType: '/iiot/basic/deviceType/update',
    removeType: '/iiot/basic/deviceType/remove',
    batchRemoveType: '/iiot/basic/deviceType/batchRemove',
    saveAttribute: '/iiot/basic/deviceType/saveAttribute',
    updateAttribute: '/iiot/basic/deviceType/updateAttribute',
    removeAttribute: '/iiot/basic/deviceType/removeAttribute',
    saveDevice: '/iiot/basic/device/save',
    updateDevice: '/iiot/basic/device/update',
    removeDevItem: '/iiot/basic/device/remove',
    batchRemoveDev: '/iiot/basic/device/batchRemove',
    getIpcList:'/iiot/basic/ipc/getInfo', //工控机-下拉框列表
    getWorkshopList:'/iiot/basic/workshop/getInfo',//车间-下拉框列表



    /* 数据字典 */
    dictList: '/iiot/common/dict/list',//获取字典列表
    dictTypeList: '/iiot/common/dict/type',//获取字典类型列表
    saveDict: '/iiot/common/dict/save',//新增字典
    updateDict: '/iiot/common/dict/update',//更新字典
    removeDict: '/iiot/common/dict/remove',//删除字典
    batchRemoveDict: '/iiot/common/dict/batchRemove',//删除字典

    /* 工序 */
    devTypeList: '/iiot/basic/deviceType/list',//设备类型列表
    // processList: '/iiot/basic/procedure/list',//工序列表
    saveProcedure: '/iiot/basic/procedure/save',//新增工序
    updateProcedure: '/iiot/basic/procedure/update',//更新工序信息
    deleteProcedure: '/iiot/basic/procedure/remove',//删除工序信息

    /* 订单定义 */
    // orderList: '/iiot/basic/defineColumn/list',//订单列表
    saveOrder: '/iiot/basic/defineColumn/save',//新增订单定义
    updateOrder: '/iiot/basic/defineColumn/update',//更新订单定义
    removeOrder: '/iiot/basic/defineColumn/remove',//删除订单定义

    /* 仓库定义 */
    // warehouseList: '/iiot/basic/warehouse/list',//仓库列表
    savewarehouse: '/iiot/basic/warehouse/save',//新增仓库
    updateWarehouse: '/iiot/basic/warehouse/update',//新增仓库
    bomList: '/iiot/basic/bom/pagedList',//物料列表
    bomNoPagedList:'/iiot/basic/bom/list',
    deleteWarehouse:'/iiot/basic/warehouse/remove',
    mudSave:'/iiot/mould/mouldStock/save', //新增、编辑工具仓库 
    adrList:'/iiot/mould/mouldStock/list',//工具仓库列表  
    /* 产能定义 */
    capacityList: '/iiot/basic/capacity/list',//产能列表
    allBomList: '/iiot/basic/material/getInfo',//所有物料列表
    techLine: '/iiot/basic/capacity/techlineInfo',//获取工艺路线
    removeCapacity: '/iiot/basic/capacity/remove',//删除产能定义
    batchRemoveCapacity: '/iiot/basic/capacity/batchRemove',//批量删除产能定义
    saveCapacity: '/iiot/basic/capacity/save',//保存产能定义
    removeDevice: '/iiot/basic/deviceList/remove',//保存产能定义
    batchRemoveDevice: '/iiot/basic/deviceList/batchRemove',//保存产能定义
    editCapacity:'/iiot/basic/capacity/edit',//修改产能定义

    
    /* 工厂日历 */
    calendarList: '/iiot/basic/calender/list',//获取日历列表
    saveCalendar: '/iiot/basic/calender/save',//保存日历
    updateCalendar: '/iiot/basic/calender/update',//修改日历
    copyCalendar: '/iiot/basic/calender/copy',//复制日历
    removeCalendar: '/iiot/basic/calender/remove',//删除日历

    /* 工艺路线 */
    techLineList: '/iiot/basic/techline/list',//工艺路线列表
    listProcedure: '/iiot/basic/procedure/getInfo',//工艺路线-工序列表
    removeTechLine: '/iiot/basic/techline/remove',//删除工艺路线
    batchRemoveTechLine: '/iiot/basic/techline/batchRemove',//删除工艺路线
    noTechLine: '/iiot/basic/material/getNotConfigured',//未配置工艺路线的物料
    saveTechLine: '/iiot/basic/techline/save',//保存工艺路线
    updateTechLine:'/iiot/basic/techline/edit',//修改工艺路线
    showFile: '/iiot/basic/techline/showFile',
    getProcedureById:'/iiot/basic/device/getDeviceByProcedure',

    /* 物料定义 */
    getMaterial:'/iiot/basic/material/list', //物料定义
    saveMaterial:'/iiot/basic/material/save',
    removeMaterial:'/iiot/basic/material/remove',
    syncMaterial:'/iiot/basic/material/sync',
    syncBom:'/iiot/basic/bom/sync',
    getDeviceListByWorkShop:'/iiot/basic/device/getInfoByWorkshopId',
    

    /* Bom 定义 */
    addBom:'/iiot/basic/bom/add',
    saveBom: '/iiot/basic/bom/save',//保存物料定义
    updateBom: '/iiot/basic/bom/update',//编辑物料定义
    removeBom: '/iiot/basic/bom/remove',//编辑物料定义
    getBomList: '/iiot/basic/material/getInfo',
    getBomSec:'/iiot/basic/bom/getSubList',//获取bomm下级

    /* 质检定义 */
    resultData: '/iiot/inspect/inspecresult/listByWorkId',
    getWorkInfo: '/iiot/inspect/inspecresult/list',

    /* 工厂建模 */
    getPlantList:'/iiot/basic/factory/list',
    getWorkShop:'/iiot/basic/workshop/list',
    deletePlant:'/iiot/basic/factory/remove',
    deleteWorkShop:'/iiot/basic/workshop/remove',
    savePlant:'/iiot/basic/factory/save',
    saveWorkShop:'/iiot/basic/workshop/save',
    getAllPlant:'/iiot/basic/factory/getInfo',


    /* 工艺参数 */
    paramsList:'/iiot/basic/deviceParam/list',
    saveParams:'/iiot/basic/deviceParam/save',
    deleteParams:'/iiot/basic/deviceParam/remove',

    /* 终端定义 */
    ipcList:'/iiot/basic/ipc/list',
    saveIpc:'/iiot/basic/ipc/save',
    deleteIpc:'/iiot/basic/ipc/remove',

    /*工具定义 */
    getToolsList:'/iiot/mould/mould/list',//获取工具列表get*/
    saveTools:'/iiot/mould/mould/save',//工具保存接口post*/
    removeTools:'/iiot/mould/mould/remove',//工具删除接口post*/
    checkoutTools:'/iiot/mould/mould/stock',//工具出库接口post*/
    toolsWareList:'/iiot/mould/mouldWarehouse/list',//工具库接口save remove
    deleteWare:'/iiot/mould/mouldWarehouse/remove',
    deleteWareStock:'/iiot/mould/mouldStock/remove',//删除工具仓库定义
    getToolsLife:'/iiot/mould/mouldLife/list',//工具寿命查询
    getMaterialListInfo:'/iiot/basic/material/getInfo',//物料列表
    getDevicetypeInfo:'/iiot/basic/deviceType/listAll',//设备列表
    // getWarehouseList:'/iiot/mould/mouldWarehouse/listAll',//库位（仓库）信息
    saveWarehouse:'/iiot/mould/mouldWarehouse/save',//工具库新增
    getMouldInfo:'/iiot/mould/mould/getInfo',
    getTool:'/iiot/mould/mould/canInOrOutStockInfo',//工具-下拉框
    stockInOut:'/iiot/mould/mould/stock',//出入库
    stockHistory:'/iiot/mould/mould/stockList',//出入库记录
    getWarehouseList:'/iiot/mould/mouldStock/listAll',//仓库-下拉框
    getLocatorList:'/iiot/mould/mouldWarehouse/listEmpty', //空余库位-下拉框
    getToolList: '/iiot/mould/mould/listAll',/**工具-选择框 */

    /* 原因定义 */
    reasonList:'/iiot/inspect/reason/list',
    processNoPage: '/iiot/basic/procedure/getInfo',
    deleteReason:'/iiot/inspect/reason/remove',
    saveReason:'/iiot/inspect/reason/save',
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