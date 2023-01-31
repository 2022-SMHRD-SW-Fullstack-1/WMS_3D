// var test = document.getElementById('test');

// test.addEventListener('click',function(){
//     alert('ok')
// // })

// function dp_menu(){
//     let click = document.getElementById("drop-content");
//     if(click.style.display === "none"){
//         click.style.display = "block";

//     }else{
//         click.style.display = "none";

//     }
// }

//페이지 이동 기능 (warehouse를 shelf로)
let sub_stock_num = document.getElementById("sub_stock_num")
let sub_stock_name = document.getElementById("sub_stock_name")
let sub_stock_info = document.getElementById("sub_stock_info")
let sub_stock_buy_com = document.getElementById("sub_stock_buy_com")
let sub_stock_input_dt = document.getElementById("sub_stock_input_dt")
// 재고 정보 가져오기
let shelf_container_top = document.querySelector(".shelf_container_top")

let stock_arr = []

let storage_stock_info = document.querySelectorAll(".storage_stock_info")
for(let i=0; i<storage_stock_info.length;i++){
  let arr = storage_stock_info[i].innerText.split('/')
  stock_arr.push({shelf_num:Number(arr[0]),stock_num:Number(arr[1]),stock_name:arr[2],stock_info:arr[3],buy_com:arr[4],input_date:arr[5],stock_floor:Number(arr[6]),stock_position:Number(arr[7])})
}
// 재고 정보 가져오기


function goToCreateShelf(e){
    console.log(e)
    const num = {num:e}
    let url = "/createShelf"

    let form = document.createElement('form');
    form.setAttribute('method','post')
    form.setAttribute('action',url)
    document.characterSet = "utf-8";
    for(let key in num){
      let hiddenField = document.createElement('input')
      hiddenField.setAttribute('type','hidden');
      hiddenField.setAttribute('name',key)
      hiddenField.setAttribute('value',num[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();


  }
  function goToShelf(){
    location.href = "../../../three/sj/warehouse_3D.html"
  }

  function changeSub(e){

    sub_stock_num.innerText = ""
        sub_stock_name.innerText = ""
        sub_stock_info.innerText = ""
        sub_stock_buy_com.innerText = ""
        sub_stock_input_dt.innerText = ""

    let floor_count = 0;

    console.log(stock_arr);
    let floor_div = ""

    let clicked_shelf_name = e.shelf_name + "정보"
    let sub_div_head = document.getElementById("sub_div_head")
    sub_div_head.innerText = clicked_shelf_name
    // console.log(e);
    let floor = Number(e.floor)
    let length = Number(e.length)
    let width = Number(e.width)
    console.log(e)

    let floor_position_arr = []

    for(let i =0; i<stock_arr.length;i++){
      if(e.shelf_num == stock_arr[i].shelf_num){
        floor_position_arr.push({stock_num:stock_arr[i].stock_num, floor:stock_arr[i].stock_floor, position:stock_arr[i].stock_position})
      }
    }

    console.log(floor_position_arr);
    for(let i=floor;i>0;i--){

      floor_div += '<div class="shelf_floor_div">'
      floor_div += '<span>'+i+'층'+'</span>'
      for(let j=length-1;j>=0;j--){
        let tf = false
        let num = null;
        for(let k=0;k<floor_position_arr.length;k++){
          if(floor_position_arr[k].floor == i && floor_position_arr[k].position== j ){
            tf = true
            num = floor_position_arr[k].stock_num
          }
        }
        if(tf){
          floor_div += `<div class="shelf_have_item_div" onclick= 'hi(${num})' ></div>`
        }else{
          floor_div += '<div class="shelf_none_item_div" ></div>'
        }

      }
      floor_div +='</div>'
    }
    shelf_container_top.innerHTML = floor_div

  }

  
  function hi(e){

    for(let i=0; i<stock_arr.length;i++){
      if(stock_arr[i].stock_num==e){
        sub_stock_num.innerText = stock_arr[i].stock_num
        sub_stock_name.innerText = stock_arr[i].stock_name
        sub_stock_info.innerText = stock_arr[i].stock_info
        sub_stock_buy_com.innerText = stock_arr[i].buy_com
        sub_stock_input_dt.innerText = stock_arr[i].input_date
      }
    }

  }


  //페이지 이동 기능