/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 20:31:11
 */

import { observable, action } from 'mobx';
import * as services from '../services/maintenance';
import { isDataExist } from 'utils/dataTools';
import { omit } from 'lodash';

class Maintenance{
    @observable maintenanceList = [];
    @observable maintenancePageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable dataPageModalVis = false; //弹窗是否可见
	@observable calendarPageModalVis = false; 
	@observable contentPageModalVis = false; 
	@observable planPageModalVis = false; 


	//获取保养数据
    @action.bound async getMaintenanceList(params) {
		this.maintenanceList = []
		try {
			let res = await services.gets('getMaintenanceList')({
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

}

let  MaintenanceStore = new Maintenance();
export default MaintenanceStore;
