/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 20:31:11
 */

import { observable, action,toJS } from 'mobx';
import { message } from 'antd';
import * as services from '../services/maintenance';
import { isDataExist } from 'utils/dataTools';
import { omit } from 'lodash';

class Maintenance{

	@observable contentSearchOptions = {};
	@observable planSearchOptions = {};
	@observable dataSearchOptions = {};
    @observable maintenanceList = [];//保养数据表的数据源
    @observable maintenancePageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable isModalEdit = false; //保养数据的对话框是否为编辑状态
	@observable modalEditData = {};
	@observable maintenanceContentList = [];//保养内容表的数据源
	@observable contentCheckedRow = []; //选中设备的所有记录
	@observable maintenancePlanList = [];//保养计划表的数据源
	@observable planCheckedRow = {};
	@observable gangedInputVis = false; //保养内容中的联动输入框是否可见
	@observable dataPageModalVis = false; //弹窗是否可见
	@observable calendarPageModalVis = false; 
	@observable contentPageModalVis = false; 
	@observable planPageModalVis = false; 
	@observable selectedIdsList = [];   // 保养数据表格第一列的选择ID列表  



	//获取保养数据
    @action.bound async getMaintenanceList(params) {
		this.maintenanceList = []
		try {
			let res = await services.gets('getMaintenanceDataList')({
				...omit(this.maintenancePageInfo, 'total'),
				...params
			});
			if (isDataExist(res)) {
				this.maintenanceList = res.data.data.items;
				this.maintenancePageInfo = res.data.data.page;        
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	//获取保养内容
	@action.bound async getMaintenanceContentList(params) {
		this.maintenanceContentList = []
		try {
			let res = await services.gets('getMaintenanceContentList')({
				...omit(this.maintenancePageInfo, 'total'),
				...params
			});
			if (isDataExist(res)) {
				this.maintenanceContentList = res.data.data.items;
				this.maintenancePageInfo = res.data.data.page;        
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	//获取保养计划
	@action.bound async getMaintenancePlanList(params) {
		this.maintenancePlanList = []
		try {
			let res = await services.gets('getMaintenancePlanList')({
				...omit(this.maintenancePageInfo, 'total'),
				...params
			});
			if (isDataExist(res)) {
				this.maintenancePlanList = res.data.data.items;
				this.maintenancePageInfo = res.data.data.page;        
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	//获取选中设备的信息———contentPage
	@action.bound async getContentCheckedRow(id) {
		this.contentCheckedRow = []
		try {
			this.maintenanceContentList.map(row=>{
				if(row.equipmentId == id){
					this.contentCheckedRow.push(row);
				}
			})
		} 
		catch (error) {
			console.log(error);
		}
	}

	//获取选中设备的信息———planPage
	@action.bound async getPlanCheckedRow(id) {
		this.planCheckedRow = {}
		try {
			this.maintenancePlanList.map(row=>{
				if(row.equipmentId == id){
					this.planCheckedRow=row;
				}
			})
		} 
		catch (error) {
			console.log(error);
		}
	}

	//提交保养内容
	@action async saveContentPage(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveMaintenanceContentList')(params);
			if (isDataExist(res)) {
				this.contentQueryList();
				this.dataPageModalVis=false;//保养内容页面作为保养数据对话框时，提交后需关闭对话框
				this.isModalEdit=false; //
				return res
			}
		} catch (error) {
			console.log(error);
		}
	}

	//提交保养计划
	@action async savePlanPage(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveMaintenancePlanList')(params);
			if (isDataExist(res)) {
				this.planQueryList();
				return res
			}
		} catch (error) {
			console.log(error);
		}
	}

	//删除数据表格
	@action async deleteDataPage(params) {
		try {
			let res = await services.posts('removeMaintenanceDataList')(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryDataPageList();
	}

	// 是否展示联动输入框
	@action.bound setGangedInputVis(visible) {
		this.gangedInputVis = visible;
	}

	//是否展示对话框
	@action.bound setDataPageModalVis(visible) {
		this.dataPageModalVis = visible;
	}

	@action.bound setCalendarPageModalVis(visible) {
		this.calendarPageModalVis = visible;
	}
	
	@action.bound setContentPageModalVis(visible) {
		this.contentPageModalVis = visible;
	}

	@action.bound setPlanPageModalVis(visible) {
		this.planPageModalVis = visible;
	}

	//是否编辑对话框
	@action.bound setIsModalEdit(editble){
		this.isModalEdit = editble;
	}
	
	//编辑对话框时传递行数据
	@action.bound setModalEditData(data){
		this.modalEditData = data;
	}

	contentQueryList = () => {
		this.getMaintenanceContentList({
			...this.contentSearchOptions
		});
	};

	planQueryList = () => {
		this.getMaintenancePlanList({
			...this.planSearchOptions
		});
	};

	queryDataPageList = () => {
		this.getMaintenanceList({
			...this.dataSearchOptions
		});
	};

}

let  MaintenanceStore = new Maintenance();
export default MaintenanceStore;