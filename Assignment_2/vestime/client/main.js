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

    Session.set('icon_clothing', recommend_clothes(weather_status_code, temperature));

    Session.set('description_clothing', describe_weather(weather_status_code, temperature));
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
  // Determines what clothes are suitable, depending on the weather conditions
  function recommend_clothes(weather_code, temperature) {
    weather_code = parseInt(weather_code);
    weather_code /= 100;

    switch(weather_code) {
      case 2:
        return 'jacket.png';
        break;
      case 3:
        return 'jacket.png';
        break;
      case 5:
        return 'jacket.png';
        break;
      case 6:
        return 'winter_hat.png';
        break;
      default:
        if(temperature > 18) {
          return 'sunglasses.png'
          break;
        } else {
          return 'jacket.png'
          break;
        }
    }
  }

  function describe_weather(weather_code, temperature) {
    weather_code = parseInt(weather_code);
    weather_code /= 100;

    // Determine temperature e.g cold, warm.
    let weather_feel;

    if(temperature < 5) {
      weather_feel = 'cold';
    } else if(temperature > 5 && temperature < 10) {
      weather_feel = 'chilly';
    } else if(temperature > 10 && temperature < 15) {
      weather_feel = 'warm';
    } else {
      weather_feel = 'hot';
    }

    let weather_templates = {
      'rain': 'Get your umbrella, we are expecting rain! ',
      'fog': 'Low visibility. Carefull on the road. ',
      'snow': 'Yeahhhh, snow! ',
      'sun': 'Wow, is it summer already? '
    }

    let temperature_templates = {
      'cold': 'Tea time - you are going to freeze outside!',
      'chilly': 'A warm sweater might come handy.',
      'warm': 'Good news is you won\'t freeze, but get a light jacket, will ya\'?',
      'hot': 'T\'shirt and beer time! Don\'t forget your sunglasses'
    };

    switch(weather_code) {
      case 2:
        return weather_templates['rain'] + temperature_templates[weather_feel]
        break;
      case 3:
        return weather_templates['rain'] + temperature_templates[weather_feel]
        break;
      case 5:
        return weather_templates['rain'] + temperature_templates[weather_feel]
        break;
      case 6:
        return weather_templates['snow'] + temperature_templates[weather_feel]
        break;
      case 7:
        return weather_templates['fog'] + temperature_templates[weather_feel]
        break;
      default:
        return weather_templates['sun'] + temperature_templates[weather_feel]
        break;
    }
  }
});
