// Determines the general weather type and decides which icon and clothes
// to display
export default function parse_weather_code(code) {
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
