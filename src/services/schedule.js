/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-01-01 21:48:24
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-18 16:27:09
 */
import { get,put } from '../utils/request';

const requestList = {
  getProjectList: '/iiot/schedule/project/list',
  removeProject:'/iiot/schedule/project/remove',
  saveProject:'/iiot/schedule/project/save',

  getSchedulingparameterList: '/iiot/schedule/schedulingparameter/list',
  removeSchedulingparameter:'/iiot/schedule/schedulingparameter/remove',
  saveSchedulingparameter:'/iiot/schedule/schedulingparameter/save',
  
  downloadManufacturingbom:'/iiot/datatable/manufacturingbom/export',
  getItemCodeList:'/iiot/datatable/item/codeList',
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
// test
// export async function deviceByProcedure(data,options){
//   return await get(data,options);
// }