import React from 'react';


function random_number(min,max) {

    return ((max-min) * Math.random() + min);
};


function create_non_unique_random_array(num_elements,min,max) {

    var nums = new Array;

    for (var element=0; element<num_elements; element++) {
        nums[element] = {"timestamp":element, "val" : random_number(min,max)};
    }

    return (nums);
};

var timeline_data = {items:[
    {
      id:0,
      item:"BMI_over_forty",
      item_type:"condition",
      start:"1998-06-01",//"2012-01-16T13:00:00.000Z",
      end:"2015-10-01",//"2012-01-17T14:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:1,
      item:"Gout",
      item_type:"condition",
      start:"1998-06-01",//"2012-01-19T20:00:00.000Z",
      end:"2015-10-01",//"2012-01-23T21:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:2,
      item:"Hypertension",
      item_type:"condition",
      start:"2002-06-01",//dummy dates for now
      end:"2015-10-01",//"2012-02-01T13:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:3,
      item:"Diabetes",
      item_type:"condition",
      start:"2003-06-01",//"2012-02-03T18:00:00.000Z",
      end:"2015-10-01",//"2012-02-03T21:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:4,
      item:"Diverticulitis",
      item_type:"condition",
      start:"2004-01-01",//"2012-02-05T18:00:00.000Z",
      end:"2009-02-06",//"2012-02-06T21:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:5,
      item:"Depression",
      item_type:"condition",
      start:"1999-09-01",//"2012-02-09T20:00:00.000Z",
      end:"2003-11-01",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:6,
      item:"Bladder Cancer",
      item_type:"condition",
      start:"1999-02-01",//"2012-02-09T20:00:00.000Z",
      end:"1999-09-01",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:7,
      item:"Aspirin",
      item_type:"medication",
      start:"1998-06-01",//"2012-01-16T13:00:00.000Z",
      end:"2015-10-01",//"2012-01-17T14:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:8,
      item:"Allopurinol",
      item_type:"medication",
      start:"1998-06-01",//"2012-01-19T20:00:00.000Z",
      end:"2015-10-01",//"2012-01-23T21:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:9,
      item:"Clopidogrel",
      item_type:"medication",
      start:"1998-06-01",//"2012-01-27T16:00:00.000Z",
      end:"2015-10-01",//"2012-02-01T13:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:10,
      item:"Atorvastatin",
      item_type:"medication",
      start:"2001-09-01",//"2012-02-03T18:00:00.000Z",
      end:"2015-10-01",//"2012-02-03T21:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:11,
      item:"Lisinopril",
      item_type:"medication",
      start:"2002-01-01",//"2012-02-05T18:00:00.000Z",
      end:"2015-10-01",//"2012-02-06T21:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:12,
      item:"Metformin",
      item_type:"medication",
      start:"2003-09-01",//"2012-02-09T20:00:00.000Z",
      end:"2015-10-01",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:13,
      item:"Glyburide",
      item_type:"medication",
      start:"2004-01-11",//"2012-02-09T20:00:00.000Z",
      end:"2015-10-01",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:14,
      item:"Carvedilol",
      item_type:"medication",
      start:"2012-02-09",//"2012-02-09T20:00:00.000Z",
      end:"2015-10-01",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:15,
      item:"Lasix",
      item_type:"medication",
      start:"2012-02-09",//"2012-02-09T20:00:00.000Z",
      end:"2015-10-01",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:16,
      item:"Smoking",
      item_type:"risk_factor",
      start:"1998-06-01",//"2012-02-09T20:00:00.000Z",
      end:"1999-04-09",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    },
    {
      id:17,
      item:"Alcohol dependence",
      item_type:"risk_factor",
      start: "1998-06-01",//"2012-02-09T20:00:00.000Z",
      end: "2015-10-01",//"2012-02-09T22:00:00.000Z",
      class:"past",
      desc:"This is a description."
    }
  ]};



