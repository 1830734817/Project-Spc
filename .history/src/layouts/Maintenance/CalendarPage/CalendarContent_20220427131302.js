/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 18:31:33
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-19 10:32:11
 */


import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Calendar,Form } from 'antd';
import './index.less'



@inject('MaintenanceStore')
@observer
class CalendarContent extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;    
  }
  render() {
   
    return (
      <div className="site-calendar-demo-card">
          <Calendar fullscreen={false} onSelect={this.onSelect} />
      </div>
    )
  }
  onSelect=(value)=> {
    this.store.selectedDate=value.format('YYYY-MM-DD');
    this.store.getDateData(this.store.selectedDate);
    this.props.updateCalendarRecord();
  }
}

export default CalendarContent; 
