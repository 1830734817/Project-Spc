/**
 * 
 * 根路由的配置文件
 * 
 */
import LoadingComponent from '../components/ComponentLoading';
import Loadable from 'react-loadable';

const HomeRouter = Loadable({
  loader: () => import('./HomeRouter'),
  loading: LoadingComponent
});

const LoginPage = Loadable({
  loader: () => import('layouts/LoginPage'),
  loading: LoadingComponent
});

const AliIot = Loadable({
  loader: () => import('layouts/HomeLayout/AliIot'),
  loading: LoadingComponent
});

const MyTestPage = Loadable({
  loader: () => import('layouts/MyTestPage'),
  loading: LoadingComponent
});

export {
  HomeRouter,
  LoginPage,
  AliIot,
  MyTestPage
};