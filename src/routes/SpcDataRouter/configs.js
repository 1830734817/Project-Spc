import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// spc数据表格
const SpcTable = Loadable({
  loader: () => import('layouts/SpcData/SpcTable'),
  loading: LoadingComponent
});

// spc控制图
const SpcChart = Loadable({
  loader: () => import('layouts/SpcData/SpcChart/'),
  loading: LoadingComponent
});



export {
  SpcTable,
  SpcChart
};