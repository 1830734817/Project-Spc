import { get, post, put } from '../utils/request';

/* 存储请求地址*/
export const requestUrl = {
    factoryList:'/iiot/basic/factory/getInfo',//工厂列表
    departmentList: '/uaa/dept/list',//部门列表
    removeDepartment: '/uaa/dept/remove',//删除部门
    saveDepartment: '/uaa/dept/save',//新增部门
    updataDepartment: '/uaa/dept/save',//编辑部门
    roleList: '/uaa/role/list',//角色列表
    saveRole: '/uaa/role/save',//新增角色
    updateRole: '/uaa/role/save',//编辑角色
    removeRole: '/uaa/role/remove',//删除角色
    batchRemoveRole: '/uaa/role/batchRemove',//批量删除角色
    treeMenu: '/uaa/menu/tree',//获取菜单树
    getMenuIdsByRole: '/uaa/role/getInfo',//查询角色当前权限
    menuList: '/uaa/menu/tree',//菜单列表
    firstmenu:'/uaa/menu/list',//一级菜单目录
    removeMenu: '/uaa/menu/remove',//删除菜单
    userList: '/uaa/user/list',//用户列表
    saveMenu: '/uaa/menu/save',//新增菜单
    updateMenu: '/uaa/menu/save',//编辑菜单
    saveUser: '/uaa/user/save',//保存用户
    updataUser: '/uaa/user/save',//编辑用户
    removeUser: '/uaa/user/remove',//删除用户
    batchRemoveUser: '/uaa/user/batchRemove',//批量删除用户
    adminResetPwd: '/uaa/user//updatePassword',//修改用户密码
    getByUserId: '/uaa/user/getInfo',//获取用户角色Id
    getCompany:'/uaa/company/list',//公司分页查询
    removeCompany:'/uaa/company/remove',//删除一个公司信息
    saveCompany:'/uaa/company/save',//保存、更新公司信息
    getCompanyInfo:'/uaa/company/getInfo',
    getWorkshopList: '/iiot/basic/workshop/getInfo', //车间列表

    /* 页面配置 */
    getConfigList: '/iiot/resource/listLogo',

}

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
    return await get(url, data, options);
}

/* 测试接口的数据 */
export async function postRequest(url, data, options) {
    return await post(url, data, options);
}
/* 测试接口的数据 */
export async function putRequest(url, data, options) {
    return await put(url, data, options);
}