import React from 'react';
var ReactDom = require('react-dom');

const EventsPanel = React.createClass({
 render() {
   return (
      <svg>
       <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} rx={0} ry={0} style={{fill:'blue', stroke:'white', strokeWidth:2, fillOpacity:.0001, strokeOpacity:0.9}} onClick={this.props.onClicky} />
      </svg>
   )
 }
});

// which makes this reusable component for other views
export default EventsPanel