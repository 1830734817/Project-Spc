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
import { } from 'antd'
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
