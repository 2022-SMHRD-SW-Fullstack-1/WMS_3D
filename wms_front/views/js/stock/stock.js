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


let checked_arr = [0]
let result;


function isChecked(e){
  
  if(checked_arr.includes(e)){
    
    let arrayRemove = (arr, value) => {
      return arr.filter((ele) => {
          return ele != value;
      });
    };
    checked_arr = arrayRemove(checked_arr,e)

  }else{
    checked_arr.push(e)
  }
  console.log(checked_arr)

}

function stockOutput() {
  let worker = prompt("판매처를 입력해주세요")


  let url = "/stockOutput"
  let form = document.createElement('form');
  form.setAttribute('method','post')
  form.setAttribute('action',url)
  document.characterSet = "utf-8";
  for(let i =0; i<checked_arr.length;i++){
    let num = {num: checked_arr[i],worker: worker}
    for(let key in num){
      let hiddenField = document.createElement('input')
      hiddenField.setAttribute('type','hidden');
      hiddenField.setAttribute('name',key)
      hiddenField.setAttribute('value',num[key]);
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
    form.submit();




}