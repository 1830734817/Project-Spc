/**
 * 订单管理
 */
import React, { PureComponent } from 'react';
import OrderLayout from 'Layouts/OrderManage';
import {
  Route, Redirect
} from 'react-router-dom';
import {
  OrderQuery,
  OrderCheck,

} from './configs'

class OrderRouter extends PureComponent {
  render() {
    return <OrderLayout children={<div>
      <Route exact path="/order" render={() => <Redirect to='/order/query' />} />
      <Route path='/order/query' component={OrderQuery} />
      <Route path='/order/check' component={OrderCheck} />
    </div>} />;
  }

}
export default OrderRouter;