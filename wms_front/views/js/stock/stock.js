function goToWarehouse(e) {

  console.log(e.wh_num); // 클릭한 창고 번호
  const num = { num: e.wh_num };
  let url = "/viewWarehouse";

  let form = document.createElement("form");
  form.setAttribute("method", "post");
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

  localStorage.setItem("clicked_stock_num", e.stock_num);
}


let result;


function stockOutput() {

  const query = 'input[name="item"]:checked';
  const selectedEls = 
      document.querySelectorAll(query);
  
  // 선택된 목록에서 value 찾기
  let checked_arr = [0];
  selectedEls.forEach((el) => {
    checked_arr.push(Number(el.value));
  });

  let worker = prompt("판매처를 입력해주세요")


  let url = "/stockOutput";
  let form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", url);
  document.characterSet = "utf-8";
  for (let i = 0; i < checked_arr.length; i++) {
    let num = { num: checked_arr[i], worker: worker };
    for (let key in num) {
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", num[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
    form.submit();
}

function selectAll(selectAll)  {
  const checkboxes 
       = document.getElementsByName('item');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  })
}


function selectAll(selectAll)  {
  const checkboxes 
       = document.getElementsByName('item');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  })
}

