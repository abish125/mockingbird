import React from 'react';
import BmpFishbones from './BmpFishbones';
import CbcFishbones from './CbcFishbones';
import Vitals from './Vitals';
import EventsPanel from './EventsPanel';
import DateSelector from './DateSelector';
import MedicationsPanel from './MedicationsPanel'
import { VictoryChart } from 'victory';
import { VictoryBrushContainer } from 'victory';
import { VictoryScatter } from 'victory';
import { VictoryAxis } from 'victory';
import { VictoryLine } from 'victory';
import Slider from './Slider'
import SelectDisplayFocus from './SelectDisplayFocus';


var ReactDom = require('react-dom');

var moment = require('moment');

var d3Handoff = {};

//styling
var round_corner = 5

//variables for laying out the display
var svgStyle = {
        backgroundColor: "black"};
        /*display: "inline-block",
        fontFamily: "calibri",
        fontSize: "11px",
        stroke: 'black',
        strokeWidth: 3,
        textColor: "green",
        textAlign: "left"};
        */
var display_width = 660 + 200
var display_height = 400 

//global margins
var g_margin = {top: 20, right: 15 + 200, bottom: 15, left: 15}

var width = display_width - g_margin.left - g_margin.right

//label bar margins
var lb_margin = {top: g_margin.top * 2, bottom: 15, left: 15, width: 100}


//variables to control events panel
var ep_w = width
var ep_h = 12
var ep_x = g_margin.left + lb_margin.width
var ep_y = g_margin.top

//variables to control date panel
var dp_w = width
var dp_h = ep_h
var dp_x = g_margin.left + lb_margin.width
var dp_y = g_margin.top * 2

//timeline margins
var tl_y = dp_y + dp_h + 12
var height = display_height - tl_y - g_margin.bottom 

//variables for controlling vitals appearance
//var vit_height = 250
var vit_size = 5
var vit_fill = "grey"

//variables for controlling fishbone diagram appearance
var bmp_height = 300
var cbc_height = 330
var fb_style = {strokeWidth : '1', stroke: 'green', size: .4}

//variables to control side panel
var sp_w = 200
var sp_h = height
var sp_x = ep_x + 10 + width
var sp_y = g_margin.top

//scale at top level of display so that components change synchronously
function mainScaler(start, stop) { 
  var x_scale = d3.time.scale()
    .domain([start, stop]) //for now look at past seven days
    .range([ep_x, ep_x + width]);
  return x_scale
}

function dateFilter(myArr, start, stop) {
  var x = _.filter(myArr, function(o) { 
    return moment.unix(o.timestamp).isBetween(start, stop); 
  });
  return x;
}

var y_scale = d3.scale.linear()
  .domain([50, 170])
  .range([330, tl_y]); // 

function renderVitals(lineData, xScale, displayFocus) {
    //goal: using a time stamp, render an appropriately positioned cbc fishbone diagram
    if (lineData.length > 0 && displayFocus=="vitals") {  
        return lineData.map((lineDatum, index) => (
          <Vitals key={index} time={xScale(moment.unix(lineDatum.timestamp))} sbp={y_scale(lineDatum.sbp)} hr={y_scale(lineDatum.hr)} sat={y_scale(lineDatum.sat)} size={vit_size} dbp={y_scale(lineDatum.dbp)} strokeWidth={fb_style.strokeWidth} stroke={fb_style.stroke} fill={vit_fill} />
          ));
    }
    else return [];
}

class Handoff_2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {displayFocus:"vitals", modeMeds: "name", 
    startDateSet:new Date('2017-02-20T12:00:00.000Z'), 
    eD:50, 
    startDate:new Date('2017-02-20T12:00:00.000Z'), 
    endDateSet:new Date('2017-02-27T12:00:00.000Z'), 
    endDate:new Date('2017-02-27T12:00:00.000Z')}
    this.updateModeMeds = this.updateModeMeds.bind(this)
    this.handleBrush = this.handleBrush.bind(this)
  }

  updateModeMeds(){
    if (this.state.modeMeds=="name") {
      this.setState({modeMeds:"context"})
    } 
    if (this.state.modeMeds=="context") {
      this.setState({modeMeds:"name"})
    } 
  }

  handleBrush(domain) {
    this.setState({startDate: domain.x[0]})
    this.setState({endDate: domain.x[1]})

  }

  render () {
    var ts = mainScaler(this.state.startDate, this.state.endDate);
    //TODO: try filtering at the level of the individual data point so you dont have to filter all the arrays all the time?
    var bmp_render = dateFilter(this.props.data.labs.bmp, this.state.startDate, this.state.endDate)
    var cbc_render = dateFilter(this.props.data.labs.cbc, this.state.startDate, this.state.endDate)
    var vit_render = dateFilter(this.props.data.vits, this.state.startDate, this.state.endDate)
    const vit_display = renderVitals(vit_render, ts, this.state.displayFocus);

    return (
      <div>
      <svg width={display_width} height={display_height} style={svgStyle} rx={round_corner} ry={round_corner}>
      <BmpFishbones lineData={bmp_render} xScale={ts} style={fb_style} height={bmp_height} />
      <CbcFishbones lineData={cbc_render} xScale={ts} style={fb_style} height={cbc_height} />
      {vit_display}
      <EventsPanel  x={ep_x} y={ep_y} height={ep_h} width={ep_w} />
      <MedicationsPanel  x={lb_margin.left} y={tl_y} height={height} width={ep_w} data={this.props.data.meds} mode={this.state.modeMeds} updateMode={this.updateModeMeds} />

        

        <text x="100" y="100" stroke="white">{moment(this.state.startDate).toString()}</text>
        <text x="100" y="150" stroke="white">{moment(this.state.endDate).toString()}</text>

        <g transform={"translate(115, 20)"}>

        <VictoryChart
              padding={{top: 0, left: 0, right: 0, bottom: 0}}
              height={ep_h + 100} 
              width={ep_w}
              scale={{x: "time"}} //style={chartStyle}
              containerComponent={
                <VictoryBrushContainer responsive={false}
                  padding={{top: 0, left: 10, right: 0, bottom: 0}}
                  height={ep_h} 
                  dimension="x"
                  onDomainChange={this.handleBrush.bind(this)}
                  selectionStyle={{fill: "teal", opacity: 1}}
                />

              }
        >
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={[
                {x: moment(this.state.startDateSet), y: 0},
                {x: moment(this.state.endDateSet), y: 0}
              ]}

            />

            <VictoryAxis
            offsetY={-100}
            orientation={'bottom'}
            style={{
  axis: {stroke: "white"},
  axisLabel: {fontSize: 16, padding: 20, stroke: "black"},
  grid: {stroke: (t) => t === 10 ? "white" : "white"},
  ticks: {stroke: "grey"},
  tickLabels: {fontSize: 10, padding: 5}
}}

            />
        </VictoryChart> 

        </g>

      </svg>
      <p>testing testng 123 45678</p>
      <SelectDisplayFocus/>


      </div>
    );
  }
};
//});


export default Handoff_2