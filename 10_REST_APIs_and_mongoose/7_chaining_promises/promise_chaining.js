const add = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=> {
            resolve(a + b)
        }, 2000)
    })
}

// 1st method of chaining. Issue is that it will get more nested the more promisses we want to chain. We also have duplicate code for catching errors
add(1,2).then((sum)=> {
    console.log(sum)
    add(sum, 5).then(sum2 => {
        console.log(sum2)
    }).catch(error=> {
        console.log(error)
    })
}).catch(error=> {
    console.log(error)
})

//  2nd - proper promise chaining
add(1,2).then((sum)=> {
    console.log(sum);
    // We simply return a new promise
    return add(sum, 2);
}).then(sum2 => {
    // This is next promise
    console.log(sum2);
}).catch(error => {
    // catch will get errors for any failure in the chain
    console.log(error)
})