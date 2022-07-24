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
import { Modal,Table,Tooltip } from 'antd'
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

const data = [
  {
    key: '1',
    equipmentId: '1',
  },
  {
    key: '2',
    equipmentId: '2',
  },
  {
    key: '2',
    equipmentId: '2',
  },
  {
    key: '3',
    equipmentId: '3',
  },
  {
    key: '4',
    equipmentId: '4',
  },
  {
    key: '5',
    equipmentId: '5',
  },
  {
    key: '6',
    equipmentId: '6',
  },
  {
    key: '7',
    equipmentId: '7',
  }
]

@inject('MaintenanceStore')
@observer
class ContentModal extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;
  };

  render() {
    return (
      <Modal title="选择数据" visible={this.store.contentPageModalVis} 
             onCancel={this.handleClose} 
             style={{ top: '20px'}} width={800}
      >
        <Table  
          rowSelection={{     
            type: 'checkbox',
            ...rowSelection,
          }} 
          columns={columns} 
          dataSource={data}
          bordered
          scroll={{y:420}}
        />
      </Modal>
    )
  }

  handleClose = () => {
    this.store.setContentPageModalVis(false);
  };

}

export default ContentModal;
