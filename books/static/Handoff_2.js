import React from 'react';
import BmpFishbone from './BmpFishbone';
import CbcFishbone from './CbcFishbone';
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


var ReactDom = require('react-dom');

var moment = require('moment');

var d3Handoff = {};

//styling
var round_corner = 5

//variables for laying out the display
var svgStyle = {
        backgroundColor: "grey"};
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

//variables to control events panel
var ep_w = width
var ep_h = 12
var ep_x = g_margin.left
var ep_y = g_margin.top

//variables to control date panel
var dp_w = width
var dp_h = ep_h
var dp_x = g_margin.left
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
var fb_strokeWidth = '1'
var fb_stroke = 'green'  
var fb_size = .4

//variables to control side panel
var sp_w = 200
var sp_h = height
var sp_x = ep_x + 10 + width
var sp_y = g_margin.top

function fishbone_lines(p, h, size) {
    var ts = p
    var cmp_h = h
    var hor_line = {width: 85 * (1/3) * size}
    var ver_line = {length: 15 * size}

    //horizontal line
    var cbc0 =  [ts - hor_line.width/2, cmp_h, ts + hor_line.width/2, cmp_h]
    
    var l1 = ts - hor_line.width/2
    var cbc1 = [l1 - 5, cmp_h + ver_line.length, l1, cmp_h]
    
    var l2 = ts - hor_line.width/2
    var cbc2 = [l2 - 5, cmp_h - ver_line.length, l2, cmp_h]

    var l3 = ts + hor_line.width/2
    var cbc3 = [l3 + 5, cmp_h + ver_line.length, l3, cmp_h]

    var l4 = ts + hor_line.width/2    
    var cbc4 = [l4 + 5, cmp_h - ver_line.length, l4, cmp_h]

    return [cbc0, cbc1, cbc2, cbc3, cbc4]

    };

class CatPoint extends React.Component {
  render() {
    const {x, y, datum, stroke} = this.props;
    var coords = fishbone_lines(x, y, 0.4)
    return (
      <svg>
        <line x1={coords[0][0]} y1={coords[0][1]} x2={coords[0][2]} y2={coords[0][3]} strokeWidth={this.props.strokeWidth} stroke={stroke}/> 
        <line x1={coords[1][0]} y1={coords[1][1]} x2={coords[1][2]} y2={coords[1][3]} strokeWidth={this.props.strokeWidth} stroke={stroke}/> 
        <line x1={coords[2][0]} y1={coords[2][1]} x2={coords[2][2]} y2={coords[2][3]} strokeWidth={this.props.strokeWidth} stroke={stroke}/> 
        <line x1={coords[3][0]} y1={coords[3][1]} x2={coords[3][2]} y2={coords[3][3]} strokeWidth={this.props.strokeWidth} stroke={stroke}/> 
        <line x1={coords[4][0]} y1={coords[4][1]} x2={coords[4][2]} y2={coords[4][3]} strokeWidth={this.props.strokeWidth} stroke={stroke}/> 
      </svg>

    );
  }
}
//scale at top level of display so that components change synchronously
function mainScaler(start, stop) { 
  var x_scale = d3.time.scale()
    //TODO: fix the domain
    //new Date('2017-02-20T12:00:00.000Z'), new Date('2017-02-23T12:00:00.000Z')
    .domain([start, stop]) //for now look at past seven days
    .range([g_margin.left, g_margin.left + width]);
  return x_scale
}



var y_scale = d3.scale.linear()
  .domain([50, 170])
  .range([330, tl_y]); // 

function renderVitals(lineData, xScale, displayFocus) {
    //goal: using a time stamp, render an appropriately positioned cbc fishbone diagram
    if (lineData.length > 0 && displayFocus=="vitals") {  
        return lineData.map((lineDatum, index) => (
          <Vitals key={index} time={xScale(moment.unix(lineDatum.timestamp))} sbp={y_scale(lineDatum.sbp)} hr={y_scale(lineDatum.hr)} sat={y_scale(lineDatum.sat)} size={vit_size} dbp={y_scale(lineDatum.dbp)} strokeWidth={fb_strokeWidth} stroke={fb_stroke} fill={vit_fill} />
          ));
    }
    else return [];
}

function renderBmpFishbones(lineData, xScale, displayFocus) {
    //using a time stamp, render an appropriately positioned bmp fishbone diagram
    if (lineData.length > 0 && displayFocus=="vitals") {  
        //console.log(moment.unix(lineData[0].timestamp).toString())
        return lineData.map((lineDatum, index) => (
          <BmpFishbone key={index} data={xScale(moment.unix(lineDatum.timestamp))} height={bmp_height} strokeWidth={fb_strokeWidth} stroke={fb_stroke}  size={fb_size} />
          ));
    }
    else return [];
}

function renderCbcFishbones(lineData, xScale, displayFocus) {
    //goal: using a time stamp, render an appropriately positioned cbc fishbone diagram
    if (lineData.length > 0 && displayFocus=="vitals") {  
        return lineData.map((lineDatum, index) => (
          <CbcFishbone key={index} data={xScale(moment.unix(lineDatum.timestamp))} height={cbc_height} strokeWidth={fb_strokeWidth} stroke={fb_stroke} size={fb_size} />
          ));
    }
    else return [];
}

