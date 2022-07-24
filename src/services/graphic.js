import { get, post, put} from '../utils/request'

/* 存储请求地址 */
export const requestUrl={
  getPic:'/iiot/picture/list',
  getFile:'/iiot/file/list',
  
  getDevice:'/iiot/basic/device/getAllInfo',//设备-下拉框
  getMaterial:'/iiot/basic/material/getInfo',//物料-下拉框
  getProcedure: '/iiot/basic/procedure/getInfo',//工序-下拉框
  getTool:'/iiot/mould/mould/listAll',//工具-下拉框
  save:'/iiot/picture/save',//新增修改
  delete:'/iiot/picture/remove', //删除
}

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
  return await get(url, data, options);
}

/* 测试接口的数据 */
export async function postRequest(url, data, options){
  return await post(url, data, options);
}

/* 测试接口的数据 */
export async function putRequest(url, data, options){
  return await put(url, data,options);
}