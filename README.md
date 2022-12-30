# Gateway Logging Example

A simple logging example of GraphQL Federation.
This project using stack below.

- NestJS (Express, Code First)
- Apollo Gateway
- Apollo Federation

## Run application

Launch the two applications first, then the gateway. Otherwise the gateway failed launch.

```sh
cd application-posts && yarn start
```

```sh
cd application-users && yarn start
```

```sh
cd gateway && yarn start
```

## Access gateway

You can access the gateway at http://localhost:3000.

## Example combined query

```graphql
query QueryPosts {
  posts {
    id
    title
    user {
      id
      name
    }
  }
}
```

```graphql
query userWithPosts($userId: ID!) {
  user(id: $userId) {
    id
    name
    posts {
      authorId
      id
      title
    }
  }
}
```
