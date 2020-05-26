# Representional State Transfer Application programming Interface

## API- set of tools helping with building a application. It is a very broad term
I.E: node provides API like FS
NPM modules like express provides us a API


## REST
### Representational - we are working with representation of our data. Data is strored in database but via the interface we can perform CRUD operations on their representation like users and tasks.

### State transfer - REST API (server) is statless, state was transfared.
State was transfered from the server to the client. Request from the client should contain everything to process that request.

# Process of comunication:
1. CLient needs data
2. CLient performs a request to a specific url on the server GET /tasks/a7eaa
3. Server sends request to the database using information provided in the url
4. Server sends a http response to the client containing the data

## GET will be used for getting data
## POST is used for creating data. We will also send a json information with it

# Designing operations for resources
Each task is defined with http method and the path

# Create 
POST /tasks
POST /users
POST /products

# Read single/multiple
## multiple
GET /tasks - sends all tasks
GET /products
GET /users

## single
GET /tasks/:id
GET /products/1
GET /users/2

# Update
PATCH /tasks/:id
PATCH /users/1
PATCH /products/2

# Delete
DELETE /tasks/:id
DELETE products/5



# HTTP request structure
Request data is send as a plain text

a)Request line- http method used, path and HTTP protocol
POST /tasks HTTP/1.1

b) Headers - key value pairs containing meta information.
Accept: application/json

c) keep alive- we probably will make new requests shortly so the connection should be keept alive
Connection: Keep-Alive

d) authentication
Authorization: Bearer eyJhbGio....

e) etc. - we can have more headers if needed

f) data - body of the data
{"description" : "Order new drill bits}


# HTTP response structure
a) status line - protocol, status code, representation of the status code
HTTP/1.1 201 Created

b) Response heaaders: timestamp, server, content-type

Date: Sun, 28 jul, 2019 15:37:37 GMT
Server: Express
Content-Type: application/json

{"_id" : "sadfsadfds", "description":"order drills"}