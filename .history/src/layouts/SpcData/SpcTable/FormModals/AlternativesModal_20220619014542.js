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
                    style={{top:100}} onCancel={this.handleClose}
            >

            </Modal>
        )
    }

    handleClose = () =>{
        this.store.setAlternativesModalVis(false);
    }
}

export default AlternativesModal;
