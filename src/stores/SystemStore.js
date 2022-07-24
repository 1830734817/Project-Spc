import { observable, action, toJS } from 'mobx';
import { isDataExist } from 'Utils/dataTools';
import * as services from '../services/system';

// /* 页面配置的图片链接引入 */
// import mainlogo from 'assets/logo-yunqizhizao1.png';
// import bllogo from 'assets/logo-public.png';
// import logoTitle from 'assets/logo-title2.png';
// import loginbkg from 'assets/iiot_background.png';
// import menulogo from 'assets/logo-yunqizhizao2.png';
// import menubkg from 'assets/left_menu.png';

// /* 主题图片设置 */
// import purpleTheme from 'assets/purpleTheme.jpg';
// import blueTheme from 'assets/blueTheme.jpg';
// import greenTheme from 'assets/greenTheme.jpg';

class Order {
	@observable isLoading = false;
	@observable templist = [];
	@observable tableData = []; //表格数据
	@observable roleList = []; //角色列表
	@observable arr = [];
	@observable DepList = []; //部门列表
	@observable tagList = []; //筛选数据
	@observable roleIds = []; //角色id
	@observable selectedRows = []; //选中表格
	@observable userPageInfo = { pageIndex: 1, pageSize: 10 }; //用户分页信息
	@observable PageInfo = { pageIndex: 1, pageSize: 10 }; //分页信息
	@observable formData = {}; //表单数据
	@observable treeData = {}; //菜单树数据
	@observable modalVisible = false; //模态框显隐
	@observable roleName = '';
	@observable name = '';
	@observable deptId = '';
	@observable name = '';
	@observable innerModalVisible = false;
	@observable tempMenuList = []; //暂时菜单树
	@observable companyData = []; //公司信息
	@observable FactoryList = []; //工厂列表
	@observable tab = ''; //系统管理tab分页 1pc 2ipc 3小程序; 用户管理不同弹窗 1编辑 2重置密码 3详情
	@observable workshopList = [] //车间列表
	@observable parentId = '' //系统菜单根节点
	@observable userHistory = [] //历史记录
	@observable userId = '' //用户id查询历史记录

