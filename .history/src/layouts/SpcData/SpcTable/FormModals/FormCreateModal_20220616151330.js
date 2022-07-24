import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,
         Form,
         Input,
         Button,
         Space,
         message,
        Select,
        Radio,
} from 'antd'
import ErrorRuleModal from './ErrorRuleModal';
import ColInfoModal from './ColInfoModal';

const {Option} = Select;
const { Search } = Input;

const fillArray = (arr)=>{
    for(let i=1;i<=25;i++){
        arr.push(i);
    }
}
const sampleSizeArray = [];

@inject('SpcStore')
@observer
class FormCreateModal extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.SpcStore;

        fillArray(sampleSizeArray);
	};

    formRef = React.createRef();

    render() {
        
        //获取用于编号字段的时间
        const date = new Date();
        let year = date.getFullYear(),month = date.getMonth()+1,curDate = date.getDate(),
              h = date.getHours(),m = date.getMinutes(),s = date.getSeconds();

        month = this.checkTime(month);
        curDate = this.checkTime(curDate);
        h = this.checkTime(h);
        m = this.checkTime(m);
        s = this.checkTime(s);
        
        const SpcId=`${year}${month}${curDate}${h}${m}${s}`
        this.updateTime=`${year}/${month}/${curDate} ${h}:${m}:${s}`

        return (        
            <Modal title="新增控制图" visible={this.store.createModalVis} 
                style={{ top: 50}} onCancel={this.handleClose}
                footer={null} width={800} bodyStyle={{paddingBottom:'0'}}
            >
                
                <Form 
                    name="createForm" 
                    onFinish={this.onFinish} 
                    onFinishFailed={this.onFinishFailed}
                    autoComplete='off'
                    layout='vertical'
                    style={{height:'75vh'}}
                    initialValues={{Id:SpcId}}
                    ref={this.formRef}
                >
                    <div className='createFormContainer'>
                        {/* 基本信息标题 */}
                        <Form.Item label="基本信息">
                            <hr/>
                        </Form.Item>

                        {/* 编号 */}
                        <Form.Item label="编号" name="Id" >
                            <Input style={{ width:'400px'}}  />
                        </Form.Item> 

                        {/* 检测项目 */}
                        <Form.Item label="检测项目" name="checkProject">
                            <Select style={{ width:'400px'}} 
                                     showSearch
                                     placeholder="选择检测项目"
                                     optionFilterProp="children"
                                     filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {
                                    this.store.checkProjects.map((project,index)=>{
                                        return <Option value={project.name} key={index}>
															{project.name}
                                                </Option>
                                    })
                                }
                            </Select>
                        </Form.Item> 

                        {/* 控制图类型 */}
                        <Form.Item label="控制图类型" name="chartType">
                            <Select style={{ width:'400px'}} >
                                <Option value='XR'>XR</Option>
                                <Option value='XS'>XS</Option>
                                <Option value='IMR'>IMR</Option>
                                <Option value='P'>P</Option>
                                <Option value='nP'>nP</Option>
                                <Option value='U'>U</Option>
                                <Option value='C'>C</Option>
                                <Option value='Y'>Y</Option>
                                <Option value='LaneyP'>LaneyP</Option>
                                <Option value='LaneyU'>LaneyU</Option>
                            </Select>
                        </Form.Item> 

                        {/* 样本容量 */}
                        <Form.Item label="样本容量" name="sampleSize">
                            <Select style={{ width:'400px'}} >
                                {
                                    sampleSizeArray.map((i,index)=>{
                                        return <Option value={i} key={index}>
                                                 {i}
                                                </Option>
                                    })
                                }  
                            </Select>
                        </Form.Item> 

                        {/* 规格上限 */}
                        <Form.Item label="规格上限" name="upLimit"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input style={{ width:'400px'}}  />
                        </Form.Item> 

                        {/* 目标值 */}
                        <Form.Item label="目标值" name="target"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input style={{ width:'400px'}}  />
                        </Form.Item> 

                        {/* 规格下限 */}
                        <Form.Item label="规格下限" name="downLimit"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input style={{ width:'400px'}}  />
                        </Form.Item> 

                        {/* 小数位数 */}
                        <Form.Item label="小数位数" name="decimalPlace">
                            <Select style={{ width:'400px'}} >
                                <Option value='0'>0</Option>
                                <Option value='1'>1</Option>
                                <Option value='2'>2</Option>
                                <Option value='3'>3</Option>
                                <Option value='4'>4</Option>
                                <Option value='5'>5</Option>
                                <Option value='6'>6</Option>
                            </Select>
                        </Form.Item> 

                         {/* 控制图信息标题 */}
                         <Form.Item label="控制图信息">
                            <hr/>
                        </Form.Item>

                        {/* 判异规则 */}
                        <Form.Item label="判异规则">
                            <Form.Item name="errorRule" noStyle>
                                <Input style={{ width:'336px'}} disabled/>
                            </Form.Item>
                            <Button type="primary" onClick={()=>{this.store.setErrorRuleModalVis(true);}} >
                                设置
                            </Button>
                        </Form.Item>
                        
                        {/* 控制图层次信息 */}
                        <Form.Item label="控制图层次信息" >
                            <Form.Item name="controlChartInfo" noStyle>
                                <Input style={{width:'336px'}} disabled/>
                            </Form.Item>
                            <Button type="primary" onClick={()=>{this.store.setColInfoModalVis(true);}}>
                                设置
                            </Button>
                        </Form.Item>

                        {/* 控制点层次信息 */}
                        <Form.Item label="控制点层次信息">
                            <Form.Item name="controlPointInfo" noStyle>
                                <Input style={{width:'336px'}} disabled/>
                            </Form.Item>
                            <Button type="primary" onClick={()=>{
                                                        this.store.setIsSetPoint(true);
                                                        this.store.setColInfoModalVis(true);
                                                    }}
                            >
                                设置
                            </Button>
                        </Form.Item>

                        {/* 上图 */}
                        <Form.Item label="上图">
                            <Form.Item name="upChart_upperControlLimit" noStyle>
                                <Input style={{ width:'100px'}}  placeholder='上控制限'/>
                            </Form.Item>
                            <Form.Item name="upChart_targetValue" noStyle>
                                <Input style={{ width:'100px'}}  placeholder='目标值'/>
                            </Form.Item>
                            <Form.Item name="upChart_lowerControlLimit" noStyle>
                                <Input style={{ width:'100px'}}  placeholder='下控制限'/>
                            </Form.Item>
                        </Form.Item>
                       
                        {/* 下图 */}
                        <Form.Item label="下图">
                        <Form.Item name="downChart_upperControlLimit" noStyle>
                                <Input style={{ width:'100px'}}  placeholder='上控制限'/>
                            </Form.Item>
                            <Form.Item name="downChart_targetValue" noStyle>
                                <Input style={{ width:'100px'}}  placeholder='目标值'/>
                            </Form.Item>
                            <Form.Item name="downChart_lowerControlLimit" noStyle>
                                <Input style={{ width:'100px'}}  placeholder='下控制限'/>
                            </Form.Item>
                        </Form.Item>
                            
                        <Form.Item>
                            <Space>
                                <Button style={{verticalAlign: 'middle'}} type="primary"
                                    >   
                                        计 算
                                </Button>
                                <Button style={{verticalAlign: 'middle'}} type="primary"
                                    >   
                                        清 除
                                </Button>
                            </Space>
                        </Form.Item>

                         {/* 其他信息标题 */}
                         <Form.Item label="其他信息">
                            <hr/>
                        </Form.Item>

                        {/* 控制图描述 */}
                        <Form.Item label="控制图描述" name="chartDescription"   >
                            <Input   />
                        </Form.Item> 
                        
                        {/* 控制图标题 */}
                        <Form.Item label="控制图标题" name="chartTitle"  >
                            <Input   />
                        </Form.Item> 

                        {/* 是否隐藏 */}
                        <Form.Item name="chartVis" value="true">
                            <Radio>隐藏此控制图</Radio>
                        </Form.Item> 

                        {/* 分级报警器 */}
                        <Form.Item >
                            <Button style={{verticalAlign: 'middle'}} type="primary">
                                分级报警器
                            </Button>
                        </Form.Item> 

                        <hr/>
                            
                        {/* 按钮组 */}
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit"
                                        style={{ marginLeft:'540px',padding:'0 20px', verticalAlign: 'middle'}}
                                >   
                                    确 认
                                </Button>
                                <Button  onClick={this.handleClose}
                                        style={{padding:'0 20px', verticalAlign: 'middle'}}
                                >   
                                    取 消
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                    
                </Form>

                {/* 设置判异规则对话框 */}
                {
                    this.store.errorRuleModalVis && <ErrorRuleModal submitErrorRule={this.submitErrorRule}/>
                }

                {/* 控制图层次信息对话框 */}
                {
                    this.store.colInfoModalVis && <ColInfoModal submitColInfo={this.submitColInfo}/>
                }

            </Modal>
        )
    }

    updateTime = ''

    componentDidMount = ()=>{
        this.store.getCheckProjects();
    }

    handleClose = () =>{
        this.store.setCreateModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        values.updateTime = this.updateTime;
        values.updater = '13857107228';
        values.uuid = this.store.currentUuid;
        this.store.createSpcTable(values).then(res=>{
            if(res)
                message.success('新增成功');
        })
        this.store.setCreateModalVis(false);
    };

    //表单提交失败
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //校验时间格式
    checkTime = (i)=>{
        if(i<10){
            i = '0'+i;
        }
        return i;
    }

    //判异规则提交
    submitErrorRule = (params)=>{
        let valArr=[],val='';

        params.map(param=>{
            let tArr=[],tStr='';
            for(let i in param){
                tArr.push(param[i]);
            }
            tStr=tArr.toString();
            tStr=tStr.replace(/,/g,'-')
            valArr.push(tStr)
        })

        val=valArr.toString();

        this.formRef.current.setFieldsValue({
            errorRule:val
        })
    }

    //层次信息提交
    submitColInfo = (param,type)=>{
        let val='';
        val = param.toString();
        
        if(type === 1){//控制图
            this.formRef.current.setFieldsValue({
                controlChartInfo:val
            })
        }
        else{//控制点
            this.formRef.current.setFieldsValue({
                controlPointInfo:val
            })
        }
        
    }

}

export default FormCreateModal;