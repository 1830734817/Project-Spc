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
import MyTheme from './NewLogin'
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

}

export default LoginPage;