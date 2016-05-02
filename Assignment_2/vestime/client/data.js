Template.data.helpers({
  city: 'Unknown',

  icon: function() {
    return Session.get('icon', 'Waiting for the server...')
  },
  
  temperature: function() {
    return Session.get('temperature', 'Waiting for the server...')
  },

  weather_conditions: function() {
    return Session.get('weather', 'Waiting for server...');
  }
});