	//获取表格数据
	@action.bound async getData(type, params) {
		this.isLoading = true;
		//1部门管理，2角色管理，3用户管理
		const url =
			type === 1
				? services.requestUrl.departmentList
				: type === 2
				? services.requestUrl.roleList
				: services.requestUrl.userList;
		try {
			let res = await services.getRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.tableData = res.data.data.items;
				if (type == 3)
					this.userPageInfo = { ...this.userPageInfo, ...res.data.data.page };
				else {
					this.PageInfo = res.data.data.page;
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	//获取公司数据
	@action.bound async getCompanyData(params) {
		this.isLoading = true;
		const url = services.requestUrl.getCompany;
		try {
			let res = await services.getRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.companyData = res.data.data.items;
				this.PageInfo = { ...this.PageInfo, ...res.data.data.page };
			}
		} catch (error) {
			console.log(error);
		}
	}
	//获取公司数据 详情
	@action.bound async getCompanyInfo(params) {
		this.isLoading = true;
		const url = services.requestUrl.getCompanyInfo;
		try {
			let res = await services.getRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.formData = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//获取菜单树数据
	@action.bound async getTreeData(params) {
		this.isLoading = true;
		//0 PC，1 小程序
		try {
			let res = await services.getRequest(services.requestUrl.treeMenu, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				for (const item of res.data.data.childMenu) {
					if (item.name === '系统管理') {
						let child = [];
						for (const lv3 of item.childMenu) {
							if (!['系统菜单', '租户管理'].includes(lv3.name)) {
								child.push(lv3);
							}
						}
						item.childMenu = child;
					}
				}
				this.treeData[params.clientType] = res.data.data.childMenu;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//获取菜单树数据
	@action.bound async getRoleIds(params) {
		// this.isLoading = true
		try {
			let res = await services.getRequest(
				services.requestUrl.getByUserId,
				params
			);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.roleIds = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	//保存更新部门信息
	@action.bound async addNew(type, params) {
		this.isLoading = true;
		const url = type
			? services.requestUrl.saveDepartment
			: services.requestUrl.updataDepartment;
		try {
			let res = await services.putRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//保存更新公司信息
	@action.bound async addCompany(params) {
		this.isLoading = true;
		const url = services.requestUrl.saveCompany;
		try {
			let res = await services.putRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	//保存更新角色信息
	@action.bound async addNewRole(type, params) {
		this.isLoading = true;
		const url = type
			? services.requestUrl.saveRole
			: services.requestUrl.updateRole;
		try {
			let res = await services.putRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//保存系统菜单
	@action.bound async addNewMenu(type, params) {
		this.isLoading = true;
		const url = type
			? services.requestUrl.saveMenu
			: services.requestUrl.updateMenu;
		try {
			let res = await services.putRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//保存系统菜单
	@action.bound async addNewUser(type, params) {
		this.isLoading = true;
		const url = type
			? services.requestUrl.saveUser
			: services.requestUrl.updataUser;
		try {
			let res = await services.putRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//保存系统菜单
	@action.bound async resetPassword(params) {
		this.isLoading = true;
		try {
			let res = await services.putRequest(
				services.requestUrl.adminResetPwd,
				params
			);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//部门删除
	@action.bound async deleteCol(params) {
		this.isLoading = true;
		try {
			let res = await services.postRequest(
				services.requestUrl.removeDepartment,
				params
			);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//公司删除
	@action.bound async deleteCompany(params) {
		this.isLoading = true;
		try {
			let res = await services.postRequest(
				services.requestUrl.removeCompany,
				params
			);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//角色删除
	@action.bound async deleteRole(type, params) {
		this.isLoading = true;
		const url = type
			? services.requestUrl.removeRole
			: services.requestUrl.batchRemoveRole;
		try {
			let res =
				url === services.requestUrl.removeRole
					? await services.postRequest(url, params)
					: await services.putRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//菜单删除
	@action.bound async deleteMenu(params) {
		this.isLoading = true;
		try {
			let res = await services.postRequest(
				services.requestUrl.removeMenu,
				params
			);
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//菜单删除
	@action.bound async deleteUser(type, params) {
		this.isLoading = true;
		const url = type
			? services.requestUrl.removeUser
			: services.requestUrl.batchRemoveUser;
		try {
			let res =
				url === services.requestUrl.removeUser
					? await services.postRequest(url, params)
					: await services.putRequest(url, params);
			// let res = await services.putRequest(url, params)
			this.isLoading = false;
			if (isDataExist(res)) {
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//获取角色当前菜单权限
	@action.bound async getMenuIdsByRole(params) {
		this.isLoading = true;
		try {
			let res = await services.getRequest(
				services.requestUrl.getMenuIdsByRole,
				params
			);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.formData.menuMap = res.data.data.menuMap
			}
		} catch (error) {
			console.log(error);
		}
	}
	//打开/关闭模态框
	@action modalChange = (type, record) => {
		if (type) {
			if (record) {
				this.formData = record;
			}
		} else {
			this.formData = { delFlag: 1 };
		}
		this.modalVisible = !this.modalVisible;
	};
	//获取角色列表
	@action.bound async getRoleList(params) {
		this.isLoading = true;
		try {
			let res = await services.getRequest(services.requestUrl.roleList, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.roleList = [];
				res.data.data.items.map(item => {
					this.roleList.push({ label: item.roleName, value: item.id });
				});
			}
			// console.log('this.roleList:',this.roleList)
		} catch (error) {
			console.log(error);
		}
	}
	//获取部门列表
	@action.bound async getDepList(params) {
		this.isLoading = true;
		try {
			let res = await services.getRequest(
				services.requestUrl.departmentList,
				params
			);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.DepList = res.data.data.items;
			}
		} catch (error) {
			console.log(error);
		}
    }
    //获取公司列表
    @action.bound async getCompanyList(params) {
		this.isLoading = true;
		const url = services.requestUrl.getCompany;
		try {
			let res = await services.getRequest(url, params);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.companyData = res.data.data.items;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//FactoryList 获取工厂列表
	@action.bound async getFactoryList() {
		this.isLoading = true;
		try {
			let res = await services.getRequest(services.requestUrl.factoryList);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.FactoryList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
    // 车间列表
	@action.bound async getWorkshopList() {
		this.isLoading = true;
		try {
			let res = await services.getRequest(services.requestUrl.getWorkshopList);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.workshopList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//获取菜单列表
	@action.bound async getMenuData(params) {
		this.tempMenuList = [];
		this.isLoading = true;
		try {
			let res = await services.getRequest(services.requestUrl.menuList, params);

			let firmenu = await services.getRequest(services.requestUrl.firstmenu, {
				pageIndex: 1,
				pageSize: 100,
				...params
			});
			this.arr = firmenu.data.data.items;
			this.isLoading = false;
			if (isDataExist(res)) {
				res.data.data.childMenu.map(item => {
					this.tempMenuList.push({
						id: item.id,
						authorityId: item.authorityId,
						createTime: item.createTime,
						expression: item.expression,
						icon: item.icon,
						isDelete: item.isDelete,
						modifyTime: item.modifyTime,
						name: item.name,
						orderNum: item.orderNum,
						parentId: item.parentId,
						tenantId: item.tenantId,
						type: item.type,
						url: item.url,
						clientType: item.clientType,
						children: item.childMenu
					});
				});
				this.parentId = res.data.data.id
				this.tableData = this.tempMenuList;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//数据类型转换(平级数据装换成树结构)
	@action.bound transTreeData = items => {
		if (items.length > 0) {
			let curPid = 0; //pid=0，为最上层节点 ，即无父节点
			let parent = this.findChild(curPid); //数组
			return parent;
		} else {
			return [];
		}
	};
	//找子节点
	@action.bound findChild = curPid => {
		let _arr = [];
		let items = this.arr;
		let length = items.length;
		for (let i = 0; i < length; i++) {
			if (items[i].parentId == curPid) {
				let _obj = items[i];
				_obj.children = this.findChild(_obj.menuId);
				_arr.push(_obj);
			}
		}
		return _arr;
	};

	@action clearData() {
		this.isLoading = false;
		this.tableData = []; //表格数据
		this.roleList = []; //角色列表
		this.arr = [];
		this.DepList = []; //部门列表
		this.tagList = []; //筛选数据
		this.roleIds = []; //角色id
		this.selectedRows = []; //选中表格
		this.PageInfo = { pageIndex: 1, pageSize: 10 }; //分页信息
		this.formData = {}; //表单数据
		this.treeData = {}; //菜单树数据
		this.modalVisible = false; //模态框显隐
		this.roleName = '';
		this.name = '';
		this.deptId = '';
		this.name = '';
		this.innerModalVisible = false;
		this.tempMenuList = []; //暂时菜单树
		this.companyData = []; //公司信息
		this.FactoryList = []; //车间列表
		this.tab = ''; //系统管理tab 用户管理不同弹窗
		this.userHistory = []
	}

	/* ===========页面配置 */
	@observable prefix =
	`${window.location.host === 'https://mes.cyc.cn'?'http://file.mes.cyc.cn/iiot/':'http://file.mes.cyc.cn/'}${sessionStorage.getItem('tenantId')}/1001/`;

	@observable urlList = [
		{
			id: 1004,
			type: '菜单栏公司logo',
			//key: 'menulogo',
			default: true,
			url: this.prefix + '1004.png',
			// url:menulogo,
			// defaultUrl: menulogo
		},
		{
			id: 1005,
			type: '菜单栏背景图片',
			//key: 'menubkg',
			default: true,
			url: this.prefix + '1005.png',
			// defaultUrl: menubkg
		}
	];
	@observable uploadLoading = {
		1001: false,
		1002: false,
		1003: false,
		1006: false,
		1004: false,
		1005: false
	};
	// @observable mainlogo = mainlogo;
	// @observable bllogo = bllogo;
	// @observable menulogo = menulogo;
	// @observable menubkg = menubkg;
	// @observable logoTitle = logoTitle;
	// @observable loginbkg = loginbkg;
	// @observable themeList = [
	// 	{
	// 		id:1,type:'云栖紫',url:purpleTheme,color:'#6236FF',
	// 	},{
	// 		id:2,type:'云栖绿',url:greenTheme,color:'#1DA57A',
	// 	},{
	// 		id:3,type:'云栖蓝',url:blueTheme,color:'#1890FF',
	// 	}
	// ]

	@action async getConfigList(params, type) {
		try {
			let res = await services.getRequest(
				services.requestUrl.getConfigList,
				params
			);
			if (isDataExist(res)) {
				for (let item of res.data.data) {
					for (let img of this.urlList) {
						if (item) {
							if (item.relationType === img.id) {
								Object.assign(img, {
									default: false,
									url:
									`${window.location.host === 'https://mes.cyc.cn/'?'http://file.mes.cyc.cn/':'http://file.mes.cyc.cn/'}${item.resourceUrl.split('files/')[1]}`
								});
							}
						}
						console.log(img)
					}
				}
				for (let item of this.urlList) {
					for (let id of type) {
						if (id === item.id && !item.default) {
							switch (id) {
								case 1001:
									// this.mainlogo = item.url;
									break;
								case 1002:
									this.logoTitle = item.url;
									break;
								case 1003:
									this.bllogo = item.url;
									break;
								case 1004:
									// this.menulogo = item.url;
									break;
								case 1005:
									// this.menubkg = item.url;
									break;
								default:
									this.loginbkg = item.url;
									break;
							}
						}
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
	@action clearConfigData() {
		this.urlList = [
			{
				id: 1004,
				type: '菜单栏公司logo',
				// key: 'menulogo',
				default: true,
				url: this.prefix + '1004.png',
				//defaultUrl: menulogo
			},
			{
				id: 1005,
				type: '菜单栏背景图片',
				// key: 'menubkg',
				default: true,
				url: this.prefix + '1005.png',
				//defaultUrl: menubkg
			}
		];
	}
}
let OrderDefineStore = new Order();
export default OrderDefineStore;
