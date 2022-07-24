import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import './index.less'

@inject('SpcStore')
@observer
class ChartList extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.SpcStore; 
    }

    render() {
        return (
            <div className='container'>
                {/* 顶部操作栏 */}
                <div className='headBar'>

                </div>
                {/* 图表区 */}
                <div className='chartArea'>

                </div>
                {/* 表格区 */}
                <div className='tableArea'>

                </div>
            </div>
        )
    }
}

export default ChartList;
