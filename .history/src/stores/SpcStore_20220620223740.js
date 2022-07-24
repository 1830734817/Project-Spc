import { observable, action} from 'mobx';
import { toJS } from 'mobx';
import { message } from 'antd';
import * as services from '../services/spc';
import { isDataExist } from 'utils/dataTools';


class Spc{
	@observable currentUuid = '';
    @observable spcTableList = [];                      //所有表格数据
    @observable spcTableListInfo = {};
    @observable spcTableContent = [];                   //选中表格的数据
    @observable selectedIdsList = [];                   //数据表格第一列的选择ID列表  
    @observable allSelectedIdsList = [];                //全选ID列表
    @observable ifRefreshTbale = false;                 //是否刷新对应列表
    @observable createModalVis = false;                 //新增对话框是否可见
    @observable checkProjects = [];                     //检测项目
    @observable errorRuleModalVis = false;              //判异规则对话框是否可见
    @observable colInfoModalVis = false;                //层次信息对话框是否可见
    @observable colInfo = [];                           //层次类型
    @observable unSelectablePoint = [];                 //不可选的控制点层次
    @observable isSetPoint = false;                     //是否为设置控制点
    @observable isModalEdit = false;                    //新增对话框是否为编辑模式
    @observable modalEditData = [];                     //编辑对话框中预设的行数据
    @observable defineColModalVis = false;              //层次类型定义对话框是否可见
    @observable alternativesModalVis = false;           //备选值对话框是否可见
    @observable colInfoIndex = 0;                       //层次类型数组的下标
    @observable alternativesUpdateModalVis = false;     //备选值更新对话框是否可见
    @observable tempColInfo = [];                       //临时层次类型
    @observable isEditAlternatives = false;             //是否为修改备选值
    @observable editAlternativesData = [];              //修改备选值时预设的数据
    @observable checkProjectModalVis = false;           //检测项目定义对话框是否可见
    @observable tempCheckProjects = [];                 //临时检测项目
    @observable checkProjectUpdateModalVis = false;     //检测项目更新对话框是否可见
    @observable isEditCheckProject = false;             //是否为修改检测项目
    @observable editCheckProjectData = [];              //修改检测项目时预设的数据

    /* 获取spc表格数据 */
    @action.bound async getSpcTableList() {
		this.spcTableList = [];
		try {
			let res = await services.gets('getSpcTableList')({
				id:0
			});
			if (isDataExist(res)) {
				this.spcTableList = res.data.data.tables;
				this.spcTableListInfo = res.data.data.info;    
			}
            if(this.ifRefreshTbale){
                this.ifRefreshTbale = false;
                this.querySpcTableContent();
            }
		} 
		catch (error) {
			console.log(error);
		}
	}

    /* 获取左侧菜单所选表格的数据 */
    @action.bound async getSpcTableContent(uuid=''){
        this.spcTableContent = [];
		this.allSelectedIdsList = [];
        try{
            if(uuid){   //第一次加载时
                if(this.spcTableList){
                    this.spcTableList.map(table => {
                        if(table.uuid === uuid){
                            this.spcTableContent = table.items;
                            this.spcTableContent.map((item)=>{
                                this.allSelectedIdsList.push(item.key);
                            })
                        }
                    })
                }
            }
            else{
                if(this.currentUuid && this.spcTableList){
                    this.spcTableList.map(table => {
                        if(table.uuid === this.currentUuid){
                            //赋值对应表格数据
                            this.spcTableContent = table.items;
                            //赋值全选数据key列表
                            this.spcTableContent.map((item)=>{
                                this.allSelectedIdsList.push(item.key);
                            })
                        }
                    })
                }
            }
                       
        }
        catch(error){
            console.log(error);
        }
    }

