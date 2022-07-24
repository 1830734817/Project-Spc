/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 12:20:12
 * @LastEditors: zhihao
 * @LastEditTime: 
 */

/**
 * 设备维护保养
 */
import React, { PureComponent } from 'react';
import LayoutPage from 'layouts/Datatable';
import {Route, Redirect} from 'react-router-dom';
import {
  dataPage,
  contentPage,
  planPage,
  calendarPage,
} from './configs'

class MaintenanceRouter extends PureComponent {
  render() {
    return (
      <LayoutPage children={
        <React.Fragment>
          <Route exact path="/maintenance" render={() => <Redirect to='/maintenance/data' />} />
          <Route path='/maintenance/data' component={dataPage} />
          <Route path='/maintenance/content' component={contentPage} />
          <Route path='/maintenance/plan' component={planPage} />
          <Route path='/maintenance/calendar' component={calendarPage}  />
        </React.Fragment>} 
      />);
  }
}
export default DatatableRouter;