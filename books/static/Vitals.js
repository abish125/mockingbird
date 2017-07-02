import React from 'react';
import SbpIcon from './SbpIcon';
import DbpIcon from './DbpIcon';
var ReactDom = require('react-dom');



var Vitals = React.createClass({

  render: function() {
    //console.log('render vitals')
    //console.log(this.props)
    var circumference_size  = this.props.size/3


    return (
      <svg>
        <SbpIcon class={'sbp'} x={this.props.time} y={this.props.sbp} size={this.props.size}  strokeWidth={this.props.strokeWidth} stroke={this.props.stroke} stroke-opacity="0.4" fill={this.props.fill} fill-opacity="0.4"/> 
        <DbpIcon class={'dbp'} x={this.props.time} y={this.props.dbp} size={this.props.size} strokeWidth={this.props.strokeWidth} stroke={this.props.stroke} stroke-opacity="0.4" fill={this.props.fill} fill-opacity="0.4"/> 
        <circle class={'hr'} cx={this.props.time} cy={this.props.hr} r={circumference_size}  strokeWidth={this.props.strokeWidth} stroke={this.props.stroke} stroke-opacity="0.4" fill={this.props.fill} fill-opacity="0.4"/> 
      </svg>
      
    );
  }

});


export default Vitals