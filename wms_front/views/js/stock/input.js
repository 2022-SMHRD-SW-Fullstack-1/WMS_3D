function goToCreateInput(e) {
  console.log(e);
  const num = { num: e };
  let url = "/createInput";

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
}

function orderListNum() {
  let bool = true;
  if (localStorage.getItem("align_num") == "true") {
    localStorage.setItem("align_num", "false");
    bool = false;
  } else {
    localStorage.setItem("align_num", "true");
    bool = true;
  }
  let num = { num: "stock_num", bool: bool };
  let url = "/input";
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

function orderListName() {
  let bool = true;
  if (localStorage.getItem("align_name") == "true") {
    localStorage.setItem("align_name", "false");
    bool = false;
  } else {
    localStorage.setItem("align_name", "true");
    bool = true;
  }
  let num = { num: "stock_name", bool: bool };
  let url = "/input";
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

function orderListInfo() {
  let bool = true;
  if (localStorage.getItem("align_info") == "true") {
    localStorage.setItem("align_info", "false");
    bool = false;
  } else {
    localStorage.setItem("align_info", "true");
    bool = true;
  }
  let num = { num: "stock_info", bool: bool };
  let url = "/input";
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

function orderListBuy() {
  let bool = true;
  if (localStorage.getItem("align_buy") == "true") {
    localStorage.setItem("align_buy", "false");
    bool = false;
  } else {
    localStorage.setItem("align_buy", "true");
    bool = true;
  }
  let num = { num: "buy_com", bool: bool };
  let url = "/input";
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

function orderListDue() {
  let bool = true;
  if (localStorage.getItem("align_due") == "true") {
    localStorage.setItem("align_due", "false");
    bool = false;
  } else {
    localStorage.setItem("align_due", "true");
    bool = true;
  }
  let num = { num: "wlb_input_date", bool: bool };
  let url = "/input";
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

function orderListWorker() {
  let bool = true;
  if (localStorage.getItem("align_worker") == "true") {
    localStorage.setItem("align_worker", "false");
    bool = false;
  } else {
    localStorage.setItem("align_worker", "true");
    bool = true;
  }
  let num = { num: "worker_name", bool: bool };
  let url = "/input";
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

function readExcel() {
  let input = event.target;
  let reader = new FileReader();
  reader.onload = function () {
    let data = reader.result;
    let workBook = XLSX.read(data, { type: "binary" });
    workBook.SheetNames.forEach(function (sheetName) {
      let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
      console.log(rows[0].stock_name);
      // console.log(JSON.stringify(rows));
    });
  };
  reader.readAsBinaryString(input.files[0]);
}
