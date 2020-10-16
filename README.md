# Backend Template
- This project was made in order to allow developers to quickly boilerplate a backend for whatever project they might be working on, it has only the essentials in getting a working API up and running.
- User registration, user login, and authentication with JSON Web Tokens are already implemented.
# Next Steps
- Ideally, a developer should be able to use Knex migrations + seeds to quickly create the tables for whatever kind of data they're dealing with. You can refer to this [guide on Knex migrations + seeds if you need a quick reminder of how they work.](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261) The [Knex documentation is also very helpful.](http://knexjs.org/) 
- Any developer using this should focus on creating more routers and endpoints for their API and aim for full CRUD (Create/Read/Update/Delete) functionality for their data. 
- Be sure to use the authentication middleware so that only registered users who have logged in can interact with the API you build.
- Be sure to set your environment variables when you are ready to deploy your API.
## List of modules and libraries being used:
- __Knex__ - SQL Query Builder for JavaScript
- __Knex-cleaner__ - Helper library to clean a PostgreSQL, MySQL or SQLite3 database tables using Knex. Great for integration tests.
- __Helmet__ - helps you secure your Express apps by setting various HTTP headers
- __Express__ - minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications, as well as APIs. Can be thought of in the same vein as “React” but for the backend that way we use it. Will also allow our server to be able to read JSON.
- __CORS__ - node.js package for providing a Connect/Express middleware that can be used to enable CORS (Cross Origin Resource sharing) with various options
- __Sqlite3__ - relational database management system (RDBMS) that will let us interact with our .db3 files
- __Nodemon__ - is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected
- __Dotenv__ - is a zero-dependency module that loads environment variables from a . env file into process. env . Storing configuration in the environment separate from code is based on the Twelve-Factor App methodology
- __cross-env__ - run scripts that set and use environment variables across different platforms/OSes
 - __bcryptjs__ - used for password hashing/salting/accumulative hashing rounds
 - __Jsonwebtoken__ - add authentication when logging in to access protected routes
 - __pg__ - node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database.

## Endpoints for API
- __get("/")__: will return a message in JSON to you to let you know server is up
```JavaScri[pt
## What the response from the server should look like
{ message: "Server is running" }
```

- __post("/auth/register")__: will allow you to register a new user contingent on the username and email being unique. 
```JavaScript
## What the body of the request should look like when registering a new user
{
    "username": "testing",
    "password": "testing",
    "email": "testing@testing.com"
}

## What the body of the response should look like when registering a new user
{
    "id": 1,
    "username": "testing",
    "password": "$2a$10$loSggsJU0xbdgk65ragc3ebqqGRbQQc8qsCsQpEtuctLV4sljN3hq",
    "email": "testing@testing.com"
}
```

- __post("/auth/login")__: will allow you to login with a user and become authenticated if your credentials are correct
```JavaScript
## What the body of the request should look like when logging in
{
    "username": "testing",
    "password": "testing",
}
## What the body of the response should look like when logging in
{
    "message": "Welcome {username}!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6InRlc3RpbmciLCJsYXQiOjE2MDI4Mzg1OTYwODAsImlhdCI6MTYwMjgzODU5NiwiZXhwIjoxNjAyODQyMTk2fQ.wyzE1R0zYkR3zJkroWX1PdaRGuufhWlQtXUq9v17ZQ8"
}
```
# Future Updates
- [ ] Add testing for endpoints present
- [ ] Create documentation on adding in your data + endpoints
- [ ] Add more documentation on how the project works for developers unfamiliar with tech stack
