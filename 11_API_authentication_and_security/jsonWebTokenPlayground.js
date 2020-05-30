const jwt = require('jsonwebtoken');

const myFunction = () => {
    // return from sign is authentication token. It can be used by client
    // sign in takes:
    //#1 object that will be embeed information in our token body. In this case we just want the id of the user
    
    //#2 String that is a secret. Secret is to make sure the token was not tempered with. We can use any string we want

    // #3 settings object. Like expiresin in order to expire token after some time
    const token = jwt.sign({_id: 'abc123'}, 'leadFallowOrGetOutTheWay', {
        expiresIn: '7 days'
    });
    console.log(token)

    // Token is made out of 3 parts:
    // HEADER -  base64 with meta data
    // payload or BODY - base 64 encoded jsonstring with data provided
    // If we go to bese64decode.org and use the middle string we get: {"_id":"abc123","iat":1590872435}
        //- iat is a timestamp added
    // signature - verification of the token

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1OTA4NzI0MzV9.-2pQiK0bV_C-Hs7pK7IfJ0mOxEkqcXDNxQM1Uo2-wW0ż

    // data is publictly available. However end user will not be able to forge it without the secret

    // VERIFY the token
    // verify method takes token and secret
    const data = jwt.verify(token,'leadFallowOrGetOutTheWay'); // we get a error if verification fails
    console.log(data) // we get back the data

}

myFunction()