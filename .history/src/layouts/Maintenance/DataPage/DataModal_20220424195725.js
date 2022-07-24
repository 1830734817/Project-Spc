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
import { Modal } from 'antd'
import './index.less'

@inject('MaintenanceStore')
class DataModal extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.MaintenanceStore;
	};

  render() {
    return (
      <Modal title="设备保养单" visible={dataPageModalVis} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
}

const handleOk = () => {
  this.store.dataPageModalVis(false);
};

const handleCancel = () => {
  this.store.dataPageModalVis(false);
};

export default DataModal;

