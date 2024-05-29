
# REST API with Express JS & MongoDB

This project was created to apply fundamental knowledge of developing REST API with Express JS & MongoDB


## Lessons Learned

Developing this project was partially inspired by [The Complete Node.js Course](https://members.codewithmosh.com/courses/enrolled/293204). This project is simply a practical preparation for developing Express JS application.


## Installation

Setting Up the Project

```bash
  git clone https://github.com/tanchevskiacc/express-vehicle-app.git
```
Install dependencies

```bash
  cd express-vehicle-app
  npm install
```

## Running Server
To run server, run the following command

```bash
  npm start
```

To run tests, run the following command

```bash
  npm test
```
## Generate JWT

Use these credentials to authenticate and obtain an access token. You can authenticate with both administrator and user privileges.

```javascript
{
    "email": "admin@mail.com", // or user@mail.com
    "password": "12345"
}
```

## Auth header

This is the header that need to be send to each route.

```
x-auth-token: your.access.token
```

## Postman
Import all collections from 
```
/export/collections/postman
```
**x-auth-token** header is automatically added to each Postman collection. To update the header value, you must first execute the Auth endpoint to get the accessToken and then go to the "Pre-request Script" at each collection level and put the new access token value.
## Features

- Authentication with JWT
- Jest framework
- Integration and unit tests
- Dealing with Users
- Dealing with Vehicles


## Tech Stack

Node, Express, Jest


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Authors

- [@tanchevskiacc](https://www.github.com/tanchevskiacc)