function renderEventsPanel() {
    //goal: make an events panel,
    return <EventsPanel  x={ep_x} y={ep_y} height={ep_h} width={ep_w} />

    };
/*
function renderDateSelector() {
    //goal: make an events panel,
    return <DateSelector  x={dp_x} y={dp_y} height={dp_h} width={dp_w} />

    };
*/
function renderMeds(medsData, mode, updateMode, displayFocus) {
    //goal: make an events panel,
    //console.log(displayFocus)
    //console.log('medsDisplayArea')
    if (displayFocus=='vitals') {
      var medsDisplayArea = {x:sp_x, y:sp_y, h:height, w:sp_w};
      //console.log(medsDisplayArea)
    }
    if (displayFocus=="meds") {
      var medsDisplayArea = {x:ep_x, y:tl_y, h:height, w:ep_w};
    }
    //console.log(medsDisplayArea)

    return <MedicationsPanel  x={medsDisplayArea.x} y={medsDisplayArea.y} height={medsDisplayArea.h} width={medsDisplayArea.w} data={medsData} mode={mode} updateMode={updateMode} />

    };
function processRaw(lineData) {
    //goal: using a time stamp, render an appropriately positioned cbc fishbone diagram
    if (lineData.length > 0) {  
      console.log(lineData)
        lineData.map((lineDatum, index) => (
          lineDatum.timescale = moment.unix(lineDatum.timescale)
          ));
        return lineData;
    }
    else return [];
  }

//var Handoff = React.createClass({
class Handoff_2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {displayFocus:"vitals", modeMeds: "name", 
    startDateSet:new Date('2017-02-28T12:00:00.000Z'), 
    eD:50, 
    startDate:new Date('2017-02-28T12:00:00.000Z'), 
    endDateSet:new Date('2017-02-28T12:00:00.000Z'), 
    endDate:new Date('2017-02-28T12:00:00.000Z'),
    selectedDomain:{x: [new Date('2017-02-28T12:00:00.000Z'), new Date('2017-04-28T12:00:00.000Z')], y:[0,40]}}
    this.updateModeMeds = this.updateModeMeds.bind(this)
    this.updateStart = this.updateStart.bind(this)
    this.updateEnd = this.updateEnd.bind(this)
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

  updateStart (newStartValue) {
    this.setState({ startDate: moment(this.state.startDateSet).subtract(Math.floor(100 - (newStartValue * 100)), 'days')});
  }

  updateEnd (newEndValue) {
    this.setState({ endDate: moment(this.state.endDateSet).subtract(Math.floor(100 - (newEndValue * 100)), 'days')});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
    this.setState({startDate: domain.x[0]})
    this.setState({endDate: domain.x[1]})

    //console.log(this.state.zoomDomain)
  }

  render () {
    //console.log('render display')
    ////console.log(this.props.data.labs.bmp)
    var ts = mainScaler(this.state.startDate, this.state.endDate);
    const fb_bmp_display = renderBmpFishbones(this.props.data.labs.bmp, ts, this.state.displayFocus);
    const fb_cbc_display = renderCbcFishbones(this.props.data.labs.cbc, ts, this.state.displayFocus);
    const vit_display = renderVitals(this.props.data.vits, ts, this.state.displayFocus);
    const meds_display = renderMeds(this.props.data.meds, this.state.modeMeds, this.updateModeMeds, this.state.displayFocus);
    const events_panel = renderEventsPanel();
    //const date_selector = renderDateSelector();
    // <DateSelector  x={dp_x} y={dp_y} height={dp_h} width={dp_w} sD={this.state.sD} seD={this.state.eD} updateStart={this.updateStart} updateEnd={this.updateEnd} />

    var xxx = processRaw(this.props.data.labs.bmp);
    console.log(xxx)
    var xxxx = processRaw(this.props.data.labs.cbc);

    return (
      <div>
      <svg width={display_width} height={display_height} style={svgStyle} rx={round_corner} ry={round_corner}>
      {fb_bmp_display}
      {fb_cbc_display}
      {vit_display}
      {events_panel}
      {meds_display}

        
        <Slider
          onValueChange={newStartValue => this.updateStart(newStartValue)}
          x="20" y="20" width="500" />
        <Slider
          onValueChange={newEndValue => this.updateEnd(newEndValue)}
          x="20" y="40" width="500" />
        <text x="100" y="100" stroke="white">{moment(this.state.startDate).toString()}</text>
        <text x="100" y="150" stroke="white">{moment(this.state.endDate).toString()}</text>

        <g transform={"translate(12, 20)"}>

        <VictoryChart
              //padding={{top: g_margin.top, left: g_margin.left, right: 0, bottom: 0}}
              //height={ep_h}
              //width={600}
              height={ep_h+50} 
              width={ep_w}
              scale={{x: "time"}} //style={chartStyle}
              containerComponent={
                <VictoryBrushContainer responsive={false}
                  padding={{top: 0, left: 0, right: 0, bottom: 0}}
                  dimension="x"
                  //selectedDomain={this.state.selectedDomain}
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
                {x: new Date(2017, 0, 1), y: 0},
                {x: new Date(2017, 7, 1), y: 0}
              ]}
            />

        </VictoryChart> 
        </g>

      </svg>
      </div>
    );
  }
};
//});


export default Handoff_2