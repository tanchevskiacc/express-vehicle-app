
# Restfull API with Express JS

This project was created to apply fundamental knowledge of developing REST API with Express JS


## Lessons Learned

Developing this project was partially inspired by [The Complete Node.js Course](https://members.codewithmosh.com/courses/enrolled/293204). This project is simply a practical preparation for developing Express JS application.


## Run Locally

Clone the project

```bash
  git clone https://github.com/tanchevskiacc/express-vehicle-app.git
```

Go to the project directory

```bash
  cd express-vehicle-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Start the tests

```bash
  npm test
```

## Generate JWT

```javascript
{
    "email": "admin@mail.com", // or user@mail.com
    "password": "12345"
}
```

## Auth header

```
x-auth-token
```

## Postman
Import all collections from 
```
/export/collections/postman
```
**x-auth-token** header is automatically added to each Postman collection. To update the header value, you must first execute the Auth endpoint to get the accessToken and then go to the "Pre-request Script" at collection level and put the new value there.
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

