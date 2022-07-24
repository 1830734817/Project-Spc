import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Modal,

} from 'antd'

@inject('SpcStore')
@observer
class ColInfoModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {
        return (
        <Modal title="控制图层次信息设置" visible={this.store.colInfoModalVis} 
                style={{ top: 100}} width={700}
                onCancel={this.handleClose} onOk={this.handleOk}
                cancelText={"取消"} okText={"确定"}
        >

        </Modal>
        )
    }

    handleOk = () =>{
        this.store.setColInfoModalVis(false);
    }

    handleClose = () =>{
        this.store.setColInfoModalVis(false);
    }
}

export default ColInfoModal;