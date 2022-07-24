/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-16 00:00:03
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-24 10:44:58
 */

import { observable, action, toJS, } from 'mobx';
import { isDataExist } from 'Utils/dataTools';
import * as services from 'services/home';
import { isEmpty,uniqBy,omit } from 'lodash';
import { checkCurrentMenu,checkCurrentSideMenu } from 'utils/dataTools';
import { MenuObj, } from 'constants/configs';
import { message } from 'antd';
class Home {
  /* 其他变量 */
  @observable contentScrollHeight = 0;                 //当前content滚动高度
  @observable collapsed = false;
  @observable menuObj = [];
  @observable openKeys = ['1'];                       // 默认打开的父菜单
  @observable selectedKeys = ['101'];                 // 默认打开的子菜单
  @observable crumbsList = [];                        // 全局crumbs需求
  @observable size_class = '';
  @observable isClickCollapsed = false;
  @observable isRecommend = true;                     // 是否需要推荐菜单
  @observable customMenu = [];                        // 首页自定义菜单
  @observable isLoading = false;
  @observable toggledActionId = 0;
  @observable isThemeLoading = false;                  // 设置切换主题的loading 
  @observable isSwitchTheme = {};
  @observable emptyDesc = '正在加载中';
  @observable sideMenuObj = [];
  @observable currentPath = '';                       //当前路径
  @observable currentUuid = '';                       //当前表格uuid
  @observable createVis = false;                      //新建表格/分组弹窗是否可见
  @observable isClass = false;                        //是否为新建分组
  @observable prevSubKeys = [];                       //上一个展开submenu的keys数组
  @observable selectedItemKey = '';                   //点击的侧边菜单item
  @observable openedSubKey = '';                      //打开的侧边菜单sub
  @observable isRoot = false;                         //是否为根菜单

  /* 设置登陆信息 */
  @action async setLogin(params,finished){
    this.isLoading = true;
    let result = {success:false,token:null};
    try {
      sessionStorage.setItem('token','Basic cGM6c2VjcmV0')
      let res = await services.postsForm('setLogin')({
        ...params,
      })
      this.isLoading = false;
      if(isDataExist(res)){
        let data = res.data.data
        if(data.access_token && data.token_type){
          let token = `${data.token_type}${data.access_token}`
          result.success = true
          result.token = token
          result.accessToken = data.access_token
          result.refreshToken = data.refresh_token
          result.tenantId = res.data.dataExt.tenantId
        }
      }
    } catch (error) {
      console.log(error)
    }
    if(finished)
      finished(result);
  }

