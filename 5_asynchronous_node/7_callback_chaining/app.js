const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode(process.argv[2], (error, geocodeData) => {

    if(!process.argv[2]){
        return console.log('No value provided!')
    }

    if(error){
        return console.log(error);
    } 

    forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
        console.log('Error', error)
        console.log('Data', forecastData, geocodeData)
    });  
});

// console.log(process.argv)