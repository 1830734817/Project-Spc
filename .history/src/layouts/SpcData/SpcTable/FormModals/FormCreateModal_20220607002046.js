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
                            <Button type="primary" onClick={this.setErrorRule} >
                                设置
                            </Button>
                        </Form.Item>
                        
                        {/* 控制图层次信息 */}
                        <Form.Item label="控制图层次信息" name="controlChartInfo"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Search
                            style={{ width:'400px'}} 
                            enterButton="设置"
                            />
                        </Form.Item>

                        {/* 控制点层次信息 */}
                        <Form.Item label="控制点层次信息" name="controlPointInfo"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Search
                            style={{ width:'400px'}} 
                            enterButton="设置"
                            />
                        </Form.Item>

                        {/* 上图 */}
                        <Form.Item label="上图" name="upChart"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input style={{ width:'100px'}}  placeholder='上控制限'/>
                            <Input style={{ width:'100px'}}  placeholder='目标值'/>
                            <Input style={{ width:'100px'}}  placeholder='下控制限'/>
                        </Form.Item>
                       
                        {/* 下图 */}
                        <Form.Item label="下图" name="downChart"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input style={{ width:'100px'}}  placeholder='上控制限'/>
                            <Input style={{ width:'100px'}}  placeholder='目标值'/>
                            <Input style={{ width:'100px'}}  placeholder='下控制限'/>
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
                        <Form.Item label="控制图描述" name="chartDescription"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input   />
                        </Form.Item> 
                        
                        {/* 控制图标题 */}
                        <Form.Item label="控制图标题" name="chartTitle"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        ]}
                        >
                            <Input   />
                        </Form.Item> 

                        {/* 是否隐藏 */}
                        <Form.Item name="chartVis" >
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

            </Modal>
        )
    }

    componentDidMount = ()=>{
        this.store.getCheckProjects();
    }

    handleClose = () =>{
        this.store.setCreateModalVis(false);
    }

    //表单提交成功
    onFinish = (values) => {
        console.log(values);
        // this.store.rename(values).then(res=>{
        //     if(res)
        //         message.success('修改成功');
        // })
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

    //设置判异规则
    setErrorRule =()=>{
        this.store.setErrorRuleModalVis(true);
    }

    //判异规则提交
    submitErrorRule = (params)=>{

    }

}

export default FormCreateModal;