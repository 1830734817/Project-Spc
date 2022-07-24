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
import { Form,Input,Button } from 'antd';
import { 
  DatabaseOutlined
} from '@ant-design/icons';
import './index.less';


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
          <Input style={{ width:'100px'}} disabled='true'/>
        </Form.Item>
        <Form.Item
          label="设备编号"
          name="choseEquipmentId"
        >
          <Button
            htmlType="button"
            icon={<DatabaseOutlined />}
            style={{ width:'100px'}}
          >
            选择数据
          </Button>
        </Form.Item>
        <Form.Item
          label="设备编号"
          name="equipmentId"
          rules={[
            {
              required:false,
              message:'暂无内容'
            },
          ]}
        >
          <Input disabled='true'/>
        </Form.Item>
      </div>
    )
  }
}