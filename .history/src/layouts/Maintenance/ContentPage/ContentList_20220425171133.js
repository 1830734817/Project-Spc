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
import { toJS } from 'mobx';
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

    formRef = React.createRef();

    render() {
        return (
            <div className='contentContainer'>
                {/* 1.保养内容表单 */}

                    <Form
                        name="contentForm" 
                        onFinish={onFinish} 
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                        layout='vertical'
                        ref={this.formRef}
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
                        this.store.contentPageModalVis && <ContentModal visible={this.store.contentPageModalVis} inputChange={this.inputChange}/>
                    }

            </div>
        )
    }

    //输入框中数据变化时
    inputChange = () => {
        const {contentCheckedRow}=toJS(this.store);
        console.log(contentCheckedRow);
        this.formRef.current.setFieldsValue({
          equipmentId: contentCheckedRow.equipmentId,      
        });
    };
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