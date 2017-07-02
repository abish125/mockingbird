import React from 'react';
var ReactDom = require('react-dom');

var d3Handoff = {};

var display_width = 660 //960 originally

d3Handoff.handleData = function (p, x){
    console.log(p)
    var margin = {top: 20, right: 15, bottom: 15, left: 60}
      , width = display_width - margin.left - margin.right
      , height = 200 - margin.top - margin.bottom    


    var x_scale = d3.scale.ordinal()
      .domain(p.map(function(d) {
        return d.timestamp;
      }))
      .rangeRoundBands([0, width], 0);
    
/*
    var y_scale = d3.scale.linear()
      .domain([d3.min(p, function (d) {
        return d.val;
      }), d3.max(p, function (d) {
        return d.val;
      })])
      .range([height, 0]);
*/
    var y_scale = d3.scale.linear()
      .domain([60, 150])
      .range([height, 60]); // the 60 squishes down the vitals display 

    var coords = p.map (function (d) {
      return [x_scale(d.timestamp), y_scale(d.val), Math.round(d.val), x] // TODO why is there another time stamp here?

    });

    //console.log(line(p));
    console.log(coords);
    return coords

};

d3Handoff.fishbone_cmp_lines = function (p, size) {
    var margin = {top: 20, right: 15, bottom: 15, left: 60}
      , width = display_width - margin.left - margin.right
      , height = 300 - margin.top - margin.bottom

    var cmp_h = 290
    var hor_line = {width: 85 * size}
    var ver_line = {length: 15 * size}

    var x_scale = d3.scale.ordinal()
      .domain(p.map(function(d) {
        return d.timestamp;
      }))
      .rangeRoundBands([0, width], 0);


    var cmp0 = p.map (function (d) {
      return [x_scale(d.timestamp) - hor_line.width/2, cmp_h, x_scale(d.timestamp) + hor_line.width/2, cmp_h]
    });
    var cmp1 = p.map (function (d) {
      var l = x_scale(d.timestamp) - hor_line.width/2 + hor_line.width/3
      return [l, cmp_h + ver_line.length, l, cmp_h - ver_line.length]
    });

    var cmp2 = p.map (function (d) {
      var l = x_scale(d.timestamp) - hor_line.width/2 + (2 * (hor_line.width/3))
      return [l, cmp_h + ver_line.length, l, cmp_h - ver_line.length]
    });

    var cmp3 = p.map (function (d) {
      var l = x_scale(d.timestamp) - hor_line.width/2 + (3 * (hor_line.width/3))
      return [l, cmp_h, l + 5, cmp_h - ver_line.length]
    });

    var cmp4 = p.map (function (d) {
      var l = x_scale(d.timestamp) - hor_line.width/2 + (3 * (hor_line.width/3))
      return [l, cmp_h, l + 5, cmp_h + ver_line.length]
    });

    return [cmp0, cmp1, cmp2, cmp3, cmp4]

    };

d3Handoff.fishbone_cbc_lines = function (p, size) {
    var margin = {top: 20, right: 15, bottom: 15, left: 60}
      , width = display_width - margin.left - margin.right
      , height = 300 - margin.top - margin.bottom
    console.log('in function fishbone_cmp_lines')
    console.log(p)

    var cmp_h = 335
    var hor_line = {width: 85 * (1/3) * size}
    var ver_line = {length: 15 * size}


    var x_scale = d3.scale.ordinal()
      .domain(p.map(function(d) {
        return d.timestamp;
      }))
      .rangeRoundBands([0, width], 0);


    var cbc0 = p.map (function (d) {
      return [x_scale(d.timestamp) - hor_line.width/2, cmp_h, x_scale(d.timestamp) + hor_line.width/2, cmp_h]
    });
    var cbc1 = p.map (function (d) {
      var l = x_scale(d.timestamp) - hor_line.width/2
      return [l - 5, cmp_h + ver_line.length, l, cmp_h]
    });

    var cbc2 = p.map (function (d) {
      var l = x_scale(d.timestamp) - hor_line.width/2
      return [l - 5, cmp_h - ver_line.length, l, cmp_h]
    });

    var cbc3 = p.map (function (d) {
      var l = x_scale(d.timestamp) + hor_line.width/2
      return [l + 5, cmp_h + ver_line.length, l, cmp_h]
    });

    var cbc4 = p.map (function (d) {
      var l = x_scale(d.timestamp) + hor_line.width/2
      return [l + 5, cmp_h - ver_line.length, l, cmp_h]
    });

    return [cbc0, cbc1, cbc2, cbc3, cbc4]

    };


