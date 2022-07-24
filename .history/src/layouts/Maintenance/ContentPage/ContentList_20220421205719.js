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
import { Tabs,Button,Form } from 'antd';
import './index.less'
import DeviceMessage from './DeviceMessage'; 
import ContentMessage from './ContentMessage';
import ContentModal from './ContentModal'

const { TabPane } = Tabs;

export default class ContentList extends Component {
  render() {
    return (
        <div className='container'>
            {/* 1.保养内容表单 */}
            <Form
                name="contentForm" 
                onFinish={onFinish} 
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                
                {/* 1.1标签页 */}
                <Tabs style={{height:'73vh'}} onChange={callback} type="card"
                      size="default" tabBarGutter="5px"
                >
                    
                    {/* 1.1.1设备信息 */}
                    <TabPane tab="设备信息" key="1">
                        <DeviceMessage/>
                    </TabPane>

                    {/* 1.1.2保养内容 */}
                    <TabPane tab="保养内容" key="2">
                        <ContentMessage/>
                    </TabPane>
                </Tabs>

                {/*1.2提交按钮*/}

                <Form.Item>
                    <Button type="primary" htmlType="submit"
                            style={{ margin: '2px 10px', padding:'0 40px', verticalAlign: 'middle'}}
                    >   
                    提交
                    </Button>
                </Form.Item>
              

            </Form>

            {/* 2.对话框 */}
            {
                false&&<ContentModal/>
            }

        </div>
    )
  }
}

const callback = (key) => {
    // alert("changed");
}

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


