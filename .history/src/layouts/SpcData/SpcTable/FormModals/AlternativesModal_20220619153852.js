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
      dataIndex: 'preset',
      key: 'preset',
    }
]

const data = [
    {
        key:1,
        preset:'产品型号-1',
    },
    {
        key:2,
        preset:'产品型号-1',
    },
    {
        key:3,
        preset:'产品型号-1',
    },
    {
        key:4,
        preset:'产品型号-1',
    },
    {
        key:5,
        preset:'产品型号-1',
    },
    {
        key:6,
        preset:'产品型号-1',
    },
    {
        key:7,
        preset:'产品型号-1',
    },
    {
        key:8,
        preset:'产品型号-1',
    },
    {
        key:9,
        preset:'产品型号-1',
    },
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
                    style={{top:100}}   width={700} bodyStyle={{paddingBottom:'0'}}
                    onCancel={this.handleClose} footer={null}
            >

                <Layout>
                    <Header>
                        <h2>Test</h2>
                    </Header>
                    <Layout>
                        <Content>
                            <Table columns={columns} 
                                dataSource={data}
                                rowSelection={{     
                                    type: 'checkbox',
                                    ...this.rowSelection,
                                }} 
                                style={{height:'50vh',overflow: 'scroll'}}
                                pagination={false}
                            />
                        </Content>
                        <Sider>
                                <Button>按钮1</Button>
                                <Button>按钮2</Button>
                        </Sider>
                    </Layout>
                </Layout>
                
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
