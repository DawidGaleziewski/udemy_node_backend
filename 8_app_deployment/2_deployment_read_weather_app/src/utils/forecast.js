const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=e7336c281c3b4f9e7da03a467444db14`;

  request({ url, json: true }, (error, { body }) => {
    // console.log(url, body);

    if (error) {
      callback("ERROR: response from server: " + error, undefined);
    } else if (body.error) {
      callback("ERROR: unable to find location", undefined);
    } else {
      const { list } = body;
      const {
        main: { temp: temperature, humidity, pressure },
        wind: { speed: wind },
      } = list[2];
      console.log("pressure:", pressure);
      callback(undefined, {
        temperature,
        humidity,
        wind,
        pressure,
      });
    }
  });
};

module.exports = forecast;
