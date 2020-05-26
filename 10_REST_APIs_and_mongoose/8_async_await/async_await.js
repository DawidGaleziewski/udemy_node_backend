// Once we declare function as async function it will no longer print undefined. It will start returning a promise and the promise will be fullfiled
const doWork = async () => {
    // throw new Error('something went wrong');
     return 'Test string';
}

// Returns a promise
console.log(doWork());

// We can work with promise as usulat
doWork().then(result => {
    console.log('result:' + result);
}).catch(e => {
    console.log(e);
})

// Using await

// !important - great thing about asunc await is that as long as the library uses promises we can use async await.
const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if(a < 0 || b < 0){
                return reject('Numbers must be non-negative')
            }
            resolve(a + b)
        }, 1000)
    })
}

const doWorkAwait = async () => {
    // we need to use await where promise is returned
    const sum = await  add(1,99);
    // Another benefit is easy chaining of promises. We do not have to use .then all the time
    const sum1 = await add(sum, 15)
    const sum2 = await add(sum1, -15)
    return 'await sum:' + sum2 
}

// This function is async ansd is running as normal async function. However the syntax inside looks like normal sync code
doWorkAwait().then(result=> {
    console.log(result)
}).catch(e => {
    console.log(e)
})
