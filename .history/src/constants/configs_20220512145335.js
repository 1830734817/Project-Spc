
// 菜单静态配置
export const MenuObj = {
  id: 'root',
  name: '首页',
  path: '/index',
  activeRouter: [],
  displayNone: false,
  leafMenuModels: [
    // 数据表格
    {
      id: 20,
      name: '数据表格',
      icon: 'datatable',
      path: '/datatable',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 2001,
          parentId: 20,
          name: '订单管理',
          path: '/datatable/work',
          action: false,
          displayNone: false
        },
        {
          id: 2002,
          parentId: 20,
          name: '工作管理',
          path: '/datatable/work',
          action: false,
          displayNone: false
        },
        {
          id: 2003,
          parentId: 20,
          name: '制造BOM',
          path: '/datatable/manufacturingbom',
          action: false,
          displayNone: false
        },
        {
          id: 2004,
          parentId: 20,
          name: '资源管理',
          path: '/datatable/resource',
          action: false,
          displayNone: false,
        },
        {
          id:2005,
          parentId:20,
          name:'物料管理',
          path:'/datatable/item',
          action:false,
          displayNone:false,
        },
        {
          id:2006,
          parentId:20,
          name:'生产日历',
          path:'/datatable/calendar',
          action:false,
          displayNone:false,
        },
        {
          id:2007,
          parentId:20,
          name:'出勤模式',
          path:'/datatable/shift',
          action:false,
          displayNone:false,
        },
        {
          id:2008,
          parentId:20,
          name:'资源评估',
          path:'/datatable/resourceeval',
          action:false,
          displayNone:false,
        },
      ]
    },
    // 生产计划
    {
      id: 21,
      name: '生产计划',
      icon: 'schedule',
      path: '/schedule',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 2101,
          parentId: 21,
          name: '项目设置',
          path: '/schedule/project',
          action: false,
          displayNone: false
        },
        {
          id: 2102,
          parentId: 21,
          name: '参数设置',
          path: '/schedule/schedulingparameter',
          action: false,
          displayNone: false
        },
        {
          id: 2103,
          parentId: 22,
          name: '高级排程',
          path: '/schedule/scheduling',
          action: false,
          displayNone: false
        },
      ]
    }, 
    // 图表操作 
    {
      id: 22,
      name: '图表操作',
      icon: 'chart',
      path: '/chart',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 2201,
          parentId: 22,
          name: '资源甘特图',
          path: '/chart/resourcegantt',
          action: false,
          displayNone: false
        },
        {
          id: 2202,
          parentId: 22,
          name: '订单甘特图',
          path: '/chart/ordergantt',
          action: false,
          displayNone: false
        },
        {
          id: 2203,
          parentId: 22,
          name: '资源负荷图',
          path: '/chart/resourceload',
          action: false,
          displayNone: false
        },
      ]
    }, 
    // 系统管理
    {
      id: 12,
      name: '系统管理',
      icon: 'system',
      path: '/system',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 1201,
          parentId: 12,
          name: '部门管理',
          path: '/system/department',
          action: false,
          displayNone: false
        },
        {
          id: 1202,
          parentId: 12,
          name: '角色管理',
          path: '/system/role',
          action: false,
          displayNone: false
        },
        {
          id: 1203,
          parentId: 12,
          name: '用户管理',
          path: '/system/user',
          action: false,
          displayNone: false
        },
        {
          id: 1204,
          parentId: 12,
          name: '系统菜单',
          path: '/system/menu',
          action: false,
          displayNone: false,
        },
        {
          id:1205,
          parentId:12,
          name:'租户管理',
          path:'/system/company',
          action:false,
          displayNone:false,
        },
        {
          id:1206,
          parentId:12,
          name:'配置页面',
          path:'/system/config',
          action:false,
          displayNone:false,
        },
      ]
    },    
    //维护保养
    {
      id: 50,
      name: '维护保养',
      icon: 'datatable',
      path: '/datatable',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 501,
          parentId: 50,
          name: '保养数据',
          path: '/maintenance/data',
          action: false,
          displayNone: false
        },
        {
          id: 502,
          parentId: 50,
          name: '保养内容',
          path: '/maintenance/content',
          action: false,
          displayNone: false
        },
        {
          id: 503,
          parentId: 50,
          name: '保养计划',
          path: '/maintenance/plan',
          action: false,
          displayNone: false
        },
        {
          id: 504,
          parentId: 50,
          name: '保养日历',
          path: '/maintenance/calendar',
          action: false,
          displayNone: false
        },
      ]
    },
  ]
};

/* 设备点检 3级菜单 */
export const inspectList = [
  {
    id: 301,
    parentName: '设备点检',
    name: '点检库',
    displayNone: false,
  },
  {
    id: 302,
    parentName: '设备点检',
    name: '点检方案',
    displayNone: false,
  },
  {
    id: 303,
    parentName: '设备点检',
    name: '点检计划',
    displayNone: false,
  },
  {
    id: 304,
    parentName: '设备点检',
    name: '点检查询',
    displayNone: false,
  }
]

export const maintainList = [
  {
    id: 401,
    parentName: '设备保养',
    name: '保养库',
    displayNone: false,
  },
  {
    id: 402,
    parentName: '设备保养',
    name: '保养方案',
    displayNone: false,
  },
  {
    id: 403,
    parentName: '设备保养',
    name: '保养计划',
    displayNone: false,
  },
  {
    id: 404,
    parentName: '设备保养',
    name: '保养查询',
    displayNone: false,
  }
]

// 媒体查询 ：根据 maxWidth & minWidth 条件满足情况返回 样式screen-xs...
export const Media_Query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
};

export const s_size = ['screen-xs'];
export const m_size = ['screen-sm', 'screen-md'];
export const l_size = ['screen-lg', 'screen-xl', 'screen-xxl'];
