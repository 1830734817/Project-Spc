/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 12:20:12
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 14:22:37
 */

/**
 * 设备维护保养
 */
import React, { PureComponent } from 'react';
import LayoutPage from 'layouts/Datatable';
import {Route, Redirect} from 'react-router-dom';
import {
  DataPage,
  ContentPage,
  PlanPage,
  CalendarPage,
} from './configs'

class MaintenanceRouter extends PureComponent {
  render() {
    return (
      <LayoutPage children={
        <React.Fragment>
          <Route exact path="/maintenance" render={() => <Redirect to='/maintenance/data' />} />
          <Route path='/maintenance/data' component={DataPage} />
          <Route path='/maintenance/content' component={ContentPage} />
          <Route path='/maintenance/plan' component={PlanPage} />
          <Route path='/maintenance/calendar' component={CalendarPage}  />
        </React.Fragment>} 
      />);
  }
}
export default MaintenanceRouter;