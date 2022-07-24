import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal,
    
} from 'antd'


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
                    onCancel={this.handleClose} onOk={this.handleOk}
                    footer={[]}
            >

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
