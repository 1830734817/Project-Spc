/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 20:31:11
 */

import { get,put } from '../utils/request';

const requestList = {
    getMaintenanceList: '/iiot/maintenance/data/list',
   
}

/* 测试接口的数据 */
export function gets(type){
    return async function(data,options){
      console.log("--------------------------",data,options)
      return await get(requestList[type],data,options);
    }
}

export function posts(type){
  return async function(data,options){
    return await put(requestList[type],data,options);
  }
}