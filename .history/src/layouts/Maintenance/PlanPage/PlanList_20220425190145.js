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
import {toJS} from 'mobx'
import { Form,Tabs,Button } from 'antd'
import './index.less'
import DeviceMessage from './DeviceMessage'
import PlanMessage from './PlanMessage'
import PlanModal from './PlanModal'

const { TabPane } = Tabs;

@inject('MaintenanceStore')
@observer
class PlanList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.MaintenanceStore;    
  }

  formRef = React.createRef();

  render() {
    return (
      <div className='container'>
        {/* 1.保养计划表单 */}
          <Form
            name="planForm"
            onFinish={onFinish} 
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
          >

            {/* 1.1标签页 */}
            <Tabs
              style={{height:'75vh'}} onChange={callback} type="card"
              size="default" tabBarGutter="5px" 
            >
            
                {/* 1.1.1设备信息 */}
                <TabPane tab="设备信息" key="1" style={{overflow:'auto'}}>
                    <DeviceMessage/>
                </TabPane>

                {/* 1.1.2保养信息 */}
                <TabPane tab="保养信息" key="2" style={{overflow:'auto'}}>
                    <PlanMessage/>
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
          this.store.planPageModalVis && <PlanModal visible={this.store.planPageModalVis} inputChange={this.inputChange}/>
        }
      </div>
    )
  }

    //输入框中数据变化时
    inputChange = () => {
      const {planCheckedRow}=toJS(this.store);

      this.formRef.current.setFieldsValue({
        equipmentId:contentCheckedRow[0].equipmentId, 
        principal:contentCheckedRow[0].principal
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

export default PlanList;