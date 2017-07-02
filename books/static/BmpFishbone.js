import React from 'react';
var ReactDom = require('react-dom');

function fishbone_lines(p, h, size) {
    var ts = p
    //console.log(ts)
    var cmp_h = h
    var hor_line = {width: 85 * size}
    var ver_line = {length: 15 * size}

    //horizontal line
    var cmp0 = [ts - hor_line.width/2, cmp_h, ts + hor_line.width/2, cmp_h]

    //left vertical line
    var l1 = ts - hor_line.width/2 + hor_line.width/3
    var cmp1 = [l1, cmp_h + ver_line.length, l1, cmp_h - ver_line.length]

    //middle vertical line    
    var l2 = ts - hor_line.width/2 + (2 * (hor_line.width/3))
    var cmp2 = [l2, cmp_h + ver_line.length, l2, cmp_h - ver_line.length]

    //bottom glucose line   
    var l3 = ts - hor_line.width/2 + (3 * (hor_line.width/3))
    var cmp3 = [l3, cmp_h, l3 + 5, cmp_h - ver_line.length]

    //top glucose line   
    var l4 = ts - hor_line.width/2 + (3 * (hor_line.width/3))
    var cmp4 = [l4, cmp_h, l4 + 5, cmp_h + ver_line.length]


    return [cmp0, cmp1, cmp2, cmp3, cmp4]

    };


var BmpFishbone = React.createClass({

  render: function() {
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


export default BmpFishbone