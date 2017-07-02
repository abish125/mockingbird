import React from 'react';

var ReactDom = require('react-dom');


const MedItem = React.createClass({
 


 render() {


 //console.log('in med item');
 if (this.props.datum.context === "home") {
 	var context_color = "green"
 }
 else {
 	var context_color = "white"
 }

 return(



                <svg><text x='4' y={(this.props.datum.position + 2) * 12} fontSize="12" stroke={context_color}> {this.props.datum.name} </text></svg>
                //<tspan x={this.props.datum.x_position} dy={this.props.datum.y_position} stroke={context_color}> {this.props.datum.name}</tspan>



  )
  }
 });

// which makes this reusable component for other views
export default MedItem

