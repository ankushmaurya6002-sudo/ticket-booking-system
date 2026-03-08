const express = require("express");
const cors = require("cors");
const redis = require("./redisClient");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const SEAT_LOCK_TIME = 120;

// lock seat
app.post("/lock-seat", async (req, res) => {

  try {

    const { seatId, userId } = req.body;

    const key = `seat:${seatId}`;

    const existing = await redis.get(key);

    if(existing){
      return res.json({
        success:false,
        message:"Seat already locked"
      });
    }

    await redis.set(key,userId,{
      EX: SEAT_LOCK_TIME
    });

    res.json({
      success:true,
      message:"Seat locked for 2 minutes"
    });

  } catch(err){

    console.error(err);

    res.status(500).json({
      success:false,
      message:"Server error"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("Server running on port",PORT);
});