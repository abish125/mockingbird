import React from 'react';
class App extends React.Component {
	constructor() {
		super();
		this.state = {data: [
			{mrn: 1, name: "bob", na: 137, k: 4.5, cl: 111, co3: 21, bun: 20, cr: 1, glucose: 99},
			{mrn: 2, name: "jim", na: 137, k: 4.5, cl: 111, co3: 21, bun: 20, cr: 1, glucose: 99},
			{mrn: 3, name: "sue", na: 137, k: 4.5, cl: 111, co3: 21, bun: 20, cr: 1, glucose: 99},
			{mrn: 4, name: "pat", na: 137, k: 4.5, cl: 111, co3: 21, bun: 20, cr: 1, glucose: 99}
		]}
	}
	render(){
	  let rows = this.state.data.map( person => {
		return <PtInfo key={person.mrn} data={person} />
	  })
	  return <div> {rows} </div>

	}
}


/*
const PtInfo = (props) => {
	return <div>
	  <h1>{props.data.name}</h1>
	  <txt> MRN: {props.data.mrn} </txt> <br/>
	  <txt>{props.data.na} - {props.data.k} - {props.data.cl} - {props.data.co3} - {props.data.bun} - {props.data.cr} - {props.data.glucose} </txt> 
	  <br/><br/>
	</div>
}
*/

var PtInfo = React.createClass({

	getInitialState: function() {
		return {foo: +false}
	},

	update(e){
		this.setState({foo: e.target.value})
	},

	handleClick(e) {
		this.setState({foo: +e.target.checked});
	},

	render: function() {
	  return <div>
	    <h3>{this.props.data.name}</h3>
	    <input type="checkbox" id="poop"
	      onClick={this.handleClick} /> <br/>
	    <txt> state: {this.state.foo} </txt> <br/>
	    <txt> MRN: {this.props.data.mrn} </txt> <br/>
	    <txt>{this.props.data.na} - {this.props.data.k} - {this.props.data.cl} - {this.props.data.co3} - {this.props.data.bun} - {this.props.data.cr} - {this.props.data.glucose} </txt> 
	    <br/><br/>
	  </div>
	}
});


export default App