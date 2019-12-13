const request = require('request');
const chalk = require('chalk');

// We can modify our url by adding query strings to it.
// example loremipsumurl?key=value&key2=value - ? is added ob beggining of query string, format is key value and we can chain those by adding &
const url =
  'https://api.darksky.net/forecast/5e4e0b6a607496db43372935985bf2cb/37.8267,-122.4233';

//   We can seet the module to parse json for us
request({ url: url, json: true }, (error, response) => {
  //   const data = JSON.parse(response.body);
  //   console.log(data);
  //   console.log(response.body.currently);
  const {
    body: {
      currently: { temperature },
      currently: { precipProbability }
    }
  } = response;

  console.log(`
    It is currently ${chalk.green.bold(temperature)} deg,
    there is a ${chalk.green.bold(precipProbability + '%')} probability of rain
  `);
});
