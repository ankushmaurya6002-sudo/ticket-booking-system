const seatsContainer = document.getElementById("seats")
const status = document.getElementById("status")

const rows = ["A","B","C","D"]
const cols = 6

for(let r of rows){
    for(let c=1;c<=cols;c++){

        const seatId = r+c

        const seat = document.createElement("div")
        seat.className="seat"
        seat.innerText=seatId

        seat.onclick = () => bookSeat(seat,seatId)

        seatsContainer.appendChild(seat)

    }
}

async function bookSeat(element,seatId){

    const response = await fetch("/lock-seat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            seatId:seatId,
            userId:"user"+Math.floor(Math.random()*10000)
        })
    })

    const data = await response.json()

    status.innerText=data.message

    if(data.success){
        element.classList.add("locked")
    }

}