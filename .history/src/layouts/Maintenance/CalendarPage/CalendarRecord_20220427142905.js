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
import {toJS} from'mobx'
import { List } from 'antd';
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
        <List
          bordered={false}
          dataSource={toJS(this.store.chosenDateRowName)}
          locale={
            {emptyText:'当日无数据'}
          }
          renderItem={item => (
            <List.Item
              onClick={()=>{
                this.store.chosenDateRowName.map((key,value)=>{
                  console.log(value,item)
                  if(value === item){
                    console.log(1)
                    this.store.setModalEditData(toJS(this.store.chosenDateRow)[0]);
                    console.log(this.store.modalEditData)
                  }
                })
                // this.store.setIsModalEdit(true);
                this.store.setCalendarPageModalVis(true);
              }}
              style={{cursor:"pointer"}}
            >
              {item}
            </List.Item>
          )}
        />
    )
  }

}

export default CalendarRecord;