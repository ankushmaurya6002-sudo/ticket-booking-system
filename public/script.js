async function lockSeat(seat) {
  const res = await fetch("/lock-seat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      seatId: seat,
      userId: "user123"
    })
  });

  const data = await res.json();
  alert(data.message);
}