import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('SpcStore')
@observer
class ChartList extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.SpcStore; 
    }

    render() {
        return (
        <div>ChartList</div>
        )
    }
}

export default ChartList;
