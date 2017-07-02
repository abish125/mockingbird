import React from 'react';
import Slider from './Slider';
var ReactDom = require('react-dom');


class SliderContainer extends React.Component {
  constructor (props) {
    super(props);

    //this.state = { startDate: 50, endDate: 50 }
  }
/*
  updateStart (newValue) {
    this.setState({ startDate: Math.floor(newValue * 100) });
  }

  updateEnd (newValue) {
    this.setState({ endDate: Math.floor(newValue * 50) });
  }
*/

  render () {
    return (
      <svg>
        <Slider
          onValueChange={newValue => this.props.updateStart(newValue)}
          x="20" y="20" width="500" />
        <Slider
          onValueChange={newValue => this.props.updateEnd(newValue)}
          x="20" y="20" width="500" />

        <text x="100" y="100" fill="white" stroke="white">{this.props.startDate}</text>
        <text x="100" y="140" fill="white" stroke="white">{this.props.endDate}</text>
      </svg>
    )
  }
};

export default SliderContainer