  // 退出登录
  @action async setLogout(params){
    this.isLoading = true;
    try {
      let res = await services.posts('setLogout')({
        ...params,
      })
      this.isLoading = false;
      if(isDataExist(res)){
        let data = res.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 
   * 获得经过权限筛选的静态菜单：获取后台动态菜单权限，更新静态菜单配置
   * 
   * @param {*} params 
   */
  @action async getMenuList(params){
    this.isLoading = true;
    let menuObj = MenuObj.leafMenuModels;                             // 获取静态菜单配置

    try {
      // (1) 获取后端的动态菜单结构
      let res = await services.gets('getMenuList')({ id:0 });         // getMenuList:'/uaa/menu/treeOnLogin',
      this.isLoading = false;

      // (2) 根据动态菜单 -> 静态菜单配置
      if(isDataExist(res)){
        if(res.data.data){
          let data = res.data.data.childMenu;                         // 获取动态菜单根目录

          //（2.1）初始化: 静态菜单都不显示
          menuObj.map(lv=>{
            // （2.1.1）一级菜单不显示
            Object.assign(lv,{
              displayNone:true
            });

            // （2.1.2）一级菜单不显示，二级菜单均不显示
            if(lv.leafMenuModels){
              lv.leafMenuModels.map(lv2=>{
                Object.assign(lv2,{
                  displayNone:true
                });
              })
            }
          })
  
          //（2.2）根据动态菜单设置 -> 静态一级菜单 */
          menuObj.map(staticItem=>{ 
            data.map(dynamicItem=>{
              if(staticItem.name === dynamicItem.name){                             // 通过菜单名称判断：动态菜单和静态菜单的一致性
                if(dynamicItem.childMenu){
                  staticItem.children = dynamicItem.childMenu;
                }
                Object.assign(staticItem,{
                  treeId:dynamicItem.id,
                  displayNone:false
                });
              }
            })
          })

          //（2.3）根据动态菜单设置 -> 静态二级菜单 */
          menuObj.map(staticFirstLevelItem=>{
            if(!staticFirstLevelItem.displayNone){                                     // 一级菜单显示：处理二级菜单
              if(staticFirstLevelItem.leafMenuModels){                                 // 一级菜单下存在二级菜单
                // 遍历二级菜单
                staticFirstLevelItem.leafMenuModels.map(staticSecondLevelItem=>{       
                  if(!isEmpty(staticFirstLevelItem.children)){
                    staticFirstLevelItem.children.filter(item=>item.parentId === staticFirstLevelItem.treeId)     
                                                 .filter(item=>item.name === staticSecondLevelItem.name)          
                                                 .map(() => {
                                                    Object.assign(staticSecondLevelItem,{
                                                      displayNone:false
                                                    })
                                                })
                  }
                })
              }
            }
          })
        }
        else{
          menuObj  = []
          this.emptyDesc = '很抱歉，您暂无系统任何权限，请联系管理员添加'
        }

        // （2.4）静态菜单：已经经过动态筛选
        this.menuObj = menuObj;
      }
    } 
    catch (error) {
      console.log('获取menu:',error);
    }
  }


/* 获取后台动态菜单 */
@action async getSideMenuList(){
  this.isLoading = true;
  let data;

  try {
    // 获取后端的动态菜单结构
    let res = await services.gets('getSideMenuList')({ id:0 });         // getSideMenuList: '/uaa/sideMenu/list',
    this.isLoading = false;

    if(isDataExist(res)){
      if(res.data.data){
        data = res.data.data.childMenu;                         // 获取动态菜单根目录
      }
      else{
        this.emptyDesc = '很抱歉，您暂无系统任何权限，请联系管理员添加'
      }

      this.sideMenuObj = data;
    }
  } 
  catch (error) {
    console.log('获取sideMenu:',error);
  }
}

 
  /**
   * 获取默认路径 pathname 的面包屑 crumbsList
   * （1）crumbsList
   * （2）selectedKeys
   * （3）openKeys
   * 
   * @param {*} pathname “默认”打开的菜单-作为首页
   * 
   */
  @action initMenu(pathname){
    if(pathname === '/order')
      pathname = '/order/query';

    try {
      let menuObj = toJS(this.menuObj);
      let currentMenu = [];
      let crumbsList = [];

      // （1）获得 pathname 的一级菜单 currentMenu：pathname --> currentMenu
      // 检索一级菜单全部: pathname = 'plan/task'
      currentMenu = menuObj.filter(leaf => leaf.path === pathname);

      // 检索一级菜单部分: lv = 'plan'
      // 获得 pathname = 'plan/task' 对应一级菜单 'plan'
      if(isEmpty(currentMenu)){
        currentMenu = menuObj.filter(lv => pathname.indexOf(lv.path) > -1)
      }

      // (2) 获得一级菜单 currentMenu 后续全部菜单：currentMenu --> crumbsList & selectedKeys & openKeys
      if(!isEmpty(currentMenu)){
        // lv: 'plan' 对应的一级菜单-计划管理
        for(let lv of currentMenu){
          // 面包屑一级: 计划管理
          crumbsList.push({
            id:lv.id,                  // 1
            name:lv.name,              // 计划管理
            path:lv.path               // 'plan'
          });
          
          // 菜单一级
          if(lv.path === pathname){
            this.selectedKeys = [`${lv.id}`];
            this.openKeys = [`${lv.parentId}`];
          }
          else {
            // 菜单二级
            lv.leafMenuModels.map(lv2 =>{
              if(lv2.path === pathname){                // 'plan/task' === 'plan/task'
                this.selectedKeys = [`${lv2.id}`];
                this.openKeys = [`${lv2.parentId}`];
                // 面包屑二级: 生产任务
                crumbsList.push({
                  id:lv2.id,
                  name:lv2.name,
                  path:lv2.path
                });
              }
              else{
                if(lv2.activeRouter){
                  if(lv2.activeRouter.indexOf(pathname) > -1){
                    this.selectedKeys = [`${lv2.id}`];
                    this.openKeys = [`${lv2.parentId}`];
                  }
                }
                else{
                  // 菜单三级
                  if(!isEmpty(lv2.leafMenuModels)){
                    lv2.leafMenuModels.map(lv3 =>{
                      if(lv3.path === pathname){
                        this.selectedKeys = [`${lv3.id}`];
                        this.openKeys = [`${lv2.parentId}`];
                      }
                    })
                  }
                }
              }

            })
          }
        }
      }

      // 
      let history = sessionStorage.getItem('menu') || [];
      if(!isEmpty(history)){
        history = JSON.parse(history);
        history = uniqBy(history,'id');
      }
      sessionStorage.setItem('menu',JSON.stringify(history));

      // 
      this.crumbsList = crumbsList;
    } 
    catch (error) {
      console.log(error);
    }
  }

  @action toggleMenu({actionItem,actionId},finished){
    try {
      let menuObj = toJS(this.menuObj); // 根菜单节点
      actionId = parseInt(actionId);
      /* 查询当前菜单item */
      let current = checkCurrentMenu({menuObj,actionId}); 
      let currentMenu = current.currentMenu,crumbsList = current.crumbsList;
      finished(currentMenu[0].path);
      this.crumbsList = crumbsList;
      /* 记录历史-浏览记录 */
      this.setLastMenuHistory(currentMenu[0],actionId); 
      this.toggledActionId = currentMenu[0].id;
      this.selectedKeys = [`${currentMenu[0].id}`];
      this.openKeys = [`${currentMenu[0].parentId || currentMenu[0].rootId}`];
    } catch (error) {
      console.log(error);
      
    }
  }

  /* 切换侧边菜单 */
  @action  toggleSideMenu({actionItem,actionId},finished){
    try {
      let sideMenuObj = toJS(this.sideMenuObj); // 根菜单节点
      actionId = parseInt(actionId);
      /* 查询当前菜单item */
      let current = checkCurrentSideMenu(sideMenuObj,actionId);
      let currentSideMenu = current.currentSideMenu;
      finished('/spcData/'+currentSideMenu[0].uuid,currentSideMenu[0].uuid);
    } catch (error) {
      console.log(error);
    }
  }

  /* 设置当前路径 */
  @action setCurrentPath(path){
    this.currentPath = path;
  }

  /* 设置当前uuid */
  @action setCurrentUuid(uuid){
    this.currentUuid = uuid;
  }

  setLastMenuHistory = (actionItem,actionId)=>{
    let history = sessionStorage.getItem('menu') || [];
    let index = -1;
    if(!isEmpty(history)) history = JSON.parse(history);
    for(let i = 0;i < history.length;i++){
      if(history[i].id === actionId){
        index = i;
      }
    }
    if(index > -1 ){
      history.splice(index,1);
    }
    history.push(actionItem);
    if(history.length >= 4){
      history.splice(0,1);
    }
    history = uniqBy(history,'id');
    sessionStorage.setItem('menu',JSON.stringify(history));
  }

  @action.bound async savePassword(params){
    try {
      let res = await services.posts('savePassword')(params)
      if(isDataExist(res)){
        message.success('更新成功')
      }
    } catch (error) {
      console.log(error)
    }
  }

  @action.bound async saveBasicInfo(params){
    try {
      let res = await services.posts('saveBasicInfo')(params)
      if(isDataExist(res)){
        message.success('更新成功')
      }
    } catch (error) {
      console.log(error)
    }
  }

  @action.bound addCrumbs(obj){
    this.crumbsList.push(obj);
  }

  /**
   *
   * @param {'size_class'} key 
   * @param {'m_size'} value 
   * 
   * this.size_class = 'm_size'
   */
  @action changeValue(key, value) {
    this[key] = value;
  }

  /*  生产分析 */
	@observable AnalysisData = []
	@action async getAllStaticCount(){
		try {
			let resArray = [
				{ req:'getMonthPlanCount',data:{}, type:'planVars' },
				{ req:'getMonthWorkCount',data:{},type:'workVars' },
				{ req:'getDayWorkCont',data:{},type:'execVars' },
				{ req:'getDaySuccessCount',data:{},type:'factVars' },
			];
			for(let req of resArray){
				let params = req.params || {}
				let res = await services.gets(req.req)(params)
				if(isDataExist(res)){
					let data = res.data.data;
					if(req.type === 'workExecute'){
						let list = [{name:'successCount'},{name:'failCount'}]
						for(let item of data){
							list[0][item.reportTime] = item.successCount
							list[1][item.reportTime] = item.failCount
						}
						Object.assign(req,{
							data:list
						})
					}else if(req.type === 'productStatic'){
						let list = []
						for(let item of data){
							list.push({
								year:item.reportTime,
								value:item.successCount
							})
						}
						Object.assign(req,{
							data:list
						})
					}else{
						Object.assign(req,{
							data
						})
					}

				}
			}
			
			this.AnalysisData = resArray
			
		} catch (error) {
			
		}
  }
  
  /* 添加申请免登接口 */
  @action async setAutoAuth(params){
    try {
      sessionStorage.setItem('token','Basic YWxpLWlvdDpzZWNyZXQ='); 
      let res = await services.postsForm('setAutoAuth')(params)
      if(isDataExist(res)){
        return true 
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  /* 是否展示对话框 */
	@action.bound setCreateVis(visible) {
		this.createVis = visible;
	}
  
  /* 新建表格 */
	@action async createTable(params) {
		try {
			let res = await services.posts('saveCreateTable')({
        ...params,
        key:this.openedSubKey
      });
			if (isDataExist(res)) { //后端应更新完数据库后再返回
        //刷新左侧菜单
				this.querySideMenu();
				return res
			}
		} catch (error) {
			console.log(error);
		}
	}

  /* 新建分组 */
	@action async createClass(params) {
		try {
			let res = await services.posts('saveCreateClass')({
        ...params,
        key:this.openedSubKey
      });
			if (isDataExist(res)) { //后端应更新完数据库后再返回
        //刷新左侧菜单
				this.querySideMenu();
				return res
			}
		} catch (error) {
			console.log(error);
		}
	}

  /* 请求sidemenu数据 */
  querySideMenu = () => {
    this.getSideMenuList();
  };

	@action.bound setIsClass(params) {
		this.isClass = params;
	}

  @action.bound setPrevSubKeys(params){
    this.prevSubKeys = params;
  }

  @action.bound setSelectedItemKey(params){
    this.selectedItemKey = params; 
  }

  @action.bound setOpenedSubKey(params){
    this.openedSubKey = params;
  }

  @action.bound setIsRoot(params){
    this.isRoot = params;
  }
  
}
let HomeStore = new Home();
export default HomeStore;