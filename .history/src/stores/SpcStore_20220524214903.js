import { observable, action} from 'mobx';

class Spc{
	@observable currentUuid = '';

      /* 设置当前uuid */
    @action setCurrentUuid(uuid){
        this.currentUuid = uuid;
        console.log(this.currentUuid);
    }
}

let  SpcStore = new Spc();
export default SpcStore;