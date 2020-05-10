const url = "/weather?address=boston";

// we do not have fetch in js, it is a browser api. Therefore we cannot use it in node
fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data);
        }
    })
    .catch((error)=> {
        console.log(error);
    })