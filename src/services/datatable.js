/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-01-01 21:48:24
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-26 12:02:20
 */
import { get,put } from '../utils/request';

const requestList = {
  getOrderList: '/iiot/datatable/order/list',
  removeOrder:'/iiot/datatable/order/remove',
  saveOrder:'/iiot/datatable/order/save',

  getWorkList: '/iiot/datatable/work/list',
  removeWork:'/iiot/datatable/work/remove',
  saveWork:'/iiot/datatable/work/save',

  getManufacturingbomList: '/iiot/datatable/manufacturingbom/list',
  removeManufacturingbom:'/iiot/datatable/manufacturingbom/remove',
  saveManufacturingbom:'/iiot/datatable/manufacturingbom/save',

  getItemList: '/iiot/datatable/item/list',
  removeItem:'/iiot/datatable/item/remove',
  saveItem:'/iiot/datatable/item/save',

  getResourceList: '/iiot/datatable/resource/list',
  removeResource:'/iiot/datatable/resource/remove',
  saveResource:'/iiot/datatable/resource/save',

  getCalendarList: '/iiot/datatable/calendar/list',
  removeCalendar:'/iiot/datatable/calendar/remove',
  saveCalendar:'/iiot/datatable/calendar/save',

  getShiftList: '/iiot/datatable/shift/list',
  removeShift:'/iiot/datatable/shift/remove',
  saveShift:'/iiot/datatable/shift/save',

  getResourceevalList: '/iiot/datatable/resourceeval/list',
  removeResourceeval:'/iiot/datatable/resourceeval/remove',
  saveResourceeval:'/iiot/datatable/resourceeval/save',
  
  downloadManufacturingbom:'/iiot/datatable/manufacturingbom/export',
  getItemCodeList:'/iiot/datatable/item/codeList',
  getResourceCodeList:'/iiot/datatable/resource/codeList',
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