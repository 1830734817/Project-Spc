import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 首页
const HomePage = Loadable({
  loader: () => import('layouts/HomeLayout/HomePage'),
  loading: LoadingComponent
});

// 数据表格
const DatatableRouter = Loadable({
  loader: () => import('../DatatableRouter'),
  loading: LoadingComponent
});

// 生产计划
// const ScheduleRouter = Loadable({
//   loader: () => import('../ScheduleRouter'),
//   loading: LoadingComponent
// });

// 图表操作
// const ChartRouter = Loadable({
//   loader: () => import('../ChartRouter'),
//   loading: LoadingComponent
// });

// // 计划管理
// const PlanRouter = Loadable({
//   loader: () => import('../PlanRouter'),
//   loading: LoadingComponent
// });

// // 生产管理
// const ProductionRouter = Loadable({
//   loader: () => import('../ProductionRouter'),
//   loading: LoadingComponent
// });

// // 设备管理
// const DeviceRouter = Loadable({
//   loader: () => import('../DeviceRouter'),
//   loading: LoadingComponent
// });

// // 质量管理
// const InspectRouter = Loadable({
//   loader: () => import('../InspectRouter'),
//   loading: LoadingComponent
// });

// // 物流管理
// const LogisticsRouter = Loadable({
//   loader: () => import('../LogisticsRouter'),
//   loading: LoadingComponent
// });

// // 商业智能管理
// const IntelAIRouter = Loadable({
//   loader: () => import('../IntelAIRouter'),
//   loading: LoadingComponent
// });

// // 异常管理
// const AbnormalResponse = Loadable({
//   loader: () => import('../AbnormalRouter'),
//   loading: LoadingComponent
// });

// // 基础管理
// const BasicRouter = Loadable({
//   loader: () => import('../BasicRouter'),
//   loading: LoadingComponent
// });

// 系统管理
const SystemRouter = Loadable({
  loader: () => import('../SystemRouter'),
  loading: LoadingComponent
});

// // 追溯管理
// const RetrospectRouter = Loadable({
//   loader: () => import('../RetrospectRouter'),
//   loading: LoadingComponent
// });

// // 工具管理
// const ToolsRouter = Loadable({
//   loader: () => import('../ToolsRouter'),
//   loading: LoadingComponent
// });

// // 条码管理
// const CodeRouter = Loadable({
//   loader: () => import('../CodeRouter'),
//   loading: LoadingComponent
// });

// // 图文管理
// const GraphicLayout = Loadable({
//   loader: () => import('layouts/GraphicManage'),
//   loading: LoadingComponent
// });

// // 报表管理
// const ReportFormsRouter = Loadable({
//   loader: () => import('../ReportFormsRouter'),
//   loading: LoadingComponent
// });

// // 空白首页
// const BlankPage = Loadable({
//     loader: () => import('layouts/HomeLayout/blankPage.js'),
//     loading: LoadingComponent
// });

export {
  HomePage,
  DatatableRouter,
  //ScheduleRouter,
  //ChartRouter,
  // PlanRouter,
  // ProductionRouter,
  // LogisticsRouter,
  // InspectRouter,
  // DeviceRouter,
  SystemRouter,
  // BasicRouter,
  // IntelAIRouter,
  // AbnormalResponse,
  // RetrospectRouter,
  // CodeRouter,
  // ToolsRouter,
  // GraphicLayout,
  // ReportFormsRouter,
  // BlankPage,
};
