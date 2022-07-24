/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:03:18
 * @LastEditors: shoen
 * @LastEditTime: 2020-12-23 10:55:49
 */
import { observable, action } from 'mobx';
import * as services from '../services/production';
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';
import { omit } from 'lodash';

class Production {
	@observable isLoading = false;
	@observable searchOptions = {};
	@observable planList = [];
	@observable planPageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable planStatus = 'add';              //记录计划弹窗状态
	@observable planModalVis = false;
	@observable plan_orderList = [];
	@observable plan_bomList = [];
	@observable route_bomList = [];
	@observable planByOrder = {};
	@observable planCurrentRe = {};              // 编辑当前的record
	@observable planSelectKeys = [];
	@observable schedData = [];                  // 排程数据的获取
	@observable modalLoading = false;
	@observable isPlantLoading = false;
	@observable type = 0;                        //设置对应页面展示的结果
	@observable ganttRecord = {};
	@observable btnLoading = false;
	@observable hooktest = 0;

	/*  ===========生产任务 */
	@action.bound async getPlanList(params) {
		this.isLoading = true;
		this.planList = []
		try {
			let res = await services.gets('getPlanList')({
				...omit(this.planPageInfo, 'total'),
				...params
			});
			this.isLoading = false;
			if (isDataExist(res)) {
				this.planList = res.data.data.items;
				this.planPageInfo = res.data.data.page;        // pageIndex: 1, pageSize: 10, total: 17823
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	/* 获取订单数据 */
	@action async getOrderList() {
		this.plan_orderList = []
		try {
			let res = await services.gets('getOrderList')();
			if (isDataExist(res)) {
				this.plan_orderList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * /iiot/basic/material/getInfo
	 * @param {*} params 
	 */
	@action async getBomList(params) {
		this.plan_bomList = []
		try {
			let res = await services.gets('getBomList')(params);
			if (isDataExist(res)) {
				this.plan_bomList = res.data.data;
			}
		} 
		catch (error) {
			console.log(error);
		}
	}

	@action async getRouteList(params) {
		this.route_bomList = []
		try {
			let res = await services.gets('getRouteList')(params);
			if (isDataExist(res)) {
				this.route_bomList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async setOrderValue(params) {
		try {
			let res = await services.gets('setOrderValue')(params);
			if (isDataExist(res)) {
				this.planByOrder = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async savePlan(params) {
		try {
			let res = await services.posts('savePlan')(params);
			if (isDataExist(res)) {
				this.queryPlanList();
				return res
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async getEditPlan(params) {
		this.modalLoading = true;
		try {
			let res = await services.gets('editPlan')(params);
			this.modalLoading = false;
			if (isDataExist(res)) {
				let data = res.data.data;
				return data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async deletePlan(params, type) {
		try {
			let req = type === 'batch' ? 'batchRemove' : 'removePlan';
			let res = await services.posts(req)(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryPlanList();
	}

	@action async toWork(params) {
		try {
			let res = await services.posts('toWork')(params);
			if (isDataExist(res)) {
				message.success('生产计划已排程');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryPlanList();
	}

	@action.bound async onSyncData() {
		this.btnLoading = true;
		try {
			let res = await services.gets('toSyncData')();
			this.btnLoading = false;
			if (isDataExist(res)) {
				message.success('同步成功');
			}
		} 
		catch (error) {
			message.success('同步失败');
			console.log(error);
		}

		// 同步完成后重新获得计划列表
		this.getPlanList({
			...this.searchOptions,
			pageSize: 10,
			pageIndex: 1,
		});
	}

	queryPlanList = () => {
		this.getPlanList({
			...this.searchOptions
		});
	};

	@action.bound showPlanModal(visible) {
		this.planModalVis = visible;
	}
	
	@action clearPlanModal() {
		this.planModalVis = false;
		this.generateOrderId = '';
		this.planCurrentRe = {}
	}

	/* ============生产报工 */
	@observable reportBomId = '';
	@observable reportDevId = '';
	@observable reportWorkId = '';
	@observable report_deviceList = [];
	@observable reportList = [];
	@observable reportPage = { pageIndex: 1, pageSize: 10 };
	@observable reportVisible = false;
	@observable reportCurrent = {};
	@observable workerList = [];
	@observable rep_loading = false;
	@observable workerName = '';
	@observable editReportInfo = {};
	@observable inspectInfo = [];
	@observable inspectResult = [];
	@observable materialToReport = []

	@action async getMaterialByWork(params) {
		try {
			let res = await services.gets('getMaterialByWork')(params)
			if (isDataExist(res)) {
				this.materialToReport = res.data.data
			}
		} catch (error) {

		}
	}
	@action async getDevice(params) {
		try {
			let res = await services.gets('getDevice')(params);
			if (isDataExist(res)) {
				this.report_deviceList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async getWorkReport(data = {}) {
		this.isLoading = true;
		this.reportList = []
		try {
			let params = {
				materialId: this.reportBomId || '',
				workNo: this.reportWorkId || '',
				deviceId: this.reportDevId || '',
				workStatus: 1,
				...this.reportPage,
				...data
			};
			let res = await services.gets('getWorkReport')(params);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.reportList = res.data.data.items;
				this.reportPage = res.data.data.page;
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async startUp(params) {
		try {
			let res = await services.posts('startUp')(params);
			if (isDataExist(res)) {
				message.success('工单开启成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.getWorkReport();
	}

	/* 获取操作工 */
	@action async getWorker(params) {
		this.rep_loading = false;
		this.workerList = []
		try {
			let res = await services.gets('getWorker')(params);
			this.rep_loading = true;
			if (isDataExist(res)) {
				this.workerList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action async toComplete(params) {
		try {
			let res = services.posts('toComplete')(params);
			if (isDataExist(res)) {
				message.success('工单已完结');
			}
		} catch (error) {
			console.log(error);
		}
		this.getWorkReport();
	}

	/* 上报提交 */
	@action async updateReport(params) {
		try {
			let res = await services.posts('updateReport')(params);
			if (isDataExist(res)) {
				this.getWorkReport();
				return res
			}
		} catch (error) {
			console.log(error);
		}
	}

	/* 质检提交 */
	@action async inspectReport(params) {
		try {
			let res = await services.posts('inspectReport')(params);
			if (isDataExist(res)) {
				message.success('添加质检结果成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.getWorkReport();
	}

	/* 获取质检信息 */
	@action async getInspectInfo(params) {
		try {
			let res = await services.gets('getInspectInfo')(params);
			if (isDataExist(res)) {
				let data = res.data.data;
				let inspectResult = [];
				data.map(item => {
					inspectResult.push({
						inspectSchemaId: item.id,
						inspectId: item.inspectId,
						contentType: item.contentType,
						description: ''
					});
				});
				this.inspectResult = inspectResult;
				this.inspectInfo = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action changeInspectResult({ id, type, value }) {
		// let result = this.inspectResult;
		this.inspectResult.map(item => {
			if (item.inspectSchemaId === id) {
				if (type === 'description') {
					item.description = value;
				}
				if (type === 'radio') {
					item.boolValue = value;
				}
				if (type === 'input') {
					item.doubleValue = value;
				}
			}
			return item.id;
		});
	}

	/*  =============== 生产分析 */
	@observable AnalysisData = [];
	@observable planList = [];
	@observable planDevName = '';

	@action async getAllStaticCount() {
		try {
			let resArray = [
				{ req: 'getMonthPlanCount', data: {}, type: 'planVars' },
				{ req: 'getMonthWorkCount', data: {}, type: 'workVars' },
				{ req: 'getDayWorkCont', data: {}, type: 'execVars' },
				{ req: 'getDaySuccessCount', data: {}, type: 'factVars' },
				{ req: 'getProductStatic', data: [], type: 'productStatic' },
				{ req: 'getReportCountByDate', data: [], type: 'workExecute' }
			];
			for (let req of resArray) {
				let params = req.params || {};
				let res = await services.gets(req.req)(params);
				if (isDataExist(res)) {
					let data = res.data.data;
					if (req.type === 'workExecute') {
						if (data.length > 0) {
							let list = [{ name: 'successCount' }, { name: 'failCount' }];
							for (let item of data) {
								list[0][item.reportTime] = item.successCount;
								list[1][item.reportTime] = item.failCount;
							}
							Object.assign(req, {
								data: list
							});
						}
					} else if (req.type === 'productStatic') {
						let list = [];
						for (let item of data) {
							list.push({
								year: item.reportTime,
								value: item.successCount
							});
						}
						Object.assign(req, {
							data: list
						});
					} else {
						Object.assign(req, {
							data
						});
					}
				}
			}

			this.AnalysisData = resArray;
		} catch (error) { }
	}

	@action async getPlantList(params) {
		this.isPlantLoading = true;
		this.planList = []
		try {
			let res = await services.gets('getListWork')({
				devName: this.planDevName,
				...params
			});
			this.isPlantLoading = false;
			if (isDataExist(res)) {
				this.planList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	// 总量统计
	@observable outputList = {}
	@observable procedureList = []

	@action async output(params) {
		this.isLoading = true;
		this.outputList = []
		try {
			let res = await services.gets('output')(params);
			this.isLoading = false;
			if (isDataExist(res)) {
				this.outputList = res.data.data;
			}
		} catch (error) {
			console.log(error);
		}
	}
	
	// 获取工序-下拉框
	@action async getProcedure(params) {
		try {
			let res = await services.gets('listProcedure')(params)
			if (isDataExist(res)) {
				this.procedureList = res.data.data
			}
		} catch (error) {
			console.log(error)
		}
    }
    /** ---------- 执行情况 ---------- */
    @observable workshopList = [];
    @observable tableData = [];
    @observable pageInfo = { pageIndex: 1, pageSize: 10 };

    /**
     * 获取车间选择框
     */
    @action.bound async getWorkshopList(params) {
        this.workshopList = [];
        try {
            let res = await services.gets('getWorkshopList')(params);
            if (isDataExist(res)) {
                this.workshopList = res.data.data;
            }
        }
        catch (error) {}
	}
	
    /**
     * 执行情况表格
     * @param {object} params 
     */
    @action.bound async getExecutionData(params) {
        this.tableData = []
        try {
            let res = await services.gets('getExecutionData')({
                ...this.searchOptions,
                ...omit(this.pageInfo, 'total'),
                ...params});
            if (isDataExist(res)) {
                this.tableData = res.data.data.items;
                this.pageInfo = res.data.data.page;
            }
        }
        catch (error) {}
    }

	@action changeVisible = visible => {
		this.reportVisible = visible;
	};
	
	@action clearData() {
		this.reportBomId = '';
		this.reportDevId = '';
		this.reportWorkId = '';
		this.report_deviceList = [];
		this.reportList = [];
		this.reportPage = { pageIndex: 1, pageSize: 10 };
		this.reportVisible = false;
		this.reportCurrent = {};
		this.workerList = [];
		this.rep_loading = false;
		this.workerName = '';
		this.editReportInfo = {};
		this.inspectInfo = [];
        this.inspectResult = [];
        this.searchOptions = {};
        this.workshopList = [];
        this.tableData = [];
        this.pageInfo = { pageIndex: 1, pageSize: 10 };
	}
}

let ProductionStore = new Production();
export default ProductionStore;
