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
        {/* 保养工单 */}
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
          <Input 
            placeholder="自动生成无需填写" 
            style={{ width:'400px'}} disabled
          />
        </Form.Item>
          {/* 选择设备编号 */}
        <Form.Item
          label="设备编号"
          name="choseEquipmentId"
        >
          <Button
            htmlType="button"
            icon={<DatabaseOutlined />}
            style={{ width:'400px'}}
          >
            选择数据
          </Button>
        </Form.Item>
          {/* 设备编号 */}
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
          <Input
            placeholder="暂无内容" 
            disabled
          />
        </Form.Item>

      </div>
    )
  }
}
