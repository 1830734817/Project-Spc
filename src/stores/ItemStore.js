/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-14 21:55:03
 */
import { observable, action } from 'mobx';
import * as services from '../services/datatable';
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash';

class Item {
	@observable isLoading = false;
	@observable searchOptions = {};
	@observable ItemList = [];
	@observable ItemPageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable ItemStatus = 'add';              // 记录计划弹窗状态
	@observable ItemModalVis = false;
	@observable ItemCurrentRe = {};              // 编辑当前的record
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

	autoGenerateFlag=['否','是','是（1对1制造）','是（库存+1对1制造）', '是（供需调整1对1制造）'];
	obtainMethod=['不可','内制','采购','内制优先','采购优先'];

	/*  ===========生产任务 */
	@action.bound async getItemList(params) {
		this.isLoading = true;
		this.ItemList = []
		try {
			let res = await services.gets('getItemList')({
				...omit(this.ItemPageInfo, 'total'),
				...params
			});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.ItemList = res.data.data.items;
				this.ItemPageInfo = res.data.data.page;        // pageIndex: 1, pageSize: 10, total: 17823
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	@action async save(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveItem')(params);
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

	@action async deleteItem(params, type) {
		try {
			let req = type === 'batch' ? 'batchRemove' : 'removeItem';
			let res = await services.posts(req)(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryItemList();
	}

	queryItemList = () => {
		this.getItemList({
			...this.searchOptions
		});
	};

	queryList = () => {
		this.getItemList({
			...this.searchOptions
		});
	};

	@action.bound showModal(visible) {
		this.ItemModalVis = visible;
	}
	
	@action clearModal() {
		this.ItemModalVis = false;
		this.ItemCurrentRe = {}
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

let  ItemStore = new Item();
export default ItemStore;
