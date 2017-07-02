import React from 'react';
var ReactDom = require('react-dom');

var d3Timeline = {};


d3Timeline.create = function(dom, timeline_data) {

    var items = timeline_data.timeline.items

    var now = new Date();
    
    var margin = {top: 20, right: 15, bottom: 15, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom
      , miniHeight = 30//lanes.length * 12 + 50
      , mainHeight = height - miniHeight - 50;
    
    var format = d3.time.format("%Y-%m-%d");
    
    var testFunction = function(dates) {
    	var date_list = [];
    	for (var i=0; i<dates.length; i++) {
    		date_list.push(format.parse(dates[i].start))
    	}
    	console.log(date_list);
    	return date_list;
    }
    
    var testStartDates = testFunction(items);
    
    var x = d3.time.scale()
    	.domain([d3.time.sunday(d3.min(items, function(d) { return format.parse(d.start); })),
    			 d3.max(items, function(d) { return format.parse(d.end); })])
    	.range([0, width]);
    var x1 = d3.time.scale().range([0, width]);
    
    var numItems = items.length;
    
    var itemColor = function(item) {
    	if (item.item_type == "condition") {
    		return "teal";
    	}
    	if (item.item_type == "medication") {
    		return "purple";
    	}
    	if (item.item_type == "risk_factor") {
    		return "lightgreen";
    	}
    }
    
    var yScale = d3.scale.ordinal()
        .domain(d3.range(numItems))
        //.domain([ext[0], ext[1] + 1])
        .rangeRoundBands([0, mainHeight], .1);
 

    var chart = d3.select(dom)
    	//.append('svg:svg')
    	.attr('width', width + margin.right + margin.left)
    	.attr('height', height + margin.top + margin.bottom)
    	.attr('class', 'chart');
    
    chart.append('defs').append('clipPath')
    	.attr('id', 'clip')
    	.append('rect')
    		.attr('width', width)
    		.attr('height', mainHeight);
    
    var main = chart.append('g')
    	.attr('transform', 'translate(' + margin.left + ',' + (miniHeight + 60) + ')')
    	.attr('width', width)
    	.attr('height', mainHeight)
    	.attr('class', 'main');
    
    var mini = chart.append('g')
    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    	.attr('width', width)
    	.attr('height', miniHeight)
    	.attr('class', 'mini')
    	.style("fill", "black");
    
    var xDateAxis = d3.svg.axis()
    	.scale(x)
    	.orient('top')
    	//.orient('bottom')
    	//.ticks(d3.time.mondays, (x.domain()[1] - x.domain()[0]) > 15552e6 ? 2 : 1)
    	.ticks(d3.time.years, (x.domain()[1] - x.domain()[0]) > 15552e6 ? 2 : 1)
    	//.tickFormat(d3.time.format('%d'))
    	.tickFormat(d3.time.format('%b %Y'))
    	.tickSize(15, 0, 0);
    	//.tickSize(6, 0, 0);
    
    var xMonthAxis = d3.svg.axis()
    	.scale(x)
    	.orient('top')
    	//.ticks(d3.time.months, 1)
    	.ticks(d3.time.years, 1)
    	.tickFormat(d3.time.format('%b %Y'))
    	.tickSize(15, 0, 0);
    
    var x1DateAxis = d3.svg.axis()
    	.scale(x1)
    	.orient('bottom')
    	//.ticks(d3.time.days, 1)
    	.ticks(d3.time.months, 12)
    	.tickFormat(d3.time.format('%a %d'))
    	.tickSize(6, 0, 0);
    	//.tickSize(6, 0, 0);
    
    var x1MonthAxis = d3.svg.axis()
    	.scale(x1)
    	.orient('top')
    	//.ticks(d3.time.mondays, 1)
    	.ticks(d3.time.years, 1)
    	.tickFormat(d3.time.format('%b - Week %W'))
    	.tickSize(15, 0, 0);
    
    main.append('g')
    	.attr('transform', 'translate(0,' + mainHeight + ')')
    	.attr('class', 'main axis date')
    	.call(x1DateAxis);
    
    main.append('g')
    	.attr('transform', 'translate(0,0.5)')
    	.attr('class', 'main axis month')
    	.call(x1MonthAxis)
    	.selectAll('text')
    		.attr('dx', 5)
    		.attr('dy', 12);
    
    mini.append('g')
    	.attr('transform', 'translate(0,' + miniHeight + ')')
    	.attr('class', 'axis date')
    	.call(xDateAxis);
    
    mini.append('g')
    	.attr('transform', 'translate(0,0.5)')
    	.attr('class', 'axis month')
    	.call(xMonthAxis)
    	.selectAll('text')
    		.attr('dx', 5)
    		.attr('dy', 12);
    
    // draw a line representing today's date
    main.append('line')
    	.attr('y1', 0)
    	.attr('y2', mainHeight)
    	.attr('class', 'main todayLine')
    	.attr('clip-path', 'url(#clip)');
    
    // draw the items
    var itemRects = main.append('g')
    	.attr('clip-path', 'url(#clip)');
    
    //  hit area to move around the selection window
    mini.append('rect')
    	.attr('pointer-events', 'painted')
    	.attr('width', width)
    	.attr('height', miniHeight)
    	//.attr('visibility', 'hidden')
    	.style("fill", "purple")
    	.on('mouseup', moveBrush);
    
    // draw the selection area
    var brush = d3.svg.brush()
    	.x(x)
    	.extent([d3.time.monday(now),d3.time.saturday.ceil(now)])
    	.on("brush", display);
    
    mini.append('g')
    	.attr('class', 'x brush')
    	.call(brush)
    	.selectAll('rect')
    		.attr('y', 1)
    		.attr('height', miniHeight - 1);
    
    mini.selectAll('rect.background').remove();
    display();
    
    function display () {
    
    	var rects, labels
    	  , minExtent = d3.time.day(brush.extent()[0])
    	  , maxExtent = d3.time.day(brush.extent()[1])
    	  , visItems = items.filter(function (d) { return format.parse(d.start) < maxExtent && format.parse(d.end) > minExtent});
    
    	mini.select('.brush').call(brush.extent([minExtent, maxExtent]));		
    
    	x1.domain([minExtent, maxExtent]);
    
    	if ((maxExtent - minExtent) > 1468800000) {
    		x1DateAxis.ticks(d3.time.years, 1).tickFormat(d3.time.format('%a %d'))
    		x1MonthAxis.ticks(d3.time.years, 1).tickFormat(d3.time.format('%b - Week %W'))
    		//x1DateAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%a %d'))
    		//x1MonthAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%b - Week %W'))		
    	}
    	else if ((maxExtent - minExtent) > 172800000) {
    		x1DateAxis.ticks(d3.time.days, 1).tickFormat(d3.time.format('%a %d'))
    		x1MonthAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%b - Week %W'))
    	}
    	else {
    		x1DateAxis.ticks(d3.time.hours, 4).tickFormat(d3.time.format('%I %p'))
    		x1MonthAxis.ticks(d3.time.days, 1).tickFormat(d3.time.format('%b %e'))
    	}
    
    
    	//x1Offset.range([0, x1(d3.time.day.ceil(now) - x1(d3.time.day.floor(now)))]);
    
    	// shift the today line
    	main.select('.main.todayLine')
    		.attr('x1', x1(now) + 0.5)
    		.attr('x2', x1(now) + 0.5);
    
    	// update the axis
    	main.select('.main.axis.date').call(x1DateAxis);
    	main.select('.main.axis.month').call(x1MonthAxis)
    		.selectAll('text')
    			.attr('dx', 5)
    			.attr('dy', 12);
    
    	// upate the item rects
    	rects = itemRects.selectAll('rect')
    		.data(visItems, function (d) { return d.id; })
    		.attr('x', function(d) { return x1(format.parse(d.start)); })
    		.attr('width', function(d) { return x1(format.parse(d.end)) - x1(format.parse(d.start)); });
    
    	rects.enter().append('rect')
    		.attr('x', function(d) { return x1(format.parse(d.start)); })
    		//.attr('y', function(d) { return y1(d.lane) + .1 * y1(1) + 0.5; })
    		.attr('y', function(d) {return yScale(d.id); })
    		.attr('width', function(d) { return x1(format.parse(d.end)) - x1(format.parse(d.start)); })
    		//.attr('height', function(d) { return .8 * y1(1); })
    		.attr("height", yScale.rangeBand())
    		.attr('class', function(d) { return 'mainItem ' + d.class; })
    		.attr("fill", function(d) { return itemColor(d); });
    
    	rects.exit().remove();
    
    	// update the item labels
    	labels = itemRects.selectAll('text')
    		.data(visItems, function (d) { return d.id; })
    		.attr('x', function(d) { return x1(Math.max(format.parse(d.start), minExtent)) + 2; });
    				
    	labels.enter().append('text')
    		.text(function (d) { return 'Item\n\n\n\n Id: ' + d.id; })
    		.attr('x', function(d) { return x1(Math.max(format.parse(d.start), minExtent)) + 2; })
    		//.attr('y', function(d) { return y1(d.lane) + .4 * y1(1) + 0.5; })
    		.attr('y', function(d) {return yScale(d.id) + yScale.rangeBand()/2; })
    		.attr('text-anchor', 'start')
    		.attr('class', 'itemLabel');
    
    	labels.exit().remove();
    }
    
    function moveBrush () {
    	var origin = d3.mouse(this)
    	  , point = x.invert(origin[0])
    	  , halfExtent = (brush.extent()[1].getTime() - brush.extent()[0].getTime()) / 2
    	  , start = new Date(point.getTime() - halfExtent)
    	  , end = new Date(point.getTime() + halfExtent);
    
    	brush.extent([start,end]);
    	display();
    }
};

d3Timeline.update = function (dom, p){

    //var width = 100,
    //height = 20;
    
    //Append an SVG to the dom element we are working with now
    var timeline_svg = d3.select(dom)
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

d3Timeline.update = d3Timeline.create;

var Timeline = React.createClass({
  /* propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    timeline_data: React.PropTypes.array.isRequired,
  },
  */

  getDefaultProps: function() {
    return {
      width: 300,
      height: 350,
      title: 'timeline',
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
  //this loads the Timeline. without it, the Timeline does not load.
  componentDidMount: function() {
    console.log('mounted')
    var dom =  ReactDom.findDOMNode(this.refs.dom);
    console.log(this.props)
    d3Timeline.create(dom, this.props);
    console.log('cdm')
  },

  shouldComponentUpdate: function(props) {
    var dom =  ReactDom.findDOMNode(this.refs.dom);
    console.log(dom)
    //dom.remove()
    d3Timeline.update(dom, props); 
    return true;
  }


});


export default Timeline


