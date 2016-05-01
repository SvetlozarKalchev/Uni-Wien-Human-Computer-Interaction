import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  'use strict';
  const http = require('http'),
    API_KEY = require('key.json').key;

  let city = '2761369';

  let API_CALL =
    `http://api.openweathermap.org/data/2.5/forecast/city?id=${city}&units=metric&cnt=1&APPID=${API_KEY}`;

  let weather_data;

  // Extracted relevant weather data from the response
  let parse_data = function(weather_data) {
    let temperature = weather_data['list'][0]['main']['temp'],
      conditions = weather_data['list'][0]['weather'][0]['description'],
      icon = weather_data['list'][0]['weather'][0]['icon'];

    console.log(temperature, conditions, icon);
  }

  // Make GET request to openweathermap API
  http.get(API_CALL, (res) => {
    console.log(res.statusCode);

    // Receive response and parse it
    res.on('data', (chunk) => {
      // Response is received as binary data. Turn this into a string and store it
      weather_data += chunk.toString();
      /* Response starts with the string undefined. This is not valid JSON, so
       this string needs to be removed. This regex removes all occurences of
       undefined
      */
      weather_data = JSON.parse(weather_data.replace(/undefined/g, ''));
      parse_data(weather_data);
    })

  }).on('error', (msg) => console.log(msg))

});
