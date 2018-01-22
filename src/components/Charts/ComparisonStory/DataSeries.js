import React, {Component} from 'react';
import * as d3 from 'd3';

import Line from './Line';

class DataSeries extends Component {

  render() {
    let { dataset, colors, xScale, yScale, interpolationType, x } = this.props;

    let _line = d3.svg.line()
      .x((d, i) => { return xScale(i); })
      .y((d) => { return yScale(d.y); })
      .interpolate("basis");

    return (
      <g >
        <Line  line={_line(dataset)} x={x}/>
      </g>
    );
  }

}

export default DataSeries;


