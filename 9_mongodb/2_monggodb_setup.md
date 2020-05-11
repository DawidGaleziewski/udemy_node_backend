## download mongo db from:

https://www.mongodb.com/download-center/community
we want ZIP format

## unpack to user directory:

C:\Users\dgaleziewski

## we want to create a folder in same dir for storing data

mongodb-data

## running mongo db for the first time:

/c/Users/dgaleziewski/mongodb/bin/mongod.exe --dbpath=/c/Users/dgaleziewski/mongodb-data/

 ./mongod.exe --dbpath=/C:/Users/m14/mongodb-data


We specify where mongod should store data

# installing mongo db admin tool gui - robo 3t

## in robo3t create new connection

we want to use default values, change the name.
mongoDb will run by default on 27017

## use shell to check mongo db version

right click on database name in left pane -> open shell
db.version()
press green arrow to run the command
