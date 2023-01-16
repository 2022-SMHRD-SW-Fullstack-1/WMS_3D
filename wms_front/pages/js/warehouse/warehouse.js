// var test = document.getElementById('test');

// test.addEventListener('click',function(){
//     alert('ok')
// })

function dp_menu(){
    let click = document.getElementById("drop-content");
    if(click.style.display === "none"){
        click.style.display = "block";

    }else{
        click.style.display = "none";

    }
}


// 서클 프로그래스바

let progressBar = document.querySelector(".circle_progress_item")
let valueContainer = document.querySelector(".value_container")
let progressValue = 0;
let progressEndValue = 65;
let speed =15;

let progress = setInterval(()=>{
    progressValue++;
    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
        #11101D ${progressValue*3.6}deg,
        #cadcff ${progressValue*3.6}deg
    )`;
    if(progressValue == progressEndValue){
        clearInterval(progress);
    }
},speed)
// 서클 프로그래스바

