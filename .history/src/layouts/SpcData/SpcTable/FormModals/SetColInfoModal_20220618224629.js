import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { 

} from 'antd'

@inject('SpcStore')
@observer
class SetColInfoModal extends Component {
  constructor(props) {
		super(props);
		this.store = this.props.SpcStore;
	};

  render() {
    return (
      <div>SetColInfoModal</div>
    )
  }
}

export default SetColInfoModal