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

];

export default class CalendarRecord extends Component {
  render() {
    return (
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered={false}
        dataSource={data}
        locale={
          <div>当日无数据</div>
        }
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    )
  }
}
