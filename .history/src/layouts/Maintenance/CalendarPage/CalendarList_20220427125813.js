/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 18:31:33
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-19 10:32:11
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import './index.less'
import CalendarContent from './CalendarContent';
import CalendarRecord from './CalendarRecord';
import CalendarModal from './CalendarModal';

@inject('MaintenanceStore')
@observer
class CalendarList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;    
  }

  formRef = React.createRef();

  render() {
    return (
      <div className='calendarContainer'>
          {/* 1.标题 */}
          <div style={{fontWeight:'bold',margin:'20px'}}>保养维护日历</div>
          
          <Form
                        name="calendarForm" 
                        autoComplete='off'
                        ref={this.formRef}
          >
            <div>
              {/* 2.日历 */}
              <CalendarContent/>
              {/* 3.保养记录列表 */}
              <CalendarRecord />          
            </div>
          </Form>

          {/* 4.对话框 */}
          {
            this.store.calendarPageModalVis && <CalendarModal visible={this.store.calendarPageModalVis} />
          }

      </div>
    )
  }
  componentDidMount() {
		this.store.getMaintenanceList({
        planNo: '',
        pageSize: 10,
			  pageIndex: 1,
    });
	}
}

export default CalendarList;