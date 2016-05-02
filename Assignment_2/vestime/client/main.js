import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

import { Meteor } from 'meteor/meteor';

// code to run on server at startup
Meteor.startup(() => {

  make_API_call((temperature, weather_status_code, weather_conditions, icon) => {
    Session.set('temperature', temperature);
    Session.set('weather', weather_conditions);
  });

  function make_API_call(callback) {
    const API_KEY = 'f7ffc08097454152c3cd090d8d3cac8e';

    let city = '2761369';

    let API_CALL =
      `http://api.openweathermap.org/data/2.5/forecast/city?id=${city}&units=metric&cnt=1&APPID=${API_KEY}`;

    HTTP.call('GET', API_CALL, (err, res) => {
      // console.log(res);
      console.log(Object.keys(res.data.message));//.list[0]));
      let temperature = res.data.list[0]['main']['temp'],
        weather_status_code = res.data.list[0]['weather'][0]['id'],
        weather_conditions = res.data.list[0]['weather'][0]['description'],
        icon = res.data.list[0]['weather'][0]['icon'];

      callback(temperature, weather_status_code, weather_conditions, icon);
    });
  }

});
