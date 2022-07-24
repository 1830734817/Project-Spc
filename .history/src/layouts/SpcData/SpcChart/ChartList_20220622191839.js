import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import './index.less'
import HeadBar from './HeadBar.js'
import ChartArea from './ChartArea';
import TableArea from './TableArea';

@inject('SpcStore')
@observer
class ChartList extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.SpcStore; 
    }

    render() {
        return (
            <div className='chart_container'>
                {/* 顶部操作栏 */}
                <div className='headBar'>
                    <HeadBar/>
                </div>
                {/* 图表区 */}
                <div className='chartArea'>
                    <ChartArea/>
                </div>
                {/* 表格区 */}
                <div className='tableArea'>
                    <TableArea/>
                </div>
            </div>
        )
    }
}

export default ChartList;
