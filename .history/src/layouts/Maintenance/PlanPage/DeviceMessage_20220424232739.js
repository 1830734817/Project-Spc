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

@inject('MaintenanceStore')
@observer
class DeviceMessage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;    
  }
  render() {
    return (
      <div className='DeviceMessage'>

        {/* 设备基础信息 */}
        <Form.Item
          label="设备基础信息"
          name="choseEquipment"
        >
          <Button
            htmlType="button"
            icon={<DatabaseOutlined />}
            style={{ width:'400px'}}
            onClick={()=>{
              this.store.setPlanPageModalVis(true);
            }}
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
            },
          ]}
        >
          <Input 
            placeholder="暂无内容" disabled
          />
        </Form.Item>

        {/* 设备名称 */}
        <Form.Item
          label="设备名称"
          name="equipmentName"
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

        {/* 规格型号 */}
        <Form.Item
          label="规格型号"
          name="model"
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

        {/* 设备类型 */}
        <Form.Item
          label="设备类型"
          name="type"
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

        {/* 安装地点 */}
        <Form.Item
          label="安装地点"
          name="location"
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

        {/* 负责人 */}
        <Form.Item
          label="负责人"
          name="principal"
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

        {/* 联系方式 */}
        <Form.Item
          label="联系方式"
          name="contact"
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

        {/* 生产厂家 */}
        <Form.Item
          label="生产厂家"
          name="producer"
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

        {/* 供应商 */}
        <Form.Item
          label="供应商"
          name="supplier"
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

        {/* 设备编号 */}
        <Form.Item
          label="设备编号"
          name="changeEquipmentId"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input style={{ width:'400px'}}/>
        </Form.Item>
        
        {/* 设备名称 */}
        <Form.Item
          label="设备名称"
          name="changeEquipmentName"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input style={{ width:'400px'}}/>
        </Form.Item>

      </div>
    )
  }
}

export default DeviceMessage;