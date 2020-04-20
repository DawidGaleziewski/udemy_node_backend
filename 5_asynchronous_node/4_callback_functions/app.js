// example 1 of callback function
setTimeout(()=> {
  console.log('two seconds are up')
}, 2000);

// example 2 of callback function
const names = ['Andrew', 'Jen', 'Jess'];
const shortName = names.filter((name)=>{
  return name.length <= 4
});

// example 3 using callback in async functions
const geocode = (address, callback) => {
  setTimeout(()=>{
    const data = {
      latitude:0,
      longitude: 0
    };
    callback(data);

  }, 1000)
}

geocode('st parker street', (data)=> {
  console.log(data)
})

// Challange 1
const sum = (num1, num2, callback) => {
  setTimeout(()=> {
    const resault = num1 + num2;
    callback(resault)
  }, 2000);
}

sum(1, 4, (sum) => {
  console.log(sum); //should print 4
})