import React from 'react';
var ReactDom = require('react-dom');

const SbpIcon = React.createClass({
 render() {
   return (
     <svg className="sbp_icon" xmlns="http://www.w3.org/2000/svg" x={this.props.x - (this.props.size/2)} y={this.props.y} width={this.props.size} height={this.props.size} viewBox="0 0 100 100" aria-labelledby="title">
	<title id="title">Umbrella Icon</title>
        <path stroke={this.props.stroke} fill={this.props.fill} d="M 0 0 L 100 0 L 50 100 Z"/>
      </svg>
   )
 }
});

// which makes this reusable component for other views
export default SbpIcon