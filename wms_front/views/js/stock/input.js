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
