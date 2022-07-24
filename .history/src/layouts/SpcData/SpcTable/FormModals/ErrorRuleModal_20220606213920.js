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
            <Modal title="判异规则" visible={this.store.createModalVis} 
                style={{ top: 50}} onCancel={this.handleClose}
                width={800}
            >
                <Table columns={columns} dataSource={data}>

                </Table>

            </Modal>
        )
    }

    handleClose = () =>{
        this.store.setCreateModalVis(false);
    }

}

export default ErrorRuleModal;