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
import { List} from 'antd';
import './index.less'

const data = [
  '[已完成]_555_二级保养_每半年1次',
  '[已完成]_123_日常保养_每天1次'
];

@inject('MaintenanceStore')
@observer
class CalendarRecord extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;    
  }
  render() {
    return (
      <Form.Item
      name="calendarRecord"
      >
        <List
          bordered={false}
          dataSource={data}
          locale={
            {emptyText:'当日无数据'}
          }
          renderItem={item => (
            <List.Item
              onClick={()=>{
                this.store.setCalendarPageModalVis(true);
              }}
              style={{cursor:"pointer"}}
            >
              {item}
            </List.Item>
          )}
        />
      </Form.Item> 
    )
  }

}

export default CalendarRecord;
