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
import './index.less';
import { Form,Input,Button } from 'antd';

export default class DeviceMessage extends Component {
  render() {
    return (
      <div className='DeviceMessage'>
        <Form.Item
          label="保养工单"
          name="maintenanceId"
          rules={[
            {
              required:false,
              message:'自动生成无需填写'
            },
          ]}
        >
          <Input maxLength='100px'/>
        </Form.Item>
        <Form.Item
          label="设备编号"
          name="choseEquipmentId"
        >
          <Button
            htmlType="button"
          >
            选择数据
          </Button>
        </Form.Item>
      </div>
    )
  }
}
