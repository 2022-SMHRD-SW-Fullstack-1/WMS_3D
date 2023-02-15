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

  let url = "http://localhost:3002/input1";

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

  location.href = "http://localhost:3002/input/search";
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
      console.log(rows);
      console.log(rows[0].buy_com);

      let url = "/input";
      let form = document.createElement("form");
      form.setAttribute("action", url);
      form.setAttribute("method", "post");
      document.characterSet = "utf-8";
      for (var i = 0; i < rows.length; i++) {
        let wlb_date = rows[i].wlb_input_date.trim();
        let in_date;
        let exp_date;
        if (rows[i].input_date != null) {
          in_date = rows[i].input_date.trim();
        }
        if (rows[i].exp_dt != null) {
          exp_date = rows[i].exp_dt.trim();
        }
        let num = {
          stock_name: rows[i].stock_name,
          stock_info: rows[i].stock_info,
          buy_com: rows[i].buy_com,
          wlb_input_date: wlb_date,
          input_date: in_date,
          shelf_num: rows[i].shelf_num,
          stock_floor: rows[i].stock_floor,
          stock_position: rows[i].stock_position,
          exp_dt: exp_date,
        };
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
    });
  };
  reader.readAsBinaryString(input.files[0]);
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

function selectAll(selectAll) {
  const checkboxes = document.getElementsByName("item");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}


function inputDate() {
  const query = 'input[name="item"]:checked';
  const selectedEls = document.querySelectorAll(query);

  
  let checked_arr = [0];
  selectedEls.forEach((e) => {
    checked_arr.push(Number(e.value));
  });

  let inputDate = prompt("입고일자를 입력해주세요.")
  let url = "/inputCP";
  let form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", url);
  document.characterSet = "utf-8";
  for (let i = 0; i < checked_arr.length; i++) {
    let num = { num: checked_arr[i], inputDate: inputDate };
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