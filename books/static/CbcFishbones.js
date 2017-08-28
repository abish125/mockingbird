import React from 'react';
import CbcFishbone from './CbcFishbone';
var ReactDom = require('react-dom');

var moment = require('moment');

var CbcFishbones = React.createClass({


  render () {
    if (this.props.lineData.length > 0) {
        return(
            <svg>
            {this.props.lineData.map((lineDatum, index) => (<CbcFishbone key={index} data={this.props.xScale(moment.unix(lineDatum.timestamp))} height={this.props.height} strokeWidth={this.props.style.strokeWidth} stroke={this.props.style.stroke} size={this.props.style.size} /> ))}
            </svg>
        );

    }
    else return null;
    
  }

});


export default CbcFishbones