# Trip Planner Server - Gateway API

## Getting Started

### Install Dependencies

This is a monorepo app made with Yarn. Therefore, you will need to run `yarn` in
the root and then the individual scripts of each package.

The `gateway` package will be run by default in the following url:
`http://localhost:4000`.

### Environment variables

These are the required environment variables for the config of the app.

```bash
# .env
AUTH_SERVICE_BASE_URL=http://localhost:4001
DATA_SERVICE_BASE_URL=http://localhost:4002
GATEWAY_PORT=4000
NODE_ENV=development
```
