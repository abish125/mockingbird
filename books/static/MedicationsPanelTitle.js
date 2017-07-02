import React from 'react';
var ReactDom = require('react-dom');

const MedicationsPanelTitle = React.createClass({
 render() {
   return (
   	<svg>
   	  <text x={'4'} y={(1) * 12} fontSize="12" stroke={'white'} style={{textDecoration:'underline'}}> {this.props.name} </text>
   	  <rect x={'80'} y={(1) * 1} width={90} height={12} style={{fill:'blue', stroke:'pink'}} onClick={this.props.updateMode}>  
   	  </rect>

   	</svg>

   )
 }
});

// which makes this reusable component for other views
export default MedicationsPanelTitle