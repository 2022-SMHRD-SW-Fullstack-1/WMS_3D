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

// function stockOutput() {
//   let worker = prompt("판매처를 입력해주세요");

//   let url = "/stockOutput";
//   let form = document.createElement("form");
//   form.setAttribute("method", "post");
//   form.setAttribute("action", url);
//   document.characterSet = "utf-8";
//   for (let i = 0; i < checked_arr.length; i++) {
//     let num = { num: checked_arr[i], worker: worker };
//     for (let key in num) {
//       let hiddenField = document.createElement("input");
//       hiddenField.setAttribute("type", "hidden");
//       hiddenField.setAttribute("name", key);
//       hiddenField.setAttribute("value", num[key]);
//       form.appendChild(hiddenField);
//     }
//   }

//   document.body.appendChild(form);
//   form.submit();
// }








// let inputDateButtons = document.getElementsByClassName("input_date_button");

// for (var i = 0; i < inputDateButtons.length; i++) {
//   inputDateButtons[i].addEventListener("click", function() {
 
//     let currentDate = new Date();

//     let parentTd = this.parentNode;

//     if (parentTd.firstChild.nodeType === 3) {
      
//       parentTd.firstChild.nodeValue = currentDate.toLocaleDateString();
//     } else {
//       let dateText = document.createTextNode(currentDate.toLocaleDateString());
//       parentTd.insertBefore(dateText, parentTd.firstChild);
//     }
//     this.style.display = "none";
//   });
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

