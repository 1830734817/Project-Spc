/* 订单状态 */
export const orderStatus = {
	1: '未下发',
  2: '已下发',
  3: "已排程",
  4: '生产中',
  5: '生产完成',
  99: '订单取消'
}

/* 工单状态 */
export const workStatus = {
  1: '未处理',
  2: '已下发',
	3: "已开启",
	4: "加工中",
	5: "暂停中",
  6: "已完结",
  99: "已回收",
}

/* 生产计划单状态 */
export const planStatus = {
	1:'未处理',
  2:'已排程',
  3:'生产中',
  4:'计划完成',
  99:'计划取消',
}

/* 工具状态 */
export const MouldStatus = {
  1: "在库",
  2: "保养中",
  3: "维修中",
  4: "生产中",
  5: '待入库',
}

/* 工艺参数类型 */
export const techParamsType = [
	{
		value:'数值型',
		key:0
	},{
		value:'布尔型',
		key:1
	}
]

/* 所有项添加的类型数据 */
export const server_list = [
  {
    id:1,
    name:'数字输入型'
  },
  {
    id:2,
    name:'单选型'
  },
  {
    id:3,
    name:'多选型'
  },
  {
    id:4,
    name:'文本输入型'
  },
  {
    id:5,
    name:'上传图片型'
  },
  {
    id:6,
    name:'上传音频型'
  },
  {
    id:7,
    name:'日期选择型'
  },
  {
    id:8,
    name:'下拉单选型',
  },
  {
    id:9,
    name:'下拉多选型',
  },
  
]


/* 关于维保类型的配置 */
export const maintainType = {
  1: '点检',
  2: '保养',
  3: '故障',
  4: '首检',
  5: '巡检',
  6: '末检',
  7: '模具保养',
  8: '模具故障',
  9: '工装保养',
  10: '工装故障',
}

/* 异常类型 */
export const Abnormal_type = {
  1:'设备',
  2:'生产',
  3:'质量',
  4:'其他'
}