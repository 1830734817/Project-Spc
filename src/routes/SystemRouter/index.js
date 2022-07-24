/**
 * 订单管理
 */
import React, { PureComponent } from 'react';
import SystemLayout from 'Layouts/SystemManager';
import {
  Route, Redirect
} from 'react-router-dom';
import {
  DepartmentManager,
  RoleManager,
  SystemMenu,
  UserManager,
  Dictionary,
  CompanyManager,
  ConfigPage,
} from './configs'

class SystemRouter extends PureComponent {
  render() {
    return <SystemLayout children={<React.Fragment>
      <Route exact path="/system" render={() => <Redirect to='/system/department' />} />
      <Route path='/system/company' component={CompanyManager}/>
      <Route path='/system/department' component={DepartmentManager} />
      <Route path='/system/role' component={RoleManager} />
      <Route path='/system/user' component={UserManager} />
      <Route path='/system/menu' component={SystemMenu} />
      <Route path='/system/dictionary' component={Dictionary} />
      <Route path='/system/config' component={ConfigPage} />
    </React.Fragment>} />;
  }
}
export default SystemRouter;