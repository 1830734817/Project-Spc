import { get, post, put} from '../utils/request'

/* 存储请求地址 */
export const requestUrl={
    codeList:'/iiot/frame/materialFrame/list', //获取条码列表
    codeSave:'/iiot/frame/materialFrame/save', //新增条码
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