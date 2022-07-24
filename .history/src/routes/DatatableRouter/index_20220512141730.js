/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-01-01 15:39:12
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-18 14:37:59
 */
/**
 * 计划管理
 */
import React, { PureComponent } from 'react';
import LayoutPage from 'layouts/Datatable';
import {Route, Redirect} from 'react-router-dom';
import {
    OrderPage,
    ManufacturingbomPage,
} from './configs'

class DatatableRouter extends PureComponent {
  render() {
    return (
      <LayoutPage children={
        <React.Fragment>
          <Route exact path="/datatable" render={() => <Redirect to='/datatable/manufacturingbom' />} />
          <Route path='/datatable/order' component={OrderPage} />
          <Route path='/datatable/manufacturingbom' component={ManufacturingbomPage} />
        </React.Fragment>} 
      />);
  }
}
export default DatatableRouter;