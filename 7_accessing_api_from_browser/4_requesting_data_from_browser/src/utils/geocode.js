const request = require('request');

const getGeocode = (address, callback) => {
    // encodeURIComponent is important as sb can put special character that does something in the url.
    // I.e encodeURIComponent will change ? into %3F
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF3aWRnYWxlemlld3NraWRldiIsImEiOiJjazk1eGU2c20wMnkyM2Z0Y2VkbzA2bW03In0.09K6RUNcddaMY0TyUDP4Mw`;

    request({url: geocodeUrl, json:true}, (error, {body}) => {
        // We want the error part to be re-usable as well adding error to callback
        const {features:{length: responseLength}} = body;
        if(error){
        callback('ERROR: Unable to connect to location services!', undefined);
        } else if (responseLength === 0) {
        callback('ERROR: Unable to find location, try another search', undefined);
        } else {
        
        const {features} = body;
        const {center, place_name: location} = features[0];
        const [latitude, longitude] = center;

        callback(undefined, {
            latitude,
            longitude,
            location
        })
        }
    })
};
  
module.exports = getGeocode;