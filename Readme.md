### open terminal

`cd frontend` `npm i`

`cd backend` `npm i`

`cd ..`

# start both the server of backend and frontend server using command

### `npm run start`

### need to create .env file and copy below content

#### (also need to setup postgres database)

```
DB_HOST=localhost
DB_USER=postgres
DB_NAME=postgres
DB_PASS=postgres
DB_DIALECT=postgres
DB_PORT=5432
APP_HOST=localhost
APP_PORT=8080
JWT_SECRET=adasxovnklnqklnkjdsankdnw
STRIPE_KEY=sk_test_51KmcZxSCghSyyU7IAy7UJHJcMqZKcobjO4B7XUY7CL6FWPwp621bvzWAQnzUA2qIyRCOmtDRJ4ZJbsARTCQu72Sg00vQy8Zxjw

```

### for the badckend

`npx sequelize db:migrate` `npx sequelize db:seed`
