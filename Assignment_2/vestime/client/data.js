Template.data.helpers({
  city: 'Unknown',
  
  temperature: function() {
    return Session.get('temperature', 'Waiting for the server...')
  },

  weatherConditions: function() {
    return Session.get('weather', 'Waiting for server...');
  }
});
