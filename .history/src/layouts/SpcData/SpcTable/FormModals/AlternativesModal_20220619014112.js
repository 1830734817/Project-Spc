import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'


@inject('SpcStore')
@observer
class AlternativesModal extends Component {
    constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

    render() {
        return (
        <div>AlternativesModal</div>
        )
    }
}

export default AlternativesModal;
