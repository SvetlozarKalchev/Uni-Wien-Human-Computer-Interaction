export default function get_city_code(selected_city) {

  let cities = {
    'Salzburg': 2766824,
    'Bratislava': 3060972,
    'Prague':  4548393,
    'Berlin': 6545310,
    'Budapest': 7284844,
    'Ljubljana': 3196359
  };

  return cities[selected_city];
}
