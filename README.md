# nest-backend

A JavaScript backend powered by Node.js and Nest.

## Installation

```bash
$ npm install
```

## Configuration

The application reads environment variables from `.env` files in the root directory in the following order:

- .env.development
- .env.testing
- .env.production
- .env

If a variable is set in multiple files the first value is set in the environment.

```bash
ENVIRONMENT=development
```

The variables are then available in the application via `process.env.ENVIRONMENT`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
