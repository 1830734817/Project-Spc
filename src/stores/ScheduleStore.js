import { observable, action } from 'mobx';
import { isDataExist } from 'Utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash'
import * as services from '../services/production';
import {
	ganttAllDataMock,
	ganttDataMock,
	ganttAllDataAnaly
} from '../utils/mock';

class Schedule {
	/* search */
	@observable scheduleNumber = '';
	@observable modList = [];
	/* list */
	@observable isLoading = false;
	@observable scheduleList = [];
	@observable schedulePage = {pageIndex:1,pageSize:10};
	@observable selectedRowKeys = [];
	@observable ganttRecords = [];
	/* modal */
	@observable currentStatus = 'list';

	/* 排程编辑 */
	@observable ganttList = [];
	@observable ganttMaterial = ''; //当前甘特全局的物料代码
	@observable ganttLoading = false;
	@observable deviceDoList = []

	/* 联合排程 */
	@action async getModulList(params) {
		try {
			let res = await services.gets('getModuleList')(params);
			if (isDataExist(res)) {
				this.modList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
	@action async getUnionList(params) {
		this.isLoading = true;
		this.scheduleList = []
		try {
			let res = await services.gets('getUnionList')({...omit(this.schedulePage,'total'),...params});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.scheduleList = res.data.data.items;
				this.schedulePage = res.data.data.page
			}
		} catch (error) {
			console.log(error);
		}
	}
	/* 提交联合排程操作 */
	@action async toUnionWork(params, finished) {
		this.isLoading = true;
		try {
			let res = await services.posts('toUnionWork')(params);
			this.isLoading = false;
			if (isDataExist(res)) {
				message.success('提交成功');
				if (finished) {
					finished();
				}
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	}

	/* 根据选择的物料 判断是否能生成工单 */
	@action async perUnionWork(params) {
		try {
			let res = await services.posts('perUnionWork')(params);
			if (isDataExist(res)) {
				if (res.data.data) {
					this.currentStatus = 'gantt';
					this.deviceDoList = res.data.data.deviceDoList
					this.ganttList = this.setGanttlist([res.data.data], params.mouldId);
					console.log(this.ganttMaterial)
				} else {
					message.error(res.data.msg);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	/* 根据订单或生产任务条件 -- 获取排程数据 */
	@action async getScheData(params) {
		this.ganttLoading = true;
		this.ganttList = []
		try {
			let res = await services.gets('getScheData')(params);
			this.ganttLoading = false;
			if (isDataExist(res)) {
				let data = res.data.data;
				this.ganttList = this.setGanttlist(data);
				return this.ganttList
			}
		} catch (error) {
			console.log(error);
		}
	}
	/* 复查询当前所有绑定的排程情况 */
	@action async getGanttList(params) {
		this.isLoading = true;
		this.ganttList = [];
		try {
			let res = {};
			if (params.type === 'edit') {
				res = await services.gets('getGanttList')({
					...params,
					...this.scheduleParams,
					techType: 2
				});
				this.isLoading = false;
			} else {
				if (params.type === 'all') {
					res = params.flag
						? ganttAllDataAnaly(params)
						: ganttAllDataMock(params);
				} else {
					res = ganttDataMock(params);
				}
				setTimeout(() => {
					this.isLoading = false;
				}, 100);
			}
			if (isDataExist(res)) {
				if (params.type === 'all') {
					let data = res.data.data;
					if (params.flag) {
						let list = res.data.data,
							gantt_data = this.setGanttlist(list);
						this.ganttList = gantt_data;
					} else {
						for (const item of data) {
							let list = this.setGanttlist(item.scheData);
							Object.assign(item, {
								scheData: list
							});
						}
						this.ganttList = data;
					}
				} else {
					let list = res.data.data,
						gantt_data = this.setGanttlist(list);
					this.ganttList = gantt_data;
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
	/* 提交排程操作 */
	@action async toWork(params, finished) {
		this.isLoading = true;
		try {
			let res = await services.posts('toWorkSchedule')(params);
			this.isLoading = false;
			if (isDataExist(res)) {
				message.success('提交成功');
				if (finished) {
					finished();
				}
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	}
	/* 获取排程数据格式化 */
	setGanttlist = (list, mouldId) => {
		let gantt_data = [];
		list.map((val1, i) => {
			/* 第一层数据 */
			let firstData = {
				...val1,
				id: i + 1,
				text: val1.procedureName,
				unscheduled: true,
				open: true,
				parent: 0,
				hide: true, // 隐藏列
				type: 'project',
				remainingCount: '',
				procedureId: val1.procedureId,
				needModule: val1.needMould,
				mouldId,
				capacityValue:
					val1.deviceDoList.length > 0 ? val1.deviceDoList[0].capacityValue : 0
			};
			gantt_data.push(firstData);
			val1.deviceDoList.map((val2, j) => {
				/* 第二层数据 */
				let datatemp2 = {
					id: i * 100 + j + 100,
					devId: val2.id,
					text: val2.name,
					type: 'project',
					creater: 'admin',
					parent: i + 1,
					unscheduled: true,
					progress: 0.5,
					capacityValue: val2.capacityValue || '-',
					procedureId: val1.procedureId,
					needModule: val1.needMould,
					mouldId,
					hide:mouldId ? false : (val1.needMould ? true : false), //判断如果是联合排程，不需要在标准排程中展示
					open: true
				};
				gantt_data.push(datatemp2);
				/* 第三层数据 */
				val2.works && val2.works.map((val3, k) => {
					let datatemp3 = {
						...val3,
						devId: val2.id,
						id: i * 10000 + j * 100 + k + 10000,
						text: '' + val3.materialName + '',
						capacityValue: val3.productValue || '-',
						start_date: val3.startTime,
						// planned_start: val3.planned_start || new Date(),
						// planned_end: val3.planned_end || new Date(),
						// duration: val3.days,
						parent: i * 100 + j + 100,
						hide: true, // 隐藏列
						type: 'project',
						creater: 'admin',
						render: 'split',
						unscheduled: true,
						progress: 0.5,
						mouldId,
						open: true,
						procedureId: val1.procedureId
					};
					gantt_data.push(datatemp3);
					val3.detailList && val3.detailList.map((val4, l) => {
						if (
							val4.scheduled != 0 &&
							val3.componentCode == this.ganttMaterial
						) {
							let datatemp4 = {
								...val4,
								id: i * 1000000 + j * 10000 + k * 100 + l + 1000000,
								text: '' + val4.planCount + '',
								start_date: val3.time,
								end_date: val3.endTime,
								planned_start: val3.planned_start || new Date(),
								planned_end: val3.planned_end || new Date(),
								hide: true,
								componentCode: val4.materialName,
								duration: val4.days,
								parent: i * 10000 + j * 100 + k + 10000,
								gparent: val3.procedureId,
								progress: val4.rate,
								procedureId: val3.procedureId,
								open: true,
								capacityValue: '-',
								mouldId,
								isHistory:true
							};
							gantt_data.push(datatemp4);
						} else {
							let datatemp4 = {
								...val4,
								id: i * 1000000 + j * 10000 + k * 100 + l + 1000000,
								text: '' + val4.planCount + '',
								start_date: val3.startTime,
								end_date: val3.endTime,
								planned_start: val4.planned_start || new Date(),
								planned_end: val4.planned_end || new Date(),
								componentCode: val4.materialName,
								duration: val4.days,
								parent: i * 10000 + j * 100 + k + 10000,
								gparent: val3.procedureId,
								progress: val4.rate,
								mouldId,
								procedureId: val3.procedureId,
								open: true,
								capacityValue: '-',
								isHistory:true
							};
							gantt_data.push(datatemp4);
						}
					});
				})
			});
		});
		return gantt_data;
	};
	@action clearData() {
		this.currentStatus = 'list';
		this.selectedRowKeys = [];
		this.ganttRecords = [];
		this.ganttList = [];
		this.ganttMaterial = ''
		this.scheduleNumber = '';
		this.scheduleList = []
	}
}
let ScheduleStore = new Schedule();
export default ScheduleStore;
