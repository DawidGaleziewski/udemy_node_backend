# install heroku cli

# check cli in terminal

heroku -v
heroku login

# setting up ssh keys

## checking if we have any .ssh kays

ls -a -l ~/.ssh

## generating ssh hey

-t - tyle of protocol used (rsa)
-b - number of bits (4096)
-C - comment or the label fot the kay
ssh-keygen -t rsa -b 4096 -C "dawid.galeziewski.dev@gmail.com"

after running the command we should see id_rsa and id_rsa.pub in ~/.ssh directory
.pub is the only file we should share with 3rd party like git or heroku

## check if ssh agent is running:

eval "\$(ssh-agent -s)"

## register ssh key

ssh-add ~/.ssh/id_rsa (windows only)
ssh-add -K ~/.ssh/id_rsa (max/linux)

## integration with git hub

- go to github settings -> SSH and GPG keys
  we need to put content of public key here
  ssh key will be added to the githib account

## testing connection

ssh -T git@github.com

## integration with heroku

It is more automated we just need to:
heroku keys:add

# creating heroku app

heroku create app-name

after creating a app heroku will give two urls:
-app live preview

- repo we should push the code to:
  https://git.heroku.com/node-weather-app-test.git

# modifying app to work on heroku

## package.json

```json
  "scripts": {
    "start": "node src/app.js"
  },
```

We need this scrip so that heroku will start the app correctly

## app.js - server start port

we need to change the port we are listening on from 3000
// it will set the port to enviromental variable present on the system or heroku
// if it does not exist it will use port 3000
const port = process.env.PORT || 3000;

## making sure we do not use whole domain names

https://wwww.localhost:3000/application
/application

## make sure changes were commited and pushed to github remote

## deploy app

git push heroku master
