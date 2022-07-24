/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 12:20:12
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 14:42:37
 */

import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 订单
const OrderPage = Loadable({
  loader: () => import('layouts/Datatable/OrderPage'),
  loading: LoadingComponent
});

// 制造BOM
const ManufacturingbomPage = Loadable({
  loader: () => import('layouts/Datatable/ManufacturingbomPage'),
  loading: LoadingComponent
});



export {
  OrderPage,
  ManufacturingbomPage,
};