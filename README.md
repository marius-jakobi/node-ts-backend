# nest-backend

A JavaScript backend powered by Node.js and Nest. Also MySQL Databases are supported.

## Installation

```bash
$ npm install
```

## Configuration

The application reads environment variables from a `.env` file in the root directory

```bash
ENVIRONMENT=development
```

The variables are then available in the application via `process.env.ENVIRONMENT` and are grouped together under `src/config/config.ts`.
The values can be accessed by the `ConfigService` from `@nestjs/config` which can be injected in controller constructors. The configuration
is available globally in the application.

### Configuration example in `.env`

```bash
ENVIRONMENT=development
PORT=9000

DB_HOSTNAME=localhost
DB_PORT=3306
DB_NAME=testdb
DB_USER=root
DB_PASSWORD=dbpassword
```

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
