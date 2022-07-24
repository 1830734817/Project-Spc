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
   Select,
   Radio,
   Space
} from 'antd';
import './index.less';

const {Option} = Select;

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
        >
          <Select style={{ width:'400px'}} onChange={handleChange}>

          </Select>
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
             disabled placeholder="暂无内容"
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
             disabled placeholder="暂无内容"
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

        {/* 保养结果 */}
        <Form.Item
          label="保养结果"
          name="result"
        >
          <Radio.Group onChange={onChange} name="result" defaultValue="2">
            <Space direction='vertical'>
              <Radio value="1" >已完成</Radio>
              <Radio value="2" >未完成</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* 设备状态 */}
        <Form.Item
          label="设备状态"
          name="state"
        >
          <Cascader style={{ width:'400px'}} options={stateOptions} placeholder=""/>
        </Form.Item>
        
        {/* 保养信息记录 */}
        <Form.Item
          label="保养信息记录"
          name="record"
          rules={[
            {
              required:false,
            },
          ]}
        >
          <Input.TextArea style={{height:'150px',width:'600px'}}
             placeholder="无可不填"
          />
        </Form.Item>
      </div>

    )
  }
}

const onChange = () => {

}

const handleChange=(value)=> {
  console.log(`selected ${value}`);
}
