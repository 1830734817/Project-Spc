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
import { Form,Input,Dropdown } from 'antd';
import './index.less';


export default class ContentMessage extends Component {
  render() {
    return (
      <div className='ContentMessage'>
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

        <Form.Item
          label="保养等级"
          name="level"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Dropdown
            style={{ width:'400px'}}
            overlay={levelMenu} placement="bottom"
          >
            <Button 
              style={{ verticalAlign: 'middle'}}
            >
              <DownOutlined />
            </Button>
          </Dropdown>
        </Form.Item>

      </div>
    )
  }
}
