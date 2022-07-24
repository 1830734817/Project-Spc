import { observable, action} from 'mobx';
import { toJS } from 'mobx';
import * as services from '../services/spc';
import { isDataExist } from 'utils/dataTools';

class Spc{
	@observable currentUuid = '';
    @observable spcTableList = [];          //所有表格数据
    @observable spcTableListInfo = {};
    @observable spcTableContent = [];       //选中表格的数据
    @observable selectedIdsList = [];       // 数据表格第一列的选择ID列表  
    @observable allSelectedIdsList = [];  //全选ID列表

      /* 设置当前uuid */
    @action setCurrentUuid(uuid){
        this.currentUuid = uuid;
    }

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
                            this.spcTableContent = table.items;
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

    /* 设置spc表格选中ID列表 */
    @action setSelectedIdsList(params){
        this.selectedIdsList=params;
    }

    //删除表格数据
	@action async deleteSpcTable(params) {
		try {
			console.log(params);
			let res = await services.posts('removeMaintenanceDataList')(params);
			if (isDataExist(res)) {
				message.success('删除成功');
			}
		} catch (error) {
			console.log(error);
		}
		this.queryDataPageList();
	}

}

let  SpcStore = new Spc();
export default SpcStore;