import React from 'react';
import Select from 'react-select';

var ReactDom = require('react-dom');



var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
  ];


class SelectDisplayFocus extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:"One"};
  };


  logChange(value) {
    this.setState({value:value});
    console.log("Selected: " + this.state.value.value);
    console.log(this.state.value);
  }

  render () {

    return (
    	<Select options={options} onChange={this.logChange.bind(this)} value={this.state.value}/>
    );
  }

};


export default SelectDisplayFocus