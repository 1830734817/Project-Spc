/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-16 00:00:03
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-24 11:32:10
 */
import React,{PureComponent} from 'react';
import { 
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { 
  HomeRouter,
  LoginPage,
  // AliIot,
  MyTestPage
} from './configs'

// 主题
import { THEME_LIST } from 'constants/theme_config'

class RootRouter extends PureComponent{
  // （1）根路由
  render(){
    return (
      <BrowserRouter>
        <Switch>
          {/* 业务页面 */}
          <Route path='/mytest' component={MyTestPage} />
          {/* <Route path='/aliiot' component={AliIot} />  */}

          {/* 登录页面 */}
          <Route path='/login' component={LoginPage} /> 
          
          {/* 根目录 */}
          <Route path='/' component={HomeRouter} />   
        </Switch>
      </BrowserRouter>
    );
  }

  // （2）主题修改
  componentDidMount(){
    let curTheme = {}
    if(sessionStorage.getItem('ownTheme')){
      for(let theme of THEME_LIST){
        if([theme.color,theme.name].includes(sessionStorage.getItem('ownTheme'))){
          curTheme = theme
        }
      }
    }
    else{
      curTheme = THEME_LIST[0]
    }

    // react+antd在线主题修改
    // 参考：https://blog.csdn.net/lao_guolao_guo/article/details/107296775
    window.less.modifyVars(
        {
          '@primary-color': curTheme.color,
          '@menu-dark-item-active-bg':curTheme.color,
          '@link-color': curTheme.color,
          '@text-color':curTheme.color,
          '@btn-primary-bg': curTheme.color,
          // '@layout-header-background':curTheme.color === '#6236FF' ? 'linear-gradient(137deg, #674dc5 0%, #150f23 100%)' : 
          // '#001529',
          '@layout-header-background': "linear-gradient(227deg, #0db3a6 0%, #1890FF 100%)",
          '@menu-dark-submenu-bg':'transparent',
        }
      )
      .then(() => { 
        sessionStorage.setItem('ownTheme',curTheme.color)
    })
    .catch(error => {
      console.log(error)
    });
  }
}

export default RootRouter;



