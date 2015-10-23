# node-redis-helper

A lightweight Promise-based wrapper and helper for node Redis.

`node-redis-helper` tries to be a durable way of optaining a client connection. More features soon to come.

**Currently undergoing testing, probably shouldn't use :)**

# Initialization

```sh
npm install node-redis-helper
```

```js
var redisOptions = {
	host: '127.0.0.1',
	port: 6370,
	password: 'chicken'
};
redis = new RedisHelper(redisOptions);

```

# Fetch a client

node-redis-helper Tries to be a

```js
redis.client()
	.then(function(client){
		//use client like normal
		client.set('chicken', 'bessie');
	})
	.catch(function(err){
		console.log('Redis Error',err);
	})
```

# Client Operations

Please check out [Node Redis](https://www.npmjs.com/package/redis) for a full list of operations.

# To Do

* Connection Pooling
* Evaluate IO Redis
* More Testing
