// function goToCreateInput(e) {
//   console.log(e);
//   const num = { num: e };

//   let url = "/createInput";
//   let form = document.createElement("form");
//   form.setAttribute("method", "post");
//   form.setAttribute("action", url);
//   document.characterSet = "utf-8";

//   for (let key in num) {
//     let hiddenField = document.createElement("input");
//     hiddenField.setAttribute("type", "hidden");
//     hiddenField.setAttribute("name", key);
//     hiddenField.setAttribute("value", num[key]);
//     form.appendChild(hiddenField);
//   }
//   document.body.appendChild(form);
//   form.submit();
// }
// function gotoInput() {
//   location.href = "http://localhost:3002/input";
// }

//입고추가 모달 열기 버튼
let modalBtns = document.querySelectorAll(".add_input_btn");

modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    let modal = btn.getAttribute("data_modal");

    document.getElementById(modal).style.display = "block";
  };
});

let closeBtns = document.querySelectorAll(".modal_close");

closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    let modal = (btn.closest(".input_modal").style.display = "none");
  };
});

//입고 추가

// export function insertData() {
//   const stock_num = document.querySelector(".stock_num").value;
//   const stock_name = document.querySelector(".stock_name").value;
//   const stock_info = document.querySelector(".stock_info").value;
//   const buy_com = document.querySelector(".buy_com").value;
//   const wlb_input_date = document.querySelector(".wlb_input_date").value;

//   fetch("/input", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       stock_num: stock_num,
//       stock_name: stock_name,
//       stock_info: stock_info,
//       buy_com: buy_com,
//       wlb_input_date: wlb_input_date,
//     }),
//   })
//     .then((res) => {
//       console.log(res);

//       return res.json();
//     })
//     .then((data) => {
// 이 위치에서 app.js가 실행 되도록 만들기
// 실행 완료되면 파라미터 가지고 다른 url로 보내서 거기서 비동기 작업하기
//       console.log(data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

// window.onclick = function (e) {
//   if (e.target.className === "input_modal") {
//     e.target.style.display = "none";
//   }
// };

function selectAll(selectAll)  {
  const checkboxes 
       = document.getElementsByName('item');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  })
}

