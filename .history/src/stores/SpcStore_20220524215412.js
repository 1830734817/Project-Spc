import { observable, action} from 'mobx';

class Spc{
	@observable currentUuid = '';

      /* 设置当前uuid */
    @action setCurrentUuid(uuid){
        this.currentUuid = uuid;
    }
}

let  SpcStore = new Spc();
export default SpcStore;