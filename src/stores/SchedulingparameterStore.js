/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-18 16:25:05
 */
import { observable, action } from 'mobx';
import * as services from '../services/schedule';
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash';

class Schedulingparameter {
	@observable isLoading = false;
	@observable searchOptions = {};
	@observable schedulingparameterList = [];
	@observable schedulingparameterPageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable schedulingparameterStatus = 'add';              // 记录计划弹窗状态
	@observable schedulingparameterModalVis = false;
	@observable schedulingparameterCurrentRe = {};              // 编辑当前的record
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
	// isReplenishmentSchedulingparameter=['录入订单','补充订单'];
	// status=['未指定','不可分派','分派完毕','指示完毕','确定','开始生产','结束'];
	// isAllOperationsAssigned=['未分派','已经分派','分派虚拟资源','强制分派'];
	// assignmentDirection=['与[根据优先度]相同', '正向分派', '逆向分派','将订单按照优先度的分派方向分派'];
	// disabled=['否','是']

	/*  ===========生产任务 */
	@action.bound async getSchedulingparameterList(params) {
		this.isLoading = true;
		this.schedulingparameterList = []
		try {
			let res = await services.gets('getSchedulingparameterList')({
				...omit(this.schedulingparameterPageInfo, 'total'),
				...params
			});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.schedulingparameterList = res.data.data.items;
				this.schedulingparameterPageInfo = res.data.data.page;        // pageIndex: 1, pageSize: 10, total: 17823
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	@action async save(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveSchedulingparameter')(params);
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

	@action async deleteSchedulingparameter(params, type) {
		try {
			let req = type === 'batch' ? 'batchRemove' : 'removeSchedulingparameter';
			let res = await services.posts(req)(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.querySchedulingparameterList();
	}

	querySchedulingparameterList = () => {
		this.getSchedulingparameterList({
			...this.searchOptions
		});
	};

	queryList = () => {
		this.getSchedulingparameterList({
			...this.searchOptions
		});
	};

	@action.bound showModal(visible) {
		this.schedulingparameterModalVis = visible;
	}
	
	@action clearModal() {
		this.schedulingparameterModalVis = false;
		this.schedulingparameterCurrentRe = {}
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

let SchedulingparameterStore = new Schedulingparameter();
export default SchedulingparameterStore;
