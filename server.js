app.post("/lock-seat", async (req, res) => {

  try {

    const { seatId, userId } = req.body

    const key = `seat:${seatId}`

    const existing = await redis.get(key)

    if(existing){
      return res.json({
        success:false,
        message:"Seat already locked"
      })
    }

    await redis.set(key,userId,{
      EX:120
    })

    res.json({
      success:true,
      message:"Seat locked for 2 minutes"
    })

  } catch(err){

    console.error(err)

    res.status(500).json({
      success:false,
      message:"Server error"
    })

  }

})