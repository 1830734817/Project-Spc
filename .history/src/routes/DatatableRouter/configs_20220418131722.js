/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-01-01 15:39:19
 * @LastEditors: shoen
 * @LastEditTime: 2021-05-18 14:38:17
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

//维护保养
const MaintenancePage = Loadable({
  loader: () => import('layouts/Datatable/MaintenancePage'),
  loading: LoadingComponent
});


export {
  OrderPage,
  ManufacturingbomPage,
  MaintenancePage
};