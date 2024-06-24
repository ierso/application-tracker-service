# Application Tracker Service

Backend service for application tracker.

# Getting started

### Install the dependancies

> [NodeJS](https://nodejs.dev/) is required

```
cd application-tracker-service
yarn install
```

### Create a server

> [Docker](https://www.docker.com/) is required

```
docker build -t my-postgres-image .
docker run --name my-postgres-container -d -p 5432:5432 my-postgres-image
```

### Create an account with auth0

> [Auth0](https://manage.auth0.com) is required

### Connect the created server

create a _.env_ file at the root of the project
use _.env.local.example_ for reference

```
DATABASE_URL="postgresql://<username>:<password>@<host_name>:<port>/<database_name>"
```

### Run the project locally

run `yarn run dev`

### Create an sql file together with additional information needed for drizzle-kit

run `yarn run drizzle:generate`

### Sync your schema with the database schema (should only be used for local development)

run `yarn run drizzle:push`

### Generate migration files based on drizzle.config and apply to database

run `yarn run drizzle:migrate`

### Seed the database (should be used for local development)

run `yarn run drizzle:seed`
