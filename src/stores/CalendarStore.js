/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2021-12-23 14:00:31
 */
import { observable, action } from 'mobx';
import * as services from '../services/datatable';
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash';

class Calendar {
	@observable isLoading = false;
	@observable searchOptions = {};
	@observable calendarList = [];
	@observable calendarPageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable calendarStatus = 'add';              // 记录计划弹窗状态
	@observable calendarModalVis = false;
	@observable calendarSelectModalVis = false;
	@observable calendarCurrentRe = {};              // 编辑当前的record
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
	@observable selectedDate=new Map();	

	// type=['销售订单','制造订单','采购订单','库存'];
	// isReplenishmentcalendar=['录入订单','补充订单'];
	// status=['未指定','不可分派','分派完毕','指示完毕','确定','开始生产','结束'];
	// isAllOperationsAssigned=['未分派','已经分派','分派虚拟资源','强制分派'];
	// assignmentDirection=['与[根据优先度]相同', '正向分派', '逆向分派','将订单按照优先度的分派方向分派'];
	// disabled=['否','是']

	@action.bound async getCalendarList(params) {
		this.isLoading = true;
		this.calendarList = []
		try {
			let res = await services.gets('getCalendarList')({
				...omit(this.calendarPageInfo, 'total'),
				...params
			});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.calendarList = res.data.data.items;
				this.calendarPageInfo = res.data.data.page;        // pageIndex: 1, pageSize: 10, total: 17823
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	@action async save(params) {
		console.log("SAVE");
		try {
			let res = await services.posts('saveCalendar')(params);
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

	@action async deleteCalendar(params, type) {
		try {
			let req = type === 'batch' ? 'batchRemove' : 'removeCalendar';
			let res = await services.posts(req)(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.querycalendarList();
	}

	querycalendarList = () => {
		this.getCalendarList({
			...this.searchOptions
		});
	};

	queryList = () => {
		this.getCalendarList({
			...this.searchOptions
		});
	};

	@action.bound showModal(visible) {
		this.calendarModalVis = visible;
	}

	@action.bound showSelectModal(visible) {
		this.calendarSelectModalVis = visible;
		this.calendarModalVis = !visible;
	}
	
	@action clearModal() {
		this.calendarModalVis = false;
		this.calendarCurrentRe = {}
	}

	@action onImport() {

	}

	@action onExport() {
		
	}

	@action async getCalendarCodeList(params) {
		this.itemCodeList = []
		try {
			let res = await services.gets('getCalendarCodeList')(params);
			if (isDataExist(res)) {
				this.itemCodeList = res.data.data.items;
			}
		} 
		catch (error) {
			console.log(error);
		}
	}
}

let  CalendarStore = new Calendar();
export default CalendarStore;
