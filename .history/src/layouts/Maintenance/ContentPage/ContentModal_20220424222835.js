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
import { Modal,Table } from 'antd'
import './index.less'

/* 表格第一列选择框事件 */
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

@inject('MaintenanceStore')
@observer
class ContentModal extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;
  };

  render() {
    return (
      <Modal title="设备保养单" visible={this.store.calendarPageModalVis} 
             onCancel={this.handleClose} footer={null}
             style={{ top: '0'}} width={800}
      >
        <Table  
          rowSelection={{     
            type: 'checkbox',
            ...rowSelection,
          }} 
          columns={columns} 
          dataSource={maintenanceList}
          bordered
          scroll={{ x: 1300 ,y:420}}
          onRow={(key,record) => {
            return {
              onClick: event => {
                // console.log('row', key, record)
                this.store.setDataPageModalVis(true);
              }, // 点击行
            };
          }}
        />
      </Modal>
    )
  }

  handleClose = () => {
    this.store.setCalendarPageModalVis(false);
  };

}

export default ContentModal;
