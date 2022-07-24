/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-18 13:32:36
 */
import { observable, action } from 'mobx';
import * as services from '../services/datatable';
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash';

class Resourceeval {
	@observable isLoading = false;
	@observable searchOptions = {};
	@observable resourceevalList = [];
	@observable resourceevalPageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable resourceevalStatus = 'add';              // 记录计划弹窗状态
	@observable resourceevalModalVis = false;
	@observable resourceevalCurrentRe = {};              // 编辑当前的record
	@observable planSelectKeys = [];
	@observable schedData = [];                  // 排程数据的获取
	@observable modalLoading = false;
	@observable isPlantLoading = false;
	// @observable type = 0;                     // 设置对应页面展示的结果
	@observable ganttRecord = {};
	@observable btnLoading = false;
	@observable hooktest = 0;
	@observable itemCodeList = [];
	@observable selectedIdsList = [];             // 表格第一列的选择ID列表

	// type=['销售订单','制造订单','采购订单','库存'];
	// isReplenishmentResourceeval=['录入订单','补充订单'];
	// status=['未指定','不可分派','分派完毕','指示完毕','确定','开始生产','结束'];
	// isAllOperationsAssigned=['未分派','已经分派','分派虚拟资源','强制分派'];
	// assignmentDirection=['与[根据优先度]相同', '正向分派', '逆向分派','将订单按照优先度的分派方向分派'];
	// disabled=['否','是']

	/*  ===========生产任务 */
	@action.bound async getResourceevalList(params) {
		this.isLoading = true;
		this.resourceevalList = []
		try {
			let res = await services.gets('getResourceevalList')({
				...omit(this.resourceevalPageInfo, 'total'),
				...params
			});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.resourceevalList = res.data.data.items;
				this.resourceevalPageInfo = res.data.data.page;        // pageIndex: 1, pageSize: 10, total: 17823
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	@action async save(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveResourceeval')(params);
			if (isDataExist(res)) {
				this.queryList();
				return res
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async getEditPlan(params) {
		console.log("EDIT");
		// this.modalLoading = true;
		// try {
		// 	let res = await services.gets('editPlan')(params);
		// 	this.modalLoading = false;
		// 	if (isDataExist(res)) {
		// 		let data = res.data.data;
		// 		return data;
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	}

	@action async deleteResourceeval(params, type) {
		try {
			let req = type === 'batch' ? 'batchRemove' : 'removeResourceeval';
			let res = await services.posts(req)(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryResourceevalList();
	}

	queryResourceevalList = () => {
		this.getResourceevalList({
			...this.searchOptions
		});
	};

	queryList = () => {
		this.getResourceevalList({
			...this.searchOptions
		});
	};

	@action.bound showModal(visible) {
		this.resourceevalModalVis = visible;
	}
	
	@action clearModal() {
		this.resourceevalModalVis = false;
		this.resourceevalCurrentRe = {}
	}

	@action onImport() {

	}

	@action onExport() {
		
	}

	@action async getItemCodeList(params) {
		this.itemCodeList = []
		try {
			let res = await services.gets('getItemCodeList')(params);
			if (isDataExist(res)) {
				this.itemCodeList = res.data.data.items;
			}
		} 
		catch (error) {
			console.log(error);
		}
	}
}

let ResourceevalStore = new Resourceeval();
export default ResourceevalStore;
