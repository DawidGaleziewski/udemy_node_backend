# uninstall nodemon globally

npm uninstall nodemon -g

## install nodemon as a local package for the project

npm install nodemon --save-dev

## add a script to run nodemon. IT CANNOT BE RUN JUST FROM TERMINAL NOW

```json
"dev": "nodemon src/app.js -e js,hbs"
```
