import { observable, action, } from 'mobx';
// import { isDataExist } from 'Utils/dataTools';
// import * as services from '../services/home';

class Public {
  @observable name = '';
  @observable currentCode = ''
  @action change(value) {
    this.name = value;
  }
  
}
let PublicStore = new Public();
export default PublicStore;