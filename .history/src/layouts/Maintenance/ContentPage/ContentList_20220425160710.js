/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 18:31:33
 * @LastEditors: zhihao
 * @LastEditTime: 2022-04-19 10:32:11
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form,Tabs,Button} from 'antd'
import './index.less'
import DeviceMessage from './DeviceMessage'
import ContentMessage from './ContentMessage'
import ContentModal from './ContentModal'

const { TabPane } = Tabs;

@inject('MaintenanceStore')
@observer
class ContentList extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.MaintenanceStore;    
    }
    render() {
        return (
            <div className='contentContainer'>
                {/* 1.保养内容表单 */}
                <Form.Provider   //用与对话框可标签页之间的数据传递
                    onFormFinish={(name,{values,forms})=>{ //子表单提交时触发
                        if(name === 'contentModalForm'){
                            const {contentForm} = forms;
                            console.log(values,forms);
                        }
                    }}
                >

                    <Form
                        name="contentForm" 
                        onFinish={onFinish} 
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                        layout='vertical'
                    >
                        
                        {/* 1.1标签页 */}
                        <Tabs style={{height:'75vh'}} onChange={callback} type="card"
                            size="default" tabBarGutter="5px" 
                        >
                            
                            {/* 1.1.1设备信息 */}
                            <TabPane tab="设备信息" key="1" style={{overflow:'auto'}}>
                                <DeviceMessage/>
                            </TabPane>

                            {/* 1.1.2保养内容 */}
                            <TabPane tab="保养内容" key="2" style={{overflow:'auto'}}>
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
                        this.store.contentPageModalVis && <ContentModal visible={this.store.contentPageModalVis} />
                    }

                </Form.Provider> 

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


export default  ContentList;