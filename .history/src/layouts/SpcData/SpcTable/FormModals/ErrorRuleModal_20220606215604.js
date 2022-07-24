import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,
        Table,

} from 'antd'

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }
];

const data = [

];

@inject('SpcStore')
@observer
class ErrorRuleModal extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {

        return (        
            <Modal title="判异规则" visible={this.store.errorRuleModalVis} 
                style={{ top: 100}} width={700}
                onCancel={this.handleClose} onOk={this.handleOk}
                cancelText={"取消"} okText={"确定"}
            >
                <Table columns={columns} dataSource={data}>

                </Table>
            </Modal>
        )
    }

    handleOk = () =>{
        this.store.setErrorRuleModalVis(false);
    }

    handleClose = () =>{
        this.store.setErrorRuleModalVis(false);
    }

}

export default ErrorRuleModal;