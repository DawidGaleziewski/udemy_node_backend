# Running script with args

We can add argument to a script:
node app.js Andrew

This information will be visible in global processes variable

<!-- We can see it in: -->

arguments vector
console.log(process.argv)

## adding additional params

node app.js add --title="This is my title"
This will be added as a 4th item in argv array.
It is not beeing parsed and we need to do it ourselves
We can use npm package for this: yargs
