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
function goToWarehouse(e){
  
  console.log(e)  // 클릭한 창고 번호
  const num = {num:e}
  let url = "/viewWarehouse"

  let form = document.createElement('form');
  form.setAttribute('method','post')
  form.setAttribute('action',url)
  document.characterSet = "utf-8";
  for(let key in num){
    let hiddenField = document.createElement('input')
    hiddenField.setAttribute('type','hidden');
    hiddenField.setAttribute('name',key)
    hiddenField.setAttribute('value',num[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
}

function goToShelf(e){
  console.log(e);
  const num = {num:e}
   let url = "/shelf"

  localStorage.setItem('wh_num_for_create_shelf',e)

  let form = document.createElement('form');
  form.setAttribute('method','post')
  form.setAttribute('action',url);
  document.characterSet = "utf-8";
  for(let key in num){
    let hiddenField = document.createElement('input');
    hiddenField.setAttribute('type','hidden');
    hiddenField.setAttribute('name',key);
    hiddenField.setAttribute('value',num[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();




  //  axios
  //     .post(url, num,{
  //       headers: {
  //         "Content-Type": `application/json`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch(() => {
  //       console.log("catch");
  //     });



}


// 페이지 이동 기능


// 서브 div 띄우는 기능

function changeSub(e){
  // console.log(e)
  // console.log(e.shelf_info)

  // 선반 프로그래스 바
  
  let clicked_warehouse_num = "progress_wh_num_"+e.num

  let view_shelf_bar = document.querySelectorAll("#first_option_detail")
  let shelf_bar_num = 0;
  let progress_length = 0

  for(let i=0;i<view_shelf_bar.length;i++){
    if(view_shelf_bar[i].className.includes(clicked_warehouse_num) && shelf_bar_num<4 ){
      view_shelf_bar[i].classList.remove('none_view')
      progress_length = Math.floor(Number(view_shelf_bar[i].children[0].innerText.split(":")[1].split("/")[0]) / Number(view_shelf_bar[i].children[0].innerText.split(":")[1].split("/")[1])*100)
      view_shelf_bar[i].children[1].children[0].setAttribute("style" ,`width:${progress_length}%`)
      shelf_bar_num++
    }else{
      view_shelf_bar[i].classList.add('none_view')
    }
  }


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
  sub_now_avl.innerText = "사용 공간 : "+(Number(e.max_avl)-Number(e.now_avl))

  let sub_max_avl = document.querySelector("#sub_max_avl")
  sub_max_avl.innerText = "총 공간 : "+ e.max_avl

  if(e.now_avl!= e.max_avl){
    let progressBar = document.querySelector(".circle_progress_item")
    let valueContainer = document.querySelector(".value_container")
    let progressValue = 0;
  
    let progressEndValue = Math.floor(((Number(e.max_avl)-Number(e.now_avl))/Number(e.max_avl))*100)
  
    let speed =10;
    
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


