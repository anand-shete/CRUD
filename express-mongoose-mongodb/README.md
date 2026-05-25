## Tech Stack

**Node.js**: Javascript runtime environment
**Express**: Node.js framework
**Mongoose**: MongoDB ORM
**MongoDB**: Object database

## API Endpoints

1.`GET /api/v1/user` : Get all users

2. `GET /api/v1/user/:id` : Get a specific user

3. `POST /api/v1/user/` : Create a user

4. `PATCH /api/v1/user/:id` : Update username

5. `DELETE /api/v1/user/:id` : Delete a user

## Containerize application with Docker

1. Create `.env.docker` at root and add the following varibles:

```sh
PORT=3000
MONGO_URI=mongodb://mongo:27017/CRUD
```

2. Run compose stack

```sh
docker compose up -d
```

3. Verify health endpoint

Open `http://localhost/api/v1/health`. You should see the following:

```json
{ "message": "node-app healthcheck passed" }
```