d3Handoff.create = function (dom, p, phase){

    //d3Handoff.fishbone();

    var margin = {top: 20, right: 15, bottom: 15, left: 60}
      , width = display_width - margin.left - margin.right
      , height = 400 - margin.top - margin.bottom    

    
    //use d3 to select an SVG element created by react
    var spark = d3.select(dom)
      .attr("width", width)
      .attr("height", height)
      .attr('transform', 'translate(0, 10)')

    //The min and max dates should ultimately be functions of patient data
    var mindate = new Date(2012,0,0),
        maxdate = new Date(2012,0,1);

    var x1_scale = d3.time.scale()
      .domain([mindate, maxdate])
      .range([0, width]);

    var x1DateAxis = d3.svg.axis()
      .scale(x1_scale)
      .orient('top')
      //.ticks(d3.time.hours, 1)
      .ticks(d3.time.hours, 2)
      .tickFormat(d3.time.format('%I %p'))
      .tickSize(2, 2, 2);
      //.tickSize(6, 0, 0);

    spark.append('g')
      .attr('transform', 'translate(10,' + 20 + ')')
      .attr('class', 'main axis date')
      .attr("fill", "green")
      .attr("stroke", "green")
      .call(x1DateAxis);

    var use_data = this.handleData(p.data.sbp, 'sbp')

    var use_data = use_data.concat(this.handleData(p.data.dbp, 'dbp'))

    var symbolTypes = {
        "sbp": d3.svg.symbol().type("triangle-down").size(15),
        "dbp": d3.svg.symbol().type("triangle-up").size(15),
    };

    var bmp_inputs = {"bmp_time": p.data.sodium, "na" : p.data.sodium[0], "k" : p.data.potassium[0], "cl" : p.data.chloride[0], "co3" : p.data.bicarb[0], "bun" : p.data.bun[0], "cr" : p.data.creatinine[0], "gluc" : p.data.glucose[0]}
    var fishbone_line_size = .5
    var bmp_inputs_line = d3Handoff.fishbone_cmp_lines(bmp_inputs.bmp_time, fishbone_line_size)
    var cbc_inputs_line = d3Handoff.fishbone_cbc_lines(bmp_inputs.bmp_time, fishbone_line_size)

    chooseDisplay(phase);

    function chooseDisplay (phase) {
                if (phase === "first")
                    return firstDisplay ();
                else
                    return updateDisplay ();
            }
    

    function firstDisplay () {

        var sparkpath = spark.selectAll("point")
          .data(use_data);
    
        sparkpath.enter().append("path")
          .attr("class", "point")
          .attr("d", function(d,i){
                if (d[3] === "sbp")
                    return symbolTypes.sbp();
                else
                    return symbolTypes.dbp();
            })
          .attr("transform", function(d) { return "translate(" + (d[0]) + "," + (d[1]) + ")"; })
          .attr("fill", "green");

        sparkpath.exit().remove()

        var sparklabelGroup = spark.append("g");
    
        var sparklabel = sparklabelGroup.selectAll("vital_labels")
          .data(use_data)

        sparklabel.enter().append("text") 
          .attr("class", "vital_labels")
          .attr('x', function(d) { return d[0] + 5 })
          .attr('y', function(d) { return d[1] })
          .text(function(d) { return d[2]})
          .attr("font-family", "calibri")
          .attr("font-size", "10px")
          .attr("fill", "green");

        sparklabel.exit().remove()
    
        var fishbone_cmp_0 = spark.selectAll("fishbone_cmp_0")
            .data(bmp_inputs_line[0])
      
        fishbone_cmp_0.enter()
            .append('line')
          .attr("class", "fishbone_cmp_0")
          .attr("x1", function(d) { return d[0]; })
          .attr("y1", function(d) { return d[1]; })
          .attr("x2", function(d) { return d[2]; })
          .attr("y2", function(d) { return d[3]; })
            .style("stroke", function(d) { return "green" })
            .style("stroke-width", function(d) { return 1; });

        console.log(fishbone_cmp_0.exit())

        fishbone_cmp_0.exit().remove()

    
        var fishbone_cmp_1 = spark.selectAll("fishbone_cmp_1")
            .data(bmp_inputs_line[1])
            
        fishbone_cmp_1
          .enter()
              .append('line')
          .attr("class", "fishbone_cmp_1")
          .attr("x1", function(d) { return d[0]; })
          .attr("y1", function(d) { return d[1]; })
          .attr("x2", function(d) { return d[2]; })
          .attr("y2", function(d) { return d[3]; })
            .style("stroke", function(d) { return "green" })
            .style("stroke-width", function(d) { return 1; });

        fishbone_cmp_1.exit().remove()
    
        var fishbone_cmp_2 = spark.selectAll("fishbone_cmp_2")
          .data(bmp_inputs_line[2])

        fishbone_cmp_2.enter()            
              .append('line')
          .attr("class", "fishbone_cmp_2")
          .attr("x1", function(d) { return d[0]; })
          .attr("y1", function(d) { return d[1]; })
          .attr("x2", function(d) { return d[2]; })
          .attr("y2", function(d) { return d[3]; })
            .style("stroke", function(d) { return "green" })
            .style("stroke-width", function(d) { return 1; });
          
        fishbone_cmp_2.exit().remove()
    
        var fishbone_cmp_3 = spark.selectAll("fishbone_cmp_3")
            .data(bmp_inputs_line[3])
        
        fishbone_cmp_3.enter()            
                .append('line')
            .attr("class", "fishbone_cmp_3")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });
            
        fishbone_cmp_3.exit().remove()
    
        var fishbone_cmp_4 = spark.selectAll("fishbone_cmp_4")
            .data(bmp_inputs_line[4])
        
        fishbone_cmp_4.enter()            
                .append('line')
            .attr("class", "fishbone_cmp_4")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });
        
        fishbone_cmp_4.exit().remove()
    
        var fishbone_cbc_0 = spark.selectAll("fishbone_cbc_0")
            .data(cbc_inputs_line[0])

        fishbone_cbc_0.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_0")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_0.exit().remove()


        var fishbone_cbc_1 = spark.selectAll("fishbone_cbc_1")
            .data(cbc_inputs_line[1])

        fishbone_cbc_1.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_1")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_1.exit().remove()

        var fishbone_cbc_2 = spark.selectAll("fishbone_cbc_2")
            .data(cbc_inputs_line[2])

        fishbone_cbc_2.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_2")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_2.exit().remove()

        var fishbone_cbc_3 = spark.selectAll("fishbone_cbc_3")
            .data(cbc_inputs_line[3])

        fishbone_cbc_3.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_3")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_3.exit().remove()

        var fishbone_cbc_4 = spark.selectAll("fishbone_cbc_4")
            .data(cbc_inputs_line[4])

        fishbone_cbc_4.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_4")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_4.exit().remove()


        };
    
    function updateDisplay () {


        var sparkpath = spark.selectAll("point")
          .data(use_data);
    
        sparkpath.append("path")
          .attr("class", "point")
          .attr("d", function(d,i){
                if (d[3] === "sbp")
                    return symbolTypes.sbp();
                else
                    return symbolTypes.dbp();
            })
          .attr("transform", function(d) { return "translate(" + (d[0]) + "," + (d[1]) + ")"; })
          .attr("fill", "green");

        sparkpath.exit().remove()

        var sparklabelGroup = spark.append("g");
    
        var sparklabel = spark.selectAll("vital_labels")
          .data(use_data)

        sparklabel.enter().append("text") 
          .attr("class", "vital_labels")
          .attr('x', function(d) { return d[0] + 5 })
          .attr('y', function(d) { return d[1] })
          .text(function(d) { return d[2]})
          .attr("font-family", "calibri")
          .attr("font-size", "10px")
          .attr("fill", "green");

        sparklabel.exit().remove()
    
        var fishbone_cmp_0 = spark.selectAll("fishbone_cmp_0")
            .data(bmp_inputs_line[0])
      
        fishbone_cmp_0.enter()
            .append('line')
          .attr("class", "fishbone_cmp_0")
          .attr("x1", function(d) { return d[0]; })
          .attr("y1", function(d) { return d[1]; })
          .attr("x2", function(d) { return d[2]; })
          .attr("y2", function(d) { return d[3]; })
            .style("stroke", function(d) { return "green" })
            .style("stroke-width", function(d) { return 1; });

        console.log(fishbone_cmp_0.exit())

        fishbone_cmp_0.exit().remove()

    
        var fishbone_cmp_1 = spark.selectAll("fishbone_cmp_1")
            .data(bmp_inputs_line[1])
            
        fishbone_cmp_1
          .enter()
              .append('line')
          .attr("class", "fishbone_cmp_1")
          .attr("x1", function(d) { return d[0]; })
          .attr("y1", function(d) { return d[1]; })
          .attr("x2", function(d) { return d[2]; })
          .attr("y2", function(d) { return d[3]; })
            .style("stroke", function(d) { return "green" })
            .style("stroke-width", function(d) { return 1; });

        fishbone_cmp_1.exit().remove()
    
        var fishbone_cmp_2 = spark.selectAll("fishbone_cmp_2")
          .data(bmp_inputs_line[2])

        fishbone_cmp_2.enter()            
              .append('line')
          .attr("class", "fishbone_cmp_2")
          .attr("x1", function(d) { return d[0]; })
          .attr("y1", function(d) { return d[1]; })
          .attr("x2", function(d) { return d[2]; })
          .attr("y2", function(d) { return d[3]; })
            .style("stroke", function(d) { return "green" })
            .style("stroke-width", function(d) { return 1; });
          
        fishbone_cmp_2.exit().remove()
    
        var fishbone_cmp_3 = spark.selectAll("fishbone_cmp_3")
            .data(bmp_inputs_line[3])
        
        fishbone_cmp_3.enter()            
                .append('line')
            .attr("class", "fishbone_cmp_3")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });
            
        fishbone_cmp_3.exit().remove()
    
        var fishbone_cmp_4 = spark.selectAll("fishbone_cmp_4")
            .data(bmp_inputs_line[4])
        
        fishbone_cmp_4.enter()            
                .append('line')
            .attr("class", "fishbone_cmp_4")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });
        
        fishbone_cmp_4.exit().remove()
    
        var fishbone_cbc_0 = spark.selectAll("fishbone_cbc_0")
            .data(cbc_inputs_line[0])

        fishbone_cbc_0.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_0")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_0.exit().remove()


        var fishbone_cbc_1 = spark.selectAll("fishbone_cbc_1")
            .data(cbc_inputs_line[1])

        fishbone_cbc_1.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_1")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_1.exit().remove()

        var fishbone_cbc_2 = spark.selectAll("fishbone_cbc_2")
            .data(cbc_inputs_line[2])

        fishbone_cbc_2.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_2")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_2.exit().remove()

        var fishbone_cbc_3 = spark.selectAll("fishbone_cbc_3")
            .data(cbc_inputs_line[3])

        fishbone_cbc_3.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_3")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_3.exit().remove()

        var fishbone_cbc_4 = spark.selectAll("fishbone_cbc_4")
            .data(cbc_inputs_line[4])

        fishbone_cbc_4.enter()  
                .append('line')
            .attr("class", "fishbone_cbc_4")
            .attr("x1", function(d) { return d[0]; })
            .attr("y1", function(d) { return d[1]; })
            .attr("x2", function(d) { return d[2]; })
            .attr("y2", function(d) { return d[3]; })
              .style("stroke", function(d) { return "green" })
              .style("stroke-width", function(d) { return 1; });

        fishbone_cbc_4.exit().remove()


        };
  };


d3Handoff.update = function (dom, p){

    d3Handoff.create(dom, p, "whatever")
  
  };


/*d3Sparkline.update = function(el, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data);
};
*/
var Handoff = React.createClass({
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
      title: 'handoff',
      Legend: true,
    };
  },

  render: function() {
    var letterStyle = {
        padding: 10,
        margin: 10,
        backgroundColor: "black",
        color: "green",
        display: "inline-block",
        fontFamily: "calibri",
        fontSize: "11px",
        textColor: "green",
        textAlign: "left"
    };

    console.log('render')


    return (
      <div style={letterStyle}>
        <p> {this.props.title} </p> 
        <svg ref='dom' style={letterStyle}> </svg>
      </div>
    );
  },
  //this loads the sparkline. without it, the sparkline does not load.
  componentDidMount: function() {
    console.log('mounted')
    var dom =  ReactDom.findDOMNode(this.refs.dom);
    console.log(this.props)
    d3Handoff.create(dom, this.props, "first");
    console.log('cdm')
  },

  shouldComponentUpdate: function(props) {
    var dom =  ReactDom.findDOMNode(this.refs.dom);
    d3Handoff.update(dom, props); 
    return true;
  }


});


export default Handoff