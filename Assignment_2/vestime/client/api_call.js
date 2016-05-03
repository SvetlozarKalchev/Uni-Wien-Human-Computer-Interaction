export default function make_API_call(city, callback) {
    const API_KEY = 'f7ffc08097454152c3cd090d8d3cac8e';

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
