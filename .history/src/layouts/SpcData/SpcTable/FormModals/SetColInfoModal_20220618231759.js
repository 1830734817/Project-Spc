import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,
        Form,
        Input,
        Button,
} from 'antd'

@inject('SpcStore')
@observer
class SetColInfoModal extends Component {
  constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
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
        >
          <div className='setColFormContainer'> 
            {/* 层次类型1-9 */}
            <Form.Item label='层次类型1'>
              <Form.Item name="colInfo_1" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button type="primary" onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型2'>
              <Form.Item name="colInfo_2" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button type="primary" onClick={()=>{}}> 
                备选值
              </Button>
            </Form.Item>
            
          </div>
        </Form>

      </Modal>
    )
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