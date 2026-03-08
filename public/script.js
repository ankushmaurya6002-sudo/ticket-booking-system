async function lockSeat(){

  const response = await fetch("/lock-seat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      seatId:"A1",
      userId:"user"+Math.floor(Math.random()*1000)
    })
  });

  const data = await response.json();

  document.getElementById("result").innerText = data.message;

}