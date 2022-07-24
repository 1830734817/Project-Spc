import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,
        Layout,
        Table,
        Button,
} from 'antd'
const { Header,Sider, Content } = Layout;

const columns = [
    {
      title: '预设值',
      dataIndex: 'name',
      key: 'name',
      width: 450
    }
]

@inject('SpcStore')
@observer
class AlternativesModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {
        return (
            <Modal title='关键字备选值' visible={this.store.alternativesModalVis}
                    style={{top:100}}   width={700} 
                    bodyStyle={{padding:'10px',background:'#eee'}}
                    onCancel={this.handleClose} footer={null}
            >
                <div className='alternativesContainer'>
                    <Layout>
                        <Header>
                            <p style={{fontSize:'20px'}}>Test</p>
                        </Header>
                        <Layout>
                            <Content>
                                <Table columns={columns} 
                                    dataSource={data}
                                    rowSelection={{     
                                        type: 'checkbox',
                                        ...this.rowSelection,
                                    }} 
                                    style={{height:'60vh',overflow: 'scroll'}}
                                    pagination={false}
                                    bordered
                                />
                            </Content>
                            <Sider width={120}>
                                    <Button type='primary'>添加</Button>
                                    <Button>删除</Button>
                                    <Button>修改</Button>
                                    <Button style={{marginTop:"250px"}}>关闭</Button>
                            </Sider>
                        </Layout>
                    </Layout>
                </div>
                
            </Modal>
        )
    }

    handleOk = () =>{
        // this.props.submitErrorRule(this.selectedRules);
        this.store.setAlternativesModalVis(false);
    }

    handleClose = () =>{
        this.store.setAlternativesModalVis(false);
    }

     /* 表格第一列选择框事件 */
     rowSelection = {
        //选择框改变
        onChange: (selectedRowKeys, selectedRows) => {
            
        },
        //选择框的默认属性配置
        getCheckboxProps: (record) => ({

        })
    };
    
}

export default AlternativesModal;