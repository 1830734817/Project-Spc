import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import ChartList from './ChartList';

class SpcChart extends Component {
  render() {
    return (
      <React.Fragment>
        <ChartList/>
      </React.Fragment>
    )
  }
}

export default SpcChart;
