import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,
        Form,
        Input,
        Button,
        Space
} from 'antd'

@inject('SpcStore')
@observer
class SetColInfoModal extends Component {
  constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
    this.formRef = React.createRef();
    //获取已定义的层次类型
    this.store.getColInfo();
	};

  render() {
    return (
      <Modal title='层次类型定义' visible={this.store.defineColModalVis}
            style={{top:50}}  onCancel={this.handleClose}
            footer={null} width={600} bodyStyle={{paddingBottom:'0'}}
      >
        <Form
          name="setColForm"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete='off'
          style={{height:'75h'}}
          ref={this.formRef}
        >
          <div className='setColFormContainer'> 

            {/* 层次类型1-9 */}
            <Form.Item label='层次类型1'>
              <Form.Item name="colInfo_1" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型2'>
              <Form.Item name="colInfo_2" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型3'>
              <Form.Item name="colInfo_3" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型4'>
              <Form.Item name="colInfo_4" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型5'>
              <Form.Item name="colInfo_5" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型6'>
              <Form.Item name="colInfo_6" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型7'>
              <Form.Item name="colInfo_7" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型8'>
              <Form.Item name="colInfo_8" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button  onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型9'>
              <Form.Item name="colInfo_9" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <hr/>

            {/* 按钮组 */}
            <Form.Item>
                <Space>
                    <Button  onClick={this.handleClose}
                            style={{marginLeft:'360px',padding:'0 20px', verticalAlign: 'middle'}}
                    >   
                        取 消
                    </Button>
                    <Button type="primary" htmlType="submit"
                            style={{ padding:'0 20px', verticalAlign: 'middle'}}
                    >   
                        保 存
                    </Button>
                </Space>
            </Form.Item>
            
          </div>
        </Form>

      </Modal>
    )
  }

  componentDidMount = ()=>{
    //显示已定义的层次类型

  }

  handleClose = () =>{
    this.store.setDefineColModalVis(false);
  }

  //表单提交成功
  onFinish = (values) => {
    // this.store.createSpcTable(values).then(res=>{
    //     if(res)
    //         message.success('设置成功');
    // })
    this.store.setDefineColModalVis(false);
  };

  //表单提交失败
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

}

export default SetColInfoModal