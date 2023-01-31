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

function insertData() {
  event.preventDefault();
  const st_num = document.getElementById("st_num").value;
  const st_name = document.getElementById("st_name").value;
  const st_info = document.getElementById("st_info").value;
  const by_com = document.getElementById("by_com").value;
  const wlb_ipt_date = document.getElementById("wlb_ipt_date").value;
  const wk_name = document.getElementById("wk_name").value;

  fetch("/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      st_num,
      st_name,
      st_info,
      by_com,
      wlb_ipt_date,
      wk_name,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

//입고 추가 버튼
// const form = document.querySelector("form");
// const closeButton = document.querySelector(".modal_close");

// closeButton.addEventListener("click", (e) => {
//   e.preventDefault();

//   const stock_num = form.querySelector(".st_num").value;
//   const stock_name = form.querySelector(".st_name").value;
//   const stock_info = form.querySelector(".st_info").value;
//   const buy_com = form.querySelector(".by_com").value;
//   const wlb_input_date = form.querySelector(".wlb_ipt_date").value;
//   const worker_name = form.querySelector(".wk_name").value;

//   const data = {
//     stock_num,
//     stock_name,
//     stock_info,
//     buy_com,
//     wlb_input_date,
//     worker_name,
//   };
//   fetch("/inputForm", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// });

// window.onclick = function (e) {
//   if (e.target.className === "input_modal") {
//     e.target.style.display = "none";
//   }
// };
