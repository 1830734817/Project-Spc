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
import {
   Form,
   Input,
   Dropdown,
   message,
   Menu,
   Button,
   Cascader
} from 'antd';
import { 
  DownOutlined
} from '@ant-design/icons';
import './index.less';

/* “保养等级”菜单点击事件 */
const handleLevelMenuClick = (e)=>{
  message.info('Click on menu item.');
}

/* “保养等级”下拉框菜单 */
const levelMenu = (
  <Menu onClick={handleLevelMenuClick}>
    <Menu.Item key="1">
    </Menu.Item>
  </Menu>
); 


const options = [
  {
    value:'1',
    label:'1'
  },
  {
    value:'2',
    label:'2'
  }
]

export default class ContentMessage extends Component {
  render() {
    return (
      <div className='ContentMessage'>
        {/* 保养负责人 */}
        <Form.Item
          label="保养负责人"
          name="principal"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input style={{ width:'400px'}}/>
        </Form.Item>
        {/* 保养等级 */}
        <Form.Item
          label="保养等级"
          name="level"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Cascader style={{ width:'400px'}} options={options} placeholder=""/>
        </Form.Item>
        {/* 保养频次 */}
        <Form.Item
          label="保养频次"
          name="frequency"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input 
            placeholder="暂无内容" disabled
          />
        </Form.Item>


      </div>
    )
  }
}
