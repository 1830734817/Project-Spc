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
   message,
   Menu,
   Cascader,
   Radio,
   Space
} from 'antd';
import { 
  DownOutlined
} from '@ant-design/icons';
import './index.less';

/* 保养等级选项 */
const options = []

export default class ContentMessage extends Component {
  render() {
    return (
      <div className='ContentMessage'>
        {/* 保养计划标题 */}
        <Form.Item label="保养计划">
          <hr/>
        </Form.Item>
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
        {/* 本次保养时间 */}
        <Form.Item
          label="本次保养时间"
          name="currentDate"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input 
             disabled
          />
        </Form.Item>
        {/* 下次保养时间 */}
        <Form.Item
          label="下次保养时间"
          name="nextDate"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input 
             disabled
          />
        </Form.Item>
        {/* 保养内容标题 */}
        <Form.Item label="保养内容">
          <hr/>
        </Form.Item>
        {/* 保养内容及要求 */}
        <Form.Item
          label="保养内容及要求"
          name="requirement"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input.TextArea 
             disabled style={{height:'120px'}}
             placeholder="暂无内容"
          />
        </Form.Item>
        {/* 设备结果 */}
        <Form.Item
          label="保养结果"
          name="result"
        >
          <Radio.Group onChange={onChange}>
            <Space direction='vertical'>
              <Radio value={1}>已完成</Radio>
              <Radio value={2} defaultChecked={true}>未完成</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

      </div>
    )
  }
}

const onChange = () => {

}
