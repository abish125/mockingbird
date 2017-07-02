import React from 'react';
import MedsList from './MedsList'
import MedicationsPanelTitle from './MedicationsPanelTitle'

var ReactDom = require('react-dom');



const MedicationsPanel = React.createClass({

 render() {
 //console.log('medsxxxxx')
 //console.log(this.props)
 //var coords = fishbone_lines(this.props.data, this.props.height, this.props.size)
   return (
      <svg width={this.props.width} height={this.props.height}  x={this.props.x} y={this.props.y} style={{fill:'blue', stroke:'green', strokeWidth:1, fillOpacity:0, strokeOpacity:1}}>
       

       <MedicationsPanelTitle data={this.props.data} mode={this.props.mode} name={'Medications'} updateMode={this.props.updateMode}/>
       <MedsList data={this.props.data} mode={this.props.mode}/>


      </svg>
   )
 }
});

// which makes this reusable component for other views
export default MedicationsPanel