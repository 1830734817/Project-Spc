import React, { PureComponent } from 'react'
import {Route, Redirect} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import SpcDataLayout from 'layouts/SpcData';
import {
  SpcTable,
  SpcChart
} from './configs'

@inject('HomeStore')
@observer
class SpcDataRouter extends PureComponent {
  render() {
    const prefixPath = this.props.HomeStore.currentPath;
    return (
      <SpcDataLayout children={
        <React.Fragment>
          <Route exact path={`${prefixPath}`} render={() => <Redirect to={`${prefixPath}/table`} />} />
          <Route path={`${prefixPath}/table`} component={SpcTable} />
          <Route path={`${prefixPath}/chart`} component={SpcChart} />
        </React.Fragment>} 
      />
    );
  }
}

export default SpcDataRouter;
