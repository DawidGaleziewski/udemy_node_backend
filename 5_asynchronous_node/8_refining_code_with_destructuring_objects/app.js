const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const {argv:nodeArguments} = process;

// It is better to destructure the object in the props when possible to hand over only the data we will need
geocode(nodeArguments[2], (error, {latitude,longitude , location}) => {
    if(!nodeArguments[2]){
        return console.log('No value provided!')
    }
    if(error){
        return console.log(error);
    } 
    // const {latitude, longitude} = geocodeData;
    forecast(latitude, longitude, (error, forecastData) => {
        console.log('Error', error)
        console.log('Data', forecastData, location)
    });  
});

