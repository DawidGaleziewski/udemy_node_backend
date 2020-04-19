const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// We put a callback inside a callback
geocode('Boston', (error, geocodeData) => {

    if(error){
        // we can use return to break the function instead of using else
        return console.log(error);
    } 

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        console.log('Error', error)
        console.log('Data', forecastData)
    });  
});

