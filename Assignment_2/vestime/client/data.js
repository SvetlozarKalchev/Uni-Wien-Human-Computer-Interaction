import make_API_call  from './api_call.js'
import parse_weather_code from './parse_weather_code.js'
import recommend_clothes from './recommend_clothes.js'
import describe_weather from './describe_weather.js'
import get_city_code from './get_city_code.js'

Template.data.helpers({
  // city: Session.get('city'),
  city: function() {
    return Session.get('city');
  },

  icon: function() {
    return Session.get('icon');
  },

  temperature: function() {
    return Session.get('temperature', 'Waiting for the server...')
  },

  weather_conditions: function() {
    return Session.get('weather', 'Waiting for server...');
  },

  icon_clothing: function() {
    return Session.get('icon_clothing', 'loading.png');
  },

  description_clothing: function() {
    return Session.get('description_clothing', 'loading.png')
  }
});

/* Variable that stores the state of the menu. It can't be put in the
    event handler function, because it would be deleted once the function
    exits.
*/
let isClosed = true;

function toggle_city_menu() {
  let city = document.getElementsByClassName('city_name')[0],
  city_list = document.getElementsByClassName('city-list')[0];

  if(isClosed) {
    isClosed = false;
    city_list.style.display = 'block';
  } else {
    city_list.style.display = 'none';
    isClosed = true;
  }
}
Template.data.events({
    'click .city_name': function() {
      toggle_city_menu();
    },
    /*
      Change the city. The event variable, passed to the function
      is the clicked HTML element. In this case, this is the city.
    */
    'click .city-list p': function(event, template) {
      // Close the menu
let city = document.getElementsByClassName('city_name')[0],
city_list = document.getElementsByClassName('city-list')[0];

if(isClosed) {
  isClosed = false;
  city_list.style.display = 'block';
} else {
  city_list.style.display = 'none';
  isClosed = true;
}
      // Set the current city to the newly selected city name
      let selected_city = event.target.innerHTML;

      Session.set('city', selected_city);

      let city_code = get_city_code(selected_city);

      // Makes the API call and pushes the returned values to the UI
      make_API_call(city_code, (temperature, weather_status_code, weather_conditions, icon) => {
        // Determines the weather type and sets the correct icon
        Session.set('icon', parse_weather_code(weather_status_code).toString() + '.png');

        Session.set('temperature', parseInt(temperature));

        Session.set('weather', weather_conditions);

        Session.set('icon_clothing', recommend_clothes(weather_status_code, temperature));

        Session.set('description_clothing', describe_weather(weather_status_code, temperature));
      });
    }
});
