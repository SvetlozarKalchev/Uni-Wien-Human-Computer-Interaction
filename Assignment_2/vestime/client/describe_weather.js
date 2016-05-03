// Accepts the current weather code and temperature. Returns a suitable
// description
export default function describe_weather(weather_code, temperature) {
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
    'sun': 'Wow, it\'s so sunny! '
  }

  let temperature_templates = {
    'cold': 'Tea time - you are going to freeze outside!',
    'chilly': 'A warm sweater might come handy.',
    'warm': 'Good news is you won\'t freeze, but put on a light jacket, will ya\'?',
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
