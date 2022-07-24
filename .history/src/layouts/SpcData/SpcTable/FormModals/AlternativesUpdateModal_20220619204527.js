import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('SpcStore')
@observer
class AlternativesUpdateModal extends Component {
  render() {
    return (
      <div>AlternativesUpdateModal</div>
    )
  }
}

export default AlternativesUpdateModal;