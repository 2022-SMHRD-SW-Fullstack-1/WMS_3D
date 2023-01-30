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
  let url = "/stock";
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
  if (localStorage.getItem("align_num") == "true") {
    localStorage.setItem("align_num", "false");
    bool = false;
  } else {
    localStorage.setItem("align_num", "true");
    bool = true;
  }
  let num = { num: "stock_name", bool: bool };
  let url = "/stock";
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
  if (localStorage.getItem("align_num") == "true") {
    localStorage.setItem("align_num", "false");
    bool = false;
  } else {
    localStorage.setItem("align_num", "true");
    bool = true;
  }
  let num = { num: "stock_info", bool: bool };
  let url = "/stock";
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
  if (localStorage.getItem("align_num") == "true") {
    localStorage.setItem("align_num", "false");
    bool = false;
  } else {
    localStorage.setItem("align_num", "true");
    bool = true;
  }
  let num = { num: "buy_com", bool: bool };
  let url = "/stock";
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

function orderListWarehouse() {
  let bool = true;
  if (localStorage.getItem("align_num") == "true") {
    localStorage.setItem("align_num", "false");
    bool = false;
  } else {
    localStorage.setItem("align_num", "true");
    bool = true;
  }
  let num = { num: "wh_name", bool: bool };
  let url = "/stock";
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

function orderListExp() {
  let bool = true;
  if (localStorage.getItem("align_num") == "true") {
    localStorage.setItem("align_num", "false");
    bool = false;
  } else {
    localStorage.setItem("align_num", "true");
    bool = true;
  }
  let num = { num: "exp_dt", bool: bool };
  let url = "/stock";
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
