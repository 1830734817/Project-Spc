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

@inject('MaintenanceStore')
@observer
class PlanModal extends Component {
  render() {
    return (
      <div>PlanModal</div>
    )
  }
}

export default PlanModal;
