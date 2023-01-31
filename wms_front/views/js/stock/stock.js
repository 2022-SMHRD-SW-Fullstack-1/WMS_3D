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

    localStorage.setItem("clicked_stock_num",e.stock_num)
  }