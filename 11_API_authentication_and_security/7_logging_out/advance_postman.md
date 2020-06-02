## postman enviroments and postman enviroment variables
for example when we want to have tests for endpoints that may have diffrent urls

We can create a enviroment by clicking on the gear icon.
We can manage enviroments by clicking on top right dropdown

we use variables by {{}} in postman i.e
localhost:3000/users
{{url}}/users 


## setting up authentication
we can go to authentication tab and select bearer type authentication
However this works only for this one endpoint.
We want to keep the authentication to inherit auth from parent

When we click on the task menu (left pane next to collection name) and sect edit we can go to authorization
After pasting the token here we have it in the whole collection!

If we want to disable authentication for specific user we can go to the endpoint -> authentication and set type to no auth

# in order to run some js to get a token we can go to pre-request script tab and test tab to run scripts after that

## 1 in edit collection authorization
we want to referance now a env variable and not a set token:
{{authToken}}

# 2 set up test script
we want to go to login and in test we have access to pm global variable (postman)
we want to set authToken variable with response token

```javascript 

if(pm.response.code === 200){
    pm.environment.set('authToken', pm.response.json().token)
}

```
! NOW WE CAN SET UP THE TOKEN IN OUR POSTMEN by going to login endpoint and firing it