var Data = [{
       mrn: 1,
       name: "Leanne Graham",
       one_liner: "54 W hx colon cancer admitted from PCP with uptrending transaminitis, MRI confirms HCC",
       sodium: create_non_unique_random_array(2,3.5,4.5),
       potassium: create_non_unique_random_array(6,3.5,5),
       chloride: create_non_unique_random_array(6,96,106),
       bicarb: create_non_unique_random_array(6,22,29),
       bun: create_non_unique_random_array(6,7,20),
       creatinine: create_non_unique_random_array(6,0.6, 1.2),
       glucose: create_non_unique_random_array(6,70,100), 
       sbp: create_non_unique_random_array(6,100,140),
       dbp: create_non_unique_random_array(6,70,90),
       hr: create_non_unique_random_array(6,60,100),
       temp: create_non_unique_random_array(6,97,104),
       resp_rate: create_non_unique_random_array(6,12,20),
       timeline_info: timeline_data,
       email: "Sincere@april.biz",
       address: {
         street: "Kulas Light",
         suite: "Apt. 556",
         city: "Gwenborough",
         zipcode: "92998-3874",
         geo: {
           lat: "-37.3159",
           lng: "81.1496"
         }
       },
       phone: "1-770-736-8031 x5646",
       website: "hildegard.org",
       company: {
         name: "Romaguera-Crona",
         catchPhrase: "Multi-layered client-server neural-net",
         bs: "harness real-time e-markets"
       }
     },
     {
       mrn: 2,
       name: "Ervin Howell",
       one_liner: "21M POD#0 s/p uncomplicated lap appy, tolerating sips with no n/v - possible discharge today",
       sodium: create_non_unique_random_array(9,3.5,4.5),
       potassium: create_non_unique_random_array(6,3.5,5),
       chloride: create_non_unique_random_array(6,96,106),
       bicarb: create_non_unique_random_array(6,22,29),
       bun: create_non_unique_random_array(6,7,20),
       creatinine: create_non_unique_random_array(6,0.6, 1.2),
       glucose: create_non_unique_random_array(6,70,100), 
       sbp: create_non_unique_random_array(6,100,140),
       dbp: create_non_unique_random_array(6,70,90),
       hr: create_non_unique_random_array(6,60,100),
       temp: create_non_unique_random_array(6,97,104),
       resp_rate: create_non_unique_random_array(6,12,20),
       timeline_info: timeline_data,
       email: "Shanna@melissa.tv",
       address: {
         street: "Victor Plains",
         suite: "Suite 879",
         city: "Wisokyburgh",
         zipcode: "90566-7771",
         geo: {
           lat: "-43.9509",
           lng: "-34.4618"
         }
       },
       phone: "010-692-6593 x09125",
       website: "anastasia.net",
       company: {
         name: "Deckow-Crist",
         catchPhrase: "Proactive didactic contingency",
         bs: "synergize scalable supply-chains"
       }
     },
     {
       mrn: 3,
       name: "Clementine Bauch",
       one_liner: "32M hx polysubstance abuse p/w stab wound x 4 to abdomen now POD#7 s/p ex/lap, repair of multiple enterotomies, small bowel resection / primary re-anastomosis now tolerating regular diet",
       sodium: create_non_unique_random_array(2,3.5,4.5),
       potassium: create_non_unique_random_array(6,3.5,5),
       chloride: create_non_unique_random_array(6,96,106),
       bicarb: create_non_unique_random_array(6,22,29),
       bun: create_non_unique_random_array(6,7,20),
       creatinine: create_non_unique_random_array(6,0.6, 1.2),
       glucose: create_non_unique_random_array(6,70,100), 
       sbp: create_non_unique_random_array(6,100,140),
       dbp: create_non_unique_random_array(6,70,90),
       hr: create_non_unique_random_array(6,60,100),
       temp: create_non_unique_random_array(6,97,104),
       resp_rate: create_non_unique_random_array(6,12,20),
       timeline_info: timeline_data,
       email: "Nathan@yesenia.net",
       address: {
         street: "Douglas Extension",
         suite: "Suite 847",
         city: "McKenziehaven",
         zipcode: "59590-4157",
         geo: {
           lat: "-68.6102",
           lng: "-47.0653"
         }
       },
       phone: "1-463-123-4447",
       website: "ramiro.info",
       company: {
         name: "Romaguera-Jacobson",
         catchPhrase: "Face to face bifurcated interface",
         bs: "e-enable strategic applications"
       }
     },
     {
       mrn: 4,
       name: "Patricia Lebsack",
       one_liner: "6M with multiple psychiatric comorbitidies p/w self-inflicted stab wound to chest, now POD#2 from VATS decortication / evacuation of hematoma and placement of chest tubes x 2 undergoing intrapleural TPA protocol",
       sodium: create_non_unique_random_array(1,3.5,4.5),
       potassium: create_non_unique_random_array(6,3.5,5),
       chloride: create_non_unique_random_array(6,96,106),
       bicarb: create_non_unique_random_array(6,22,29),
       bun: create_non_unique_random_array(6,7,20),
       creatinine: create_non_unique_random_array(6,0.6, 1.2),
       glucose: create_non_unique_random_array(6,70,100), 
       sbp: create_non_unique_random_array(6,100,140),
       dbp: create_non_unique_random_array(6,70,90),
       hr: create_non_unique_random_array(6,60,100),
       temp: create_non_unique_random_array(6,97,104),
       resp_rate: create_non_unique_random_array(6,12,20),
       timeline_info: timeline_data,
       email: "Julianne.OConner@kory.org",
       address: {
         street: "Hoeger Mall",
         suite: "Apt. 692",
         city: "South Elvis",
         zipcode: "53919-657",
         geo: {
           lat: "29.4572",
           lng: "-164.2990"
         }
       },
       phone: "493-170-9623 x156",
       website: "kale.biz",
       company: {
         name: "Robel-Corkery",
         catchPhrase: "Multi-tiered zero tolerance productivity",
         bs: "transition cutting-edge web services"
       }
     },
     {
       mrn: 5,
       name: "Chelsey Dietrich",
       one_liner: "43W POD#1 s/p lap ccy for acute cholecystitis awaiting discharge",
       sodium: create_non_unique_random_array(3,400,60),
       potassium: create_non_unique_random_array(6,3.5,5),
       chloride: create_non_unique_random_array(6,96,106),
       bicarb: create_non_unique_random_array(6,22,29),
       bun: create_non_unique_random_array(6,7,20),
       creatinine: create_non_unique_random_array(6,0.6, 1.2),
       glucose: create_non_unique_random_array(6,70,100), 
       sbp: create_non_unique_random_array(6,100,140),
       dbp: create_non_unique_random_array(6,70,90),
       hr: create_non_unique_random_array(6,60,100),
       temp: create_non_unique_random_array(6,97,104),
       resp_rate: create_non_unique_random_array(6,12,20),
       timeline_info: timeline_data,
       email: "Lucio_Hettinger@annie.ca",
       address: {
         street: "Skiles Walks",
         suite: "Suite 351",
         city: "Roscoeview",
         zipcode: "33263",
         geo: {
           lat: "-31.8129",
           lng: "62.536"
         }
       },
       phone: "(254)954-1289",
       website: "demarco.info",
       company: {
         name: "Keebler LLC",
         catchPhrase: "User-centric fault-tolerant solution",
         bs: "revolutionize end-to-end systems"
       }
     },
     {
       mrn: 6,
       name: "Mrs. Dennis Schulist",
       one_liner: "53M unrestrained passenger MVC who sustained multiple traumatic injuries now s/p L femur IM nail by ortho awaiting acute rehab placement",
       sodium: create_non_unique_random_array(3,600,1000),
       potassium: create_non_unique_random_array(6,3.5,5),
       chloride: create_non_unique_random_array(6,96,106),
       bicarb: create_non_unique_random_array(6,22,29),
       bun: create_non_unique_random_array(6,7,20),
       creatinine: create_non_unique_random_array(6,0.6, 1.2),
       glucose: create_non_unique_random_array(6,70,100), 
       sbp: create_non_unique_random_array(6,100,140),
       dbp: create_non_unique_random_array(6,70,90),
       hr: create_non_unique_random_array(6,60,100),
       temp: create_non_unique_random_array(6,97,104),
       resp_rate: create_non_unique_random_array(6,12,20),
       timeline_info: timeline_data,
       email: "Karley_Dach@jasper.info",
       address: {
         street: "Norberto Crossing",
         suite: "Apt. 950",
         city: "South Christy",
         zipcode: "23505-1337",
         geo: {
           lat: "-71.4197",
           lng: "71.7478"
         }
       },
       phone: "1-477-935-8478 x6430",
       website: "ola.org",
       company: {
         name: "Considine-Lockman",
         catchPhrase: "Synchronised bottom-line interface",
         bs: "e-enable innovative applications"
       }
     }]

export default Data