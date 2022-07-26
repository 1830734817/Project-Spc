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
/* 保养等级下拉框选项 */
const levelData=['二级保养','日常保养','一级保养']
/* 保养频次下拉框选项（联动保养等级） */
const frequencyData={
  二级保养:['每半年1次'],
  日常保养:['每天1次'],
  一级保养:['每季度1次','每月1次']
}

export default class PlanMessage extends Component {

  state={
    level:frequencyData[levelData[0]],
    frequency:frequencyData[levelData[0]][0]
  }

  /* 保养等级下拉框改变事件 */
  handleLevelChange=(value)=> {
    this.setState({
      level:frequencyData[value],
      frequency:frequencyData[value][0]
    })
  }

  /* 设备状态下拉框改变事件 */
  handleFrequencyChange=(value)=> {
    this.setState({
      frequency:value
    })
  }

  render() {
    const {level}=this.state;
    return (
      <div className='PlanMessage'>
        
        {/* 保养人 */}
        <Form.Item
          label="保养人"
          name="maintenancer"
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
          <Select style={{ width:'400px'}} onChange={this.handleLevelChange}>
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
          <Select style={{ width:'400px'}}  value={this.state.frequency} onChange={this.handleFrequencyChange}>
              {level.map(l=>(
                <Option key={l}>{l}</Option>
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


