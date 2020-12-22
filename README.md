[![Actions Status: Node.js CI](https://github.com/ogbiyoyosky/zeus/workflows/Node.js%20CI/badge.svg)](https://github.com/ogbiyoyosky/zeus/actions?query=workflow%3A"Node.js+CI")

# Tasker API


I A tod app manager

## Features

- **Users accounts** who can
  - signup/login
  - view todo
  - view all todos
  - edit todo
  - delete todo
  - robustly search todos
- Only the search API should be availble to the public.

## Authentication and Session Management

1. Use redis as your session store.
2. Authentication and Authorization for admin and user accounts should be done using `Bearer token` and `JWT`.

## Tools/Stack

- NodeJs (JavaScript or TypeScript)
- MongoDB
- Redis
- Docker
- Jest
- Express

## Starting the application locally

1. Clone repo

`git clone https://github.com/ogbiyoyosky/tasker.git`

2. run `npm install`

3. create a .env


5. run `npm run dev`

#### Running test

    1. `npm test'
    2. 'npm run coverage`

## Starting application docker-compose

building the app

run `docker-compose up --build`

The above command spin up mongodb, redis and the application.


run test `docker exec api-server npm test`

### API DOCUMENTATION URL
https://documenter.getpostman.com/view/6226738/TVsuBSjZ


## AUTHOR

Ogbiyoyo, Emmanuel Ighosode
