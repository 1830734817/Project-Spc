/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-12-20 21:11:07
 */
import { observable, action } from 'mobx';
import * as services from '../services/datatable';
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash';

class Work {
	@observable isLoading = false;
	@observable searchOptions = {};
	@observable WorkList = [];
	@observable WorkPageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable WorkStatus = 'add';              // 记录计划弹窗状态
	@observable WorkModalVis = false;
	@observable WorkCurrentRe = {};              // 编辑当前的record
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

	@observable status=['未指定','不可分派','分派完毕','指示完毕','确定','开始生产','结束'];
	@observable timeFixedFlag=['否','是'];

	/*  ===========生产任务 */
	@action.bound async getWorkList(params) {
		this.isLoading = true;
		this.WorkList = []
		try {
			let res = await services.gets('getWorkList')({
				...omit(this.WorkPageInfo, 'total'),
				...params
			});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.WorkList = res.data.data.items;
				this.WorkPageInfo = res.data.data.page;        // pageIndex: 1, pageSize: 10, total: 17823
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	@action async save(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveWork')(params);
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

	@action async deleteWork(params, type) {
		try {
			let req = type === 'batch' ? 'batchRemove' : 'removeWork';
			let res = await services.posts(req)(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryWorkList();
	}

	queryWorkList = () => {
		this.getWorkList({
			...this.searchOptions
		});
	};

	queryList = () => {
		this.getWorkList({
			...this.searchOptions
		});
	};

	@action.bound showModal(visible) {
		this.WorkModalVis = visible;
	}
	
	@action clearModal() {
		this.WorkModalVis = false;
		this.WorkCurrentRe = {}
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

let  WorkStore = new Work();
export default WorkStore;
