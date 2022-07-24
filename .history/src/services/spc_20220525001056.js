import { get,put } from '../utils/request';

const requestList = {
    getSpcTableList: '/iiot/spcData/dataTable/list',


}

/* 测试接口的数据 */
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