/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 20:31:11
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import {Table,Tooltip} from 'antd'
import './index.less';

const columns = [
  {
    title: '保养工单',
    dataIndex: 'maintenanceId',
    key: 'maintenanceId',
    width: 110,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '设备编号-主键',
    dataIndex: 'equipmentMainId',
    key: 'equipmentMainId',
    width: 120,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentId',
    key: 'equipmentId',
    width: 140,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    key: 'equipmentName',
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '保养负责人',
    dataIndex: 'principal',
    key: 'principal',
    width: 110,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '保养等级',
    dataIndex: 'level',
    key: 'level',
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '保养频次',
    dataIndex: 'frequency',
    key: 'frequency',
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '间隔天数',
    dataIndex: 'interval',
    key: 'interval',
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '本次保养时间',
    dataIndex: 'currentDate',
    key: 'currentDate',
    width: 120,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '下次保养时间',
    dataIndex: 'nextDate',
    key: 'nextDate',
    width: 120,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '保养内容及要求',
    dataIndex: 'requirement',
    key: 'requirement',
    width: 200,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '保养结果',
    dataIndex: 'result',
    key: 'result',
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '设备状态',
    dataIndex: 'state',
    key: 'state',
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '保养信息记录',
    dataIndex: 'record',
    key: 'record',
    width: 200,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '提交人',
    dataIndex: 'submitter',
    key: 'submitter',
    width: 110,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    width: 120,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 120,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  }
]

const data = [
  {
    key: '1',
    maintenanceId: '',
    equipmentMainId: '',
    equipmentId: '',
    equipmentName: '',
    principal:'',
    level:'',
    frequency:'',
    interval:'',
    currentDate:'',
    nextDate:'',
    requirement:'',
    result:'',
    state:'',
    record:'',
    submitter:'',
    submitTime:'',
    updateTime:''
  }
]

/* 表格第一列选择框事件 */
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};


@withRouter
@inject('MaintenanceStore')
@observer
class DataTable extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.MaintenanceStore;
	};

  render() {
    const {maintenanceList} = toJS(this.store);

    return (
      <div className='dataTable'>        
        <Table  rowSelection={{     
           type: 'checkbox',
           ...rowSelection,
          }} 
          columns={columns} 
          dataSource={maintenanceList}
          bordered
          scroll={{ x: 1300 ,y:420}}
        />
      </div>
    )
  }


  componentDidMount() {
    this.store.getMaintenanceList({
			planNo: '',
			pageIndex: 1,
			pageSize: 10,
		});
	}
}

export default DataTable;