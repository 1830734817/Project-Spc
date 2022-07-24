import React from 'react';
import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 订单查询
const OrderQuery = Loadable({
  loader: () => import('layouts/OrderManage/OrderQuery'),
  loading: LoadingComponent
});
// 订单审核
const OrderCheck = Loadable({
  loader: () => import('layouts/OrderManage/OrderCheck'),
  loading: LoadingComponent
});

export {
  OrderQuery,
  OrderCheck,
};