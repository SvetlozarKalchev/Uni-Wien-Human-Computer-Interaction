import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

import { Meteor } from 'meteor/meteor';

// code to run at app startup
Meteor.startup(() => {

  // Makes the API call and pushes the returned values to the UI
  make_API_call((temperature, weather_status_code, weather_conditions, icon) => {
    // Determines the weather type and sets the correct icon
    Session.set('icon', parse_weather_code(weather_status_code).toString() + '.png');

    Session.set('temperature', parseInt(temperature));
    
    Session.set('weather', weather_conditions);
  });

  function make_API_call(callback) {
    const API_KEY = 'f7ffc08097454152c3cd090d8d3cac8e';

    let city = '2761369';

    let API_CALL =
      `http://api.openweathermap.org/data/2.5/forecast/city?id=${city}&units=metric&cnt=1&APPID=${API_KEY}`;

    HTTP.call('GET', API_CALL, (err, res) => {

      let temperature = res.data.list[0]['main']['temp'],
        weather_status_code = res.data.list[0]['weather'][0]['id'],
        weather_conditions = res.data.list[0]['weather'][0]['description'],
        icon = res.data.list[0]['weather'][0]['icon'];

      callback(temperature, weather_status_code, weather_conditions, icon);
    });
  }

  // Determines the general weather type and decides which icon and clothes
  // to display
  function parse_weather_code(code) {
    code = parseInt(code);
    code = code/100;

    switch(code) {
      case 2:
        return 'thunder';
        break;
      case 3:
        return 'rain';
        break;
      case 5:
        return 'rain';
        break;
      case 6:
        return 'snow';
        break;
      case 7:
        return 'fog';
        break;
      default:
        return 'sunny'
        break;
    }
  }
});
