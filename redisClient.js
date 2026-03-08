const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    servername: "redis-17434.c62.us-east-1-4.ec2.cloud.redislabs.com"
  }
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

async function connectRedis() {
  await client.connect();
  console.log("Connected to Redis");
}

connectRedis();

module.exports = client;