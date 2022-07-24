import { observable, action} from 'mobx';
import { toJS } from 'mobx';
import * as services from '../services/spc';
import { isDataExist } from 'utils/dataTools';

class Spc{
	@observable currentUuid = '';
    @observable spcTableList = [];          //所有表格数据
    @observable spcTableListInfo = {};
    @observable spcTableContent = [];       //选中表格的数据

      /* 设置当前uuid */
    @action setCurrentUuid(uuid){
        this.currentUuid = uuid;
    }

    /* 获取spc表格数据 */
    @action.bound async getSpcTableList() {
		this.spcTableList = []
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
        this.spcTableContent = []
        try{
            if(uuid){   //第一次加载时
                if(this.spcTableList){
                    this.spcTableList.map(table => {
                        if(table.uuid === uuid){
                            this.spcTableContent = table.items;
                            console.log(2_1)
                        }
                    })
                }
            }
            else{
                if(this.currentUuid && this.spcTableList){
                    this.spcTableList.map(table => {
                        if(table.uuid === this.currentUuid){
                            this.spcTableContent = table.items;
                            console.log(2_2)
                        }
                    })
                }
            }
                       
        }
        catch(error){
            console.log(error);
        }
    }

}

let  SpcStore = new Spc();
export default SpcStore;