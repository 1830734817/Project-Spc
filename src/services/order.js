import { get,put } from '../utils/request';

const requestList = {
  getOrderList :'/iiot/product/order/list',
  queryOrderList :'/iiot/product/order/listOrder',
  editOrder:'/iiot/product/order/getInfo',
  delOrder:'/iiot/product/order/remove',
  getMaster: '/iiot/basic/material/getInfo',
  updateOrder:'/iiot/product/order/toReport',
  addOrder:'/iiot/product/order/save',
  changeStatus:'/iiot/product/order/changeStatus',
  //listColumnDO:'/iiot/basic/defineColumn/listColumnDO',
  generatePlan :'/iiot/product/order/generatePlan',
}

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