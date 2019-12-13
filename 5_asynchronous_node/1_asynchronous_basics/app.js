console.log('Starting');

setTimeout(() => {
  // Will run after two seconds after 'Stopping'
  console.log(' 2 Second timer');
}, 2000);

setTimeout(() => {
  //! It will still print after stopping
  console.log('0 Secons timer');
}, 0);

console.log('Stopping');
