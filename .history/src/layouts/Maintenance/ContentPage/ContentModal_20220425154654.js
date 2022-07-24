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
import { Modal,Table,Tooltip } from 'antd'
import './index.less'


let checkedEquipmentId; ///选中的设备编号 
/* 表格第一列选择框事件 */
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    checkedEquipmentId=selectedRows[0].equipmentId;
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
  },
  {
    key: '8',
    equipmentId: '8',
  },
  {
    key: '9',
    equipmentId: '9',
  },
  {
    key: '10',
    equipmentId: '10',
  },
  {
    key: '11',
    equipmentId: '11',
  },
  {
    key: '12',
    equipmentId: '12',
  },
  {
    key: '13',
    equipmentId: '13',
  },
  {
    key: '14',
    equipmentId: '14',
  },
]

@withRouter
@inject('MaintenanceStore')
@observer
class ContentModal extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;
  };

  render() {
    const {maintenanceContentList} = toJS(this.store);

    return (
      <Modal title="选择数据" visible={this.store.contentPageModalVis} 
             onCancel={this.handleClose} onOk={this.handleOk} 
             style={{ top: '70px'}} width={800}
             okText="确认" cancelText="取消"

      >
        <Table  
          name="contentModalForm" 
          rowSelection={{     
            type: 'radio',
            ...rowSelection,
          }} 
          columns={columns} 
          dataSource={maintenanceContentList}
          bordered
          scroll={{y:300}}
        />
      </Modal>
    )
  }

  componentDidMount() {
    this.store.getMaintenanceContentList({
			planNo: '',
			pageIndex: 1,
			pageSize: 10,
		});
	}

  handleClose = () => {
    this.store.setContentPageModalVis(false);
  };

  handleOk = () => {
    this.store.getContentCheckedRow(checkedEquipmentId);
    form.submit();//将modal数据提交给Form.Provider
    this.store.setContentPageModalVis(false);
  };

}

export default ContentModal;
