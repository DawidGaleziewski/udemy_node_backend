
const request = require('request');

const forecast = (lat, long, callback) => {

    // we can set name to url to use the shorthand in the request argument
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=e7336c281c3b4f9e7da03a467444db14`;
    
    // only property we use from response is body so it is good to destructure it on this level
    request({url, json:true}, (error, { body }) => {

        if(error){
            callback('ERROR: response from server: ' + error, undefined);
        }  else if(body.error){
            callback('ERROR: unable to find location', undefined);
        } else {
            const {list} = body;
            const {main:{temp:temperature, humidity}, wind:{speed:wind}} =  list[2];

            callback(undefined, {
                temperature,
                humidity,
                wind
            });
        }
    });
}

module.exports = forecast;