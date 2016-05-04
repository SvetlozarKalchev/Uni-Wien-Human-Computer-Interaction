// Import meteor packages
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';


// Import custom function
import make_API_call  from './api_call.js'
import parse_weather_code from './parse_weather_code.js'
import recommend_clothes from './recommend_clothes.js'
import describe_weather from './describe_weather.js'

Meteor.disconnect();

// code to run at app startup
Meteor.startup(() => {
  // Set default city
  Session.set('city', 'Vienna');

  let current_city = Session.get('city');
  let city = '2761369';

  // Makes the API call and pushes the returned values to the UI
  make_API_call(city, (temperature, weather_status_code, weather_conditions, icon) => {
    // Determines the weather type and sets the correct icon
    Session.set('icon', parse_weather_code(weather_status_code).toString() + '.png');

    Session.set('temperature', parseInt(temperature));

    Session.set('weather', weather_conditions);

    Session.set('icon_clothing', recommend_clothes(weather_status_code, temperature));

    Session.set('description_clothing', describe_weather(weather_status_code, temperature));
  });

});
