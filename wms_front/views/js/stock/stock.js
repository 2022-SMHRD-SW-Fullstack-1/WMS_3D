let catevalText = {};
let cateText = "";

function dp_menu() {
  let click = document.getElementById("drop-content");
  if (click.style.display === "none") {
    click.style.display = "block";
  } else {
    click.style.display = "none";
  }
}

function getCateValue(e) {
  // console.log("event:", e);
  cateText = e;
  let cateName = document.getElementById(e).innerText;
  console.log(cateName);
  document.getElementById("drop_cate").innerText = cateName;
}

function searchText() {
  const searchText = document.getElementById("search_text").value;
  console.log(searchText);
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

  let url = "http://localhost:3002/stock";

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

  location.href = "http://localhost:3002/stock/search";
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

function ExcelExport(id, title) {
  var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text =
    tab_text +
    '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  tab_text =
    tab_text + "<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>";
  tab_text = tab_text + "<x:Name>Sheet1</x:Name>";
  tab_text =
    tab_text +
    "<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>";
  tab_text =
    tab_text + "</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>";
  tab_text = tab_text + "<table border='1px'>";
  var exportTable = $("#" + id).clone();
  exportTable.find("input").each(function (index, elem) {
    $(elem).remove();
  });
  exportTable.find("img").each(function (index, elem) {
    $(elem).remove();
  });
  exportTable.find("button").each(function (index, elem) {
    $(elem).remove();
  });
  tab_text = tab_text + exportTable.html();
  tab_text = tab_text + "</table></body></html>";
  var data_type = "data:application/vnd.ms-excel";
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  var fileName = title + ".xls";
  //Explorer 환경에서 다운로드
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    if (window.navigator.msSaveBlob) {
      var blob = new Blob([tab_text], {
        type: "application/csv;charset=utf-8;",
      });
      navigator.msSaveBlob(blob, fileName);
    }
  } else {
    var blob2 = new Blob([tab_text], {
      type: "application/csv;charset=utf-8;",
    });
    var filename = fileName;
    var elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob2);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}
