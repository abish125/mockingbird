import React from 'react';
var ReactDom = require('react-dom');

var d3Sparkline = {};

d3Sparkline.handleData = function (p){
    var width = 100,
    height = 20;

    var x = d3.scale.ordinal()
      .domain(p.data.map(function(d) {
        return d.timestamp;
      }))
      .rangeRoundBands([0, width], 0);
    

    var y = d3.scale.linear()
      .domain([d3.min(p.data, function(d) {
        return d.val;
      }), d3.max(p.data, function(d) {
        return d.val;
      })])
      .range([height, 0]);
    
    //Draw the line graph
    var line = d3.svg.line()
      //.interpolate("basis")
      .x(function(d) {
        return x(d.timestamp);
      })
      .y(function(d) {
        return y(d.val);
      });

    return [line(p.data), x(p.data[p.data.length - 1].timestamp), y(p.data[p.data.length - 1].val)]

};


d3Sparkline.create = function (dom, p){

    var margin_top = 0,
    margin_bottom = 0,
    margin_left = 0,
    margin_right = 0,
    width = 100 + margin_left + margin_right,
    height = 20 + margin_top + margin_bottom;
    
    //Append an SVG to the dom element we are working with now
    var spark = d3.select(dom)
      .attr("width", width)
      .attr("height", height)
      .attr('transform', 'translate(0, 2)');
    

    var use_data = this.handleData(p)

    var sparkpath = spark.selectAll("path")
      .data(use_data[0]);

    sparkpath.enter().append("path")
      .attr("d", use_data[0])
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1);


    //sparkpath.exit().remove();


    var sparkcirc = spark.selectAll("circle")
      .data(use_data)


    sparkcirc.enter().append("circle") 
      //.attr("class", "enter")  
      //.attr('class', 'sparkcircle')
      .attr('cx', use_data[1])
      .attr("fill", "blue")
      .attr('cy', use_data[2])
      .attr('r', 1.5);

    //sparkcirc.exit().remove();

    var sparklabel = spark.selectAll("text")
      .data(use_data)

    sparklabel.enter().append("text") 
      .attr('x', use_data[1])
      .attr('y', use_data[2])
      .text(use_data[2]);
  };


d3Sparkline.update = function (dom, p){

    //var width = 100,
    //height = 20;
    
    //Append an SVG to the dom element we are working with now
    var spark = d3.select(dom)
    var sparkpath = spark.selectAll("path")
    var sparkcirc = spark.selectAll("circle")
    var sparklabel = spark.selectAll("text")

    var update_data = this.handleData(p)

    sparkpath
      .attr("d", update_data[0])
      .attr("stroke", "blue")
    
    sparkcirc
      .attr('cx', update_data[1])
      .attr("fill", "green")
      .attr('cy', update_data[2])
      .attr('r', 1.5)
      .attr('label', update_data[2]);

    sparklabel
      .attr('x', update_data[1])
      .attr('y', update_data[2])
      .text(update_data[2]);
  
  };


/*d3Sparkline.update = function(el, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data);
};
*/
var Sparkline = React.createClass({
  /* propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
  },
  */

  getDefaultProps: function() {
    return {
      width: 300,
      height: 350,
      title: 'sparkline',
      Legend: true,
    };
  },

  render: function() {
    console.log('render')


    return (
      <div>
        <p> {this.props.title} </p> 
        <svg ref='dom'></svg>
      </div>
    );
  },
  //this loads the sparkline. without it, the sparkline does not load.
  componentDidMount: function() {
    console.log('mounted')
    var dom =  ReactDom.findDOMNode(this.refs.dom);
    console.log(this.props)
    d3Sparkline.create(dom, this.props);
    console.log('cdm')
  },

  shouldComponentUpdate: function(props) {
    var dom =  ReactDom.findDOMNode(this.refs.dom);
    console.log(dom)
    //dom.remove()
    d3Sparkline.update(dom, props); 
    return true;
  }


});


export default Sparkline