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
import { Tabs,Button } from 'antd';
import './index.less'
import DeviceMessage from './DeviceMessage'; 
import ContentMessage from './ContentMessage';
import ContentModal from './ContentModal'

const { TabPane } = Tabs;

export default class ContentList extends Component {
  render() {
    return (
        <div className='container'>
            {/* 1.标签页 */}
                <Tabs style={{height:'75vh'}} onChange={callback} type="card"
                      size="default" tabBarGutter="5px"
                >
                    
                    {/* 设备信息 */}
                    <TabPane tab="设备信息" key="1">
                        <DeviceMessage/>
                    </TabPane>

                    {/* 保养内容 */}
                    <TabPane tab="保养内容" key="2">
                        <ContentMessage/>
                    </TabPane>

                </Tabs>
            {/* 2.提交按钮*/}
                <Button type="primary" 
                        style={{ margin: '2px 10px', padding:'0 40px', verticalAlign: 'middle'}}
                >   
                    提交
                </Button>

            {/* 3.对话框 */}
            {
                false&&<ContentModal/>
            }

        </div>
    )
  }
}

function callback(key) {
    // alert("changed");
}


