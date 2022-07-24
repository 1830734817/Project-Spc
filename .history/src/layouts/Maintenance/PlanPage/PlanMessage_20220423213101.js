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
import { Form,Input,Select } from 'antd';
import './index.less';

const {Option} = Select;
const levelData=['二级保养','日常保养','一级保养']
const frequencyData={
  二级保养:['每半年1次'],
  日常保养:['每天1次'],
  一级保养:['每季度1次','每月1次']
}
const [levels,setLevels]=React.useState(frequencyData[levelData[0]]);
const [frequencies,setFrequencies]=React.useState(frequencyData[levelData[0]][0]);

export default class PlanMessage extends Component {
  render() {
    return (
      <div className='PlanMessage'>
        
        {/* 保养人 */}
        <Form.Item
          label="保养人"
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
          <Select style={{ width:'400px'}} onChange={handleLevelChange}>
            {levelData.map(level=>(
              <Option key={level}>{level}</Option>
            ))}
          </Select>
        </Form.Item>

        {/* 保养频次 */}
        <Form.Item
          label="保养频次"
          name="frequency"
        >
          <Select style={{ width:'400px'}} onChange={handleFrequencyChange}>
            {frequencyData.map(frequency=>(
              <Option key={frequency}>{frequency}</Option>
            ))}
          </Select>
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
          <Input.TextArea style={{height:'150px',width:'600px'}}/>
        </Form.Item>

      </div>
    )
  }
}

/* 保养等级下拉框改变事件 */
const handleLevelChange=(value)=> {
  setLevels(frequencyData[value]);
  setFrequencies(frequencyData[value][0]);
}

/* 设备状态下拉框改变事件 */
const handleFrequencyChange=(value)=> {
  setFrequencies(value);
}
