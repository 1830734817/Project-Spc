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
  getMaintenanceDataList: '/iiot/maintenance/data/list',
  removeMaintenanceDataList : '/iiot/maintenance/data/remove',

  getMaintenanceContentList: '/iiot/maintenance/content/list',
  saveMaintenanceContentList: '/iiot/maintenance/content/save', //保养内容的提交接口同时也是保养数据的增加接口

  getMaintenancePlanList: '/iiot/maintenance/plan/list',
  saveMaintenancePlanList: '/iiot/maintenance/plan/save'
   
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