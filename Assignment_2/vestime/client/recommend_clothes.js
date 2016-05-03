// Determines what clothes are suitable, depending on the weather conditions
export default function recommend_clothes(weather_code, temperature) {
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
        return 'tshirt.png'
        break;
      } else {
        return 'jacket.png'
        break;
      }
  }
}
