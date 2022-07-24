import { get,put } from '../utils/request';

const requestList = {
    getSpcTableList: '/iiot/spcData/dataTable/list',                    //spc表格数据查询
    removeSpcTableList: '/iiot/spcData/dataTable/remove',               //spc表格数据删除
    addSpcTableList : '/iiot/spcData/dataTable/add',                    //spc表格数据新增

    getCheckProjects: '/iiot/basicSetting/checkProject/list',           //检测项目查询

    getColInfo: '/iiot/basicSetting/ColInfo/list',                      //层次类型查询
    saveColInfo: '/iiot/basicSetting/ColInfo/save',                     //层次类型设置
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