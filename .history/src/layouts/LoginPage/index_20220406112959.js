/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-28 15:42:32
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-24 00:31:58
 */
import React from 'react';
import { inject,observer } from 'mobx-react';
// import PurpleTheme from './PurpleTheme'
import MyTheme from './MyTheme'
import { THEME_LIST } from '../../constants/theme_config'

@inject('HomeStore')
@observer
class LoginPage extends React.Component{
  render(){
    return (
      <React.Fragment>
        {/* <PurpleTheme/> */}
        <MyTheme/>
      </React.Fragment>
    );
  }

  // 
  UNSAFE_componentWillMount() {
    let customTheme = sessionStorage.getItem('ownTheme');
    if(customTheme){
      for(let theme of THEME_LIST){
        if(theme.color === customTheme){
          //this.props.HomeStore.isSwitchTheme = theme
          return;
        }
      }
    }
    else{
      //this.props.HomeStore.isSwitchTheme = THEME_LIST[0]
    }
  }

}

export default LoginPage;