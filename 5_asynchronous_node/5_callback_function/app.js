const request = require('request');
const chalk = require('chalk');

const weatherUrl =
  'https://api.darksky.net/forecast/5e4e0b6a607496db43372935985bf2cb/37.8267,-122.4233?units=si&exclude=minutely&lang=pl';

request({ url: weatherUrl, json: true }, (error, response) => {
  if (error) {
    console.log(
      chalk.red.bold('Network error - unable to connect to weather service')
    );
  } else if (response.body.error) {
    console.log(chalk.red.bold('Error - unable to find location'));
  } else {
    const {
      body: {
        currently: { temperature },
        currently: { precipProbability },
        daily: { data }
      }
    } = response;

    console.log(
      `
      ${chalk.blue.bold(data[0].summary)}
      It is currently ${chalk.green.bold(temperature)} deg,
      there is a ${chalk.green.bold(
        precipProbability + '%'
      )} probability of rain
    `
    );
  }
});

const geocodingUrl =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/warsaw.json?access_token=pk.eyJ1IjoiZGF3aWRnYWxlemlld3NraWRldiIsImEiOiJjazQ2dnF5ajEwa2t0M25sOXZ4ODl5ZTJiIn0.eaNk4FvwS1Ewagc9b7Tx4w&limit=1';

request({ url: geocodingUrl, json: true }, (error, response) => {
  const {
    body: { features }
  } = response;

  if (error) {
    console.log(chalk.red.bold('Network error when fetching geolocation'));
  } else if (features.length === 0) {
    console.log(chalk.red.bold('Error - No resaults'));
  } else {
    const [longitude, latidude] = features[0].center;
    console.log(latidude, longitude);
  }
});
