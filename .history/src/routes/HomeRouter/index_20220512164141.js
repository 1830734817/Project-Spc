/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2020-12-16 00:00:03
 * @LastEditors: shoen
 * @LastEditTime: 2022-03-12 21:01:36
 */
import React, { Component } from 'react';
import HomeLayout from 'Layouts/HomeLayout';
import {Route, Redirect} from 'react-router-dom';
import {
  DatatableRouter,
  SystemRouter,
  MaintenanceRouter,
} from './configs'
import { inject,observer } from 'mobx-react'

@inject('HomeStore')
@observer
class HomeRouter extends Component {
  state = {
    innerHeight: window.innerHeight        // 返回窗口的文档显示区的高度                 
  };

  render() {
    // 移动端 || PC端
    const isMobile = navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 'mobile' : 'pc';

    // 访问'/'时，先调用“HomeLayout”功能，主要为菜单功能
    // React.Fragment: 将子列表分组，无需向 DOM 添加额外节点。
    return (
      <div className='main' style={{ height: this.state.innerHeight + 'px'}}>
        <HomeLayout type={isMobile} children={
          <React.Fragment> 
            {/* <Route exact path="/" render={() => <Redirect to='/datatable' />} /> */}
            <Route path='/datatable' component={DatatableRouter} />
            <Route path='/system' component={SystemRouter} />
            <Route path='/maintenance' component={MaintenanceRouter}/>
            <Redirect to='/maintenance' />
          </React.Fragment>} 
        />
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  handleResize = (e) => {
    this.setState({
      innerHeight: e.target.innerHeight
    });
  }

}
export default HomeRouter;