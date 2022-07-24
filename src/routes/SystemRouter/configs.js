import React from 'react';
import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 部门管理
const DepartmentManager = Loadable({
  loader: () => import('layouts/SystemManager/DepartmentManager'),
  loading: LoadingComponent
});
// 角色管理
const RoleManager = Loadable({
  loader: () => import('layouts/SystemManager/RoleManager'),
  loading: LoadingComponent
});
// 系统菜单
const SystemMenu = Loadable({
  loader: () => import('layouts/SystemManager/SystemMenu'),
  loading: LoadingComponent
});
// 用户管理
const UserManager = Loadable({
  loader: () => import('layouts/SystemManager/UserManager'),
  loading: LoadingComponent
});

//数据字典
const Dictionary = Loadable({
  loader : () => import('layouts/SystemManager/Dictionary'),
  loading: LoadingComponent
});

//租户管理
const CompanyManager = Loadable({
  loader : () => import('layouts/SystemManager/CompanyManager'),
  loading: LoadingComponent
});
//配置页面
const ConfigPage = Loadable({
  loader : () => import('layouts/SystemManager/ConfigPage'),
  loading: LoadingComponent
});

export {
  DepartmentManager,
  RoleManager,
  SystemMenu,
  UserManager,
  Dictionary,
  CompanyManager,
  ConfigPage,
};