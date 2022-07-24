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

// 保养数据
const DataPage = Loadable({
  loader: () => import('layouts/Maintenance/OrderPage'),
  loading: LoadingComponent
});

// 保养内容
const ContentPage = Loadable({
  loader: () => import('layouts/Maintenance/ManufacturingbomPage'),
  loading: LoadingComponent
});

// 保养计划
const PlanPage = Loadable({
  loader: () => import('layouts/Maintenance/ManufacturingbomPage'),
  loading: LoadingComponent
});

// 保养日历
const CalendarPage = Loadable({
  loader: () => import('layouts/Maintenance/ManufacturingbomPage'),
  loading: LoadingComponent
});



export {
  DataPage,
  ContentPage,
  PlanPage,
  CalendarPage,
};