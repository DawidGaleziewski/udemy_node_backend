// normally we do not create promises it is created by library
// Promise unlike callbacks accepts not two args with error and data but two functions, on of them runs where data is delivered second when there is a issue
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3]);
    reject("Error databse connection stoped");
  }, 2000);
});

// then runs the function when promise is resolved succesfully
doWorkPromise
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
