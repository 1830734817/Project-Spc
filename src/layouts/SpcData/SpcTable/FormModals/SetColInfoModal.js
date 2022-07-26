import React, { Component } from 'react'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react'
import { Modal,
        Form,
        Input,
        Button,
        Space,
        message
} from 'antd'
import AlternativesModal from './AlternativesModal';

@inject('SpcStore')
@observer
class SetColInfoModal extends Component {
  constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
    this.formRef = React.createRef();
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
              <Button onClick={()=>{
                this.store.setColInfoIndex(0);
                this.store.setAlternativesModalVis(true)  
              }}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型2'>
              <Form.Item name="colInfo_2" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(1);
                this.store.setAlternativesModalVis(true)  
              }}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型3'>
              <Form.Item name="colInfo_3" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(2);
                this.store.setAlternativesModalVis(true)  
              }}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型4'>
              <Form.Item name="colInfo_4" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(3);
                this.store.setAlternativesModalVis(true)  
              }}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型5'>
              <Form.Item name="colInfo_5" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(4);
                this.store.setAlternativesModalVis(true)  
              }}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型6'>
              <Form.Item name="colInfo_6" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(5);
                this.store.setAlternativesModalVis(true)  
              }}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型7'>
              <Form.Item name="colInfo_7" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(6);
                this.store.setAlternativesModalVis(true)  
              }}>
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型8'>
              <Form.Item name="colInfo_8" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(7);
                this.store.setAlternativesModalVis(true)  
              }}> 
                备选值
              </Button>
            </Form.Item>

            <Form.Item label='层次类型9'>
              <Form.Item name="colInfo_9" noStyle>
                <Input style={{width:'350px',marginRight:'20px'}}/>
              </Form.Item>
              <Button onClick={()=>{
                this.store.setColInfoIndex(8);
                this.store.setAlternativesModalVis(true)  
              }}> 
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

        {/* 备选值对话框 */}
        {
            this.store.alternativesModalVis && <AlternativesModal/>
        }

      </Modal>
    )
  }

  componentDidMount = ()=>{
    const {colInfo} = this.store;
    if(colInfo.length !== 0){
      //显示已定义的层次类型
      this.formRef.current.setFieldsValue({
        colInfo_1:colInfo[0].colName,
        colInfo_2:colInfo[1].colName,
        colInfo_3:colInfo[2].colName,
        colInfo_4:colInfo[3].colName,
        colInfo_5:colInfo[4].colName,
        colInfo_6:colInfo[5].colName,
        colInfo_7:colInfo[6].colName,
        colInfo_8:colInfo[7].colName,
        colInfo_9:colInfo[8].colName,
      })
    }
  }

  handleClose = () =>{
    this.store.setDefineColModalVis(false);
    this.store.resetTempColInfo();
  }

  //表单提交成功
  onFinish = (values) => {
    let j = 0;
    for(let i in values){
      if(values[i] !== this.store.colInfo[j].colName)
        this.store.tempColInfo[j].colName = values[i];
      j++;
    }
    this.store.saveColInfo(toJS(this.store.tempColInfo));
    this.store.setDefineColModalVis(false);
  };

  //表单提交失败
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

}

export default SetColInfoModal