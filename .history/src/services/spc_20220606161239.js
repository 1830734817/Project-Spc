import { get,put } from '../utils/request';

const requestList = {
    getSpcTableList: '/iiot/spcData/dataTable/list',          //spc表格数据查询
    removeSpcTableList: '/iiot/spcData/dataTable/remove',     //spc表格数据删除

    getCheckProjects: '/iiot/basicSetting/checkProject/list', //检测项目查询

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