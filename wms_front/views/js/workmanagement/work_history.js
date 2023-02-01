
let move_before = document.querySelector(".move_before")
let move_time = document.querySelector(".move_time")
let move_after = document.querySelector(".move_after")

function change_sub(e){
    move_before.innerText = e.from_position
    move_time.innerText = e.replace_date
    move_after.innerText = e.to_position
}