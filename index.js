"use strict";

const express = require('express');
const bodyParser = require('body-parser');
var speech, response, sourceURL, responseObj; 
var arrayOfdevices = [], jsonOfdevices ={"mem_ID":"","state": "on","location": "master_bedroom","device": "light","media": "DF","query": "","Time":""};
const app = express();

function json2json(serverjson){
    for(var jsonkey in serverjson){
      if(jsonOfdevices[jsonkey]){
        jsonOfdevices[jsonkey] = serverjson[jsonkey]
      };
    };
    jsonOfdevices["c"]= Math.floor(Date.now()/1000)
};

function json2array(jsonData){
    var arrayObj = [];
    for(var jsonObj in jsonData) arrayObj.push(jsonData[jsonObj]);
    return arrayObj;
};

function searchIn(Searchwithin,searchLocation,searchLocationArrayID, searchDevice,searchDeviceArrayID){
    found = Searchwithin.find((elements)=>{ if((elements[searchLocationArrayID]==searchLocation)&&(elements[searchDeviceArrayID]==searchDevice))return elements[0]});
    if(found) return found;
    else return -1;
};

function searchIndex(Searchwithin,searchLocation,searchLocationArrayID, searchDevice,searchDeviceArrayID){
    for(var i=0;i<Searchwithin.length;i++){
        if((Searchwithin[i][searchLocationArrayID]==searchLocation)&&(Searchwithin[i][searchDeviceArrayID]==searchDevice)){
            return i;
        };
    };
};

function array2json(arrayObj,jsonObj){
    var count = 0;
    for(var jsonkey in jsonObj){
       jsonObj[jsonkey] = arrayObj[count];
        ++count;
    };
    return jsonObj;
};

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.post('/df', function(req, res) {
  //var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.media ? req.body.queryResult.parameters.location : 'Seems like some problem. Speak again.';
  speech = req.body && req.body.queryResult.parameters ? req.body.queryResult.parameters.location : 'Seems like some problem. Speak again.';
  console.log(JSON.stringify(req.body.queryResult.parameters));
  response = 'response is ' + speech;
  sourceURL = '';
  responseObj = {
                      "fulfillmentText": response
                      ,"fulfillmentMessages": [{"text" : { "text" : [response] }}]
                      ,"source": sourceURL
                    };
  return res.json(responseObj);
});

app.post('/client', function(req, res) {// MCU request
    let clientJson = req;
    console.log(JSON.stringify(clientJson));
  responseObj = {
                      "fulfillmentText": response
                      ,"fulfillmentMessages": [{"text" : { "text" : [response] }}]
                      ,"source": sourceURL
                    };
  return res.json(responseObj);    
});

app.post('/papp', function(req, res) {//portable device app request
    let pappJson = req;
    console.log(JSON.stringify(pappJson));
  responseObj = {
                      "fulfillmentText": response
                      ,"fulfillmentMessages": [{"text" : { "text" : [response] }}]
                      ,"source": sourceURL
                    };
  return res.json(responseObj);    
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Heroku server up and listening on port: " + port );
});



/*

x.push(json2array(i))
x.push(json2array(j))
console.log(x)
o = searchIn(x,'4')
console.log(o)
i = array2json(o,i)
console.log(JSON.parse(JSON.stringify(i)))

app.post("/audio", function(req, res) {
  var speech = "";
  switch (req.body.queryResult.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language 
    case "music one":
      speech =
        '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music two":
      speech =
        '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music three":
      speech =
        '<speak><audio repeatCount="2" soundLevel="-15db" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music four":
      speech =
        '<speak><audio speed="200%" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music five":
      speech =
        '<audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio>';
      break;
    case "delay":
      speech =
        '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
      break;
    //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "cardinal":
      speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
      break;
    case "ordinal":
      speech =
        '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
      break;
    case "characters":
      speech =
        '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
      break;
    case "fraction":
      speech =
        '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
      break;
    case "bleep":
      speech =
        '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
      break;
    case "unit":
      speech =
        '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
      break;
    case "verbatim":
      speech =
        '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
      break;
    case "date one":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
      break;
    case "date two":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
      break;
    case "date three":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
      break;
    case "time":
      speech =
        '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
      break;
    case "telephone one":
      speech =
        '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
      break;
    case "telephone two":
      speech =
        '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
      break;
    // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
    case "alternate":
      speech =
        '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
      break;
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

app.post("/video", function(req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});

app.post("/slack-test", function(req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [
      {
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [
          {
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url:
          "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [
          {
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    source: "webhook-echo-sample",
    data: {
      slack: slack_message
    }
  });
});
*/
