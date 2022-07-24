import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { Line } from '@ant-design/charts';

const data_1 = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const config_1 = {
  data_1,
  xField: 'year',
  yField: 'value',
  point: {
    size: 5,
    shape: 'diamond',
  },
};

const data_2 = [
  { year: '1991', value: 13 },
  { year: '1992', value: 14 },
  { year: '1993', value: 3 },
  { year: '1994', value: 12 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 2 },
  { year: '1998', value: 9 },
  { year: '1999', value: 3 },
];

const config_2 = {
  data_2,
  xField: 'year',
  yField: 'value',
  point: {
    size: 5,
    shape: 'diamond',
  },
};

@inject('SpcStore')
@observer
class ChartArea extends Component {
  render() {
    return (
      <React.Fragment>
        {/* todo，图表放在tab里 */}
        <Line {...config_1}/>
        {/* <Line {...config_2} /> */}
      </React.Fragment>
    )
  }
}

export default ChartArea;
