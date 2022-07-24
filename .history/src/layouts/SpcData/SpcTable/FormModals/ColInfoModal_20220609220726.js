import React, { Component } from 'react'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Modal,
         Form,
         Checkbox,
         Select,
         Space,
         Button,
         Input,
         Divider,

} from 'antd'

const {Option} = Select;

@inject('SpcStore')
@observer
class ColInfoModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;

        this.store.getColInfo();
	};

    render() {
        return (
            
                this.store.isSetPoint ? 
                (
                        <Modal title="控制点层次信息设置" visible={this.store.colInfoModalVis} 
                            style={{ top: 100}} width={500} bodyStyle={{paddingBottom:'0'}}
                            onCancel={this.handlePointClose} footer={null}
                        >
                        <Form
                            name="pointColInfoForm"
                            onFinish={this.onPointFinish}
                            onFinishFailed={this.onFinishFailed}
                            autoComplete='off'
                            layout='vertical'
                            style={{height:'60vh'}}
                        >
                            <div className='colInfoFormContainer'>
                                {/* 标题 */}
                                <div style={{display:'flex',justifyContent: 'space-around'}}>
                                    <b>层次类型</b>
                                    <b>值&emsp;&emsp;&emsp;</b>
                                </div>
                                <hr/>

                                {/* 层次信息 */}
                                {
                                    this.store.colInfo.map((col,index) =>{
                                        let vName = col.colName+'值'
                                        let flag = 0;
                                        console.log(toJS(this.store.unSelectablePoint) === [])
                                        if(toJS(this.store.unSelectablePoint) === []){
                                            return(
                                                <Form.Item key={index}>
                                                <div style={{display:'flex',justifyContent: 'space-around'}}>
                                                    <Form.Item name={col.colName} noStyle valuePropName="checked">
                                                        <Checkbox style={{ width:'100px'}} onChange={this.checkBoxChange}>
                                                            {col.colName}
                                                        </Checkbox>
                                                    </Form.Item>
                                                    <Form.Item name={vName} noStyle>
                                                        <Select style={{ width:'150px'}} >
                                                            {
                                                                col.colValues.map((value,index)=>{
                                                                    return <Option value={value.name} key={index}>
                                                                                {value.name}
                                                                            </Option>
                                                                })
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </Form.Item>
                                            )
                                        }
                                        else{
                                            return  (
                                                <Form.Item key={index}>
                                                    <div style={{display:'flex',justifyContent: 'space-around'}}>
                                                        {
                                                            
                                                                this.store.unSelectablePoint.map((name,index)=>{
                                                            
                                                                    if(name === col.colName){
                                                                        flag = 1;
                                                                        return(
                                                                            <React.Fragment key={index}>
                                                                                <Form.Item name={col.colName} noStyle valuePropName="checked">
                                                                                    <Checkbox style={{ width:'100px'}} onChange={this.checkBoxChange} disabled>
                                                                                        {col.colName}
                                                                                    </Checkbox>
                                                                                </Form.Item>
                                                                                <Form.Item name={vName} noStyle>
                                                                                    <Select style={{ width:'150px'}} disabled>
                                                                                        {
                                                                                            col.colValues.map((value,index)=>{
                                                                                                return <Option value={value.name} key={index}>
                                                                                                            {value.name}
                                                                                                        </Option>
                                                                                            })
                                                                                        }
                                                                                    </Select>
                                                                                </Form.Item>
                                                                            </React.Fragment>
                                                                        )
                                                                    }
                                                                    else if(flag === 0 && index === this.store.unSelectablePoint.length-1){
                                                                        return(
                                                                            <React.Fragment key={index}>
                                                                                <Form.Item name={col.colName} noStyle valuePropName="checked">
                                                                                    <Checkbox style={{ width:'100px'}} onChange={this.checkBoxChange}>
                                                                                        {col.colName}
                                                                                    </Checkbox>
                                                                                </Form.Item>
                                                                                <Form.Item name={vName} noStyle>
                                                                                    <Select style={{ width:'150px'}} >
                                                                                        {
                                                                                            col.colValues.map((value,index)=>{
                                                                                                return <Option value={value.name} key={index}>
                                                                                                            {value.name}
                                                                                                        </Option>
                                                                                            })
                                                                                        }
                                                                                    </Select>
                                                                                </Form.Item>
                                                                            </React.Fragment>
                                                                        )
                                                                        
                                                                    }
                                                                })
                                                            
                                                            
                                                        }
                                                        
                                                    </div>
                                                </Form.Item>
                                            ) 
                                        }

                                        
                                    })
                                }

                                {/* 按钮组 */}
                                <div className='colInfoFormButtonContainer'>
                                    <hr/>
                                    <Form.Item>
                                        <div className='colInfoFormButtons'>
                                            <Space>
                                                <Button type="primary" htmlType="submit"
                                                        style={{ padding:'0 20px', verticalAlign: 'middle'}}
                                                >   
                                                    确 认
                                                </Button>
                                                <Button  onClick={this.handleClose}
                                                        style={{padding:'0 20px', verticalAlign: 'middle'}}
                                                >   
                                                    取 消
                                                </Button>
                                            </Space>
                                        </div>
                                    </Form.Item>
                                </div>

                            </div>
                        </Form>

                        </Modal>
                ):(
                    <Modal title="控制图层次信息设置" visible={this.store.colInfoModalVis} 
                        style={{ top: 100}} width={500} bodyStyle={{paddingBottom:'0'}}
                        onCancel={this.handleClose} footer={null}
                    >
                        <Form
                            name="colInfoForm"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            autoComplete='off'
                            layout='vertical'
                            style={{height:'60vh'}}
                        >
                            <div className='colInfoFormContainer'>
                                {/* 标题 */}
                                <div style={{display:'flex',justifyContent: 'space-around'}}>
                                    <b>层次类型</b>
                                    <b>值&emsp;&emsp;&emsp;</b>
                                </div>
                                <hr/>

                                {/* 层次信息 */}
                                {
                                    this.store.colInfo.map((col,index) =>{
                                        let vName = col.colName+'值'
                                        return  (
                                            <Form.Item key={index}>
                                                <div style={{display:'flex',justifyContent: 'space-around'}}>
                                                    <Form.Item name={col.colName} noStyle valuePropName="checked">
                                                        <Checkbox style={{ width:'100px'}} onChange={this.checkBoxChange}>
                                                            {col.colName}
                                                        </Checkbox>
                                                    </Form.Item>
                                                    <Form.Item name={vName} noStyle>
                                                        <Select style={{ width:'150px'}} >
                                                            {
                                                                col.colValues.map((value,index)=>{
                                                                    return <Option value={value.name} key={index}>
                                                                                {value.name}
                                                                            </Option>
                                                                })
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </Form.Item>
                                        )
                                    })
                                }

                                {/* 按钮组 */}
                                <div className='colInfoFormButtonContainer'>
                                    <hr/>
                                    <Form.Item>
                                        <div className='colInfoFormButtons'>
                                            <Space>
                                                <Button type="primary" htmlType="submit"
                                                        style={{ padding:'0 20px', verticalAlign: 'middle'}}
                                                >   
                                                    确 认
                                                </Button>
                                                <Button  onClick={this.handleClose}
                                                        style={{padding:'0 20px', verticalAlign: 'middle'}}
                                                >   
                                                    取 消
                                                </Button>
                                            </Space>
                                        </div>
                                    </Form.Item>
                                </div>
                                
                            </div>
                        </Form>
                    </Modal>    
                )
            
        )
    }

    selectedCols = [];
    selectedPointCols = [];

    handleClose = () =>{
        this.store.setColInfoModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        let count = 1,tStr='';
        this.selectedCols = [];

        this.store.emptyUnSelectablePoint();
        //提交有效value
        for(let i in values){
            if(count === 1 && values[i] === true){
               tStr = tStr+i+'=';
               count++; 
               this.store.addUnSelectablePoint(i);
            }
            else if(count === 2){
                tStr = tStr+values[i];
                this.selectedCols.push(tStr);
                tStr = '';
                count = 1;
            }
        }
        
        this.props.submitColInfo(this.selectedCols,1);
        this.store.setColInfoModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    handlePointClose = () =>{
        this.store.setIsSetPoint(false);
        this.store.setColInfoModalVis(false);
    }

    onPointFinish = (values) =>{
        let count = 1,tStr='';
        this.selectedPointCols = [];

        //提交有效value
        for(let i in values){
            if(count === 1 && values[i] === true){
               tStr = tStr+i+'=';
               count++; 
            }
            else if(count === 2){
                tStr = tStr+values[i];
                this.selectedPointCols.push(tStr);
                tStr = '';
                count = 1;
            }
        }

        this.store.setIsSetPoint(false);
        this.props.submitColInfo(this.selectedPointCols,2);
        this.store.setColInfoModalVis(false);
    }

}

export default ColInfoModal;