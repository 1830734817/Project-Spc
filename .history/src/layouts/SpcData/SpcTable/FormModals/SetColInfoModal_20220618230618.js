import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,
        Form,

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
            footer={null} width={800} bodyStyle={{paddingBottom:'0'}}
      >
        <Form
          name="setColForm"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete='off'
          style={{height:'75h'}}
        >
          <div className='setColFormContainer'> 

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