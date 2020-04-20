const request = require('request');

const getGeocode = (address, callback) => {
    // encodeURIComponent is important as sb can put special character that does something in the url.
    // I.e encodeURIComponent will change ? into %3F
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF3aWRnYWxlemlld3NraWRldiIsImEiOiJjazk1eGU2c20wMnkyM2Z0Y2VkbzA2bW03In0.09K6RUNcddaMY0TyUDP4Mw`;

    request({url: geocodeUrl, json:true}, (error, response) => {
        // We want the error part to be re-usable as well adding error to callback
        if(error){
        callback('ERROR: Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
        callback('ERROR: Unable to find location, try another search', undefined);
        } else {
        callback(undefined, {
            latitude: response.body.features[0].center[0],
            longitude: response.body.features[0].center[1],
            location: response.body.features[0].place_name
        })
        }
    })
};
  
module.exports = getGeocode;