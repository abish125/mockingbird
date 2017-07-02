import React from 'react';
import MedItem from './MedItem'
var ReactDom = require('react-dom');

var medContextHeirarchy = {home:0, hospital:1}
var medSystemHeirarchy = {neuro:0, cv:1, pulm:2, gi:3, gu:4, diet:5, id:6, endo:7, heme:8, tld:8}
////console.log('medContextHeirarchy')

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function checkAndAdd(name) {
  var id = arr.length + 1;
  var found = arr.some(function (el) {
    return el.username === name;
  });
  if (!found) { arr.push({ id: id, username: name }); }
}

function sortArrOfObjectsByParam(arrToSort /* array */, strObjParamToSortBy /* string */, sortName /* bool(optional, defaults to true) */) {
    if(sortName == undefined) sortName = 'name';  // default to sortName == true
    
    if(sortName=='name') {
        arrToSort.sort(function (a, b) {
            if (a[strObjParamToSortBy].toUpperCase() > b[strObjParamToSortBy].toUpperCase()) {
              return 1;
            }
            if (a[strObjParamToSortBy].toUpperCase() < b[strObjParamToSortBy].toUpperCase()) {
              return -1;
            }
            return 0;
        }); 
    }

    if(sortName=='context') {
        arrToSort.sort(function (a, b) {
            if (a[strObjParamToSortBy].toUpperCase() > b[strObjParamToSortBy].toUpperCase()) {
              return 1;
            }
            if (a[strObjParamToSortBy].toUpperCase() < b[strObjParamToSortBy].toUpperCase()) {
              return -1;
            }
            return 0;
        }); 
    }

    else {
        arrToSort.sort(function (a, b) {
            if (a.context.toUpperCase() > b.context.toUpperCase()) {
              return -1;
            }
            if (a.context.toUpperCase() < b.context.toUpperCase()) {
              return 1;
            }
            return 0;
        }); 
        //});
    }
}
//var tornado = range(9, 18); // [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
////console.log('tornado')
////console.log(tornado);

function setupMedsList(medsData, medsSortCriterion) {
    if (medsData.length > 0) { 
      var medNumber = medsData.length
      sortArrOfObjectsByParam(medsData, medsSortCriterion, 'context')
      var medGroups = _.groupBy(medsData, 'context');
      //console.log(medGroups)
      //sortArrOfObjectsByParam(medGroups, 'med_heirarchy', 'context')
      ////console.log('medGroups')
      ////console.log(medGroups)
      //var medGroupLengths = medGroups.map((g) => g.length)
      /* 
      var medGroupLength = _.countBy(medGroups, function(val, key) {
        return medGroups[key].length;
      });
      */      
      var medGroupLength = _.mapObject(medGroups, function(val, key) {  
        return medGroups[key].length;
      }); 

      var medRank = _.mapObject(medsData, function(val, key) {
        //console.log('lazy susan')
        //console.log(val['context'])
        return medContextHeirarchy[val.context];
      });      

      //console.log('medGroupLength')
      //console.log(medGroupLength)
      //console.log(medRank)
      //console.log(medGroups)
      



    	var items = []
      var i = 0
      _.mapObject(medsData, function(val, key) {
        val["position"] = i
        items.push(val)
        i++
      });

      var medGroupItems = []
      _.mapObject(medGroups, function(val, key) {
        //console.log(val)
        var v = _.findIndex(medsData, {context:val})
        medGroupItems.push(v)
      });
      //console.log('medGroupItems')
      //console.log(medGroupItems)

      /*
      for (var i=0; i<medGroups.length; i++) {  
        items.push(medGroups[i]);
      };
      /*



    	for (var i=0; i<medsData.length; i++) {  
    	  var md = medsData[i]
    	  //console.log(md)
        items.push({'position': i, 'name': md['name'], 'context': md['context']});
        //items.push({'x_position': 10, 'y_position': 12, 'name': md['name'], 'context': md['context']});
      //items[0].x_position = 13 //I don't know why i have to do this
      //items[0].y_position = 0
      for (var i=0; i<medGroups.length; i++) {  
        var md = medsData[i]
        //console.log(md)
        items.push({'position': i, 'name': md['name'], 'context': md['context']});      


      };
      */



    	//console.log('in render meds list')
      //console.log(items)
      return items
    }
    else return [];
}

function renderMedsList(medsToList) {
  if (medsToList.length > 0) {
    return medsToList.map((medsDatum, index) => (
          <MedItem key={index} datum={medsDatum} />
          ));
  }
  else return [];
}

var MedsList = React.createClass({
 render() {
 var medsListData = setupMedsList(this.props.data, this.props.mode);
 var medsList = renderMedsList(medsListData);

 //console.log('meds')
 //console.log(this.props)



   return (
        <g>
            {medsList}
        </g>

   )
 }
});

// which makes this reusable component for other views
export default MedsList