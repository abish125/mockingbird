import React from 'react';
import SvgLine from './SvgLine';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

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

    var cmp_h = 1700
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
      //var l = d.timestamp - hor_line.width/2 + hor_line.width/3
      //return [l, cmp_h + ver_line.length, l, cmp_h - ver_line.length]

      return [{x: l, y:cmp_h + ver_line.length}, {x:l, y:cmp_h - ver_line.length}]
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
/*
<VictoryLine
  data={[
    {month: "September", profit: 35000, loss: 2000},
    {month: "October", profit: 42000, loss: 8000},
    {month: "November", profit: 55000, loss: 5000}
  ]}
  x="month"
  y={(datum) => datum.profit - datum.loss}
/>
*/

function renderLines(lineData) {
    if (lineData.length > 0) {      
        return lineData.map((lineDatum, index) => (
          /*
            <VictoryLine
              key={index}
              data={lineDatum}
              //domain={{
              //x: [new Date(1999, 1, 1), new Date(2016, 1, 1)],
              //y: [0, 600]
           // }}
              x="x"
              y="y"
         />
         */
         <SvgLine key={index}
              data={lineDatum} />


        ));
    }
    else return [];
}

var Victory = React.createClass({

  render: function() {
    console.log('render victory')

    var bmp_inputs = {"bmp_time": this.props.data.sodium}//, "na" : p.data.sodium[0], "k" : p.data.potassium[0], "cl" : p.data.chloride[0], "co3" : p.data.bicarb[0], "bun" : p.data.bun[0], "cr" : p.data.creatinine[0], "gluc" : p.data.glucose[0]}
    var fishbone_line_size = .5
    var bmp_inputs_line = d3Handoff.fishbone_cmp_lines(bmp_inputs.bmp_time, fishbone_line_size)
    var cbc_inputs_line = d3Handoff.fishbone_cbc_lines(bmp_inputs.bmp_time, fishbone_line_size)
    var use_data = bmp_inputs_line[0]
    console.log(use_data)
    console.log(bmp_inputs_line[2])
    const lines = renderLines(use_data);
    console.log(lines)


/*
    return (
      <svg width={800} height={300}>
      <VictoryChart width={300} height={660}>
        <VictoryAxis dependentAxis
            domain={[-600, 0]}
            //offsetX={50}
            orientation="left"
            standalone={false}
        />
        {lines}
      </VictoryChart>
      {lines}
      </svg>
    );
*/
    return (
      <svg width={800} height={300}>
      {lines}
      </svg>
    );
  }

});


export default Victory