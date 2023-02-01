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

// function stockInput() {
//   let stock_num = document.getElementById("stock_num").value;
//   let stock_name = document.getElementById("stock_name").value;
//   let stock_info = document.getElementById("stock_info").value;
//   let buy_com = document.getElementById("buy_com").value;
//   let wlb_input_date = document.getElementById("wlb_input_date").value;

//   let url = "/stockInput";
//   let form = document.createElement("form");
//   form.setAttribute("method", "post");
//   form.setAttribute("action", url);
//   document.characterSet = "utf-8";

//   let data = {
//     stock_num: stock_num,
//     stock_name: stock_name,
//     stock_info: stock_info,
//     buy_com: buy_com,
//     wlb_input_date: wlb_input_date,
//   };

//   for (let key in data) {
//     let hiddenField = document.createElement("input");
//     hiddenField.setAttribute("type", "hidden");
//     hiddenField.setAttribute("name", key);
//     hiddenField.setAttribute("value", data[key]);
//     form.appendChild(hiddenField);
//   }

//   document.body.appendChild(form);
//   form.submit();
// }

// window.onclick = function (e) {
//   if (e.target.className === "input_modal") {
//     e.target.style.display = "none";
//   }
// };
