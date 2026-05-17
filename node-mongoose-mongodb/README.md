## Tech Stack

**Node.js**: Runtime environment
**Express**: Node.js framework
**Mongoose**: MongoDB ORM
**MongoDB**: Object database

## API Endpoints

## Containerize application with Docker

1. Create `.env.docker` and add the following varibles:

```sh
PORT=3000
MONGO_URI=mongodb://mongo:27017/CRUD
```

2. Run compose stack

```sh
docker compose up -d
```
