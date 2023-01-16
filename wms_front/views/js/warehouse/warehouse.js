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
let progressEndValue = 50;
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



// 사이드바

var test = document.getElementById("test");

let arrow = document.querySelectorAll(".arrow");

for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);

// 메뉴버튼 클릭 설정
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});


// 사이드바


// 3가지 옵션


function optionOne(){
  let first_option = document.querySelector("#first_option")
let second_option = document.querySelector("#second_option")
let third_option = document.querySelector("#third_option")
  first_option.className =""
  second_option.className ="none_view"
  third_option.className ="none_view"
}
function optionTwo(){
  let first_option = document.querySelector("#first_option")
let second_option = document.querySelector("#second_option")
let third_option = document.querySelector("#third_option")
  first_option.className ="none_view"
  second_option.className =""
  third_option.className ="none_view"
}
function optionThree(){
  let first_option = document.querySelector("#first_option")
let second_option = document.querySelector("#second_option")
let third_option = document.querySelector("#third_option")
  first_option.className ="none_view"
  second_option.className ="none_view"
  third_option.className =""
}
// 3가지 옵션


// 페이지 이동 기능

function goToCreateWarehouse(){
  location.href = "../../../three/sj_test/create_warehouse.html"
}
function goToWarehouse(){
  location.href = "../../../three/sj/warehouse_3D.html"
}

// 페이지 이동 기능

