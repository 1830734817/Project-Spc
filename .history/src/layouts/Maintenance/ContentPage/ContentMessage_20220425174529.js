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
import { toJS } from 'mobx';
import {
   Form,
   Input,
   Select,
   Radio,
   Space
} from 'antd';
import './index.less';

const {Option} = Select;

@inject('MaintenanceStore')
@observer
class ContentMessage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;    
  }
  render() {
    const {contentCheckedRow}=toJS(this.store);

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
          <Input style={{ width:'400px'}} disabled placeholder="暂无内容"/>
        </Form.Item>

        {/* 保养等级 */}
        <Form.Item
          label="保养等级"
          name="level"
        >
          <Select style={{ width:'400px'}} onChange={handleLevelChange}>
            <Option value='二级保养'>二级保养</Option>
            <Option value='日常保养'>日常保养</Option>
            <Option value='一级保养'>一级保养</Option>
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
          <Select style={{ width:'400px'}} onChange={handleStateChange}>
            <Option value='报废'>报废</Option>
            <Option value='带病运行'>带病运行</Option>
            <Option value='停机待修'>停机待修</Option>
            <Option value='停用'>停用</Option>
            <Option value='正常运行'>正常运行</Option>
          </Select>
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

/* 保养结果单选框改变事件 */
const onChange = () => {

}

/* 保养等级下拉框改变事件 */
const handleLevelChange=(value)=> {
  // console.log(`selected ${value}`);
}

/* 设备状态下拉框改变事件 */
const handleStateChange=(value)=> {

}

export default ContentMessage;