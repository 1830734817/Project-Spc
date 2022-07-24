/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-18 20:31:11
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,Tooltip } from 'antd'
import './index.less'

/* 表格第一列选择框事件 */
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const columns = [
  {
    title: '设备编号',
    dataIndex: 'equipmentId',
    key: 'equipmentId',
    width:100,
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
    width:100,
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
    title: '规格型号',
    dataIndex: 'model',
    key: 'model',
    width:100,
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
    title: '设备类型',
    dataIndex: 'type',
    key: 'type',
    width:100,
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
    title: '安装地点',
    dataIndex: 'location',
    key: 'location',
    width:100,
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
    title: '负责人',
    dataIndex: 'principal',
    key: 'principal',
    width:100,
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
    title: '联系方式',
    dataIndex: 'contact',
    key: 'contact',
    width:100,
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
    title: '生产厂家',
    dataIndex: 'producer',
    key: 'producer',
    width:100,
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
    title: '供应商',
    dataIndex: 'supplier',
    key: 'supplier',
    width:100,
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    )
  },
]

const data = [
]


@inject('MaintenanceStore')
@observer
class PlanModal extends Component {
  render() {
    return (
      <Modal title="选择数据" visible={this.store.planPageModalVis} 
      onCancel={this.handleClose} onOk={this.handleOk} 
      style={{ top: '70px'}} width={800}
      okText="确认" cancelText="取消"

      >
        <Table  
          rowSelection={{     
            type: 'radio',
            ...rowSelection,
          }} 
          columns={columns} 
          dataSource={data}
          bordered
          scroll={{y:300}}
        />
      </Modal>
    )
  }
  
  handleClose = () => {
    this.store.setPlanPageModalVis(false);
  };

  handleOk = () => {
    this.store.setPlanPageModalVis(false);
  };
}

export default PlanModal;