    /* 删除表格数据 */
	@action async deleteSpcTable(params) {
		try {
			let res = await services.posts('removeSpcTableList')(params);
			if (isDataExist(res)) {
                console.log('delete',params);
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
        this.ifRefreshTbale =true;
		this.querySpcTableList();
	}

    /* 设置表格数据 */
    @action async createSpcTable(params) {
		try {
			let res = await services.posts('addSpcTableList')({
                ...params,
            });
			if (isDataExist(res)) { 
                message.success('设置成功');
                console.log('create',params);
			}
		} catch (error) {
			console.log(error);
		}
        this.ifRefreshTbale =true;
		this.querySpcTableList();
	}

    /* 获取检测项目 */
    @action async getCheckProjects(){
        console.log(1);
        this.checkProjects = [];
		try {
			let res = await services.gets('getCheckProjects')({
				id:0
			});
			if (isDataExist(res)) {
				this.checkProjects = res.data.data.projects;
                this.tempCheckProjects = toJS(this.checkProjects);
			}
		} 
		catch (error) {
			console.log(error);
		}
    }

    /* 获取层次类型 */
    @action async getColInfo(){
        this.colInfo = [];
		try {
			let res = await services.gets('getColInfo')({
				id:0
			});
			if (isDataExist(res)) {
				this.colInfo = res.data.data.cols;
                this.tempColInfo = toJS(this.colInfo);
			}
		} 
		catch (error) {
			console.log(error);
		}
    }

    /* 设置层次类型 */
    @action async saveColInfo(params){
        try{
            let res = await services.posts('saveColInfo')({
                ...params,
            });
			if (isDataExist(res)) { 
                message.success('设置成功');
                console.log('colInfo',params);
			}
        } catch (error) {
			console.log(error);
		}
        //重新获取colInfo
		this.queryColInfo();
    }

    /* 设置检测项目 */
    @action async saveCheckProject(params){
        try{
            let res = await services.posts('saveCheckProject')({
                ...params
            });
            if(isDataExist(res)){
                message.success('设置成功');
                console.log('checkProject',params);
            }
        } catch (error) {
			console.log(error);
		}
        //重新获取checkProjects
        this.queryCheckProjects();
    }

    /* 增加层次类型备选值 */
    @action addAlternative(params){
        this.tempColInfo[this.colInfoIndex].colValues.push(params);
    }

    /* 修改层次类型备选值 */
    @action updateAlternative(index,value){
        this.tempColInfo[this.colInfoIndex].colValues[index] = value;
    }

    /* 删除层次类型备选值 */
    @action deleteAlternative(index){
        this.tempColInfo[this.colInfoIndex].colValues.splice(index,1);
    }

    /* 增加检测项目 */
    @action addCheckProject(params){
        this.tempCheckProjects.push(params);
    }

    /* 设置当前uuid */
    @action setCurrentUuid(uuid){
        this.currentUuid = uuid;
    }

    /* 设置spc表格选中ID列表 */
    @action setSelectedIdsList(params){
        this.selectedIdsList=params;
    }

    /* 设置层次对话框为设置控制点模式 */
    @action setIsSetPoint(params){
        this.isSetPoint = params;
    }

    /* 设置新增对话框为编辑模式 */
    @action setIsModalEdit(params){
        this.isModalEdit = params;
    }

    /* 添加不可选的控制点层次列表 */
    @action addUnSelectablePoint(params){
        this.unSelectablePoint.push(params);
    }

    /* 清空不可选的控制点层次列表 */
    @action emptyUnSelectablePoint(){
        this.unSelectablePoint = [];
    }

    /* 设置编辑对话框中预设的行数据 */
    @action setModalEditData(params){
        this.modalEditData = params;
    }

    /* 设置所选层次类型在数组中的下标 */
    @action setColInfoIndex(param){
        this.colInfoIndex = param;
    }

    /* 重置临时层次类型数组 */
    @action resetTempColInfo(){
        this.tempColInfo = toJS(this.colInfo);
    }

    /* 设置是否为修改备选值 */
    @action setIsEditAlternatives(param){
        this.isEditAlternatives = param;
    }

    /* 设置修改备选值时预设的数据 */
    @action setEditAlternativesData(params){
        this.editAlternativesData = params;
    }

    /* 设置是否为修改检测项目 */
    @action setIsEditCheckProject(param){
        this.isEditCheckProject = param;
    }

    /* 设置修改检测项目时预设的数据 */
    @action setEditCheckProjectData(params){
        this.editCheckProjectData = params;
    }

    /* 设置对话框是否可见 */
    @action.bound setCreateModalVis(param){
        this.createModalVis = param;
    }

    @action.bound setErrorRuleModalVis(param){
        this.errorRuleModalVis = param;
    }

    @action.bound setColInfoModalVis(param){
        this.colInfoModalVis = param;
    }

    @action.bound setDefineColModalVis(param){
        this.defineColModalVis = param;
    }

    @action.bound setAlternativesModalVis(param){
        this.alternativesModalVis = param;
    }

    @action.bound setAlternativesUpdateModalVis(param){
        this.alternativesUpdateModalVis = param;
    }

    @action.bound setCheckProjectModalVis(param){
        this.checkProjectModalVis = param;
    }

    @action.bound setCheckProjectUpdateModalVis(param){
        this.checkProjectUpdateModalVis = param;
    }

    /* 请求spc表格数据 */
    querySpcTableList = () => {
		this.getSpcTableList();
	};
   
    /* 请求spc对应表格内容 */
    querySpcTableContent = () => {
		this.getSpcTableContent();
	};

    /* 请求层次类型 */
    queryColInfo = ()=>{
        this.getColInfo();
    }

    /* 请求检测项目 */
    queryCheckProjects = ()=>{
        this.getCheckProjects();
    }
}

let  SpcStore = new Spc();
export default SpcStore;