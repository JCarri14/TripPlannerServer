# Trip Planner Server - Auth API

## Getting Started

### Install Dependencies

This is a monorepo app made with Yarn. Therefore, you will need to run `yarn` in
the root and then the individual scripts of each package.

The `auth-api` package will be run by default in the following url:
`http://localhost:4001`.

### Folder structure

- `packages/auth-api/src/config`: the config needed by the app
- `packages/auth-api/src/controllers`: the controllers used in the Routes of the
  app
- `packages/auth-api/src/db`: the logic to connect to the database
- `packages/auth-api/src/models`: the mongoose models used in the app
- `packages/auth-api/src/repositories`: the repositories that perform the DB
  operations
- `packages/auth-api/src/routes`: the routers used in the app
- `packages/auth-api/src/services`: the services used in the app, auth, logging,
  etc
- `packages/auth-api/src/utils`: helper functions

### Config

Open the `packages/auth-api/src/config/app-config.js` file to see what
configuration the app needs to set it up.

### Environment variables

These are the required environment variables for the config of the app.

```bash
# .env
ENCRYPTION_SALT_DEVELOPMENT=10
ENCRYPTION_SALT_PRODUCTION=10
ACCESS_TOKEN_SECRET=... (simply a complex string)
MONGO_DB_URL_PRODUCTION=mongodb://localhost/tripplanner-auth
MONGO_DB_URL_DEVELOPMENT=mongodb://localhost/tripplanner-auth
MONGO_DB_URL_TEST=mongodb://localhost/tripplanner-auth
PORT=4001
```
