import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,
        Layout,
        Table,
} from 'antd'
const {Sider, Content } = Layout;

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
                    <Content>
                        <Table columns={columns} dataSource={data}
                            rowSelection={{     
                                type: 'checkbox',
                                ...this.rowSelection,
                            }} 
                            style={{height:'50vh',overflow: 'scroll'}}
                            pagination={false}
                        />
                    </Content>
                    <Sider>

                    </Sider>
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

    
}

export default AlternativesModal;
