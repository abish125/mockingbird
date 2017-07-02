import React from 'react';
var ReactDom = require('react-dom');

function fishbone_lines(p, h, size) {
    //console.log('in function fishbone_cmp_lines')
    var ts = p
    //console.log(ts)
    var cmp_h = h
    var hor_line = {width: 85 * (1/3) * size}
    var ver_line = {length: 15 * size}

    //horizontal line
    var cbc0 =  [ts - hor_line.width/2, cmp_h, ts + hor_line.width/2, cmp_h]
    
    var l1 = ts - hor_line.width/2
    var cbc1 = [l1 - 5, cmp_h + ver_line.length, l1, cmp_h]
    
    var l2 = ts - hor_line.width/2
    var cbc2 = [l2 - 5, cmp_h - ver_line.length, l2, cmp_h]

    var l3 = ts + hor_line.width/2
    var cbc3 = [l3 + 5, cmp_h + ver_line.length, l3, cmp_h]

    var l4 = ts + hor_line.width/2    
    var cbc4 = [l4 + 5, cmp_h - ver_line.length, l4, cmp_h]

    return [cbc0, cbc1, cbc2, cbc3, cbc4]

    };


var CbcFishbone = React.createClass({

  render () {
    //console.log('render SvgLine')
    var coords = fishbone_lines(this.props.data, this.props.height, this.props.size)
    //console.log(coords)

    return (
      <svg>
        <line x1={coords[0][0]} y1={coords[0][1]} x2={coords[0][2]} y2={coords[0][3]} strokeWidth={this.props.strokeWidth} stroke={this.props.stroke}/> 
        <line x1={coords[1][0]} y1={coords[1][1]} x2={coords[1][2]} y2={coords[1][3]} strokeWidth={this.props.strokeWidth} stroke={this.props.stroke}/> 
        <line x1={coords[2][0]} y1={coords[2][1]} x2={coords[2][2]} y2={coords[2][3]} strokeWidth={this.props.strokeWidth} stroke={this.props.stroke}/> 
        <line x1={coords[3][0]} y1={coords[3][1]} x2={coords[3][2]} y2={coords[3][3]} strokeWidth={this.props.strokeWidth} stroke={this.props.stroke}/> 
        <line x1={coords[4][0]} y1={coords[4][1]} x2={coords[4][2]} y2={coords[4][3]} strokeWidth={this.props.strokeWidth} stroke={this.props.stroke}/> 
      </svg>
      
    );
  }

});


export default CbcFishbone