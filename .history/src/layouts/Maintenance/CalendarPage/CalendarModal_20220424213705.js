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
import ContentList from '../ContentPage/ContentList';

@inject('MaintenanceStore')
@observer
class CalendarModal extends Component {
  render() {
    return (
      <div>CalendarModal</div>
    )
  }
}

export default CalendarModal;
