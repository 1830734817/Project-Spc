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

export default class CalendarRecord extends Component {
  render() {
    return (
      <List
        bordered={false}
        dataSource={data}
        locale={
          {emptyText:'当日无数据'}
        }
        renderItem={item => (
          <List.Item
            // onClick={(test)=>{
            //   console.log(test);
            // }}
          >
            {item}
          </List.Item>
        )}
      />
    )
  }
}
