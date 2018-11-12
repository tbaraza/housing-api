[![CircleCI](https://circleci.com/gh/tbaraza/housing-api.svg?style=svg)](https://circleci.com/gh/tbaraza/housing-api)

# Housing API

API for management of rental houses

# Getting Started

### Install dependencies

```bash
$ npm install
```

### Set up Database

If you don't have postgres set up run the following to set it up;

- Run `brew install postgresql` to install Postrgres
- Run `brew services start postgresql` to start the Postgres server
  You'll have the default `postgres` user configured. This should be okay in setting up our app. If you want to create another user instead more info [here](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
- Create development database by running:

```bash
$ psql
$ CREATE DATABASE housing_db_dev;
```

### Start development server

Create a `.env` file and subsitute values provided in the `.env.example` file with the your database credentials.

With the above database configurations, our URL should be
`DATABASE_URL=postgres://postgres@localhost:5432/housing_db_dev`

Start the server by running:

```bash
$ npm start
```

### Tests

#### Create test database

```bash
$ psql
$ CREATE DATABASE housing_db_test;
```

Then run tests using:

```bash
$ npm test
```

## Project

Project progress can be found [here](https://github.com/tbaraza/housing-api/projects/1)
