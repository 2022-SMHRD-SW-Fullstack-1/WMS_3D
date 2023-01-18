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


// 서브 div 띄우는 기능

function changeSub(e){
  console.log(e)

  // 온도 바
  let min_temp = document.querySelector("#min_temp")
  min_temp.innerText = e.min_temp + "°C";

  let max_temp = document.querySelector("#max_temp")
  max_temp.innerText = e.max_temp + "°C";

  // let now_temp_value = (Number(e.max_temp)+Number(e.min_temp))/2
  let now_temp_value = Number(e.min_temp)+2

  let now_temp = document.querySelector("#now_temp")
  now_temp.innerText = "now : "+ now_temp_value+ "°C";

  let temp_ratio = (now_temp_value-Number(e.min_temp))/(Number(e.max_temp)-Number(e.min_temp))*100

  let temp_bar = document.querySelector("#temp_bar")
  temp_bar.innerHTML = `<div class="progress-bar" id="bg_red" role="progressbar" aria-label="Basic example" style="width: ${temp_ratio}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>`



  // 습도 바
  let min_humid = document.querySelector("#min_humid")
  min_humid.innerText = e.min_humid + "%";

  let max_humid = document.querySelector("#max_humid")
  max_humid.innerText = e.max_humid + "%";

  let now_humid_value = Number(e.min_humid)+5

  let now_humid = document.querySelector("#now_humid")
  now_humid.innerText = "now : "+ now_humid_value+ "%";

  let humid_ratio = (now_humid_value-Number(e.min_humid))/(Number(e.max_humid)-Number(e.min_humid))*100

  let humid_bar = document.querySelector("#humid_bar")
  humid_bar.innerHTML = `<div class="progress-bar" id="bg_green" role="progressbar" aria-label="Basic example" style="width: ${humid_ratio}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>`


  // 창고 정보
  let third_option = document.querySelector("#third_option")
  third_option.innerText = e.info
  // 창고 정보


  
  // 서클 프로그래스 바

  let sub_warehouse_name = document.querySelector("#sub_warehouse_name")
  sub_warehouse_name.innerText = e.name;

  let sub_now_avl = document.querySelector("#sub_now_avl")
  sub_now_avl.innerText = "남은 공간 : "+(Number(e.max_avl)-Number(e.now_avl))

  let sub_max_avl = document.querySelector("#sub_max_avl")
  sub_max_avl.innerText = "총 공간 : "+ e.max_avl

  if(e.now_avl!=0){
    let progressBar = document.querySelector(".circle_progress_item")
    let valueContainer = document.querySelector(".value_container")
    let progressValue = 0;
  
    let progressEndValue = Math.floor(((Number(e.max_avl)-Number(e.now_avl))/Number(e.max_avl))*100)
  
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
  }else{
    let valueContainer = document.querySelector(".value_container")
    let speed =15;
    let progressBar = document.querySelector(".circle_progress_item")
    let progress = setInterval(()=>{
      valueContainer.textContent = "0%";
      progressBar.style.background = `conic-gradient(
          #11101D ${1*3.6}deg,
          #cadcff ${1*3.6}deg
      )`;
      clearInterval(progress);
  },speed)

  }
 

    // 서클 프로그래스 바



}

// 서브 div 띄우는 기능


