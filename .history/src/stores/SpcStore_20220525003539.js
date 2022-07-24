import { observable, action} from 'mobx';
import * as services from '../services/spc';
import { isDataExist } from 'utils/dataTools';

class Spc{
	@observable currentUuid = '';
    @observable spcTableList = [];
    @observable spcTableListInfo = {};


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

}

let  SpcStore = new Spc();
export default SpcStore;