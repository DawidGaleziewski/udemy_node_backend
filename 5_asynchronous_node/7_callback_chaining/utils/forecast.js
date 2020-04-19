
const request = require('request');

const forecast = (lat, long, callback) => {
    const requestURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=e7336c281c3b4f9e7da03a467444db14`;
    
    request({url: requestURL, json:true}, (error, response) => {

        if(error){
            callback('ERROR: response from server: ' + error, undefined);
        }  else if(response.body.error){
            callback('ERROR: unable to find location', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.list[2].main.temp,
                himidity: response.body.list[2].main.humidity,
                wind: response.body.list[2].wind.speed
            });
        }
    });
}

module.exports = forecast;