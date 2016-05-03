Template.data.helpers({
  city: 'Vienna',

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
Template.data.events({
    "click .city_name": function() {
      // let isClosed = true,
      let city = document.getElementsByClassName('city_name')[0],
      city_list = document.getElementsByClassName('city-list')[0];

      console.log(isClosed);
      if(isClosed) {
        isClosed = false;
        city_list.style.display = 'block';
      } else {
        city_list.style.display = 'none';
        isClosed = true;
      }
    }
});
