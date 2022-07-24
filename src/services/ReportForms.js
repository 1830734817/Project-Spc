import { get, post, put} from '../utils/request'

/* 存储请求地址 */
export const requestUrl={
  getData: '/iiot/basic/material/notConfig',
  getLog: '/iiot/sys/operateType/list',
  getUserHistory: '/iiot/sys/log/list',
  getProcedureList: '/iiot/basic/procedure/getInfo',
  getDeviceList: '/iiot/basic/device/getDeviceAndGroupInfo',
  getUserList: '/uaa/user/list',
  getMaterialList: '/iiot/basic/material/getInfo'
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