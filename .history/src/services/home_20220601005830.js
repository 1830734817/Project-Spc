/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-05-12 14:24:52
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-22 14:06:51
 */
import { get,put,post } from '../utils/request';

const requestList = {
  getList :'/iiot/basic/defineColumn/list',
  getMenuList:'/uaa/menu/treeOnLogin',
  getCustomMenu:'/iiot/sys/userMenu/list',
  savePassword:'/iiot/sys/user/resetPwd',
  saveBasicInfo:'/uaa/user/updatePassword',
  getSideMenuList: '/uaa/sideMenu/list',

  /* get_token */
  setLogin:'/uaa/form/pcToken',
  saveCustomMenu:'/iiot/sys/userMenu/save',
  addCustomMenu:'/iiot/sys/userMenu/add',
  deleteCustomMenu:'/iiot/sys/userMenu/delete',
  setLogout:'/uaa/user/logout',
  
  /*生产分析表头*/
  getMonthPlanCount:'/iiot/produce/analy/getMonthPlanCount',
  getMonthWorkCount:'/iiot/produce/analy/getMonthWorkCount',
  getDayWorkCont:'/iiot/produce/analy/getDayWorkCount',
  getDaySuccessCount:'/iiot/produce/analy/getDaySuccessCount',

  /* 免密登录  */
  setAutoAuth:'/uaa/form/aliIotToken',
  
  /* 页面图片  */
  getConfigList: '/iiot/resource/listLogo',

  /* sideMenu */
  saveCreateTable: '/uaa/sideMenu/addTable',
  saveCreateClass: '/uaa/sideMenu/addClass',
  saveRename: '/uaa/sideMenu/rename'
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

export function postsForm(type){
  return async function(data,options){
    return await post(requestList[type],data,options);
  }
}