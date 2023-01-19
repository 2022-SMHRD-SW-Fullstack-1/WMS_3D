// var test = document.getElementById('test');

// test.addEventListener('click',function(){
//     alert('ok')
// })

function dp_menu() {
  let click = document.getElementById("drop-content");
  if (click.style.display === "none") {
    click.style.display = "block";
  } else {
    click.style.display = "none";
  }
}

function searchText() {
  const searchText = document.getElementById("search_text").value;
  console.log(searchText);
}

let catevalText = {};
let cateText = "";

function getCateValue(e) {
  // console.log("event:", e);
  cateText = e;
  let cateName = document.getElementById(e).innerText;
  console.log(cateName);
  document.getElementById("drop_cate").innerText = cateName;
}

// 카테고리 선택값 가져오기 & 카테고리 선택값으로 변경
function sendSearchText() {
  // let cateVal = document
  //   .getElementById(e.getAttribute("id"))
  //   .getAttribute("id");

  // console.log(cateVal);

  const searchText = document.getElementById("search_text").value;
  console.log(searchText);

  catevalText = { cate: cateText, word: searchText };

  // document.getElementById("drop_cate").innerText = cateText;

  let url = "http://localhost:3002/warehouse";

  axios
    .post(url, catevalText, {
      headers: {
        "Content-Type": `application/json`,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch(() => {
      console.log("catch");
    });

  location.href = "http://localhost:3002/warehouse/search";
  if (document.location.href == "http://localhost:3002/warehouse/search") {
    location.reload(true);
  }
}

function orderList(e) {
  console.log(e);
  const num = { num: e };
  let url = "/warehouse";
  let form = document.createElement("form");
  form.setAttribute("method", "get");
  form.setAttribute("action", url);
  document.characterSet = "utf-8";
  for (let key in num) {
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", num[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
}

// 서클 프로그래스바

let progressBar = document.querySelector(".circle_progress_item");
let valueContainer = document.querySelector(".value_container");
let progressValue = 0;
let progressEndValue = 50;
let speed = 15;

let progress = setInterval(() => {
  progressValue++;
  valueContainer.textContent = `${progressValue}%`;
  progressBar.style.background = `conic-gradient(
        #11101D ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
    )`;
  if (progressValue == progressEndValue) {
    clearInterval(progress);
  }
}, speed);
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

function optionOne() {
  let first_option = document.querySelector("#first_option");
  let second_option = document.querySelector("#second_option");
  let third_option = document.querySelector("#third_option");
  first_option.className = "";
  second_option.className = "none_view";
  third_option.className = "none_view";
}
function optionTwo() {
  let first_option = document.querySelector("#first_option");
  let second_option = document.querySelector("#second_option");
  let third_option = document.querySelector("#third_option");
  first_option.className = "none_view";
  second_option.className = "";
  third_option.className = "none_view";
}
function optionThree() {
  let first_option = document.querySelector("#first_option");
  let second_option = document.querySelector("#second_option");
  let third_option = document.querySelector("#third_option");
  first_option.className = "none_view";
  second_option.className = "none_view";
  third_option.className = "";
}
// 3가지 옵션

// 페이지 이동 기능

function goToCreateWarehouse() {
  location.href = "../../../three/sj_test/create_warehouse.html";
}
function goToWarehouse() {
  location.href = "../../../three/sj/warehouse_3D.html";
}

// 페이지 이동 기능
