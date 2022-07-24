/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-25 20:42:00
 */
import { observable, action } from 'mobx';
import * as services from '../services/datatable';
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash';

class Manufacturingbom {
	@observable isLoading = false;
	@observable searchOptions = {};
	@observable manufacturingbomList = [];
	@observable manufacturingbomPageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable manufacturingbomStatus = 'add';              //记录计划弹窗状态
	@observable manufacturingbomModalVis = false;
	@observable manufacturingbomCurrentRe = {};              // 编辑当前的record
	@observable planSelectKeys = [];
	@observable schedData = [];                              // 排程数据的获取
	@observable modalLoading = false;
	@observable isPlantLoading = false;
	@observable type = 0;                                    //设置对应页面展示的结果
	@observable ganttRecord = {};
	@observable btnLoading = false;
	@observable hooktest = 0;
	@observable currentInstructionType = 0;                   // 0,1,2,3  
	@observable selectedIdsList = [];                        // 表格第一列的选择ID列表    

	instructionType=['未指定','输入指令','使用指令','输出指令']
	timeConstraintMethodSelected=['NULL', 'ES', 'SS', 'SSEE', 'ESE', 'EES', 'SSEEE', 'ESSEE', 'GES']
	timeConstraintMethodView=['', 'ES', 'SS', 'SSEE', 'ESE', 'EES', 'SSEEE', 'ESSEE', 'GES']

	/*  ===========生产任务 */
	@action.bound async getManufacturingbomList(params) {
		this.isLoading = true;
		this.manufacturingbomList = []
		try {
			let res = await services.gets('getManufacturingbomList')({
				...omit(this.manufacturingbomPageInfo, 'total'),
				...params
			});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.manufacturingbomList = res.data.data.items;
				this.manufacturingbomPageInfo = res.data.data.page;        // pageIndex: 1, pageSize: 10, total: 17823
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	@action async save(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveManufacturingbom')(params);
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

	@action async deleteManufacturingbom(params, type) {
		try {
			let req = type === 'batch' ? 'batchRemove' : 'removeManufacturingbom';
			let res = await services.posts(req)(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryManufacturingbomList();
	}

	@action async downloadManufacturingbom(params, type) {
		try {
			//let req = type === 'batch' ? 'batchRemove' : 'removeManufacturingbom';
			let req='downloadManufacturingbom';
			let res = await services.posts(req)(params);
			console.log(res);
			if (isDataExist(res)) {
				message.success('下载成功');
			}
		} catch (error) {
			console.log(error);
		}
		//this.queryManufacturingbomList();
	}

	queryManufacturingbomList = () => {
		this.getManufacturingbomList({
			...this.searchOptions
		});
	};

	queryList = () => {
		this.getManufacturingbomList({
			...this.searchOptions
		});
	};

	@action.bound showModal(visible) {
		this.manufacturingbomModalVis = visible;
	}
	
	@action clearModal() {
		this.manufacturingbomModalVis = false;
		this.manufacturingbomCurrentRe = {}
	}

	@action onImport() {

	}

	@action onExport() {
		
	}

	@action onClickFunction(index) {
		this.hooktest=1000
	}
}

let  ManufacturingbomStore = new Manufacturingbom();
export default ManufacturingbomStore;
