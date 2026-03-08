const { createClient } = require("redis")

const client = createClient({
  url: process.env.REDIS_URL,
  socket:{
    tls:true,
    rejectUnauthorized:false
  }
})

client.on("error",(err)=>{
  console.log("Redis error",err)
})

client.connect()

module.exports = client