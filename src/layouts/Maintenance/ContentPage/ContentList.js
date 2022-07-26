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
import { Form,Tabs,Button, message} from 'antd'
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
                        onFinish={this.onFinish} 
                        onFinishFailed={this.onFinishFailed}
                        autoComplete='off'
                        layout='vertical'
                        ref={this.formRef}
                    >
                        
                        {/* 1.1标签页 */}
                        <Tabs style={{height:'75vh'}}  type="card"
                            size="default" tabBarGutter="5px" 
                        >
                            
                            {/* 1.1.1设备信息 */}
                            <TabPane tab="设备信息" key="1" style={{overflow:'auto'}}>
                                <DeviceMessage/>
                            </TabPane>

                            {/* 1.1.2保养内容 */}
                            <TabPane tab="保养内容" key="2" style={{overflow:'auto'}} >
                                <ContentMessage gangedInputChange={this.gangedInputChange}/>
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
                        this.store.contentPageModalVis && <ContentModal visible={this.store.contentPageModalVis}
                                                                        inputChange={this.inputChange}
                                                                        />
                    }

            </div>
        )
    }

    componentDidMount() {
        //编辑对话框状态下设置行数据
        if(this.store.isModalEdit === true){
            const {modalEditData} = this.store;
            this.formRef.current.setFieldsValue({
                maintenanceId:modalEditData.maintenanceId,
                equipmentId:modalEditData.equipmentId,
                principal:modalEditData.principal,
                level:modalEditData.level,
                frequency:modalEditData.frequency,
                currentDate:modalEditData.currentDate,
                nextDate:modalEditData.nextDate,
                requirement:modalEditData.requirement,
                result:modalEditData.result,
                state:modalEditData.state,
                record:modalEditData.record,
            })
        }
    }

    //输入框中数据变化时
    inputChange = () => {
        const {contentCheckedRow}=toJS(this.store);
        
        this.formRef.current.setFieldsValue({
          equipmentId:contentCheckedRow[0].equipmentId, 
          principal:contentCheckedRow[0].principal
        });
    };

    //联动输入框中数据变化时
    gangedInputChange = (row) => {  
        
        /* 获取当前和间隔天数后的日期 */
        const date = new Date();
        const timestamp = Date.now();
        const one_day = 86400000;
        const addVal = row.interval * one_day +timestamp;
        const newDate = new Date(addVal);
        const year=date.getFullYear(),month=date.getMonth()+1,
              curDate=date.getDate(),newYear=newDate.getFullYear(),
              newMonth=newDate.getMonth()+1,newCurDate=newDate.getDate();
        const currentDate=`${year}-${month}-${curDate}`;
        const nextDate=`${newYear}-${newMonth}-${newCurDate}`

        /* 设置表单字段值 */
        this.formRef.current.setFieldsValue({
            frequency:row.frequency, 
            requirement:row.requirement,
            currentDate:currentDate,
            nextDate:nextDate
        });
    };
    
    //表单提交成功
    onFinish = (values) => {

        /* 表单提交时根据当前日期自动生成保养工单
            编辑表格不能改变保养工单字段 */
        if(this.store.isModalEdit !== true){
            const date = new Date();
            const year=date.getFullYear(),month=date.getMonth()+1,curDate=date.getDate();
            const maintenanceId=`BY${year}${month}${curDate}`
            values.maintenanceId=maintenanceId;
        } 
        
        //提交数据请求和回调
        console.log('Success:', values);
        this.store.saveContentPage(values).then(res=>{
            if(res)
                message.success('提交成功');
        })

        this.store.gangedInputVis = false;
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

}

export default  ContentList;